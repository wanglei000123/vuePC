<template>
    <div class="wrapper">
        <div class="container">
            <div class="handle-box">
                <!-- 树形下拉框  -->
                <template>
                    <el-form :inline="true" :v-model="form" class="demo-form-inline" size="mini" >
                        <el-row>
                            <el-col :span='24'>
                                 <el-form-item label="事项类别">
                                    <el-select v-model="form.shixlb" :clearable="true" placeholder="事项类别"  class="handle-input mr10">
                                        <el-option key="1" label="占用、挖掘公路、公路用地或者使公路改线审批(因修建铁路、机场、供电、水利、通信等建设工程需要使公路改线的（高速公路）" value="占用、挖掘公路、公路用地或者使公路改线审批(因修建铁路、机场、供电、水利、通信等建设工程需要使公路改线的（高速公路）"></el-option>
                                        <el-option key="2" label="网约车平台公司线上服务能力认定" value="网约车平台公司线上服务能力认定"></el-option>
                                        <el-option key="3" label="对路产损失调查处理" value="对路产损失调查处理"></el-option>
                                        <el-option key="4" label="船用产品法定检验" value="船用产品法定检验"></el-option>
                                        <el-option key="5" label="变更企业法定代表人或者办公地点备案" value="变更企业法定代表人或者办公地点备案"></el-option>
                                        <el-option key="6" label="道路运输服务质量投诉调解" value="道路运输服务质量投诉调解"></el-option>
                                        <el-option key="7" label="客运标志牌" value="客运标志牌"></el-option>
                                        <el-option key="8" label="临时客运标志牌发放" value="临时客运标志牌发放"></el-option>
                                        <el-option key="9" label="收费公路的鉴定和验收" value="收费公路的鉴定和验收"></el-option>
                                        <el-option key="10" label="公路施工作业验收" value="公路施工作业验收"></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="材料组名称">
                                    <el-input v-model="form.cailzmc" :clearable="true" placeholder="材料组名称" class="handle-input mr10"></el-input>
                                </el-form-item>
                                <el-form-item label="状态">
                                    <el-select v-model="form.zhuangt" :clearable="true" placeholder="状态" class="handle-select mr10">
                                        <el-option key="1" label="启用" value="启用"></el-option>
                                        <el-option key="2" label="禁用" value="禁用"></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
                                <el-button type="primary" icon="el-icon-circle-plus-outline" @click="handleAdd">新增</el-button>
                                <el-button type="primary" icon="el-icon-suitcase" >复制</el-button>
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
                <el-table-column prop="shixlb" label="事项类别" min-width="30%" align="center"></el-table-column>
                <el-table-column prop="cailzmc" label="材料组名称" min-width="30%" align="center"></el-table-column>
                <el-table-column prop="zhuangt" label="状态" min-width="10%" align="center"></el-table-column>
                <el-table-column label="操作" min-width="20%" align="center">
                    <template slot-scope="scope">
                        <el-switch
                            class="mr10"
                            v-model="scope.row.status"
                            active-color="#13ce66"
                            inactive-color="#ff4949"
                            @change="active_text(scope.$index, $event, scope.row)">
                        </el-switch>
                        <el-button
                            type="text"
                            icon="el-icon-edit"
                            @click="handleEdit(scope.$index, scope.row)"
                        >编辑</el-button>
                        <el-button
                            type="text"
                            icon="el-icon-s-management"
                            @click="handleCailgl(scope.$index, scope.row)"
                        >材料管理</el-button>
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

        <!-- 流程 -->
        <el-dialog title="流程选择" :visible.sync="dialogFormLiucVisible">
            <el-form :model="form">
                <el-form-item label="流程名称" :label-width="formLabelWidth">
                <el-select v-model="form.flow" placeholder="请选择流程">
                    <el-option label="政务服务办理流程_高速公路占用挖掘" value="shanghai"></el-option>
                    <el-option label="许可审批" value="beijing"></el-option>
                </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
            </div>
        </el-dialog>

        <!-- 新增弹出框 -->
        <el-dialog title="新增材料组" :visible.sync="addVisible" width="50%">
            <el-form ref="addform" :model="addform" label-width="120px">
                <el-form-item label="事项类别">
                    <el-select v-model="addform.shixlb" :clearable="true" placeholder="事项类别" class="width-200">
                        <el-option key="1" label="占用、挖掘公路、公路用地或者使公路改线审批(因修建铁路、机场、供电、水利、通信等建设工程需要使公路改线的（高速公路）" value="占用、挖掘公路、公路用地或者使公路改线审批(因修建铁路、机场、供电、水利、通信等建设工程需要使公路改线的（高速公路）"></el-option>
                        <el-option key="2" label="网约车平台公司线上服务能力认定" value="网约车平台公司线上服务能力认定"></el-option>
                        <el-option key="3" label="对路产损失调查处理" value="对路产损失调查处理"></el-option>
                        <el-option key="4" label="船用产品法定检验" value="船用产品法定检验"></el-option>
                        <el-option key="5" label="变更企业法定代表人或者办公地点备案" value="变更企业法定代表人或者办公地点备案"></el-option>
                        <el-option key="6" label="道路运输服务质量投诉调解" value="道路运输服务质量投诉调解"></el-option>
                        <el-option key="7" label="客运标志牌" value="客运标志牌"></el-option>
                        <el-option key="8" label="临时客运标志牌发放" value="临时客运标志牌发放"></el-option>
                        <el-option key="9" label="收费公路的鉴定和验收" value="收费公路的鉴定和验收"></el-option>
                        <el-option key="10" label="公路施工作业验收" value="公路施工作业验收"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="材料组名称">
                    <el-input v-model="addform.cailzmc" class="width-200"></el-input>
                </el-form-item>
                <el-form-item label="状态">
                    <el-select v-model="addform.zhuangt" :clearable="true" placeholder="状态" class="width-200">
                        <el-option key="1" label="启用" value="启用"></el-option>
                        <el-option key="2" label="禁用" value="禁用"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveCailz">确 定</el-button>
            </span>
        </el-dialog>

        <el-dialog title="编辑材料组" :visible.sync="editVisible" width="50%">
            <el-form ref="editform" :model="editform" label-width="120px">
                <el-form-item label="事项类别">
                    <el-select v-model="editform.shixlb" :clearable="true" placeholder="事项类别" class="width-200">
                        <el-option key="1" label="占用、挖掘公路、公路用地或者使公路改线审批(因修建铁路、机场、供电、水利、通信等建设工程需要使公路改线的（高速公路）" value="占用、挖掘公路、公路用地或者使公路改线审批(因修建铁路、机场、供电、水利、通信等建设工程需要使公路改线的（高速公路）"></el-option>
                        <el-option key="2" label="网约车平台公司线上服务能力认定" value="网约车平台公司线上服务能力认定"></el-option>
                        <el-option key="3" label="对路产损失调查处理" value="对路产损失调查处理"></el-option>
                        <el-option key="4" label="船用产品法定检验" value="船用产品法定检验"></el-option>
                        <el-option key="5" label="变更企业法定代表人或者办公地点备案" value="变更企业法定代表人或者办公地点备案"></el-option>
                        <el-option key="6" label="道路运输服务质量投诉调解" value="道路运输服务质量投诉调解"></el-option>
                        <el-option key="7" label="客运标志牌" value="客运标志牌"></el-option>
                        <el-option key="8" label="临时客运标志牌发放" value="临时客运标志牌发放"></el-option>
                        <el-option key="9" label="收费公路的鉴定和验收" value="收费公路的鉴定和验收"></el-option>
                        <el-option key="10" label="公路施工作业验收" value="公路施工作业验收"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="材料组名称">
                    <el-input v-model="editform.cailzmc" class="width-200"></el-input>
                </el-form-item>
                <el-form-item label="状态">
                    <el-select v-model="editform.zhuangt" :clearable="true" placeholder="状态" class="width-200">
                        <el-option key="1" label="启用" value="启用"></el-option>
                        <el-option key="2" label="禁用" value="禁用"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="editCailz">确 定</el-button>
            </span>
        </el-dialog>

        <el-dialog title="材料管理" :visible.sync="clglVisible" width="85%">
            <v-Clgl></v-Clgl>
            <span slot="footer" class="dialog-footer">
                <el-button @click="clglVisible = false">取 消</el-button>
                <el-button type="primary" @click="clglVisible = false">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { fetchData } from './Clzgl';
import vClgl from '@/components/clzgl/Clgl.vue';
export default {
    name: 'basetable',
    data() {
        return {
            form:{},
            addform:{},
            editform:{},
            query: {
                shixlb: '',
                cailzmc: '',
                zhuangt: '',
                pageIndex: 1,
                pageSize: 10
            },
            tableData: [],
            multipleSelection: [],
            pageTotal: 0,
            addVisible: false,
            editVisible: false,
            idx: -1,
            clglVisible: false,
        };
    },
    created() {
        this.getData();
    },
    components: {
        vClgl
    },
    methods: {
        getDataAll() {
            this.tableData = fetchData();
        },
        // 获取 easy-mock 的模拟数据
        getData() {
                this.tableData = fetchData();
                // 过滤条件
                if (this.query.zhuangt != '') {
                    this.tableData = this.tableData.filter(item => {
                        if (this.query.zhuangt == item.zhuangt) {
                            return true;
                        }
                    })
                } 
               
                if (this.query.shixlb != '') {
                    this.tableData = this.tableData.filter(item => {
                        if (this.query.shixlb == item.shixlb) {
                            return true;
                        }
                    })
                } 
               
                if (this.query.cailzmc != '') {
                    this.tableData = this.tableData.filter(item => {
                        if (item.cailzmc.indexOf(this.query.cailzmc) != -1) {
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
            this.query.shixlb = (typeof this.form.shixlb !== 'undefined' && this.form.shixlb != '') ? this.form.shixlb : '';
            this.query.cailzmc = (typeof this.form.cailzmc !== 'undefined' && this.form.cailzmc != '') ? this.form.cailzmc : '';
            this.query.zhuangt = (typeof this.form.zhuangt !== 'undefined' && this.form.zhuangt != '') ? this.form.zhuangt : '';
            this.$set(this.query, 'pageIndex', 1);
            this.getData();
        },
        // 多选操作
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        active_text (index, value, row) {
            this.idx = index;
            if(value) {
                row.zhuangt = '启用';
            } else {
                row.zhuangt = '禁用';
            }
            this.$set(this.tableData, this.idx, row);
        },
        // 新增操作
        handleAdd() {
            this.addform = {};
            this.addVisible = true;
        },
        // 保存新增材料组
        saveCailz() {
            this.getDataAll();
            this.addVisible = false;
            var index = this.tableData.length+1;
            var status = true;
            if(this.addform.status != null && this.addform.status !='') {
                if (this.addform.status == '启用') {
                    status = true;
                } else {
                     status = false;
                }
            }
            var j = { "id": index, "shixlb": this.addform.shixlb, "cailzmc": this.addform.cailzmc, "zhuangt": this.addform.zhuangt, "status": status};
            this.$set(this.tableData, this.tableData.length, j);
            localStorage.setItem('arrData', JSON.stringify(this.tableData));
            this.form = {};
            this.handleSearch();
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
            if (this.editform.zhuangt == '启用') {
                this.editform.status = true;
            } else {
                 this.editform.status = false;
            }
            this.$set(this.tableData, this.idx, this.editform);
        },
        // 材料管理
        handleCailgl(index, row) {
            this.clglVisible = true;
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
