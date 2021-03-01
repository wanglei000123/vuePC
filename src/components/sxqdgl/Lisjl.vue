<template>
    <div>
        <div class="container">
            <div class="handle-box">
                <!-- 树形下拉框  -->
                <template>
                    <el-form :inline="true" :v-model="form" class="demo-form-inline" size="mini" >
                        <el-row>
                            <el-col :span='24'>
                                <el-form-item label="事项类型">
                                    <el-select v-model="form.shixlx" :clearable="true" placeholder="事项类型" class="handle-select mr10">
                                        <el-option key="1" label="行政许可" value="行政许可"></el-option>
                                        <el-option key="2" label="行政确认" value="行政确认"></el-option>
                                        <el-option key="3" label="其他" value="其他"></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="行业类别">
                                    <el-select v-model="form.hangylb" :clearable="true" placeholder="行业类别" class="handle-select mr10">
                                        <el-option key="1" label="公路管理" value="公路管理"></el-option>
                                        <el-option key="2" label="运输管理" value="运输管理"></el-option>
                                        <el-option key="3" label="航道管理" value="航道管理"></el-option>
                                        <el-option key="4" label="港口管理" value="港口管理"></el-option>
                                        <el-option key="5" label="建设管理" value="建设管理"></el-option>
                                        <el-option key="6" label="地方海事" value="地方海事"></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="事项级别">
                                    <el-select v-model="form.shixjb" :clearable="true" placeholder="事项级别" class="handle-select mr10">
                                        <el-option key="1" label="省级" value="省级"></el-option>
                                        <el-option key="2" label="设区市级" value="设区市级"></el-option>
                                        <el-option key="3" label="县级" value="县级"></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="事项名称">
                                    <el-input v-model="form.shixmc" placeholder="事项名称" class="handle-input mr10"></el-input>
                                </el-form-item>
                                <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
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
                tooltip-effect="dark"
            >
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column prop="id" label="序号" width="55" align="center"></el-table-column>
                <el-table-column prop="lisbb" label="历史版本" width="100" align="center"></el-table-column>
                <el-table-column prop="shixmc" label="事项名称"  width="250" align="center"></el-table-column>
                <el-table-column prop="chengnbjsx" label="承诺办结时限" align="center"></el-table-column>
                <el-table-column prop="banlxs" label="办理形式" align="center"></el-table-column>
                <el-table-column prop="shifwb" label="是否网办" width="50" align="center" ></el-table-column>
                <el-table-column prop="kuaidfw" label="快递服务" width="50" align="center" ></el-table-column>
                <el-table-column prop="shedyj" label="设定依据" align="center" width="200" :show-overflow-tooltip="true"></el-table-column>
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
    </div>
</template>

<script>
import { fetchData } from './Sxdbfx';
export default {
    name: 'basetable',
    data() {
        return {
            query: {
                shixlx: '',
                hangylb: '',
                shixjb: '',
                shixmc: '',
                pageIndex: 1,
                pageSize: 10
            },
            form:{},
            tableData: [],
            multipleSelection: [],
            pageTotal: 0,
        };
    },
    created() {
        this.getData();
    },
    methods: {
        // 获取 easy-mock 的模拟数据
        getData() {
            fetchData(this.query).then(res => {
                console.log(res);
                this.tableData = res.list;
                // 过滤条件
                if (this.query.shixlx != '') {
                    this.tableData = this.tableData.filter(item => {
                        if (this.query.shixlx == item.shixlx) {
                            return true;
                        }
                    })
                } 
                if (this.query.hangylb != '') {
                    this.tableData = this.tableData.filter(item => {
                        if (this.query.hangylb == item.hangylb) {
                            return true;
                        }
                    })
                } 
                if (this.query.shixjb != '') {
                    this.tableData = this.tableData.filter(item => {
                        if (this.query.shixjb == item.shixjb) {
                            return true;
                        }
                    })
                } 
                if (this.query.shixmc != '') {
                    this.tableData = this.tableData.filter(item => {
                        if (item.shixmc.indexOf(this.query.shixmc) != -1) {
                            return true;
                        }
                    })
                } 
                
                // 设置总页数
                this.pageTotal = this.tableData.length;
                // 分页
                this.tableData =this.tableData.slice((this.query.pageIndex-1)*this.query.pageSize,this.query.pageIndex*this.query.pageSize);
            });
        },
        // 触发搜索按钮
        handleSearch() {
            this.query.shixlx = (typeof this.form.shixlx !== 'undefined' && this.form.shixlx != '') ? this.form.shixlx : '';
            this.query.hangylb = (typeof this.form.hangylb !== 'undefined' && this.form.hangylb != '') ? this.form.hangylb : '';
            this.query.shixjb = (typeof this.form.shixjb !== 'undefined' && this.form.shixjb != '') ? this.form.shixjb : '';
            this.query.shixmc = (typeof this.form.shixmc !== 'undefined' && this.form.shixmc != '') ? this.form.shixmc : '';
            this.$set(this.query, 'pageIndex', 1);
            this.getData();
        },
        // 多选操作
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        // 分页导航
        handlePageChange(val) {
            this.$set(this.query, 'pageIndex', val);
            this.getData();
        }
    }
};
</script>

<style lang="css">
    .el-tooltip__popper {
        font-size: 14px; 
        max-width:50%;
        background-color: azure;
    } /*设置显示隐藏部分内容，按50%显示*/
</style> 

<style scoped>
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

.handle-select {
    width: 125px;
}
</style>
