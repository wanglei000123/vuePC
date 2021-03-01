<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-calendar"></i> 运行管理
                </el-breadcrumb-item>
                <el-breadcrumb-item>EMS查询</el-breadcrumb-item>
            </el-breadcrumb>
        </div>

        <div class="container">
            <div class="handle-box">
                <template>
                    <el-form :inline="true" :v-model="form" class="demo-form-inline" size="mini" >
                        <el-row>
                            <el-col :span='24'>
                                <el-form-item label="申办人：">
                                    <el-input v-model.trim="form.shenbr" placeholder="申办人" class="handle-input mr10"></el-input>
                                </el-form-item>
                                <el-form-item label="案号：">
                                    <el-input v-model.trim="form.anh" placeholder="案号" class="handle-input mr10"></el-input>
                                </el-form-item>
                                <el-form-item label="事项：">
                                    <el-input v-model.trim="form.shixmc" placeholder="事项" class="handle-input mr10"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span='24'>
                                <el-form-item label="寄件状态：">
                                    <el-select v-model="form.jijzt" :clearable="true" placeholder="寄件状态" class="handle-select mr10">
                                        <el-option key="1" label="--请选择--" value=""></el-option>
                                        <el-option key="2" label="已寄件" value="已寄件"></el-option>
                                        <el-option key="3" label="未寄件" value="未寄件"></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="签收状态：">
                                    <el-select v-model="form.qianszt" :clearable="true" placeholder="签收状态" class="handle-select mr10">
                                        <el-option key="1" label="--请选择--" value=""></el-option>
                                        <el-option key="2" label="已签收" value="已签收"></el-option>
                                        <el-option key="3" label="未签收" value="未签收"></el-option>
                                    </el-select>
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
                <el-table-column prop="shixmc" label="事项" min-width="30%" align="center"></el-table-column>
                <el-table-column prop="shenbr" label="申办人" min-width="15%" align="center"></el-table-column>
                <el-table-column prop="jiessj" label="办结日期" min-width="15%" align="center" ></el-table-column>
                <el-table-column prop="jijzt" label="寄件状态" min-width="7.5%" align="center"></el-table-column>
                <el-table-column prop="qianszt" label="签收状态" min-width="7.5%" align="center" ></el-table-column>
                <!-- <el-table-column label="操作" width="150" align="center">
                    <template slot-scope="scope">
                        <el-button
                            type="text"
                            icon="el-icon-s-operation"
                            @click="chakcl(scope.$index, scope.row)"
                        >查看处理</el-button>
                    </template>
                </el-table-column> -->
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
import { fetchData } from './Yxwddb';
import YxwddbDetail from './Yxwddb_detail';
export default {
    name: 'basetable',
    data() {
        return {
            labelWidth:"100px",
            data: [],
            form:{},
            watch: {
            },
            query: {
                shenbr: '',
                anh: '',
                shixmc: '',
                jijzt: '',
                qianszt: '',
                pageIndex: 1,
                pageSize: 10
            },
            tableData: [],
            multipleSelection: [],
            pageTotal: 0,
            detailVisible: false,

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
                if (this.query.jijzt != '') {
                    this.tableData = this.tableData.filter(item => {
                        if (this.query.jijzt == item.jijzt) {
                            return true;
                        }
                    })
                }
                if (this.query.qianszt != '') {
                    this.tableData = this.tableData.filter(item => {
                        if (this.query.qianszt == item.qianszt) {
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
            this.query.jijzt = (typeof this.form.jijzt !== 'undefined' && this.form.jijzt != '') ? this.form.jijzt : '';
            this.query.qianszt = (typeof this.form.qianszt !== 'undefined' && this.form.qianszt != '') ? this.form.qianszt : '';
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
