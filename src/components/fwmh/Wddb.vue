<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-calendar"></i> 服务门户
                </el-breadcrumb-item>
                <el-breadcrumb-item>我的待办</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <el-row :gutter="20">
            <el-col :span="24">
                <!--待办-->
                <el-row :gutter="20" class="mgb20">
                    <el-col :span="24">
                        <el-card shadow="hover" style="height:500px;">
                            <div slot="header" class="clearfix">
                                <i style="color:#F5A623;" class="el-icon-lx-edit"></i> <span>我的待办</span>
                            </div>
                            <el-tabs v-model="message">
                                <el-tab-pane :label="`待办(${unread.length})`" name="first">
                                    <el-table :data="unread" stripe style="width: 100%">
                                        <el-table-column prop="id" label="序号" align="center" width="50"></el-table-column>
                                        <el-table-column prop="banjh" label="办件号" align="center" width="150"></el-table-column>
                                        <el-table-column prop="shix" label="事项" align="center"></el-table-column>
                                        <el-table-column prop="shenqr" label="申请人" align="center" width="190"></el-table-column>
                                        <el-table-column prop="dangqhj" label="当前环节" align="center" width="80"></el-table-column>
                                        <el-table-column prop="banlsj" label="办理时间" align="center" width="150"></el-table-column>
                                        <el-table-column prop="banlsc" label="办理时长" align="center" width="160"></el-table-column>
                                        <el-table-column label="操作" align="center" width="110">
                                            <template slot-scope="scope">
                                                <el-button size="small" type="primary" @click="handleDetail(scope.row)">详情</el-button>
                                            </template>
                                        </el-table-column>
                                    </el-table>
                                </el-tab-pane>
                                <el-tab-pane :label="`已办(${read.length})`" name="second">
                                    <template v-if="message === 'second'">
                                        <el-table :data="read" stripe style="width: 100%">
                                            <el-table-column prop="id" label="序号" align="center" width="50"></el-table-column>
                                            <el-table-column prop="banjh" label="办件号" align="center" width="150"></el-table-column>
                                            <el-table-column prop="shix" label="事项" align="center"></el-table-column>
                                            <el-table-column prop="shenqr" label="申请人" align="center" width="190"></el-table-column>
                                            <el-table-column prop="dangqhj" label="当前环节" align="center" width="80"></el-table-column>
                                            <el-table-column prop="banlsj" label="办理时间" align="center" width="150"></el-table-column>
                                            <el-table-column prop="banlsc" label="办理时长" align="center" width="160"></el-table-column>
                                            <el-table-column label="操作" align="center" width="110">
                                                <template slot-scope="scope">
                                                    <el-button size="small" type="primary" @click="handleDetail(scope.row)">详情</el-button>
                                                </template>
                                            </el-table-column>
                                        </el-table>
                                    </template>
                                </el-tab-pane>
                                <el-tab-pane :label="`待阅(${recycle.length})`" name="third">
                                    <template v-if="message === 'third'">
                                        <el-table :data="recycle" stripe style="width: 100%">
                                            <el-table-column prop="id" label="序号" align="center" width="50"></el-table-column>
                                            <el-table-column prop="banjh" label="办件号" align="center" width="150"></el-table-column>
                                            <el-table-column prop="shix" label="事项" align="center"></el-table-column>
                                            <el-table-column prop="shenqr" label="申请人" align="center" width="190"></el-table-column>
                                            <el-table-column prop="dangqhj" label="当前环节" align="center" width="80"></el-table-column>
                                            <el-table-column prop="banlsj" label="办理时间" align="center" width="150"></el-table-column>
                                            <el-table-column prop="banlsc" label="办理时长" align="center" width="160"></el-table-column>
                                            <el-table-column label="操作" align="center" width="110">
                                                <template slot-scope="scope">
                                                    <el-button size="small" type="primary" @click="handleDetail(scope.row)">详情</el-button>
                                                </template>
                                            </el-table-column>
                                        </el-table>
                                    </template>
                                </el-tab-pane>
                            </el-tabs>
                        </el-card>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import bus from '../common/bus';
export default {
    name: 'wddb',
    data() {
        return {
            message: 'first',
            unread: [{
                id: '1',
                banjh: '苏高许字[2020]00135号',
                shix: '206国道徐州改线段建设工程上跨连霍高速公路大桥涉及连霍高速公路桩号K201+657',
                shenqr: '徐州中建交通建设有限公司',
                dangqhj: '许可登记',
                banlsj: '2020-04-13 14:34:20',
                banlsc: ''
            },{
                id: '2',
                banjh: '苏高许字[2020]00134号',
                shix: '沪陕高速公路沿线（京沪2016-00136号）设置广告设施许可申请',
                shenqr: '江苏交通文化传媒有限公司',
                dangqhj: '送达批复',
                banlsj: '2020-03-17 16:23:45',
                banlsc: '0天 + 0小时 + 55.5分钟'
            },{
                id: '3',
                banjh: '苏高许字[2020]00133号',
                shix: '泰州110kV观五至宣堡、盛泰至宣堡线路工程下穿G2京沪高速公路行政许可',
                shenqr: '江苏长天智远交通科技有限公司',
                dangqhj: '文书复核',
                banlsj: '2020-03-17 15:28:17',
                banlsc: '11天 + 22小时 + 46.6分钟'
            },{
                id: '4',
                banjh: '苏高许字[2020]00132号',
                shix: '跨越常台高速公路常熟古里段修建桥梁、路基拼宽涉路行政许可',
                shenqr: '常熟市交通运输局',
                dangqhj: '审核',
                banlsj: '2020-03-05 16:41:41',
                banlsc: '0天 + 0小时 + 7.7分钟'
            }],
            read: [{
                id: '1',
                banjh: '苏高许字[2020]00131号',
                shix: '沪宁高速公路 2020 年度沥青路面大中修养护工程苏州段罩面半幅封闭',
                shenqr: '江苏宁沪高速公路股份有限公司',
                dangqhj: '审核',
                banlsj: '2020-04-13 14:34:20',
                banlsc: '0天 + 0小时 + 5.3分钟'
            },{
                id: '2',
                banjh: '苏高许字[2020]00130号',
                shix: '管滩~管镇π入淮河变电站110千伏线路定向钻穿越新扬高速（S49）',
                shenqr: '国网江苏省电力公司盱眙县供电公司',
                dangqhj: '审核',
                banlsj: '2020-03-05 16:41:41',
                banlsc: '0天 + 0小时 + 7.7分钟'
            }],
            recycle: [{
                id: '1',
                banjh: '苏高许字[2020]00136号',
                shix: '江苏南沿江城际铁路南京南至常州段NYJZQ-4标常州特大桥上跨金坛东互通',
                shenqr: '江苏南沿江城际铁路有限公司',
                dangqhj: '许可登记',
                banlsj: '2020-04-13 15:34:20',
                banlsc: ''
            }]
        };
    },
    methods: {
        handleDetail(row) {
          
        }
    }
};
</script>


<style scoped>
.title {
    font-size: 21px;
    font-weight: bold;
}
.el-row {
    margin-bottom: 20px;
}

.grid-content {
    display: flex;
    align-items: center;
    height: 150px;
}

.grid-content-chart {
    display: flex;
    align-items: center;
    height: 70px;
}

.grid-cont-right {
    flex: 1;
    text-align: center;
    font-size: 17px;
    color: #999;
}

.grid-num {
    font-size: 26px;
    font-weight: bold;
}

.grid-con-icon {
    font-size: 50px;
    width: 100px;
    height: 100px;
    text-align: center;
    line-height: 100px;
    color: #fff;
}

.grid-con-1 .grid-con-icon {
    background: rgb(45, 140, 240);
}

.grid-con-1 .grid-num {
    color:  rgb(45, 140, 240);
}

.grid-con-2 .grid-con-icon {
    background: rgb(100, 213, 114);
}

.grid-con-2 .grid-num {
    color: rgb(100, 213, 114);
}

.grid-con-3 .grid-con-icon {
    background: rgb(242, 94, 67);
}

.grid-con-3 .grid-num {
    color: rgb(242, 94, 67);
}

.user-info {
    display: flex;
    align-items: center;
    padding-bottom: 20px;
    border-bottom: 2px solid #ccc;
    margin-bottom: 20px;
}

.user-avator {
    width: 120px;
    height: 120px;
    border-radius: 50%;
}

.user-info-cont {
    padding-left: 50px;
    flex: 1;
    font-size: 14px;
    color: #999;
}

.user-info-cont div:first-child {
    font-size: 30px;
    color: #222;
}

.user-info-list {
    font-size: 14px;
    color: #999;
    line-height: 25px;
}

.user-info-list span {
    margin-left: 70px;
}

.mgb20 {
    margin-bottom: 20px;
}

.todo-item {
    font-size: 14px;
}

.todo-item-del {
    text-decoration: line-through;
    color: #999;
}

.schart {
    width: 100%;
    height: 160px;
}
</style>
