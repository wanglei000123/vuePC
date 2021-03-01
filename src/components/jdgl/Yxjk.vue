<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-calendar"></i> 监督管理
                </el-breadcrumb-item>
                <el-breadcrumb-item>运行监控</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <!-- 树形下拉框  -->
                <template>
                    <el-form :inline="true" :v-model="searchForm" class="demo-form-inline" size="mini" >
                        <el-row>
                            <el-col :span='24'>
                                <el-form-item ref="treeParent" label="办理单位" >
                                    <el-input
                                        placeholder="请选择办理单位"
                                        class="width-200 selectTree-input mr10"
                                        auto-complete="off"
                                        v-model="searchForm.banldw"
                                        @click.native="changeSelectTree($event)">
                                    </el-input>
                                    <div ref="orgtree" class="width-200 selectTree-input objectTree" style="display:none;">
                                        <el-tree v-show="isShowSelect"
                                            empty-text="暂无数据"
                                            :highlight-current = true
                                            :default-expand-all = false
                                            :expand-on-click-node="true"
                                            :data="data"
                                            :filter-node-method="filterNode"
                                            @node-click="selectClassfy"
                                            class="objectTree2"
                                            ref="selectTree">
                                        </el-tree>
                                    </div>
                                </el-form-item>
                                <el-form-item label="申请日期">
                                    <el-col :span="11">
                                        <el-date-picker
                                            type="date"
                                            placeholder="开始日期"
                                            v-model="searchForm.date1"
                                            value-format="yyyy-MM-dd"
                                            style="width: 100%;"
                                        ></el-date-picker>
                                    </el-col>
                                    <el-col class="line" :span="2" style="padding-left:13px;">-</el-col>
                                    <el-col :span="11">
                                        <el-date-picker
                                            type="date"
                                            placeholder="结束日期"
                                            v-model="searchForm.date2"
                                            value-format="yyyy-MM-dd"
                                            style="width: 100%;"
                                        ></el-date-picker>
                                    </el-col>
                                </el-form-item>
                                <el-form-item label="事项名称">
                                    <el-input v-model="searchForm.shixmc" placeholder="事项名称" class="handle-input mr10"></el-input>
                                </el-form-item>
                                <el-form-item label="告警等级">
                                    <el-select v-model="searchForm.gaojdj" :clearable="true" placeholder="告警等级" class="handle-select mr10">
                                        <el-option key="1" label="预警" value="预警"></el-option>
                                        <el-option key="2" label="提醒" value="提醒"></el-option>
                                        <el-option key="3" label="报警" value="报警"></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="督办状态">
                                    <el-select v-model="searchForm.dubzt" :clearable="true" placeholder="督办状态" class="handle-select mr10">
                                        <el-option key="1" label="未督办" value="未督办"></el-option>
                                        <el-option key="2" label="督办中" value="督办中"></el-option>
                                        <el-option key="3" label="已反馈" value="已反馈"></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="办件号">
                                    <el-input v-model="searchForm.banjh" placeholder="办件号" class="handle-input mr10"></el-input>
                                </el-form-item>
                                <el-form-item label="当事人">
                                    <el-input v-model="searchForm.shenqr" placeholder="当事人" class="handle-input mr10"></el-input>
                                </el-form-item>
                                
                                <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
                                <el-button type="primary" @click="handleDub">督办</el-button>
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
                <el-table-column prop="gaojdj" label="告警等级" min-width="12%" align="center">
                    <template slot-scope="scope">
                        <el-tag
                        :type="getColor(scope.row)"
                        disable-transitions>{{scope.row.gaojdj}}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="banjh" label="办件号" min-width="10%" align="center"></el-table-column>
                <el-table-column prop="banldw" label="办理单位" min-width="10%" align="center"></el-table-column>
                <el-table-column prop="shenqr" label="申请人" min-width="10%" align="center"></el-table-column>
                <el-table-column prop="shixmc" label="事项名称" min-width="20%" align="center"></el-table-column>
                <el-table-column prop="shenqrq" label="申请日期" min-width="10%" align="center" ></el-table-column>
                <el-table-column prop="dubzt" label="督办状态" min-width="8%" align="center" ></el-table-column>
                <el-table-column label="操作" min-width="10%" align="center">
                    <template slot-scope="scope">
                        <el-button
                            type="text"
                            icon="el-icon-s-operation"
                            @click="chakcl(scope.$index, scope.row)"
                        >查看详情</el-button>
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
import { fetchData } from '../jdgl/Yxjk';
export default {
    name: 'basetable',
    data() {
        return {
            data: [{
                label: '江苏省高速公路管理局',
                children: [{
                    label: '江苏省宁沪高速公路路政支队',
                    children: [{
                        label: '江苏省宁沪高速公路路政支队第一大队',
                        children:[]
                    },{
                        label: '江苏省宁沪高速公路路政支队第二大队',
                        children:[]
                    },{
                        label: '江苏省宁沪高速公路路政支队第三大队',
                        children:[]
                    },{
                        label: '江苏省宁沪高速公路路政支队第四大队',
                        children:[]
                    }]
                },{
                    label: '江苏省宁交通运输综合行政执法监督局宁通支队',
                    children: [{
                        label: '江苏省宁交通运输综合行政执法监督局宁通支队第一大队',
                        children:[]
                    },{
                        label: '江苏省宁交通运输综合行政执法监督局宁通支队第二大队',
                        children:[]
                    },{
                        label: '江苏省宁交通运输综合行政执法监督局宁通支队第三大队',
                        children:[]
                    },{
                        label: '江苏省宁交通运输综合行政执法监督局宁通支队第四大队',
                        children:[]
                    },{
                        label: '江苏省宁交通运输综合行政执法监督局宁通支队机动大队',
                        children:[]
                    }]
                },{
                    label: '江苏省宁连高速公路路政支队',
                    children: [{
                        label: '江苏省高速公路交通运输执法总队宁连支队第一大队',
                        children:[]
                    },{
                        label: '江苏省高速公路交通运输执法总队宁连支队第二大队',
                        children:[]
                    },{
                        label: '江苏省高速公路交通运输执法总队宁连支队第三大队',
                        children:[]
                    },{
                        label: '江苏省宁交通运输综合行政执法监督局宁连支队第四大队',
                        children:[]
                    },{
                        label: '江苏省宁交通运输综合行政执法监督局宁连支队第五大队',
                        children:[]
                    }]
                },{
                    label: '江苏省交通运输综合行政执法监督盐锡支队',
                    children: [{
                        label: '江苏省盐锡高速公路路政支队第一大队',
                        children:[]
                    },{
                        label: '江苏省盐锡高速公路路政支队第二大队',
                        children:[]
                    },{
                        label: '江苏省盐锡高速公路路政支队第三大队',
                        children:[]
                    },{
                        label: '江苏省盐锡高速公路路政支队第四大队',
                        children:[]
                    },{
                        label: '江苏省盐锡高速公路路政支队第五大队',
                        children:[]
                    },{
                        label: '江苏省盐锡高速公路路政支队机动大队',
                        children:[]
                    }]
                },{
                    label: '江苏省京沪高速公路路政支队',
                    children: [{
                        label: '江苏省京沪高速公路路政支队第一大队',
                        children:[]
                    },{
                        label: '江苏省京沪高速公路路政支队第二大队',
                        children:[]
                    },{
                        label: '江苏省京沪高速公路路政支队第三大队',
                        children:[]
                    },{
                        label: '江苏省京沪高速公路路政支队第四大队',
                        children:[]
                    },{
                        label: '江苏省京沪高速公路路政支队机动大队',
                        children:[]
                    }]
                },{
                    label: '江苏省连徐高速公路路政支队',
                    children: [{
                        label: '江苏省连徐高速公路路政支队第一大队',
                        children:[]
                    },{
                        label: '江苏省连徐高速公路路政支队第二大队',
                        children:[]
                    },{
                        label: '江苏省连徐高速公路路政支队第三大队',
                        children:[]
                    },{
                        label: '江苏省连徐高速公路路政支队第五大队',
                        children:[]
                    }]
                },{
                    label: '江苏省徐盐高速公路路政支队',
                    children: [{
                        label: '江苏省徐盐高速公路路政支队第一大队',
                        children:[]
                    },{
                        label: '江苏省徐盐高速公路路政支队第二大队',
                        children:[]
                    },{
                        label: '江苏省徐盐高速公路路政支队第三大队',
                        children:[]
                    },{
                        label: '江苏省徐盐高速公路路政支队第四大队',
                        children:[]
                    },{
                        label: '江苏省徐盐高速公路路政支队第五大队',
                        children:[]
                    },{
                        label: '江苏省徐盐高速公路路政支队第六大队',
                        children:[]
                    }]
                },{
                    label: '江苏省宁杭高速公路路政支队',
                    children: [{
                        label: '江苏省交通运输综合行政执法监督局宁杭支队第一大队',
                        children:[]
                    },{
                        label: '江苏省交通运输综合行政执法监督局宁杭支队第二大队',
                        children:[]
                    },{
                        label: '江苏省交通运输综合行政执法监督局宁杭支队第三大队',
                        children:[]
                    },{
                        label: '江苏省交通运输综合行政执法监督局宁杭支队第四大队',
                        children:[]
                    }]
                },{
                    label: '江苏省沿江高速公路路政支队',
                    children: [{
                        label: '江苏省沿江高速公路路政支队第一大队',
                        children:[]
                    },{
                        label: '江苏省交通运输综合行政执法监督局沿江支队第二大队',
                        children:[]
                    },{
                        label: '江苏省沿江高速公路路政支队第三大队',
                        children:[]
                    },{
                        label: '江苏省沿江高速公路路政支队第四大队',
                        children:[]
                    },{
                        label: '江苏省沿江高速公路路政支队第机动大队',
                        children:[]
                    }]
                },{
                    label: '江苏省沿海高速公路路政支队',
                    children: [{
                        label: '江苏省沿海高速公路路政支队第一大队',
                        children:[]
                    },{
                        label: '江苏省沿海高速公路路政支队第二大队',
                        children:[]
                    },{
                        label: '江苏省沿海高速公路路政支队第三大队',
                        children:[]
                    },{
                        label: '江苏省沿海高速公路路政支队第四大队',
                        children:[]
                    }]
                },{
                    label: '江苏省高速公路交通运输执法总队南京支队',
                    children: [{
                        label: '江苏省交通运输综合行政执法监督局南京支队第一大队',
                        children:[]
                    },{
                        label: '江苏省高速公路交通运输执法总队南京支队第二大队',
                        children:[]
                    },{
                        label: '江苏省交通运输综合行政执法监督局南京支队第三大队',
                        children:[]
                    },{
                        label: '江苏省高速公路交通运输执法总队南京支队第四大队',
                        children:[]
                    },{
                        label: '江苏省高速公路交通运输执法总队南京支队第五大队',
                        children:[]
                    }]
                },{
                    label: '江苏省高速公路交通运输执法总队苏州支队',
                    children: [{
                        label: '江苏省高速公路交通运输执法总队苏州支队五大队',
                        children:[]
                    },{
                        label: '江苏省高速公路交通运输执法总队苏州支队一大队',
                        children:[]
                    },{
                        label: '江苏省高速公路交通运输执法总队苏州支队二大队',
                        children:[]
                    },{
                        label: '江苏省高速公路交通运输执法总队苏州支队三大队',
                        children:[]
                    },{
                        label: '江苏省高速公路交通运输执法总队苏州支队四大队',
                        children:[]
                    }]
                }]
            }],
            isShowSelect:false,
            searchForm:{banldw:''},
            watch: {
                searchForm: {
                    handler(searchForm){
                        if(this.isShowSelect){
                            this.$refs.selectTree.filter(searchForm.banldw);
                        }
                    },
                    deep: true,//深度监听，重要
                },
            },
            query: {
                banldw: '',
                date1: '',
                date2: '',
                shixmc: '',
                gaojdj: '',
                dubzt: '',
                banjh: '',
                shenqr: '',
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
    created() {
        this.getData();
    },
    methods: {
        selectClassfy(data) {
            this.searchForm.banldw=data.label;
            this.$refs.orgtree.style.display= 'none';
            this.isShowSelect=false;
        },
        changeSelectTree(e){
            if(this.isShowSelect){
                this.$refs.orgtree.style.display= 'none';
                this.isShowSelect = false;
            }else{
                this.$refs.orgtree.style.display= 'block';
                this.isShowSelect = true;
            }
            var that = this;
　　　　　　　//第一种方式:点击其他区域, 消失树
            document.onclick=function(){
                that.$refs.orgtree.style.display= 'none';
                that.isShowSelect = false;
　　　　　　 }
            e.stopPropagation();//阻止冒泡

　　　　　　//离开区域的时候树消失
            this.$refs.orgtree.$el.onmouseleave = function () {
                that.$refs.orgtree.style.display= 'none';
                that.isShowSelect = false;
            }

            this.$refs.treeParent.$el.onmouseleave = function () {
                that.$refs.orgtree.style.display= 'none';
                that.isShowSelect = false;
            }
        },
        // 选择器的树节点
        filterNode(value, data) {
            if (!value) return true;
            return data.label.indexOf(value) !== -1;
        },
        dateParse(dateString){  
            var SEPARATOR_BAR = "-";  
            var SEPARATOR_SLASH = "/";  
            var SEPARATOR_DOT = ".";  
            var dateArray;  
            if(dateString.indexOf(SEPARATOR_BAR) > -1){  
                dateArray = dateString.split(SEPARATOR_BAR);    
            }else if(dateString.indexOf(SEPARATOR_SLASH) > -1){  
                dateArray = dateString.split(SEPARATOR_SLASH);  
            }else{  
                dateArray = dateString.split(SEPARATOR_DOT);  
            }  
            return new Date(dateArray[0], dateArray[1]-1, dateArray[2]);   
        },
        // 获取 easy-mock 的模拟数据
        getData() {
            fetchData(this.query).then(res => {
                console.log(res);
                this.tableData = res.list;
                // 过滤条件
                if (this.query.banldw != '') {
                    this.tableData = this.tableData.filter(item => {
                        if (this.query.banldw == item.banldw) {
                            return true;
                        }
                    })
                }
                if (this.query.date1 != '' && this.query.date2 == '') {
                    this.tableData = this.tableData.filter(item => {
                        var dateTime = this.dateParse(item.shenqrq).getTime();
                        var compareDateTime = this.dateParse(this.query.date1).getTime();
                        if(dateTime >= compareDateTime){  
                            return true;  
                        }
                    })
                } else if (this.query.date2 != '' && this.query.date1 == '') {
                    this.tableData = this.tableData.filter(item => {
                        var dateTime = this.dateParse(item.shenqrq).getTime();
                        var compareDateTime = this.dateParse(this.query.date2).getTime();
                        if(dateTime <= compareDateTime){  
                            return true;  
                        }
                    })
                } else if (this.query.date2 != '' && this.query.date1 != '') {
                    this.tableData = this.tableData.filter(item => {
                        var dateTime = this.dateParse(item.shenqrq).getTime();
                        var compareDateTime1 = this.dateParse(this.query.date1).getTime();
                        var compareDateTime2 = this.dateParse(this.query.date2).getTime();
                        if(dateTime >= compareDateTime1 && dateTime <= compareDateTime2){  
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
                if (this.query.gaojdj != '') {
                    this.tableData = this.tableData.filter(item => {
                        if (this.query.gaojdj == item.gaojdj) {
                            return true;
                        }
                    })
                } 
                if (this.query.dubzt != '') {
                    this.tableData = this.tableData.filter(item => {
                        if (this.query.dubzt == item.dubzt) {
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
                if (this.query.shenqr != '') {
                    this.tableData = this.tableData.filter(item => {
                        if (item.shenqr.indexOf(this.query.shenqr) != -1) {
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
            this.query.banldw = (typeof this.searchForm.banldw !== 'undefined' && this.searchForm.banldw != '' && this.searchForm.banldw != null) ? this.searchForm.banldw : '';
            this.query.date1 = (typeof this.searchForm.date1 !== 'undefined' && this.searchForm.date1 != '' && this.searchForm.date1 != null) ? this.searchForm.date1 : '';
            this.query.date2 = (typeof this.searchForm.date2 !== 'undefined' && this.searchForm.date2 != '' && this.searchForm.date2 != null) ? this.searchForm.date2 : '';
            this.query.shixmc = (typeof this.searchForm.shixmc !== 'undefined' && this.searchForm.shixmc != '' && this.searchForm.shixmc != null) ? this.searchForm.shixmc : '';
            this.query.gaojdj = (typeof this.searchForm.gaojdj !== 'undefined' && this.searchForm.gaojdj != '' && this.searchForm.gaojdj != null) ? this.searchForm.gaojdj : '';
            this.query.dubzt = (typeof this.searchForm.dubzt !== 'undefined' && this.searchForm.dubzt != '' && this.searchForm.dubzt != null) ? this.searchForm.dubzt : '';
            this.query.banjh = (typeof this.searchForm.banjh !== 'undefined' && this.searchForm.banjh != '' && this.searchForm.banjh != null) ? this.searchForm.banjh : '';
            this.query.shenqr = (typeof this.searchForm.shenqr !== 'undefined' && this.searchForm.shenqr != '' && this.searchForm.shenqr != null) ? this.searchForm.shenqr : '';
            this.$set(this.query, 'pageIndex', 1);
            this.getData();
        },
        // 多选操作
        handleSelectionChange(val) {
            this.multipleSelection = val;
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
        // 督办操作
        handleDub(index, row) {
          
        },
        // 查看处理
        chakcl(index, row) {
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

.objectTree2 {
    margin-left:0px;
    position: absolute;
    line-height: normal; 
    z-index: 204;
    width: 450px;
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
