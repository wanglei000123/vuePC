<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-calendar"></i> 运行管理
                </el-breadcrumb-item>
                <el-breadcrumb-item>指标分析与服务</el-breadcrumb-item>
            </el-breadcrumb>
        </div>

        <div class="container">
            <div class="handle-box">
                <template>
                    <el-form :inline="true" :v-model="searchForm" class="demo-form-inline" size="mini" >
                        <el-row>
                            <el-col :span='24'>
                                <el-form-item label="管理单位：">
                                    <el-select v-model="searchForm.guanldw" :clearable="true" placeholder="管理单位" class="handle-select mr10" >
                                        <el-option key="1" label="--请选择--" value=""></el-option>
                                        <el-option key="2" label="江苏省交通运输厅" value="江苏省交通运输厅"></el-option>
                                        <el-option key="3" label="南京市交通运输局" value="南京市交通运输局"></el-option>
                                        <el-option key="4" label="无锡市交通运输局" value="无锡市交通运输局"></el-option>
                                        <el-option key="5" label="徐州市交通运输局" value="徐州市交通运输局"></el-option>
                                        <el-option key="6" label="常州市交通运输局" value="常州市交通运输局"></el-option>
                                        <el-option key="7" label="苏州市交通运输局" value="苏州市交通运输局"></el-option>
                                        <el-option key="8" label="南通市交通运输局" value="南通市交通运输局"></el-option>
                                        <el-option key="9" label="盐城市交通运输局" value="盐城市交通运输局"></el-option>
                                        <el-option key="10" label="淮安市交通运输局" value="淮安市交通运输局"></el-option>
                                        <el-option key="11" label="连云港市交通运输局" value="连云港市交通运输局"></el-option>
                                        <el-option key="12" label="扬州市交通运输局" value="扬州市交通运输局"></el-option>
                                        <el-option key="13" label="镇江市交通运输局" value="镇江市交通运输局"></el-option>
                                        <el-option key="14" label="泰州市交通运输局" value="县泰州市交通运输局级"></el-option>
                                        <el-option key="15" label="宿迁市交通运输局" value="宿迁市交通运输局"></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="指标类别：">
                                    <el-select v-model="searchForm.zhiblb" :clearable="true" placeholder="指标类别" 
                                        class="handle-select mr10" @change="selectTrigger(searchForm.zhiblb)">
                                        <el-option key="2" label="政务服务事项规范程度" value="政务服务事项规范程度"></el-option>
                                        <el-option key="3" label="政务服务事项流程优化程度" value="政务服务事项流程优化程度"></el-option>
                                        <el-option key="4" label="线上线下服务融合程度" value="线上线下服务融合程度"></el-option>
                                        <el-option key="5" label="移动政务服务推广程度" value="移动政务服务推广程度"></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-button type="primary" icon="el-icon-search" @click="handleSearch">统计</el-button>
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
                <el-table-column prop="guanldw" label="管理单位" min-width="15%" align="center"></el-table-column>
                <el-table-column v-if="guifcd" prop="bumjzqk" label="部门进驻情况" min-width="10%" align="center"></el-table-column>
                <el-table-column v-if="guifcd" prop="shixhjqk" label="事项汇聚情况" min-width="10%" align="center"></el-table-column>
                <el-table-column v-if="guifcd" prop="yaosslqk" label="要素数量情况" min-width=10%" align="center"></el-table-column>
                <el-table-column v-if="guifcd" prop="shixfh" label="事项符合" min-width="10%" align="center" ></el-table-column>
                <el-table-column v-if="guifcd" prop="shixbjfsl" label="事项办件发生率" min-width="10%" align="center" ></el-table-column>
                <el-table-column v-if="guifcd" prop="shixpjbjl" label="事项平均办件量" min-width="10%" align="center" ></el-table-column>
                <el-table-column v-if="guifcd" prop="shixzrrbjqk" label="事项自然人办件情况" min-width="10%" align="center" ></el-table-column>
                <el-table-column v-if="guifcd" prop="shixfrbjqk" label="事项法人办件情况" min-width="10%" align="center" ></el-table-column>

                <el-table-column v-if="liucyh" prop="shixblsxysd" label="事项办理时限压缩度" min-width="10%" align="center" ></el-table-column>
                <el-table-column v-if="liucyh" prop="jibsxqk" label="即办件事项情况" min-width="10%" align="center" ></el-table-column>
                <el-table-column v-if="liucyh" prop="bujmblqk" label="不见面办理情况" min-width="10%" align="center" ></el-table-column>
                <el-table-column v-if="liucyh" prop="zuidpycblqk" label="最多跑一次办理情况" min-width="10%" align="center" ></el-table-column>
                <el-table-column v-if="liucyh" prop="shixwskbl" label="事项网上可办率" min-width="10%" align="center" ></el-table-column>
                <el-table-column v-if="liucyh" prop="wangbsp" label="网办水平" min-width="10%" align="center" ></el-table-column>
                <el-table-column v-if="liucyh" prop="wangbfsl" label="网办发生率" min-width="10%" align="center" ></el-table-column>
                <el-table-column v-if="liucyh" prop="kuaidsxfgl" label="快递事项覆盖率" min-width="10%" align="center" ></el-table-column>
                
                <el-table-column v-if="fuwrh" prop="qijdjsqk" label="旗舰店建设情况" min-width="20%" align="center" ></el-table-column>
                <el-table-column v-if="fuwrh" prop="chaxlyyhjqk" label="查询类应用汇聚情况" min-width="30%" align="center" ></el-table-column>
                <el-table-column v-if="fuwrh" prop="banllyyhjqk" label="办理类应用汇聚情况" min-width="30%" align="center" ></el-table-column>
                
                <el-table-column v-if="fuwtg" prop="yiddjsqk" label="移动端建设情况" min-width="15%" align="center" ></el-table-column>
                <el-table-column v-if="fuwtg" prop="yingyjrqk" label="应用接入情况" min-width="15%" align="center" ></el-table-column>
                <el-table-column v-if="fuwtg" prop="chaxlyyjrqk" label="查询类应用接入情况" min-width="20%" align="center" ></el-table-column>
                <el-table-column v-if="fuwtg" prop="wangsblqk" label="网上办理情况" min-width="15%" align="center" ></el-table-column>
                <el-table-column v-if="fuwtg" prop="yingymyd" label="应用满意度" min-width="15%" align="center" ></el-table-column>
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
import { fetchData } from './Zbfxyfw';
export default {
    name: 'basetable',
    data() {
        return {
            labelWidth:"100px",
            data: [],
            searchForm:{guanldw: '',zhiblb: '政务服务事项规范程度'},
            watch: {
            },
            query: {
                guanldw: '',zhibjb: '',
                pageIndex: 1,
                pageSize: 10
            },
            tableData: [],
            multipleSelection: [],
            pageTotal: 0,
            
            guifcd: true,
            liucyh: false,
            fuwrh: false,
            fuwtg: false,
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
                if (this.query.guanldw != '') {
                    this.tableData = this.tableData.filter(item => {
                        if (this.query.guanldw == item.guanldw) {
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
        // 指标类别下拉框选择触发事件
        selectTrigger(zhiblb) {
            if (zhiblb == "政务服务事项规范程度") {
                this.guifcd = true;
                this.liucyh = false;
                this.fuwrh = false;
                this.fuwtg = false;
            } else if(zhiblb == "政务服务事项流程优化程度") {
                this.guifcd = false;
                this.liucyh = true;
                this.fuwrh = false;
                this.fuwtg = false;
            } else if(zhiblb == "线上线下服务融合程度") {
                this.guifcd = false;
                this.liucyh = false;
                this.fuwrh = true;
                this.fuwtg = false;
            } else if(zhiblb == "移动政务服务推广程度") {
                this.guifcd = false;
                this.liucyh = false;
                this.fuwrh = false;
                this.fuwtg = true;
            }
        },
        // 触发搜索按钮
        handleSearch() {
            this.query.zhiblb = (typeof this.searchForm.zhiblb !== 'undefined' && this.searchForm.zhiblb != '') ? this.searchForm.zhiblb : '';
            this.query.guanldw = (typeof this.searchForm.guanldw !== 'undefined' && this.searchForm.guanldw != '') ? this.searchForm.guanldw : '';
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
