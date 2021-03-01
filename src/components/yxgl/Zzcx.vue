<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-calendar"></i> 运行管理
                </el-breadcrumb-item>
                <el-breadcrumb-item>证照查询</el-breadcrumb-item>
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
                <el-table-column prop="id" label="序号" min-width="5%" align="center"></el-table-column>
                <el-table-column prop="anh" label="案号" min-width="20%" align="center"></el-table-column>
                <el-table-column prop="shenbr" label="申办人" min-width="20%" align="center"></el-table-column>
                <el-table-column prop="hangylb" label="证照分类" min-width="10%" align="center"></el-table-column>
                <el-table-column prop="zhengzyxq" label="证照有效期" min-width="15%" align="center" ></el-table-column>
                <el-table-column prop="banldw" label="颁证单位" min-width="20%" align="center" ></el-table-column>
                <el-table-column label="操作" min-width="10%" align="center">
                    <template slot-scope="scope">
                        <el-button
                            type="text"
                            icon="el-icon-s-operation"
                            @click="chakcl(scope.$index, scope.row)"
                        >查看</el-button>
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
        <el-dialog title="证照信息" :visible.sync="detailVisible" width="60%">
            <el-upload
                action="https://jsonplaceholder.typicode.com/posts/"
                list-type="picture-card"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove"
                :file-list="fileLists">
                <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>

            <span slot="footer" class="dialog-footer">
                <el-button @click="detailVisible = false">取 消</el-button>
                <el-button type="primary" @click="detailVisible = false">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { fetchData } from './Yxwddb';
import YxwddbDetail from './Yxwddb_detail';
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
            fileLists: [{name: 'daolwh.jpg', url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1587545171510&di=bf2dea3c7d120add40569d15eff9fa46&imgtype=0&src=http%3A%2F%2Fwww.cycompass.com%2FEditor%2Fattached%2Fimage%2F20161021%2F20161021145742_5650.jpg'},
            {name: 'farzs.jpg', url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1587546046856&di=f33514fd1f5e4ecf97a4c0e202336bfc&imgtype=0&src=http%3A%2F%2Fgss0.baidu.com%2F9fo3dSag_xI4khGko9WTAnF6hhy%2Fzhidao%2Fwh%253D450%252C600%2Fsign%3D0abc7cc1c6fdfc03e52debbce10faba2%2Fb8389b504fc2d56247755ad2e21190ef76c66c94.jpg'}],
            dialogImageUrl: '',
            dialogVisible: false,
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
        YxwddbDetail
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
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            console.log('this.dialogImageUrl',this.dialogImageUrl)
            this.dialogVisible = true;
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
