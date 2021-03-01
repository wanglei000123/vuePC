<template>
    <div>
        <el-row :gutter="20">
            <el-col :span="24">
                <!--待办-->
                <el-row :gutter="20" class="mgb20">
                    <el-col :span="24">
                        <el-card shadow="hover" style="height:500px;">
                            <div slot="header" class="clearfix">
                                <i style="color:#F5A623;" class="el-icon-lx-edit"></i> <span>日志管理</span>
                            </div>
                            <el-tabs v-model="message">
                                <el-tab-pane :label="`接口日志(${jiekrz.length})`" name="first">
                                    <el-table :data="jiekrz" stripe style="min-width: 100%">
                                        <el-table-column prop="id" label="序号" align="center" min-width="5%"></el-table-column>
                                        <el-table-column prop="jiekmc" label="接口名称" align="center" min-width="20%"></el-table-column>
                                        <el-table-column prop="diaoysj" label="调用时间" align="center" min-width="15%"></el-table-column>
                                        <el-table-column prop="diaoyr" label="调用人" align="center" min-width="10%"></el-table-column>
                                        <el-table-column prop="fanhdm" label="返回代码" align="center" min-width="10%"></el-table-column>
                                        <el-table-column prop="charjil" label="插入" align="center" min-width="10%"></el-table-column>
                                        <el-table-column prop="gengxjl" label="更新" align="center" min-width="10%"></el-table-column>
                                        <el-table-column prop="sahncjl" label="删除" align="center" min-width="10%"></el-table-column>
                                        <el-table-column label="操作" align="center" min-width="10%">
                                            <template slot-scope="scope">
                                                <el-button size="small" type="primary" @click="handleDetail(scope.row)">日志下载</el-button>
                                            </template>
                                        </el-table-column>
                                    </el-table>
                                </el-tab-pane>
                                <el-tab-pane :label="`后台监控日志${houtjkrz.length})`" name="second">
                                    <template v-if="message === 'second'">
                                        <el-table :data="houtjkrz" stripe style="min-width: 100%">
                                            <el-table-column prop="id" label="序号" align="center" min-width="5%"></el-table-column>
                                            <el-table-column prop="caozmc" label="操作名称" align="center" min-width="20%"></el-table-column>
                                            <el-table-column prop="caozr" label="操作人" align="center" min-width="15%"></el-table-column>
                                            <el-table-column prop="caozjs" label="操作角色" align="center" min-width="10%"></el-table-column>
                                            <el-table-column prop="caozsj" label="操作时间" align="center" min-width="10%"></el-table-column>
                                            <el-table-column prop="caozip" label="操作IP" align="center" min-width="30%"></el-table-column>
                                            <el-table-column label="操作" align="center" min-width="10%">
                                                <template slot-scope="scope">
                                                    <el-button size="small" type="primary" @click="handleDetail(scope.row)">详情</el-button>
                                                </template>
                                            </el-table-column>
                                        </el-table>
                                    </template>
                                </el-tab-pane>
                                <el-tab-pane :label="`用户登录日志(${yonghdlrz.length})`" name="third">
                                    <template v-if="message === 'third'">
                                        <el-table :data="yonghdlrz" stripe style="min-width: 100%">
                                            <el-table-column prop="id" label="序号" align="center" min-width="5%"></el-table-column>
                                            <el-table-column prop="caozmc" label="操作名称" align="center" min-width="10%"></el-table-column>
                                            <el-table-column prop="yonghm" label="用户名" align="center" min-width="15%"></el-table-column>
                                            <el-table-column prop="caozsj" label="登录/登出时间" align="center" min-width="30%"></el-table-column>
                                            <el-table-column prop="caozip" label="登录/登出IP" align="center" min-width="30%"></el-table-column>
                                            <el-table-column label="操作" align="center" min-width="10%">
                                                <template slot-scope="scope">
                                                    <el-button size="small" type="primary" @click="handleDetail(scope.row)">详情</el-button>
                                                </template>
                                            </el-table-column>
                                        </el-table>
                                    </template>
                                </el-tab-pane>
                                <el-tab-pane :label="`操作日志(${caozrz.length})`" name="forth">
                                    <template v-if="message === 'forth'">
                                        <el-table :data="yonghdlrz" stripe style="min-width: 100%">
                                            <el-table-column prop="id" label="序号" align="center" min-width="5%"></el-table-column>
                                            <el-table-column prop="caozmc" label="操作名称" align="center" min-width="20%"></el-table-column>
                                            <el-table-column prop="caozrr" label="操作人" align="center" min-width="15%"></el-table-column>
                                            <el-table-column prop="zhuangtr" label="操作结果" align="center" min-width="10%"></el-table-column>
                                            <el-table-column prop="caozsj" label="操作时间" align="center" min-width="10%"></el-table-column>
                                            <el-table-column prop="caozip" label="操作IP" align="center" min-width="30%"></el-table-column>
                                            <el-table-column label="操作" align="center" min-width="10%">
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
    name: 'logManage',
    data() {
        return {
            message: 'first',
            jiekrz: [{
                id: '1',
                jiekmc: '缓存数据同步',
                diaoysj: '2020-04-29 08:34:20',
                diaoyr: '徐文号',
                fanhdm: '0',
                charjil: '1245',
                gengxjl: '0',
                sahncjl: '0'
            },{
                id: '2',
                jiekmc: '菜单更新',
                diaoysj: '2020-04-29 10:35:10',
                diaoyr: '向志华',
                fanhdm: '0',
                charjil: '0',
                gengxjl: '34',
                sahncjl: '0'
            },{
                id: '3',
                jiekmc: '系统参数删除',
                diaoysj: '2020-04-29 10:39:03',
                diaoyr: '刘向东',
                fanhdm: '0',
                charjil: '0',
                gengxjl: '0',
                sahncjl: '8'
            },{
                id: '4',
                jiekmc: '人员角色查询',
                diaoysj: '2020-04-29 15:29:13',
                diaoyr: '夏桂华',
                fanhdm: '1',
                charjil: '0',
                gengxjl: '0',
                sahncjl: '0'
            }],
            houtjkrz: [{
                id: '1',
                caozmc: '菜单新增',
                caozr: 'superAdmin',
                caozjs: '超级管理员',
                caozsj: '2020-04-29 08:34:20',
                caozip: '10.2.34.9',
            },{
                id: '2',
                caozmc: '表单新增',
                caozr: 'admin',
                caozjs: '系统管理员',
                caozsj: '2020-04-29 09:45:20',
                caozip: '10.11.54.8',
            },{
                id: '3',
                caozmc: '流程复制',
                caozr: 'admin',
                caozjs: '系统管理员',
                caozsj: '2020-04-29 10:54:20',
                caozip: '10.11.54.8',
            }],
            yonghdlrz: [{
                id: '1',
                caozmc: '登录',
                yonghm: '方中华',
                caozsj: '2020-04-29 09:34:20',
                caozip: '10.2.114.15'
            },{
                id: '2',
                caozmc: '登录',
                yonghm: '毛宇星',
                caozsj: '2020-04-29 09:39:02',
                caozip: '10.2.114.29'
            },{
                id: '3',
                caozmc: '登录',
                yonghm: '李娜',
                caozsj: '2020-04-29 09:46:20',
                caozip: '10.2.114.108'
            },{
                id: '4',
                caozmc: '登出',
                yonghm: '刘丽',
                caozsj: '2020-04-29 09:59:56',
                caozip: '10.2.114.11'
            },{
                id: '5',
                caozmc: '登出',
                yonghm: '吕杰',
                caozsj: '2020-04-29 10:13:18',
                caozip: '10.2.114.07'
            }],
            caozrz: [{
                id: '1',
                caozmc: '我的办件查看',
                caozrr: '刘向东',
                zhuangtr: '成功',
                caozsj: '2020-04-29 08:34:20',
                caozip: '10.2.114.07',
            },{
                id: '2',
                caozmc: '运行监控查看',
                caozrr: '张卫华',
                zhuangtr: '成功',
                caozsj: '2020-04-29 09:45:20',
                caozip: '10.2.114.19',
            },{
                id: '3',
                caozmc: '许可登记填报',
                caozrr: '徐才茂',
                zhuangtr: '失败',
                caozsj: '2020-04-29 10:54:20',
                caozip: '10.2.114.24',
            },{
                id: '4',
                caozmc: '电子证照统计',
                caozrr: '田伟',
                zhuangtr: '成功',
                caozsj: '2020-04-29 10:54:20',
                caozip: '10.2.114.87',
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
    min-width: 100px;
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
    min-width: 120px;
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
    min-width: 100%;
    height: 160px;
}
</style>
