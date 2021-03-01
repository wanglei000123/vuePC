<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-calendar"></i> 服务门户
                </el-breadcrumb-item>
                <el-breadcrumb-item>我的收藏</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <el-row :gutter="20">
            <el-col :span="24">
                <!--收藏-->
                <el-row :gutter="20" class="mgb20">
                    <el-col :span="24">
                        <el-card shadow="hover" style="height:380px;">
                            <div slot="header" class="clearfix">
                                <i style="color:#F5A623;" class="el-icon-lx-favorfill"></i> <span>我的收藏</span>
                            </div>
                            <el-tabs v-model="shoucMessage">
                                <el-tab-pane :label="`常办业务(${changbywData.length})`" name="changbywTab">
                                    <el-table :data="changbywData" stripe style="width: 100%">
                                        <el-table-column prop="id" label="序号" align="center" width="100"></el-table-column>
                                        <el-table-column prop="banjh" label="办件号" align="center" width="200"></el-table-column>
                                        <el-table-column prop="shix" label="事项名称" align="center" ></el-table-column>
                                        <el-table-column prop="banlr" label="办理人" align="center" width="175"></el-table-column>
                                        <el-table-column prop="dangqhj" label="当前环节" align="center" width="175"></el-table-column>
                                        <el-table-column label="操作" align="center" width="120">
                                            <template slot-scope="scope">
                                                <el-button size="small" type="primary" @click="handleDetail(scope.row)">详情</el-button>
                                            </template>
                                        </el-table-column>
                                    </el-table>
                                </el-tab-pane>
                                <el-tab-pane :label="`未结办件(${weijbjData.length})`" name="weijbjTab">
                                    <template v-if="shoucMessage === 'weijbjTab'">
                                        <el-table :data="weijbjData" stripe style="width: 100%">
                                             <el-table-column prop="id" label="序号" align="center" width="100"></el-table-column>
                                            <el-table-column prop="banjh" label="办件号" align="center" width="200"></el-table-column>
                                            <el-table-column prop="shix" label="事项名称" align="center"></el-table-column>
                                            <el-table-column prop="banlr" label="办理人" align="center" width="175"></el-table-column>
                                            <el-table-column prop="dangqhj" label="当前环节" align="center" width="175"></el-table-column>
                                            <el-table-column label="操作" align="center" width="120">
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
    data() {
        return {
            shoucMessage: 'changbywTab',
            changbywData: [{
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
            }],
            weijbjData: [{
                id: '1',
                banjh: '苏高许字[2020]00130号',
                shix: '管滩~管镇π入淮河变电站110千伏线路定向钻穿越新扬高速（S49）',
                banlr: '李凯',
                dangqhj: '审核'
            }]
        };
    },
    methods: {
        handleDetail(row) {
         
        },
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
