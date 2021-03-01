<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-calendar"></i> 服务门户
                </el-breadcrumb-item>
                <el-breadcrumb-item>通知公告</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <el-row :gutter="20">
            <el-col :span="24">
                <!--通知公告-->
                <el-row :gutter="20" class="mgb20">
                    <el-col :span="24">
                        <el-card shadow="hover" style="height:400px;">
                            <div slot="header" class="clearfix">
                                <i style="color:#F5A623;" class="el-icon-lx-notificationfill"></i> <span>通知公告</span>
                            </div>
                            <template>
                                <el-table :data="zixfbTableData" stripe border style="width: 100%">
                                    <el-table-column prop="id" label="序号" align="center" width="100">
                                    </el-table-column>
                                    <el-table-column prop="zixmc" label="资讯名称" align="center" width="600">
                                        <template slot-scope="scope">
                                            <a v-on:mouseover="addActive($event)" v-on:mouseout="removeActive($event)" @click="handleZixDetail(scope.row)">{{scope.row.zixmc}}</a>
                                        </template>
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
                zixmc: '关于做好2020年度交通运输重大科技创新成果库入库成果征集的通知',
                zixfbsj: '2020-03-09 08:59'
            }, {
                id:'2',
                zixmc: '江苏省交通工程建设局2020年关键材料资格备案公告',
                zixfbsj: '2020-03-27 14:45'
            }, {
                id:'3',
                zixmc: '省交通运输厅关于2020年全省交通运输科技创新、信息化和绿色交通工作要点的通知',
                zixfbsj: '2020-02-14 15:01'
            }, {
                id:'4',
                zixmc: '关于公布江苏省铁路工程高级专业技术资格评审委员会评审结果的通知',
                zixfbsj: '2020-01-07 12:19'
            }, {
                id:'5',
                zixmc: '第八届江苏交通优质服务品牌推荐名单公示',
                zixfbsj: '2019-12-31 13:48'
            }, {
                id:'6',
                zixmc: '省铁路办办公室关于公布江苏省铁路工程高级专业技术资格评审委员会评审结果的通知',
                zixfbsj: '2019-12-23 14:19'
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
