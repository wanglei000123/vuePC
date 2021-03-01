<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-calendar"></i> 服务门户
                </el-breadcrumb-item>
                <el-breadcrumb-item>消息提醒</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <el-row :gutter="20">
            <el-col :span="24">
                <!--消息提醒-->
                <el-row :gutter="20" class="mgb20">
                    <el-col :span="24">
                        <el-card shadow="hover" style="height:300px;">
                            <div slot="header" class="clearfix">
                                <i style="color:#F5A623;" class="el-icon-lx-notificationfill"></i> <span>消息提醒</span>
                            </div>
                            <template>
                                <el-table :data="zixfbTableData" stripe border style="width: 100%">
                                    <el-table-column prop="id" label="序号" align="center" width="100">
                                    </el-table-column>
                                    <el-table-column prop="zixmc" label="消息内容" align="center" width="600">
                                        <template slot-scope="scope">
                                            <a v-on:mouseover="addActive($event)" v-on:mouseout="removeActive($event)" @click="handleZixDetail(scope.row)">{{scope.row.zixmc}}</a>
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="zixfbdw" label="发布单位" align="center" width="250">
                                    </el-table-column>
                                    <el-table-column prop="zixfbsj" label="发布时间" align="center">
                                    </el-table-column>
                                </el-table>
                            </template>
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
            zixfbTableData: [{
                id:'1',
                zixmc: '表彰公示',
                zixfbdw: '高管局党群部',
                zixfbsj: '2020-04-23 15:50'
            }, {
                id:'2',
                zixmc: '推荐全省交通运输行业精神文明建设先进集体先进个人公示',
                zixfbdw: '文印宣传',
                zixfbsj: '2020-03-22 22:58'
            }, {
                id:'3',
                zixmc: '关于对拟推荐省级机关工委表彰的先进集体和优秀个人的公司',
                zixfbdw: '高管局党群部',
                zixfbsj: '2020-01-19 14:31'
            }, {
                id:'4',
                zixmc: '江苏公路数据库维护通知',
                zixfbdw: '高管局路网信息部',
                zixfbsj: '2020-01-19 14:31'
          }]
        };
    },
    methods: {
        handleZixDetail(row) {
           
        },
        addActive($event){
            $event.currentTarget.style.textDecoration="underline";
            $event.currentTarget.style.cursor="default";
        },
        removeActive($event){
            $event.currentTarget.style.textDecoration="none";
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
