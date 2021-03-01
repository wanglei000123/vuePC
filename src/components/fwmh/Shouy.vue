<template>
    <div>
        <el-row :gutter="20">
            <el-col :span="8">
                <el-card shadow="hover" class="mgb20" style="height:252px;">
                    <div class="user-info">
                        <img src="../../assets/img/img.jpg" class="user-avator" alt />
                        <div class="user-info-cont">
                            <div class="user-info-name">{{name}}</div>
                            <div>{{role}}</div>
                        </div>
                    </div>
                    <div class="user-info-list">
                        上次登录时间：
                        <span>2020-04-30</span>
                    </div>
                    <div class="user-info-list">
                        上次登录地点：
                        <span>南京</span>
                    </div>
                </el-card>
                <el-card shadow="hover" style="height:252px;">
                    <div slot="header" class="clearfix">
                        <i style="color:#F5A623;" class="el-icon-lx-notificationfill"></i> <span>  通知公告</span>
                    </div>
                    <template>
                        <el-table :show-header="false" :data="zixfbTableData" tooltip-effect="dark" style="width: 100%">
                            <el-table-column :show-overflow-tooltip="true">
                                <template slot-scope="scope">
                                    <div class="todo-item"><el-link type="info">{{scope.row.zixmc}}</el-link></div>
                                </template>
                            </el-table-column>
                        </el-table>
                    </template>
                </el-card>
            </el-col>
            <el-col :span="16">
                <el-row :gutter="20" class="mgb20">
                    <el-col :span="8">
                        <el-card shadow="hover" :body-style="{padding: '0px'}">
                            <div class="grid-content grid-con-1">
                                <i class="el-icon-lx-people grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <div class="grid-num">1234</div>
                                    <div>当日办件</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="8">
                        <el-card shadow="hover" :body-style="{padding: '0px'}">
                            <div class="grid-content grid-con-2">
                                <i class="el-icon-s-data grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <div class="grid-num">534308</div>
                                    <div>当月办件</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="8">
                        <el-card shadow="hover" :body-style="{padding: '0px'}">
                            <div class="grid-content grid-con-3">
                                <i class="el-icon-s-data grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <div class="grid-num">3435995</div>
                                    <div>当年累计办件</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                </el-row>
                <el-card shadow="hover" style="height:403px;">
                    <div slot="header" class="clearfix">
                        <i style="color:#F5A623;" class="el-icon-lx-edit"></i> <span>  我的待办</span>
                    </div>
                    <el-table :show-header="false" :data="todoList" style="width:100%;">
                        <el-table-column width="40">
                            <template slot-scope="scope">
                                <el-checkbox v-model="scope.row.status"></el-checkbox>
                            </template>
                        </el-table-column>
                        <el-table-column>
                            <template slot-scope="scope">
                                <div class="todo-item">{{scope.row.title}}</div>
                            </template>
                        </el-table-column>
                        <el-table-column width="60">
                            <template>
                                <span class="el-tag el-tag--green el-tag--mini" style="cursor: pointer;">
                                    详情
                                </span>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-card>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="8">
                <el-card shadow="hover">
                    <schart class="schart" canvasId="pie" :options="options"></schart>
                    <div class="grid-content-chart grid-con-3">
                        <div class="grid-cont-right">
                            <div class="grid-num grid-num-blue">3200</div>
                            <div class="grid-num-bottom">预警</div>
                        </div>
                        <div class="grid-cont-right">
                            <div class="grid-num grid-num-green">1200</div>
                            <div class="grid-num-bottom">告警</div>
                        </div>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="16">
                <el-card shadow="hover" style="height:330px;">
                    <div slot="header" class="clearfix">
                        <i style="color:#F5A623;" class="el-icon-lx-favorfill"></i> <span>  我的收藏</span>
                    </div>
                    <el-tabs v-model="shoucMessage">
                        <el-tab-pane :label="`常办业务(${changbywData.length})`" name="changbywTab">
                            <el-table :data="changbywData" tooltip-effect="dark" stripe style="width: 100%">
                                <el-table-column prop="id" label="序号" align="center" min-width="10%"></el-table-column>
                                <!-- <el-table-column prop="banjh" label="办件号" align="center" width="200"></el-table-column> -->
                                <el-table-column prop="shix" :show-overflow-tooltip="true" label="事项名称" align="center" min-width="60%"></el-table-column>
                                <!-- <el-table-column prop="banlr" label="办理人" align="center" width="60"></el-table-column>
                                <el-table-column prop="dangqhj" label="当前环节" align="center" width="70"></el-table-column> -->
                                <el-table-column label="操作" min-width="30%">
                                    <template>
                                        <span class="el-tag el-tag--green el-tag--mini" style="cursor: pointer;">
                                            详情
                                        </span>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </el-tab-pane>
                        <el-tab-pane :label="`未结办件(${weijbjData.length})`" name="weijbjTab">
                            <template v-if="shoucMessage === 'weijbjTab'">
                                <el-table :data="weijbjData" tooltip-effect="dark" stripe style="width: 100%">
                                        <el-table-column prop="id" label="序号" align="center" width="60"></el-table-column>
                                    <el-table-column prop="banjh" label="办件号" align="center" width="200"></el-table-column>
                                    <el-table-column prop="shix" :show-overflow-tooltip="true" label="事项名称" align="center"  width="250"></el-table-column>
                                    <el-table-column prop="banlr" label="办理人" align="center" width="60"></el-table-column>
                                    <el-table-column prop="dangqhj" label="当前环节" align="center" width="70"></el-table-column>
                                    <el-table-column label="操作" align="center" width="60">
                                        <template>
                                            <span class="el-tag el-tag--green el-tag--mini" style="cursor: pointer;">
                                                详情
                                            </span>
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </template>
                        </el-tab-pane>
                    </el-tabs>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import Schart from 'vue-schart';
import bus from '../common/bus';
export default {
    name: 'dashboard',
    data() {
        return {
            name: localStorage.getItem('ms_username'),
            todoList: [
                {
                    title: '206国道徐州改线段建设工程上跨连霍高速公路大桥涉及连霍高速公路桩号K201+657',
                    status: false
                },
                {
                    title: '沪陕高速公路沿线（京沪2016-00136号）设置广告设施许可申请',
                    status: false
                },
                {
                    title: '泰州110kV观五至宣堡、盛泰至宣堡线路工程下穿G2京沪高速公路行政许可',
                    status: false
                },
                {
                    title: '跨越常台高速公路常熟古里段修建桥梁、路基拼宽涉路行政许可',
                    status: false
                },
                {
                    title: '沪宁高速公路 2020 年度沥青路面大中修养护工程苏州段罩面半幅封闭',
                    status: false
                },
                {
                    title: '管滩~管镇π入淮河变电站110千伏线路定向钻穿越新扬高速（S49）',
                    status: false
                },
                {
                    title: '江苏南沿江城际铁路南京南至常州段NYJZQ-4标常州特大桥上跨金坛东互通',
                    status: false
                }
            ],
            zixfbTableData: [{
                id:'1',
                zixmc: '表彰公示',
            }, {
                id:'2',
                zixmc: '推荐全省交通运输行业精神文明建设先进集体先进个人公示',
            }, {
                id:'3',
                zixmc: '关于对拟推荐省级机关工委表彰的先进集体和优秀个人的公司',
            }, {
                id:'4',
                zixmc: '江苏公路数据库维护通知',
            }],
            options: {
                type: 'pie',
                radius:60,
                title: {
                    text: '办件预告警',
                },
                legend: {
                    position: 'left',
                    top:100
                },
                bgColor: '#fff',
                labels: ['时限预警', '内容预警', '流程预警'],
                datasets: [
                    {
                        data: [1200, 900, 1100]
                    }
                ]
            },
            shoucMessage: 'changbywTab',
            changbywData: [{
                id: '1',
                banjh: '苏高许字[2020]00130号',
                shix: '管滩~管镇π入淮河变电站110千伏线路定向钻穿越新扬高速（S49）',
                banlr: '李凯',
                dangqhj: '审核'
            }],
            weijbjData: [{
                id: '1',
                banjh: '苏高许字[2020]00134号',
                shix: '沪陕高速公路沿线（京沪2016-00136号）设置广告设施许可申请',
                banlr: '李凯',
                dangqhj: '送达批复'
            },{
                id: '2',
                banjh: '苏高许字[2020]00133号',
                shix: '泰州110kV观五至宣堡、盛泰至宣堡线路工程下穿G2京沪高速公路行政许可',
                banlr: '李凯',
                dangqhj: '文书复核'
            },{
                id: '3',
                banjh: '苏高许字[2020]00132号',
                shix: '跨越常台高速公路常熟古里段修建桥梁、路基拼宽涉路行政许可',
                banlr: '李峰',
                dangqhj: '审核'
            }]
        };
    },
    components: {
        Schart
    },
    computed: {
        role() {
            return this.name === 'admin' ? '超级管理员' : '普通用户';
        }
    },
    methods: {
        changeDate() {
            const now = new Date().getTime();
            this.data.forEach((item, index) => {
                const date = new Date(now - (6 - index) * 86400000);
                item.name = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
            });
        }
    }
};
</script>


<style scoped>
.el-row {
    margin-bottom: 20px;
}

.grid-content {
    display: flex;
    align-items: center;
    height: 100px;
}

.grid-cont-right {
    flex: 1;
    text-align: center;
    font-size: 14px;
    color: #999;
}

.grid-num {
    font-size: 30px;
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
    color: rgb(45, 140, 240);
}

.grid-con-2 .grid-con-icon {
    background: rgb(100, 213, 114);
}

.grid-con-2 .grid-num {
    color: rgb(45, 140, 240);
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
    height: 220px;
}


.grid-content-chart {
    display: flex;
    align-items: center;
    height: 70px;
}
</style>
