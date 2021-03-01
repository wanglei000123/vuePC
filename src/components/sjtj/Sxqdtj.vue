<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-calendar"></i> 数据统计
                </el-breadcrumb-item>
                <el-breadcrumb-item>事项清单统计</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <!-- 树形下拉框  -->
                <template>
                    <el-form :inline="true" :v-model="form" class="demo-form-inline" size="mini" >
                        <el-row>
                            <el-col :span='24'>
                                <el-form-item label="事项级别">
                                    <el-select v-model="form.shixjb" :clearable="true" placeholder="事项级别" class="handle-select mr10">
                                        <el-option key="1" label="省级" value="省级"></el-option>
                                        <el-option key="2" label="设区市级" value="设区市级"></el-option>
                                        <el-option key="3" label="县级" value="县级"></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="事项类型">
                                    <el-select v-model="form.shixlx" :clearable="true" placeholder="事项类型" class="handle-select mr10">
                                        <el-option key="1" label="行政许可" value="行政许可"></el-option>
                                        <el-option key="2" label="行政确认" value="行政确认"></el-option>
                                        <el-option key="3" label="其他" value="其他"></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="业务类型">
                                    <el-select v-model="form.yewlx" :clearable="true" placeholder="业务类型" class="handle-select mr10">
                                        <el-option key="1" label="公路管理" value="公路管理"></el-option>
                                        <el-option key="2" label="运输管理" value="运输管理"></el-option>
                                        <el-option key="3" label="航道管理" value="航道管理"></el-option>
                                        <el-option key="4" label="港口管理" value="港口管理"></el-option>
                                        <el-option key="5" label="建设管理" value="建设管理"></el-option>
                                        <el-option key="6" label="地方海事" value="地方海事"></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item ref="treeParent" label="办理单位" >
                                    <el-input
                                        placeholder="请选择办理单位"
                                        class="width-200 selectTree-input mr10"
                                        auto-complete="off"
                                        v-model="form.banldw"
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
                                <el-button type="primary" icon="el-icon-s-data" @click="handleTongj">统计</el-button>
                            </el-col>
                        </el-row>
                    </el-form>
                </template>
            </div>
            <el-row :gutter="20" class="mgb20">
                <el-col :span="8">
                    <el-card shadow="hover" :body-style="{padding: '0px'}" class="cardBg">
                        <div id="chartPie1" style="width:100%; height:250px;"></div>
                        <div class="grid-content-chart">
                            <div class="grid-cont-right">
                                <div class="grid-num-bottom">启用：</div>
                            </div>
                            <div class="grid-cont-center">
                                <div class="grid-num grid-num-blue">42506</div>
                            </div>
                            <div class="grid-cont-left">
                                <div class="grid-num-bottom">项</div>
                            </div>
                        </div>
                    </el-card>
                </el-col>
                <el-col :span="8">
                    <el-card shadow="hover" :body-style="{padding: '0px'}" class="cardBg">
                        <div id="chartPie2" style="width:100%; height:320px;"></div>
                    </el-card>
                </el-col>
                <el-col :span="8">
                    <el-card shadow="hover" :body-style="{padding: '0px'}" class="cardBg">
                    <div id="chartRadar" style="width:100%; height:320px;"></div>
                    </el-card>
                </el-col>
            </el-row>
            <el-row :gutter="20" class="mgb20">
                <el-col :span="12">
                    <el-card shadow="hover" :body-style="{padding: '0px'}" class="cardBg">
                    <div id="chartLine" style="width:100%; height:320px;"></div>
                    </el-card>
                </el-col>
                <el-col :span="12">
                    <el-card shadow="hover" :body-style="{padding: '0px'}" class="cardBg">
                    <div id="chartBar" style="width:100%; height:320px;"></div>
                    </el-card>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
    import echarts from 'echarts'

    export default {
        data() {
            return {
                data: [{
                    label: '江苏省交通运输厅',
                    children: [{
                        label: '江苏省交通运输厅办公室',
                        children: []
                    },{
                        label: '江苏省交通运输厅安全处',
                        children: []
                    },{
                        label: '江苏省交通运输厅运管局',
                        children: []
                    },{
                        label: '江苏省交通运输综合行政执法监督局',
                        children: [{
                            label: '江苏省交通运输综合行政执法监督局综合处',
                            children:[]
                        },{
                            label: '江苏省交通运输综合行政执法监督局道路执法监督局',
                            children:[]
                        },{
                            label: '江苏省交通运输综合行政执法监督局水上执法监督局',
                            children:[]
                        },{
                            label: '江苏省交通运输综合行政执法监督局交通工程质量执法监督局',
                            children:[]
                        }]
                    },{
                        label: '江苏省交通运输厅公路事业发展中心',
                        children: []
                    },{
                        label: '江苏省交通运输厅港航事业发展中心',
                        children: []
                    },{
                        label: '江苏省交通通信信息中心',
                        children: []
                    },{
                        label: '南京市交通运输局',
                        children: []
                    },{
                        label: '南京市公路管理处',
                        children: []
                    },{
                        label: '南京市公路运输管理处',
                        children: []
                    },{
                        label: '南京市地方海事局',
                        children: []
                    },{
                        label: '南京市航道管理处',
                        children: []
                    },{
                        label: '南京市交通工程质量监督站',
                        children: []
                    },{
                        label: '南京市港口管理局',
                        children: []
                    },{
                        label: '南京市地方海事局',
                        children: []
                    },{
                        label: '南京市航道管理处',
                        children: []
                    },{
                        label: '南京市交通工程质量监督站',
                        children: []
                    },{
                        label: '南京市港口管理局',
                        children: []
                    },{
                        label: '南京市城市道路管理中心',
                        children: []
                    },{
                        label: '南京市客运交通管理处',
                        children: []
                    },{
                        label: '南京市汽车维修行业管理处',
                        children: []
                    }]
                }],
                isShowSelect:false,
                form:{banldw:''},
                watch: {
                    form: {
                        handler(form){
                            if(this.isShowSelect){
                                this.$refs.selectTree.filter(form.banldw);
                            }
                        },
                        deep: true,//深度监听，重要
                    },
                },
                chartBar: null,
                chartLine: null,
                chartPie1: null,
                chartPie2: null,
                chartRadar: null
            }
        },
        methods: {
            selectClassfy(data) {
                this.form.banldw=data.label;
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
            drawBarChart() {
                this.chartBar = echarts.init(document.getElementById('chartBar'),'dark');
                this.chartBar.setOption({
                    title: {
                        padding:[10,10],
                        text: '各行业事项办件发生情况',
                    },
                    tooltip: {},
                    grid: {
                        top:'25%',
                        left: '10%',
                        right: '10%',
                        bottom: '15%'
                    },
                    color:['#40adce','#b5640b','#14825a','#aaaa13','#959987', '#79a583', '#8B636C', '#6f2787'],
                    xAxis: {
                        name: '行业',
                        type: 'category',
                            //坐标轴斜着显示
                            axisLabel: {  
                            interval:0,  
                            rotate:30  
                        },
                        data: ['高速公路', '普通公路', '运输管理', '港口管理', '航道管理', '地方海事', '建设管理']
                    },
                    yAxis: {
                        name: '办件发生率（%）',
                    },
                    series: [{
                        name: '办件发生率',
                        type: 'bar',
                        barWidth: 20,
                        data: [62.3, 79.68, 52.43, 89.92, 92.66, 97.23, 68.45]
                    }]
                });
            },
            drawLineChart() {
                this.chartLine = echarts.init(document.getElementById('chartLine'),'dark');
                this.chartLine.setOption({
                    title: {
                        padding:[10,10],
                        text: '事项办件发生情况',
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    grid: {
                        top:'25%',
                        left: '5%',
                        right: '10%',
                        bottom: '5%',
                        containLabel: true
                    },
                    color:['#40adce','#b5640b','#14825a','#aaaa13','#959987'],
                    xAxis: {
                        name: '月度',
                        type: 'category',
                        boundaryGap: false,
                        data: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"]
                    },
                    yAxis: {
                        name: '办件发生率（%）',
                        type: 'value'
                    },
                    series: [
                        {
                            name: '办件发生率',
                            type: 'line',
                            data: [60.5, 72.8, 77.65, 82.63, 87.66, 80.88, 89.65, 72.5, 89.62, 68.6, 75.69, 92.8]
                        }
                    ]
                });
            },
            drawPieChart1() {
                this.chartPie1 = echarts.init(document.getElementById('chartPie1'),'dark');
                this.chartPie1.setOption({
                    title: {
                        padding:[10,10],
                        text: '政务服务事项数',
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    legend: {
                        orient: 'vertical',
                        x: 'right',
                        y: 'top',
                        top: '40%',
                        left: '70%',
                        data: ['行政许可', '行政确认', '其他']
                    },
                    graphic: [{ //环形图中间添加文字
                        type: 'text', //通过不同top值可以设置上下显示
                        left: 80,
                        top: 130,
                        style: {
                            text: '663',
                            textAlign: 'center',
                            fill: 'rgb(80, 247, 67)', //文字的颜色
                            width: 30,
                            height: 30,
                            fontSize: 40,
                            fontFamily: "Microsoft YaHei"
                        }
                    }],
                    series: [
                        {
                            name: '政务服务事项数',
                            type: 'pie',
                            radius: ['50%', '80%'],
                            center: ['35%', '60%'],
                            avoidLabelOverlap: false,
                            label : {
                                normal: {
                                    show: false,
                                },
                                labelLine : {
                                    show: false,
                                },
                            },
                            color:['#40adce','#b5640b','#14825a','#aaaa13','#959987'],
                            data: [
                                { value: 116, name: '行政许可' },
                                { value: 429, name: '行政确认' },
                                { value: 118, name: '其他' }
                            ],
                            itemStyle: {
                                emphasis: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            }
                        }
                    ]
                });
            },
            drawPieChart2() {
                this.chartPie2 = echarts.init(document.getElementById('chartPie2'),'dark');
                this.chartPie2.setOption({
                    title: {
                        padding:[10,10],
                        text: '各行业政务服务事项数',
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    legend: {
                        orient: 'vertical',
                        x: 'right',
                        y: 'top',
                        top: '20%',
                        left: '70%',
                        data: ['高速公路', '普通公路', '运输管理', '港口管理', '航道管理', '地方海事', '建设管理']
                    },
                    series: [
                        {
                            name: '各行业政务服务事项数',
                            type: 'pie',
                            radius: '60%',
                            center: ['35%', '50%'],
                            avoidLabelOverlap: false,
                            label : {
                                normal: {
                                    show: false,
                                },
                                labelLine : {
                                    show: false,
                                },
                            },
                            color:['#40adce','#b5640b','#14825a','#aaaa13','#959987', '#79a583', '#8B636C', '#6f2787'],
                            data: [
                                { value: 36, name: '高速公路' },
                                { value: 12, name: '普通公路' },
                                { value: 39, name: '运输管理' },
                                { value: 68, name: '港口管理' },
                                { value: 84, name: '航道管理' },
                                { value: 64, name: '地方海事' },
                                { value: 56, name: '建设管理' },
                            ],
                            itemStyle: {
                                emphasis: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            }
                        }
                    ]
                });
            },
            drawRadarChart(){
                this.chartRadar = echarts.init(document.getElementById('chartRadar'),'dark');
                this.chartRadar.setOption({
                    title: {
                        padding:[10,10],
                        text: '政务服务事项流程优化情况',
                    },
                    tooltip : {
                       trigger: 'item'
                    },
                    radar: {
                        nameGap : 5, // 图中工艺等字距离图的距离
                        splitNumber: 4, // 网格线的个数
                        center:['50%','50%'], // 图的位置
                        radius: 20,
                        name:{
                           textStyle: {
                                color: '#fff',
                                backgroundColor: '#999',
                                borderRadius: 3,
                                padding: [3, 5]
                           }
                        },
                        splitArea: {
                            areaStyle: {
                                color: ['rgba(135, 206, 250, 0.2)',
                                    'rgba(135, 206, 250, 0.4)', 'rgba(135, 206, 250, 0.6)',
                                    'rgba(135, 206, 250, 0.8)', 'rgba(135, 206, 250, 1)'],
                                shadowColor: 'rgba(0, 0, 0, 0.3)',
                                shadowBlur: 10
                            }
                        },
                        indicator: [
                            { name: '网上可办率', max: 100},
                            { name: '不见面事项率', max: 100},
                            { name: '网上支付支持率', max: 100},
                            { name: '快递支持率', max: 100},
                            { name: '即办件事项率', max: 100},
                        ],
                        center: ['50%', '50%'],
                        radius: 80,
                        axisLine: {
                            lineStyle: {
                                 color: 'rgba(255, 255, 255, 0.5)' // 分割线
                            }
                        },
                        splitLine: {
                            lineStyle: {
                                color: 'rgba(255, 255, 255, 0.5)' //
                            }
                        }
                    },
                    series: [
                        {
                            name: '政务服务事项流程优化情况',
                            type: 'radar',
                             itemStyle: {
                                normal: {
                                    color : "rgba(0,0,0,0)", // 图表中各个图区域的边框线拐点颜色
                                    lineStyle: {
                                        color:"white" // 图表中各个图区域的边框线颜色
                                    },
                                    areaStyle: {
                                        color:"rgba(255, 255, 255, 0.5)"
                                    }
                                }
                            },
                            
                            data: [{
                                name: "优化情况", 
                                value: [80, 90, 94, 85, 88] //这里的配置显示数值
                            }]
                        }
                    ]
                });
            },
            drawCharts() {
                this.drawBarChart()
                this.drawLineChart()
                this.drawPieChart1()
                this.drawPieChart2()
                this.drawRadarChart()
            },
            // 触发统计按钮
            handleTongj() {
                
            }
        },
        mounted: function () {
            this.drawCharts()
        },
        updated: function () {
            this.drawCharts()
        }
    }
</script>

<style scoped>
    .mgb20 {
        margin-bottom: 20px;
    }
    .cardBg {
        background-color:#FBFBFB;
    }

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

    .mr10 {
        margin-right: 10px;
    }

    .grid-content-chart {
        display: flex;
        align-items: center;
        height: 70px;
    }

    .grid-cont-right {
        flex: 1;
        text-align: right;
        font-size: 17px;
        color: #999;
    }
    .grid-cont-center {
        flex: 1;
        text-align: center;
        font-size: 17px;
        color: #999;
    }
    .grid-cont-left {
        flex: 1;
        text-align: left;
        font-size: 17px;
        color: #999;
    }

    .grid-num {
        font-size: 26px;
        font-weight: bold;
    }
    .grid-num-bottom {
        font-weight: bold;
        color:gray;
    }

    .grid-num-blue {
        color:  rgb(45, 140, 240);
    }

    .grid-num-green {
        color: rgb(100, 213, 114);
    }

    .grid-num-red {
        color: rgb(242, 94, 67);
    }

    .grid-num-yellow {
        color:#E6A23C;
    }
</style>
