<template>
    <div class="wrapper">
        <div class="container">
            <div class="handle-box">
                <!-- 树形下拉框  -->
                <template>
                    <el-form :inline="true" :v-model="form" class="demo-form-inline" size="mini" >
                        <el-row>
                            <el-col :span='24'>
                                <el-form-item label="字典名称">
                                    <el-input v-model="form.name" :clearable="true" placeholder="字典名称" class="handle-input mr10"></el-input>
                                </el-form-item>
                                <el-form-item label="事项类型">
                                    <el-select v-model="form.shixlx" :clearable="true" placeholder="事项类型" class="handle-select mr10">
                                        <el-option key="1" label="行政许可" value="行政许可"></el-option>
                                        <el-option key="2" label="行政确认" value="行政确认"></el-option>
                                        <el-option key="3" label="其他" value="其他"></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="字典类型">
                                    <el-select v-model="form.zidlx" :clearable="true" placeholder="字典类型" class="handle-select mr10">
                                        <el-option key="1" label="用户字典" value="用户字典"></el-option>
                                        <el-option key="2" label="系统字典" value="系统字典"></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
                                <el-button type="primary" icon="el-icon-circle-plus-outline" @click="handleAdd">新增</el-button>
                                <el-button type="danger" icon="el-icon-delete" @click="handleDelAll">删除</el-button>
                            </el-col>
                        </el-row>
                    </el-form>
                </template>
            </div>
            <el-table
                :data="tableData"
                border
                class="table"
                ref="multipleTable"
                header-cell-class-name="table-header"
                @selection-change="handleSelectionChange"
            >
                <el-table-column type="selection" min-width="5%" align="center"></el-table-column>
                <el-table-column prop="id" label="序号" min-width="5%" align="center"></el-table-column>
                <el-table-column prop="name" label="字典名称" min-width="20%" align="center"></el-table-column>
                <el-table-column prop="yew" label="业务" min-width="10%" align="center"></el-table-column>
                <el-table-column prop="diq" label="地区" min-width="10%" align="center"></el-table-column>
                <el-table-column prop="shixlx" label="事项类型" min-width="10%" align="center"></el-table-column>
                <el-table-column prop="banlsd" label="办理深度" min-width="20%" align="center"></el-table-column>
                <el-table-column prop="zidlx" label="字典类型" min-width="10%" align="center"></el-table-column>
                <el-table-column label="操作" min-width="10%" align="center">
                    <template slot-scope="scope">
                        <el-button
                            type="text"
                            icon="el-icon-edit"
                            @click="handleEdit(scope.$index, scope.row)"
                        >编辑</el-button>
                        <el-button
                            type="text"
                            style="color:#F56C6C;"
                            icon="el-icon-delete"
                            @click="handleDel(scope.$index, scope.row)"
                        >删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination
                    background
                    layout="total, prev, pager, next"
                    :current-page="query.pageIndex"
                    :page-size="query.pageSize"
                    :total="pageTotal"
                    @current-change="handlePageChange"
                ></el-pagination>
            </div>
        </div>

        <!-- 新增弹出框 -->
        <el-dialog title="新增数据字典" :visible.sync="addVisible">
            <el-form ref="addform" :inline="true" :model="addform" class="demo-form-inline">
                <el-form-item label="字典名称">
                    <el-input v-model="addform.name" class="width-200 mr10" placeholder="字典名称"></el-input>
                </el-form-item>
                <el-form-item label="业　　务">
                    <el-select v-model="addform.yew" :clearable="true" placeholder="业务" class="width-200">
                        <el-option key="1" label="江苏省交通运输厅" value="江苏省交通运输厅"></el-option>
                        <el-option key="2" label="公路业务" value="公路业务"></el-option>
                        <el-option key="3" label="运管业务" value="运管业务"></el-option>
                        <el-option key="4" label="港口业务" value="港口业务"></el-option>
                        <el-option key="5" label="航道业务" value="航道业务"></el-option>
                        <el-option key="6" label="质监业务" value="质监业务"></el-option>
                        <el-option key="7" label="地方海事业务" value="地方海事业务"></el-option>
                        <el-option key="8" label="监管业务" value="监管业务"></el-option>
                        <el-option key="9" label="高管业务" value="高管业务"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="事项类型">
                    <el-select v-model="addform.shixlx" :clearable="true" placeholder="事项类型" class="width-200 mr10">
                        <el-option key="1" label="行政许可" value="行政许可"></el-option>
                        <el-option key="2" label="行政确认" value="行政确认"></el-option>
                        <el-option key="3" label="其他" value="其他"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="地　　区">
                    <el-input v-model="addform.diq" class="width-200" placeholder="地区"></el-input>
                </el-form-item>
                <el-form-item label="办理深度">
                    <el-input v-model="addform.banlsd" class="width-200 mr10" placeholder="办理深度"></el-input>
                </el-form-item>
                <el-form-item label="字典类型">
                    <el-select v-model="addform.zidlx" :clearable="true" placeholder="事项类型" class="width-200">
                        <el-option key="1" label="用户字典" value="用户字典"></el-option>
                        <el-option key="2" label="系统字典" value="系统字典"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveDict">确 定</el-button>
            </span>
        </el-dialog>

        <el-dialog title="编辑数据字典" :visible.sync="editVisible" width="30%">
            <el-form ref="editform" :model="editform" label-width="120px">
                <el-form-item label="字典名称">
                    <el-input v-model="editform.name" class="width-200 mr10" placeholder="字典名称"></el-input>
                </el-form-item>
                <el-form-item label="业　　务">
                    <el-select v-model="editform.yew" :clearable="true" placeholder="业务" class="width-200">
                        <el-option key="1" label="江苏省交通运输厅" value="江苏省交通运输厅"></el-option>
                        <el-option key="2" label="公路业务" value="公路业务"></el-option>
                        <el-option key="3" label="运管业务" value="运管业务"></el-option>
                        <el-option key="4" label="港口业务" value="港口业务"></el-option>
                        <el-option key="5" label="航道业务" value="航道业务"></el-option>
                        <el-option key="6" label="质监业务" value="质监业务"></el-option>
                        <el-option key="7" label="地方海事业务" value="地方海事业务"></el-option>
                        <el-option key="8" label="监管业务" value="监管业务"></el-option>
                        <el-option key="9" label="高管业务" value="高管业务"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="事项类型">
                    <el-select v-model="editform.shixlx" :clearable="true" placeholder="事项类型" class="width-200 mr10">
                        <el-option key="1" label="行政许可" value="行政许可"></el-option>
                        <el-option key="2" label="行政确认" value="行政确认"></el-option>
                        <el-option key="3" label="其他" value="其他"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="地　　区">
                    <el-input v-model="editform.diq" class="width-200" placeholder="地区"></el-input>
                </el-form-item>
                <el-form-item label="办理深度">
                    <el-input v-model="editform.banlsd" class="width-200 mr10" placeholder="办理深度"></el-input>
                </el-form-item>
                <el-form-item label="字典类型">
                    <el-select v-model="editform.zidlx" :clearable="true" placeholder="事项类型" class="width-200">
                        <el-option key="1" label="用户字典" value="用户字典"></el-option>
                        <el-option key="2" label="系统字典" value="系统字典"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="editCailz">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { fetchData } from './Dict';
export default {
    data() {
        return {
            form:{},
            addform:{},
            editform:{},
            query: {
                name: '',
                shixlx: '',
                zidlx: '',
                pageIndex: 1,
                pageSize: 10
            },
            tableData: [],
            multipleSelection: [],
            delList: [],
            pageTotal: 0,
            addVisible: false,
            editVisible: false,
            idx: -1,
        };
    },
    created() {
        this.getData();
    },
    methods: {
        getDataAll() {
            this.tableData = fetchData();
        },
        // 获取 easy-mock 的模拟数据
        getData() {
                this.tableData = fetchData();
                // 过滤条件
                if (this.query.shixlx != '') {
                    this.tableData = this.tableData.filter(item => {
                        if (this.query.shixlx == item.shixlx) {
                            return true;
                        }
                    })
                } 
               
                if (this.query.zidlx != '') {
                    this.tableData = this.tableData.filter(item => {
                        if (this.query.zidlx == item.zidlx) {
                            return true;
                        }
                    })
                } 
               
                if (this.query.name != '') {
                    this.tableData = this.tableData.filter(item => {
                        if (item.name.indexOf(this.query.name) != -1) {
                            return true;
                        }
                    })
                } 
                
                // 设置总页数
                this.pageTotal = this.tableData.length;
                // 分页
                this.tableData =this.tableData.slice((this.query.pageIndex-1)*this.query.pageSize,this.query.pageIndex*this.query.pageSize);
        },
        // 触发搜索按钮
        handleSearch() {
            this.query.shixlx = (typeof this.form.shixlx !== 'undefined' && this.form.shixlx != '') ? this.form.shixlx : '';
            this.query.name = (typeof this.form.name !== 'undefined' && this.form.name != '') ? this.form.name : '';
            this.query.zidlx = (typeof this.form.zidlx !== 'undefined' && this.form.zidlx != '') ? this.form.zidlx : '';
            this.$set(this.query, 'pageIndex', 1);
            this.getData();
        },
        // 多选操作
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        // 新增
        handleAdd() {
            this.addform = {};
            this.addVisible = true;
        },
        // 保存
        saveDict() {
            this.getDataAll();
            this.addVisible = false;
            var index = this.tableData[this.tableData.length-1].id+1;
            var j = { "id": index, "name": this.addform.name, "yew": this.addform.yew, "diq": this.addform.diq, "shixlx": this.addform.shixlx, "banlsd":this.addform.banlsd, "zidlx": this.addform.zidlx};
            this.$set(this.tableData, this.tableData.length, j);
            localStorage.setItem('dictData', JSON.stringify(this.tableData));
            this.form = {};
            this.handleSearch();
        },
        // 删除
        handleDelAll() {
            const length = this.multipleSelection.length;
            if (length != 0) {
                // 二次确认删除
                this.$confirm('确定要删除吗？', '提示', {
                    type: 'warning'
                })
                .then(() => {
                    this.$message.success('删除成功');
                    let str = '';
                    this.delList = this.delList.concat(this.multipleSelection);
                    for (let i = 0; i < this.delList.length; i++) {
                        this.tableData.splice(this.delList[i].index, 1);
                    }
                    localStorage.setItem('dictData', JSON.stringify(this.tableData));
                    this.delList = [];
                    this.multipleSelection = [];
                })
                .catch(() => {});
            } else {
                 this.$message.success('请选择需要删除的数据！');
            }
        },
        // 编辑操作
        handleEdit(index, row) {
            this.idx = index;
            this.editform = row;
            this.editVisible = true;
        },
        // 保存编辑
        editCailz() {
            this.editVisible = false;
            this.$message.success(`修改第 ${this.idx + 1} 行成功`);
            this.$set(this.tableData, this.idx, this.editform);
            localStorage.setItem('dictData', JSON.stringify(this.tableData));
        },
        // 行删除
        handleDel(index, row) {
           // 二次确认删除
            this.$confirm('确定要删除吗？', '提示', {
                type: 'warning'
            })
            .then(() => {
                this.$message.success('删除成功');
                this.tableData.splice(index, 1);
                localStorage.setItem('dictData', JSON.stringify(this.tableData));
            })
            .catch(() => {});
        },
        // 分页导航
        handlePageChange(val) {
            this.$set(this.query, 'pageIndex', val);
            this.getData();
        }
    }
};
</script>

<style scoped>
html, body, #app, .wrapper {
    width: 100%;
    height: 100%;
    overflow: auto;
}

.width-200{
    width: 200px;
}

.handle-box {
    margin-bottom: 20px;
}

.handle-select {
    width: 125px;
}

.handle-input {
    width: 200px;
    display: inline-block;
}
.table {
    width: 100%;
    font-size: 14px;
}

.mr10 {
    margin-right: 10px;
}
.table-td-thumb {
    display: block;
    margin: auto;
    width: 40px;
    height: 40px;
}
</style>
