<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-calendar"></i> 运行管理
                </el-breadcrumb-item>
                <el-breadcrumb-item>指标库管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>

        <div class="container">
            <div class="handle-box">
                <template>
                    <el-form :inline="true" :v-model="searchForm" class="demo-form-inline" size="mini" >
                        <el-row>
                            <el-col :span='24'>
                                <el-form-item label="指标级别：">
                                    <el-select v-model="searchForm.zhibjb" :clearable="true" placeholder="指标级别" class="handle-select mr10">
                                        <el-option key="1" label="--请选择--" value=""></el-option>
                                        <el-option key="2" label="省级" value="省级"></el-option>
                                        <el-option key="3" label="市级" value="市级"></el-option>
                                        <el-option key="4" label="县级" value="县级"></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="指标类别：">
                                    <el-select v-model="searchForm.zhiblb" :clearable="true" placeholder="指标类别" class="handle-select mr10">
                                        <el-option key="1" label="--请选择--" value=""></el-option>
                                        <el-option key="2" label="政务服务事项规范程度" value="政务服务事项规范程度"></el-option>
                                        <el-option key="3" label="政务服务事项流程优化程度" value="政务服务事项流程优化程度"></el-option>
                                        <el-option key="4" label="线上线下服务融合程度" value="线上线下服务融合程度"></el-option>
                                        <el-option key="5" label="移动政务服务推广程度" value="移动政务服务推广程度"></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="状态：">
                                    <el-select v-model="searchForm.zhuangt" :clearable="true" placeholder="状态" class="handle-select mr10">
                                        <el-option key="1" label="--请选择--" value=""></el-option>
                                        <el-option key="2" label="待审核" value="待审核"></el-option>
                                        <el-option key="3" label="待发布"" value="待发布"></el-option>
                                        <el-option key="4" label="已发布" value="已发布"></el-option>
                                        <el-option key="5" label="已注销" value="已注销"></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>

                                <el-button type="primary" icon="el-icon-plus" @click="handleSearch">指标定义</el-button>
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
                <!-- <el-table-column type="selection" width="55" align="center"></el-table-column> -->
                <el-table-column prop="id" label="序号" min-width="5%" align="center"></el-table-column>
                <el-table-column prop="zhibmc" label="指标名称" min-width="10%" align="center"></el-table-column>
                <el-table-column prop="zhibjb" label="指标级别" min-width="5%" align="center"></el-table-column>
                <el-table-column prop="zhiblb" label="指标类别" min-width="10%" align="center"></el-table-column>
                <el-table-column prop="pinggyd" label="评估要点" min-width=15%" align="center"></el-table-column>
                <el-table-column prop="pingfbz" label="评分标准" min-width="20%" align="center" ></el-table-column>
                <el-table-column prop="jisff" label="计算方法" min-width="20%" align="center" ></el-table-column>
                <el-table-column label="操作" min-width="15%" align="center">
                    <template slot-scope="scope">
                        <!-- <el-button
                            type="text"
                            icon="el-icon-plus"
                            @click="chakcl(scope.$index, scope.row)"
                        >注册</el-button> -->
                        <el-button
                            type="text"
                            icon="el-icon-s-operation"
                            @click="chakcl(scope.$index, scope.row)"
                        >修改</el-button>
                        <el-button
                            type="text"
                            icon="el-icon-user"
                            @click="chakcl(scope.$index, scope.row)"
                        >审核</el-button>
                        <el-button
                            type="text"
                            icon="el-icon-check"
                            @click="chakcl(scope.$index, scope.row)"
                        >发布</el-button>
                        <el-button
                            type="text"
                            icon="el-icon-delete"
                            @click="chakcl(scope.$index, scope.row)"
                        >注销</el-button>
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

    </div>
</template>

<script>
import { fetchData } from './Zbkgl';
export default {
    name: 'basetable',
    data() {
        return {
            labelWidth:"100px",
            data: [],
            searchForm:{zhibjb: '',zhiblb: '',zhuangt: ''},
            watch: {
            },
            query: {
                zhibjb: '',zhiblb: '',zhuangt: '',
                pageIndex: 1,
                pageSize: 10
            },
            tableData: [],
            multipleSelection: [],
            pageTotal: 0,
            
        };
    },
    components: {
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
                if (this.query.zhibjb != '') {
                    this.tableData = this.tableData.filter(item => {
                        if (this.query.zhibjb == item.zhibjb) {
                            return true;
                        }
                    })
                } 
                if (this.query.zhiblb != '') {
                    this.tableData = this.tableData.filter(item => {
                        if (this.query.zhiblb == item.zhiblb) {
                            return true;
                        }
                    })
                }
                if (this.query.zhuangt != '') {
                    this.tableData = this.tableData.filter(item => {
                        if (this.query.zhuangt == item.zhuangt) {
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
            this.query.zhibjb = (typeof this.searchForm.zhibjb !== 'undefined' && this.searchForm.zhibjb != '') ? this.searchForm.zhibjb : '';
            this.query.zhiblb = (typeof this.searchForm.zhiblb !== 'undefined' && this.searchForm.zhiblb != '') ? this.searchForm.zhiblb : '';
            this.query.zhuangt = (typeof this.searchForm.zhuangt !== 'undefined' && this.searchForm.zhuangt != '') ? this.searchForm.zhuangt : '';
            this.$set(this.query, 'pageIndex', 1);
            this.getData();
        },
        // 多选操作
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        // 查看处理
        chakcl(index, row) {
           console.log('index',index)
           console.log('row',row)
           this.detailVisible = true;
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
/*下拉框选择树*/
.objectTree {
    margin-left:0px;
    position: absolute;
    overflow-x: auto;
    overflow-y: scroll;
    height: 200px;
    border: 1px solid #ddd;
    line-height: normal; 
    z-index: 204;
    background-color: #fff;
}

.treeShow {
    display: none;
}

.objectTree2 {
    margin-left:0px;
    position: absolute;
    line-height: normal; 
    z-index: 204;
    width: 450px;
}

.width-220{
    width: 220px;
}

.handle-box {
    margin-bottom: 20px;
}

.handle-select {
    width: 125px;
}

.handle-input {
    width: 220px;
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
