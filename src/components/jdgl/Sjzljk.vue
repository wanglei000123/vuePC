<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-calendar"></i> 监督管理
                </el-breadcrumb-item>
                <el-breadcrumb-item>数据质量监控</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <!-- 树形下拉框  -->
                <template>
                    <el-form :inline="true" :v-model="form" class="demo-form-inline" size="mini" >
                        <el-row>
                            <el-col :span='24'>
                                <el-form-item label="事项名称">
                                    <el-input v-model="form.shixmc" placeholder="事项名称" class="handle-input mr10"></el-input>
                                </el-form-item>
                                <el-form-item label="告警等级">
                                    <el-select v-model="form.gaojdj" :clearable="true" placeholder="告警等级" class="handle-select mr10">
                                        <el-option key="1" label="预警" value="预警"></el-option>
                                        <el-option key="2" label="提醒" value="提醒"></el-option>
                                        <el-option key="3" label="报警" value="报警"></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="办件号">
                                    <el-input v-model="form.banjh" placeholder="办件号" class="handle-input mr10"></el-input>
                                </el-form-item>
                                
                                <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
                                <el-button type="primary" icon="el-icon-s-order" @click="handleDingzgz">定制规则</el-button>
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
            >
                <el-table-column prop="id" label="序号" width="55" align="center"></el-table-column>
                <el-table-column prop="gaojdj" label="告警等级" width="80" align="center">
                    <template slot-scope="scope">
                        <el-tag
                        :type="getColor(scope.row)"
                        disable-transitions>{{scope.row.gaojdj}}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="banjh" label="办件号" width="190" align="center"></el-table-column>
                <el-table-column prop="banldw" label="办理单位" align="center"></el-table-column>
                <el-table-column prop="shixmc" label="事项名称" align="center" ></el-table-column>
                <el-table-column prop="yicmc" label="异常名称" width="100" align="center"></el-table-column>
                <el-table-column prop="gaojsj" label="告警时间" width="140" align="center" ></el-table-column>
                <el-table-column prop="fanksj" label="反馈时间" width="140" align="center" ></el-table-column>
                <el-table-column label="追溯反馈" width="120" align="center">
                    <template slot-scope="scope">
                        <el-button style="margin-left: 10px;"
                            type="text"
                            icon="el-icon-edit-outline"
                            @click="handleFank(scope.$index, scope.row)"
                        >问题反馈</el-button>
                        <el-button
                            type="text"
                            icon="el-icon-edit-outline"
                            @click="handleWentpg(scope.$index, scope.row)"
                        >问题评估</el-button>
                        <el-button
                            type="text"
                            icon="el-icon-edit-outline"
                            @click="handleChulbg(scope.$index, scope.row)"
                        >处理报告</el-button>
                        <el-button
                            type="text"
                            icon="el-icon-edit-outline"
                            @click="handleGongzpg(scope.$index, scope.row)"
                        >工作评估</el-button>
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
import { fetchData } from '../jdgl/Sjzljk';
export default {
    name: 'basetable',
    data() {
        return {
            form: {},
            query: {
                shixmc: '',
                gaojdj: '',
                banjh: '',
                pageIndex: 1,
                pageSize: 10
            },
            tableData: [],
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
                if (this.query.shixmc != '') {
                    this.tableData = this.tableData.filter(item => {
                        if (item.shixmc.indexOf(this.query.shixmc) != -1) {
                            return true;
                        }
                    })
                } 
                if (this.query.gaojdj != '') {
                    this.tableData = this.tableData.filter(item => {
                        if (this.query.gaojdj == item.gaojdj) {
                            return true;
                        }
                    })
                } 
              
                if (this.query.banjh != '') {
                    this.tableData = this.tableData.filter(item => {
                        if (item.banjh.indexOf(this.query.banjh) != -1) {
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
        // 告警等级颜色
        getColor(row) {
          if (row.gaojdj == '报警') {
              return 'danger';
          } else if (row.gaojdj == '预警') {
              return 'warning';
          } else {
            return '';
          }
        },
        // 触发搜索按钮
        handleSearch() {
            this.query.shixmc = (typeof this.form.shixmc !== 'undefined' && this.form.shixmc != '' && this.form.shixmc != null) ? this.form.shixmc : '';
            this.query.gaojdj = (typeof this.form.gaojdj !== 'undefined' && this.form.gaojdj != '' && this.form.gaojdj != null) ? this.form.gaojdj : '';
            this.query.banjh = (typeof this.form.banjh !== 'undefined' && this.form.banjh != '' && this.form.banjh != null) ? this.form.banjh : '';
            this.$set(this.query, 'pageIndex', 1);
            this.getData();
        },
        // 定制规则
        handleDingzgz(){

        },
        // 反馈操作
        handleFank(index, row) {
          
        },
        // 问题评估操作
        handleWentpg(index, row) {
          
        },
        // 处理报告
        handleChulbg(index, row) {
          
        },
        // 工作评估
        handleGongzpg(index, row) {
          
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
.table {
    width: 100%;
    font-size: 14px;
}

.table-td-thumb {
    display: block;
    margin: auto;
    width: 40px;
    height: 40px;
}
</style>
