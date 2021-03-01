<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-calendar"></i> 数据统计
                </el-breadcrumb-item>
                <el-breadcrumb-item>办件量统计</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <!-- 树形下拉框  -->
                <template>
                    <el-form :inline="true" :v-model="form" class="demo-form-inline" size="mini" >
                        <el-row>
                            <el-col :span='24'>
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
                                <el-form-item label="受理日期">
                                    <el-col :span="11">
                                        <el-date-picker
                                            type="date"
                                            placeholder="开始日期"
                                            v-model="form.date1"
                                            value-format="yyyy-MM-dd"
                                            style="width: 100%;"
                                        ></el-date-picker>
                                    </el-col>
                                    <el-col class="line" :span="2" style="padding-left:13px;">-</el-col>
                                    <el-col :span="11">
                                        <el-date-picker
                                            type="date"
                                            placeholder="结束日期"
                                            v-model="form.date2"
                                            value-format="yyyy-MM-dd"
                                            style="width: 100%;"
                                        ></el-date-picker>
                                    </el-col>
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
                        <div class="content-title">政务服务事项办件量</div>
                       <div class="grid-content-chart">
                            <div class="grid-cont-center">
                                <div class="font-size-50 grid-num-blue1">42506 <span class="font-size-25 grid-num-bottom">件</span></div>
                            </div>
                        </div>
                        <div class="grid-content">
                            <div class="grid-cont-center">
                                <div class="grid-num grid-num-blue">35642</div>
                                <div class="grid-num-bottom">当月</div>
                            </div>
                            <div class="grid-cont-center">
                                <div class="grid-num grid-num-yellow">362502</div>
                                <div class="grid-num-bottom">当年</div>
                            </div>
                            <div class="grid-cont-center">
                                <div class="grid-num grid-num-green">95.34%</div>
                                <div class="grid-num-bottom">同比</div>
                            </div>
                        </div>
                    </el-card>
                </el-col>
                <el-col :span="8">
                    <el-card shadow="hover" :body-style="{padding: '0px'}" class="cardBg">
                        <div id="chartGauge" style="width:100%; height:230px;"></div>
                        <div class="grid-content" style="height: 50px;padding-bottom:10px;">
                            <div class="grid-cont-center">
                                <div class="grid-num grid-num-blue">81.3%</div>
                                <div class="grid-num-bottom">5 工作日</div>
                            </div>
                            <div class="grid-cont-center">
                                <div class="grid-num grid-num-yellow">17.1%</div>
                                <div class="grid-num-bottom">5~9 工作日</div>
                            </div>
                            <div class="grid-cont-center">
                                <div class="grid-num grid-num-green">1.6%</div>
                                <div class="grid-num-bottom">9~20 工作日</div>
                            </div>
                        </div>
                    </el-card>
                </el-col>
                <el-col :span="8">
                    <el-card shadow="hover" :body-style="{padding: '0px'}" class="cardBg">
                        <div id="chartPie1" style="width:100%; height:290px;"></div>
                    </el-card>
                </el-col>
            </el-row>
            <el-row :gutter="20" class="mgb20">
                <el-col :span="12">
                    <el-card shadow="hover" :body-style="{padding: '0px'}" class="cardBg">
                        <div id="chartMap" style="width:100%; height:320px;"></div>
                    </el-card>
                </el-col>
                <el-col :span="12">
                    <el-card shadow="hover" :body-style="{padding: '0px'}" class="cardBg">
                        <div id="chartLine" style="width:100%; height:320px;"></div>
                    </el-card>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
    import echarts from 'echarts'
    import 'echarts/map/js/province/jiangsu'

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
                chartMap: null,
                chartLine: null,
                chartPie1: null,
                chartGauge: null
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
            drawMapChart() {
                this.chartMap = echarts.init(document.getElementById('chartMap'),'dark');
                this.chartMap.setOption({
                    title: {
                        padding:[10,10],
                        text: '各地区江苏服务事项办件量',
                    },
                    tooltip: {
                        trigger: 'item',
                        showDelay: 0,
                        transitionDuration: 0.2,
                        formatter: function (params) {
                            let value = (params.value + '').split('.');
                            value = value[0].replace(/(\d{1,3})(?=(?:\d{3})+(?!\d))/g, '$1,');
                            return params.seriesName + '<br/>' + params.name + ': ' + value;
                        }
                    },
                    visualMap: {
                        left: 'left',
                        min: 500000,
                        max: 3800000,
                        inRange: {
                            color: ['#313695', '#4575b4', '#74add1', '#abd9e9', '#e0f3f8', '#ffffbf', '#fee090', '#fdae61', '#f46d43', '#d73027', '#a50026']
                        },
                        text:['High','Low'],
                        calculable: true,
                        show: false
                    },
                    series: [{
                        name: '服务事项办件量',
                        type: 'map',
                        roam: true,
                        map: '江苏',
                        label: {
                            normal: {
                            show: true,
                            textStyle: {
                                color: 'rgba(0, 255, 0, 1)'
                            }
                            }
                        },
                        itemStyle:{
                            emphasis:{label:{show:true}}
                        },
                        // 文本位置修正
                        textFixed: {
                            Alaska: [20, -20]
                        },
                        data:[
                            {name: '南京市', value: 4822023},
                            {name: '常州市', value: 731449},
                            {name: '徐州市', value: 6553255},
                            {name: '淮安市', value: 2949131},
                            {name: '南通市', value: 38041430},
                            {name: '宿迁市', value: 5187582},
                            {name: '无锡市', value: 3590347},
                            {name: '扬州市', value: 917092},
                            {name: '盐城市', value: 632323},
                            {name: '苏州市', value: 1931751},
                            {name: '泰州市', value: 9919945},
                            {name: '镇江市', value: 1392313},
                            {name: '连云港市', value: 1595728}
                        ]
                    }]
                });
            },
            drawLineChart() {
                this.chartLine = echarts.init(document.getElementById('chartLine'),'dark');
                this.chartLine.setOption({
                    title: {
                        padding:[10,10],
                        text: '政务服务事项办件量月度变化',
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data: ['2020', '2019'],
                        top: 45
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
                        name: '办件量（件）',
                        type: 'value'
                    },
                    series: [
                        {
                            name: '2020',
                            type: 'line',
                            data: [605, 728, 765, 826, 866, 888, 965, 725, 962, 686, 759, 928]
                        },
                        {
                            name: '2019',
                            type: 'line',
                            data: [512, 810, 715, 708, 876, 388, 865, 695, 1062, 696, 819, 698]
                        }
                    ]
                });
            },
            drawPieChart1() {
                this.chartPie1 = echarts.init(document.getElementById('chartPie1'),'dark');
                this.chartPie1.setOption({
                    title: {
                        padding:[10,10],
                        text: '各业务类型办件量',
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
                            name: '办件量',
                            type: 'pie',
                            radius: '70%',
                            center: ['35%', '52%'],
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
                                { value: 1316, name: '高速公路' },
                                { value: 3203, name: '普通公路' },
                                { value: 2203, name: '运输管理' },
                                { value: 3503, name: '港口管理' },
                                { value: 2403, name: '航道管理' },
                                { value: 1303, name: '地方海事' },
                                { value: 2033, name: '建设管理' },
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
            drawGaugeChart(){
                this.chartGauge = echarts.init(document.getElementById('chartGauge'),'dark');
                this.chartGauge.setOption({
                    title: {
                        padding:[10,10],
                        text: '政务服务事项办件办结率',
                    },
                    tooltip: {
                        formatter: '{b} : {c}%'
                    },
                    color:['#40adce','#b5640b','#14825a','#aaaa13','#959987', '#79a583', '#8B636C', '#6f2787'],
                    addDataAnimation:true,
                    animationDuration: 4000,//动画展示效果时间
                    series: [
                        {
                            name: '办结率',
                            type: 'gauge',
                            splitNumber : 10,
                            radius: '90%',
                            pointer : {
                                width : 5  
                            },
                            center:['50%', '60%'],
                            detail: {
                                offsetCenter: ['0%', 20],
                                formatter: '{value}%',
                                textStyle : { // 其余属性默认使用全局文本样式，详见TEXTSTYLE  
                                    fontFamily: 'Microsoft YaHei',
                                    fontSize : '20'  
                                }  
                            },
                            axisLine: { //坐标轴线，默认显示 
                                lineStyle : { // 属性lineStyle控制线条样式  
                                    color: [[0.2, '#ff4500'],[0.4, 'orange'],[0.8, 'skyblue'],[1, 'lightgreen']],  
                                    width: '20'
                                } 
                            },
                            splitLine : { // 分隔线  
                                show : true, // 默认显示，属性show控制显示与否  
                                length : '20', // 属性length控制线长  
                                lineStyle : { // 属性lineStyle（详见lineStyle）控制线条样式  
                                    color : 'auto'  
                                }  
                            },
                            data: [{value: 98.3, name: '办结率'}]
                        }
                    ]
                });
            },
            drawCharts() {
                this.drawMapChart()
                this.drawLineChart()
                this.drawPieChart1()
                this.drawGaugeChart()
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
    .content-title{
        font-weight: bold;
        line-height: 20px;
        margin: 10px 10px;
        font-size: 18px;
        color: #1f2f3d;
    }
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

    .grid-content {
        display: flex;
        align-items: center;
        height: 130px;
    }

    .grid-content-chart {
        display: flex;
        align-items: center;
        height: 120px;
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

    .grid-num {
        font-size: 26px;
        font-weight: bold;
    }

    .font-size-50 {
        font-size: 50px;
        font-weight: bold;
    }

    .font-size-25 {
        font-size: 25px;
        font-weight: bold;
    }

    .grid-num-bottom {
        font-weight: bold;
        color:gray;
    }
   
    .grid-num-blue {
        color:  rgb(45, 140, 240);
    }
    
    .grid-num-blue1 {
        color:  #30E1D9;
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
