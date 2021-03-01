<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-calendar"></i> 门户服务
                </el-breadcrumb-item>
                <el-breadcrumb-item>统计分析</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <el-row :gutter="20">
            <el-col :span="24">
                <el-row :gutter="20" class="mgb20">
                    <el-col :span="8">
                        <el-card shadow="hover" :body-style="{padding: '0px'}">
                            <div class="grid-content grid-con-1" style="height: 80px;">
                                <div class="grid-cont-right">
                                    <div class="title">当月办件</div>
                                    <br/>
                                    <div class="grid-num">534308</div>
                                </div>
                            </div>
                            <div class="grid-content grid-con-2">
                                <div class="grid-cont-right">
                                    <div class="grid-num">500000</div>
                                    <div>已办结</div>
                                </div>
                                <div class="grid-cont-right">
                                    <div class="grid-num">89.34%</div>
                                    <div>办结率</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="8">
                        <el-card shadow="hover" :body-style="{padding: '0px'}">
                            <div class="grid-content grid-con-1" style="height: 80px;">
                                <div class="grid-cont-right">
                                    <div class="title">当年累计办件</div>
                                    <br/>
                                    <div class="grid-num">3435995</div>
                                </div>
                            </div>
                            <div class="grid-content grid-con-2">
                                <div class="grid-cont-right">
                                    <div class="grid-num">80.5%</div>
                                    <div>同比</div>
                                </div>
                                <div class="grid-cont-right">
                                    <div class="grid-num">90.67%</div>
                                    <div>办结率</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="8">
                        <el-card shadow="hover" :body-style="{padding: '0px'}">
                            <schart class="schart" canvasId="pie" :options="options"></schart>
                            <div class="grid-content-chart grid-con-3">
                                <div class="grid-cont-right">
                                    <div class="grid-num">3200</div>
                                    <div>预警</div>
                                </div>
                                <div class="grid-cont-right">
                                    <div class="grid-num">1200</div>
                                    <div>告警</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import Schart from 'vue-schart';
export default {
    data() {
        return {
            options: {
                type: 'pie',
                radius:50,
                title: {
                    text: '办件预告警',
                    color: '#999',
                    font: 'bold 21px Arial',
                },
                legend: {
                    position: 'left',
                    top:70
                },
                bgColor: '#fff',
                labels: ['时限预警', '内容预警', '流程预警'],
                datasets: [
                    {
                        data: [1200, 900, 1100]
                    }
                ]
            }
        }
    },
    components: {
        Schart
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
