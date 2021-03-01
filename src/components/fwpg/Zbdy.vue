<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-calendar"></i> 运行管理
                </el-breadcrumb-item>
                <el-breadcrumb-item>指标定义</el-breadcrumb-item>
            </el-breadcrumb>
        </div>

        <div class="container">
            <div class="handle-box">
                <template>
                    <el-form :inline="true" :v-model="searchForm" class="demo-form-inline" size="mini" >
                        <el-row>
                            <el-col :span='24'>
                                <el-form-item label="申办人：">
                                    <el-input v-model.trim="searchForm.shenbr" placeholder="申办人" class="handle-input mr10"></el-input>
                                </el-form-item>
                                <el-form-item label="案号：">
                                    <el-input v-model.trim="searchForm.anh" placeholder="案号" class="handle-input mr10"></el-input>
                                </el-form-item>
                                <el-form-item label="事项：">
                                    <el-input v-model.trim="searchForm.shixmc" placeholder="事项" class="handle-input mr10"></el-input>
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
            >
                <!-- <el-table-column type="selection" width="55" align="center"></el-table-column> -->
                <el-table-column prop="id" label="序号" width="55" align="center"></el-table-column>
                <el-table-column prop="anh" label="案号" width="150" align="center"></el-table-column>
                <el-table-column prop="shixmc" label="事项" width="350" align="center"></el-table-column>
                <el-table-column prop="shenbr" label="申办人" width="150" align="center"></el-table-column>
                <el-table-column prop="dangqrw" label="当前任务" width="100" align="center"></el-table-column>
                <el-table-column prop="jiessj" label="接收时间" width="100" align="center" ></el-table-column>
                <el-table-column label="操作" width="150" align="center">
                    <template slot-scope="scope">
                        <el-button
                            type="text"
                            icon="el-icon-s-operation"
                            @click="chakcl(scope.$index, scope.row)"
                        >查看处理</el-button>
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

        <!-- 编辑弹出框 -->
        <el-dialog title="案件信息" :visible.sync="detailVisible" width="60%">
            <el-divider content-position="left">基本信息</el-divider>
            <div class="container">
                <el-form ref="form" :model="form" label-width="70px">
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="案号：" prop="anh" :label-width="labelWidth">
                                <el-input v-model="form.anh" :disabled="true"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="办件名称：" prop="banjmc" :label-width="labelWidth">
                                <el-input v-model="form.banjmc" :disabled="true"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="权力事项编码：" prop="quanlsxbm" :label-width="labelWidth">
                                <el-input v-model="form.quanlsxbm" :disabled="true"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="权力事项名称名称：" prop="quanlsxmc" :label-width="labelWidth">
                                <el-input v-model="form.quanlsxmc" :disabled="true"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="申请类型：" prop="shenqlx" :label-width="labelWidth">
                                <el-input v-model="form.shenqlx" :disabled="true"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="许可事项地点：" prop="xuksxdd" :label-width="labelWidth">
                                <el-input v-model="form.xuksxdd" :disabled="true"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="申请人名称：" prop="shenqrxm" :label-width="labelWidth">
                                <el-input v-model="form.shenqrxm" :disabled="true"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="申请人电话：" prop="shenqrdh" :label-width="labelWidth">
                                <el-input v-model="form.shenqrdh" :disabled="true"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </div>

            <el-divider content-position="left">过程信息</el-divider>
            <el-table
                :data="tableProcessData"
                border
                class="table"
                ref="multipleTable"
                header-cell-class-name="table-header"
                @selection-change="handleSelectionChange"
            >
                <!-- <el-table-column type="selection" width="55" align="center"></el-table-column> -->
                <el-table-column prop="xuh" label="序号" width="55" align="center"></el-table-column>
                <el-table-column prop="buz" label="步骤" width="100" align="center"></el-table-column>
                <el-table-column prop="banlsj" label="办理时间" width="200" align="center"></el-table-column>
                <el-table-column prop="banlr" label="办理人" width="80" align="center"></el-table-column>
                <!-- <el-table-column prop="banlzt" label="办理状态" width="100" align="center"></el-table-column> -->
                <el-table-column prop="banlyj" label="办理意见" width="100" align="center" ></el-table-column>
                <el-table-column prop="wens" label="文书"
                    min-width="220">
                    <template slot-scope="scope">
                    <a :href="'http://'+scope.row.wens"
                        target="_blank"
                        class="buttonText">{{scope.row.wens}}</a>
                    </template>
                </el-table-column>
            </el-table>

            <el-divider content-position="left">结果信息</el-divider>
            <div class="container">
                <el-form ref="form" :model="form" label-width="70px">
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="许可决定：" prop="xukjd" :label-width="labelWidth">
                                <el-input v-model="form.xukjd" :disabled="true"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="办理时间：" prop="banlsj" :label-width="labelWidth">
                                <el-input v-model="form.banlsj" :disabled="true"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="许可开始日期：" prop="xukksrq" :label-width="labelWidth">
                                <el-input v-model="form.xukksrq" :disabled="true"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="许可结束日期：" prop="xukjsrq" :label-width="labelWidth">
                                <el-input v-model="form.xukjsrq" :disabled="true"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </div>

            <span slot="footer" class="dialog-footer">
                <el-button @click="detailVisible = false">取 消</el-button>
                <el-button type="primary" @click="detailVisible = false">确 定</el-button>
            </span>
        </el-dialog>
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
            searchForm:{anh: '',},
            watch: {
            },
            query: {
                shenbr: '',
                anh: '',
                shixmc: '',
                pageIndex: 1,
                pageSize: 10
            },
            tableData: [],
            multipleSelection: [],
            pageTotal: 0,
            detailVisible: false,

            form: {
                anh: "苏高许字[2020]00129号",
                banjmc: "沪宁高速公路 2020 年度沥青路面大中修养护工程苏州段罩面半幅封闭",
                quanlsxbm: "JS00000JT-MT-00024",
                quanlsxmc: "国际道路运输经营许可",
                shenqlx: "一般申请",
                xuksxdd: "南京市",
                shenqrxm: "南京燃气有限公司",
                shenqrdh: "13387562865",
                xukjd: "准予",
                banlsj: "2020-04-13 11:35",
                xukksrq: "2020-04-14",
                xukksrq: "2020-04-16",
            },
            tableProcessData:  [{
                xuh: '1',buz: '许可登记',banlsj: '2020-04-13 10:06:33',banlr:'诸铭',
                banlzt:'同意通过',banlyj:'无',wens:'交通行政许可申请材料清单'
            }, {
                xuh: '2',buz: '形式审查',banlsj: '2020-04-13 10:15:14',banlr:'诸铭',
                banlzt:'同意通过',banlyj:'同意',wens:'交通行政许可受理通知书'
            }, {
                xuh: '3',buz: '实质审查',banlsj: '2020-04-13 10:16:46',banlr:'诸铭',
                banlzt:'同意通过',banlyj:'同意',wens:''
            }, {
                xuh: '4',buz: '核查',banlsj: '2020-04-13 10:21:11',banlr:'诸铭',
                banlzt:'同意通过',banlyj:'同意',wens:'交通行政许可事项审查意见书'
            }, {
                xuh: '5',buz: '实质审查',banlsj: '2020-04-13 10:23:21',banlr:'诸铭',
                banlzt:'同意通过',banlyj:'同意',wens:'交通行政许可审查意见书'
            }, {
                xuh: '6',buz: '审核',banlsj: '2020-04-13 10:24:15',banlr:'诸铭',
                banlzt:'同意通过',banlyj:'同意',wens:''
            }, {
                xuh: '7',buz: '审批',banlsj: '2020-04-13 10:25:07',banlr:'诸铭',
                banlzt:'同意通过',banlyj:'同意',wens:''
            }, {
                xuh: '8',buz: '文书核查',banlsj: '2020-04-13 10:28:42',banlr:'诸铭',
                banlzt:'同意通过',banlyj:'无',wens:'交通行政许可准予决定书'
            }, {
                xuh: '9',buz: '送达批复',banlsj: '2020-04-13 10:30:15',banlr:'诸铭',
                banlzt:'同意通过',banlyj:'无',wens:''
            }, {
                xuh: '10',buz: '结案归档',banlsj: '2020-04-13 10:35:15',banlr:'诸铭',
                banlzt:'同意通过',banlyj:'无',wens:''
            }]
            
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
                if (this.query.anh != '') {
                    this.tableData = this.tableData.filter(item => {
                        if (this.query.anh == item.anh) {
                            return true;
                        }
                    })
                } 
                if (this.query.shixmc != '') {
                    this.tableData = this.tableData.filter(item => {
                        if (this.query.shixmc == item.shixmc) {
                            return true;
                        }
                    })
                }
                if (this.query.shenbr != '') {
                    this.tableData = this.tableData.filter(item => {
                        if (this.query.shenbr == item.shenbr) {
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
            this.query.shenbr = (typeof this.form.shenbr !== 'undefined' && this.form.shenbr != '') ? this.form.shenbr : '';
            this.query.anh = (typeof this.form.anh !== 'undefined' && this.form.anh != '') ? this.form.anh : '';
            this.query.shixmc = (typeof this.form.shixmc !== 'undefined' && this.form.shixmc != '') ? this.form.shixmc : '';
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
