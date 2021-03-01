<template>
    <div class="wrapper">
        <div class="container">
            <div class="handle-box">
                <!-- 树形下拉框  -->
                <template>
                    <el-form :inline="true" :v-model="form" class="demo-form-inline" size="mini" >
                        <el-row>
                            <el-col :span='24'>
                                <el-form-item label="事项类型">
                                    <el-select v-model="form.shixlx" :clearable="true" placeholder="事项类型" class="handle-select mr10">
                                        <el-option key="1" label="行政许可" value="行政许可"></el-option>
                                        <el-option key="2" label="行政确认" value="行政确认"></el-option>
                                        <el-option key="3" label="其他" value="其他"></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="行业类别">
                                    <el-select v-model="form.hangylb" :clearable="true" placeholder="行业类别" class="handle-select mr10">
                                        <el-option key="1" label="公路管理" value="公路管理"></el-option>
                                        <el-option key="2" label="运输管理" value="运输管理"></el-option>
                                        <el-option key="3" label="航道管理" value="航道管理"></el-option>
                                        <el-option key="4" label="港口管理" value="港口管理"></el-option>
                                        <el-option key="5" label="建设管理" value="建设管理"></el-option>
                                        <el-option key="6" label="地方海事" value="地方海事"></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="事项属性">
                                    <el-select v-model="form.shixsx" :clearable="true" placeholder="事项属性" class="handle-select mr10">
                                        <el-option key="1" label="共性事项" value="共性事项"></el-option>
                                        <el-option key="2" label="属地事项" value="属地事项"></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="事项级别">
                                    <el-select v-model="form.shixjb" :clearable="true" placeholder="事项级别" class="handle-select mr10">
                                        <el-option key="1" label="省级" value="省级"></el-option>
                                        <el-option key="2" label="设区市级" value="设区市级"></el-option>
                                        <el-option key="3" label="县级" value="县级"></el-option>
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
                                <el-form-item label="关键词">
                                    <el-input v-model="form.guanjc" placeholder="关键词" class="handle-input mr10"></el-input>
                                </el-form-item>
                                <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
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
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column prop="id" label="序号" width="55" align="center"></el-table-column>
                <el-table-column prop="shixlx" label="事项类型" align="center"></el-table-column>
                <el-table-column prop="shixjb" label="事项级别" align="center"></el-table-column>
                <el-table-column prop="hangylb" label="行业类别" align="center"></el-table-column>
                <el-table-column prop="shixmc" label="事项名称" width="300" align="center"></el-table-column>
                <el-table-column prop="banldw" label="办理单位" width="200" align="center" ></el-table-column>
                <el-table-column label="事项配置" width="180" align="center">
                    <template slot-scope="scope">
                        <el-button
                            type="text"
                            icon="el-icon-s-operation"
                            @click="handleLiuc(scope.$index, scope.row)"
                        >流程</el-button>
                        <el-button
                            type="text"
                            icon="el-icon-s-order"
                            @click="handleForm(scope.$index, scope.row)"
                        >表单</el-button>
                        <el-button
                            type="text"
                            icon="el-icon-document"
                            @click="handleWens(scope.$index, scope.row)"
                        >文书</el-button>
                        <el-button
                            type="text"
                            icon="el-icon-document-copy"
                            @click="handleCail(scope.$index, scope.row)"
                        >材料</el-button>
                        <el-button
                            type="text"
                            icon="el-icon-s-custom"
                            @click="handleZhengz(scope.$index, scope.row)"
                        >证照</el-button>
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

        <!-- 流程 -->
        <el-dialog title="流程选择" :visible.sync="dialogFormLiucVisible" width="40%">
            <el-form :model="form">
                <el-form-item label="流程名称" :label-width="formLabelWidth">
                <el-select v-model="form.flow" placeholder="请选择流程">
                    <el-option label="政务服务办理流程_高速公路占用挖掘" value="政务服务办理流程_高速公路占用挖掘"></el-option>
                    <el-option label="许可审批" value="许可审批"></el-option>
                </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormLiucVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogFormLiucVisible = false">确 定</el-button>
            </div>
        </el-dialog>

        <!-- 表单 -->
        <el-dialog title="表单选择" :visible.sync="biaodVisible" width="60%">
            <el-table
                :data="biaodTableData"
                border
                class="table"
                ref="multipleTable"
                header-cell-class-name="table-header"
                @selection-change="biaodhandleSelectionChange"
            >
                <el-table-column type="selection" min-width="5%" align="center"></el-table-column>
                <el-table-column prop="id" label="序号" min-width="10%" align="center"></el-table-column>
                <el-table-column prop="biaodmc" label="表单名称" min-width="30%" align="center"></el-table-column>
                <el-table-column prop="xiansmb" label="显示模板" min-width="25%" align="center"></el-table-column>
                <el-table-column prop="daymb" label="打印模板" min-width="30%" align="center"></el-table-column>
            </el-table>
            <div slot="footer" class="dialog-footer">
                <el-button @click="biaodVisible = false">取 消</el-button>
                <el-button type="primary" @click="biaodVisible = false">确 定</el-button>
            </div>
        </el-dialog>

        <!-- 材料 -->
         <el-dialog title="材料选择" :visible.sync="clglVisible" width="85%">
            <v-Clgl></v-Clgl>
            <span slot="footer" class="dialog-footer">
                <el-button @click="clglVisible = false">取 消</el-button>
                <el-button type="primary" @click="clglVisible = false">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 文书 -->
        <el-dialog title="文书选择" :visible.sync="wensVisible" width="60%">
            <el-table
                :data="wensTableData"
                border
                class="table"
                ref="multipleTable"
                header-cell-class-name="table-header"
                @selection-change="wenshandleSelectionChange"
            >
                <el-table-column type="selection" min-width="5%" align="center"></el-table-column>
                <el-table-column prop="id" label="序号" min-width="10%" align="center"></el-table-column>
                <el-table-column prop="wensmc" label="文书名称" min-width="30%" align="center"></el-table-column>
                <el-table-column prop="wenslx" label="文书类型" min-width="25%" align="center"></el-table-column>
                <el-table-column prop="wenssm" label="文书说明" min-width="30%" align="center"></el-table-column>
            </el-table>
            <div slot="footer" class="dialog-footer">
                <el-button @click="wensVisible = false">取 消</el-button>
                <el-button type="primary" @click="wensVisible = false">确 定</el-button>
            </div>
        </el-dialog>

        <!-- 证照 -->
        <el-dialog title="证照选择" :visible.sync="zhengzVisible" width="60%">
            <el-table
                :data="zhengzTableData"
                border
                class="table"
                ref="multipleTable"
                header-cell-class-name="table-header"
                @selection-change="zhengzhandleSelectionChange"
            >
                <el-table-column type="selection" min-width="5%" align="center"></el-table-column>
                <el-table-column prop="id" label="序号" min-width="10%" align="center"></el-table-column>
                <el-table-column prop="zhengzmc" label="证照名称" min-width="30%" align="center"></el-table-column>
                <el-table-column prop="zhengzlx" label="证照类型" min-width="25%" align="center"></el-table-column>
                <el-table-column prop="zhengzsm" label="证照说明" min-width="30%" align="center"></el-table-column>
            </el-table>
            <div slot="footer" class="dialog-footer">
                <el-button @click="zhengzVisible = false">取 消</el-button>
                <el-button type="primary" @click="zhengzVisible = false">确 定</el-button>
            </div>
        </el-dialog>

    </div>
</template>

<script>
import { fetchData } from './Zwfwsxcx';
import vClgl from '@/components/clzgl/Clgl.vue';
export default {
    name: 'basetable',
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
            query: {
                shixlx: '',
                hangylb: '',
                shixsx: '',
                shixjb: '',
                banldw: '',
                guanjc: '',
                pageIndex: 1,
                pageSize: 10
            },
            tableData: [],
            multipleSelection: [],
            biaodmultipleSelection: [],
            wensmultipleSelection: [],
            zhengzmultipleSelection: [],
            pageTotal: 0,
            pageTotal: 0,
            pageTotal: 0,
            pageTotal: 0,
            dialogFormLiucVisible: false,
            clglVisible: false,
            biaodVisible: false,
            wensVisible: false,
            zhengzVisible: false,
            biaodTableData: [{
                "id": 1,
                "biaodmc": "许可登记",
                "xiansmb": "显示模板",
                "daymb": "打印模板"
            },{
                "id": 2,
                "biaodmc": "初审",
                "xiansmb": "显示模板",
                "daymb": "打印模板"
            },{
                "id": 3,
                "biaodmc": "技术审查",
                "xiansmb": "显示模板",
                "daymb": "打印模板"
            },{
                "id": 4,
                "biaodmc": "审核",
                "xiansmb": "显示模板",
                "daymb": "打印模板"
            },{
                "id": 5,
                "biaodmc": "许可决定",
                "xiansmb": "显示模板",
                "daymb": "打印模板"
            },{
                "id": 6,
                "biaodmc": "文书复核",
                "xiansmb": "显示模板",
                "daymb": "打印模板"
            },{
                "id": 7,
                "biaodmc": "送达",
                "xiansmb": "显示模板",
                "daymb": "打印模板"
            },{
                "id": 8,
                "biaodmc": "归档",
                "xiansmb": "显示模板",
                "daymb": "打印模板"
            }],
            wensTableData: [{
                "id": 1,
                "wensmc": "文书送达回证",
                "wenslx": ".doc",
                "wenssm": "文书送达回证"
            },{
                "id": 2,
                "wensmc": "交通行政许可准予延续决定书",
                "wenslx": ".doc",
                "wenssm": "交通行政许可准予延续决定书"
            },{
                "id": 3,
                "wensmc": "交通行政许可准予变更决定书",
                "wenslx": ".doc",
                "wenssm": "交通行政许可准予变更决定书"
            },{
                "id": 4,
                "wensmc": "交通行政许可事项核查意见书",
                "wenslx": ".doc",
                "wenssm": "交通行政许可事项核查意见书"
            },{
                "id": 5,
                "wensmc": "交通行政许可审查意见书",
                "wenslx": ".doc",
                "wenssm": "交通行政许可审查意见书"
            },{
                "id": 6,
                "wensmc": "交通行政许可申请材料清单",
                "wenslx": ".doc",
                "wenssm": "交通行政许可申请材料清单"
            },{
                "id": 7,
                "wensmc": "交通行政许可申请不予受理决定 ",
                "wenslx": ".doc",
                "wenssm": "交通行政许可申请不予受理决定书"
            },{
                "id": 8,
                "wensmc": "不予交通行政许可决定书",
                "wenslx": ".doc",
                "wenssm": "不予交通行政许可决定书"
            }],
            zhengzTableData: [{
                "id": 1,
                "zhengzmc": "超限运输车辆通行证",
                "zhengzlx": ".doc",
                "zhengzsm": "超限运输车辆通行证"
            },{
                "id": 2,
                "zhengzmc": "准予交通行政许可决定书",
                "zhengzlx": ".doc",
                "zhengzsm": "准予交通行政许可决定书"
            },{
                "id": 3,
                "zhengzmc": "材料组模板",
                "zhengzlx": ".doc",
                "zhengzsm": "材料组模板"
            },{
                "id": 4,
                "zhengzmc": "模板文件",
                "zhengzlx": ".doc",
                "zhengzsm": "模板文件"
            }],
            
        };
    },
    created() {
        this.getData();
    },
    components: {
        vClgl
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
        // 获取 easy-mock 的模拟数据
        getData() {
            fetchData(this.query).then(res => {
                console.log(res);
                this.tableData = res.list;
                // 过滤条件
                if (this.query.shixlx != '') {
                    this.tableData = this.tableData.filter(item => {
                        if (this.query.shixlx == item.shixlx) {
                            return true;
                        }
                    })
                } 
                if (this.query.hangylb != '') {
                    this.tableData = this.tableData.filter(item => {
                        if (this.query.hangylb == item.hangylb) {
                            return true;
                        }
                    })
                } 
                if (this.query.shixsx != '') {
                    this.tableData = this.tableData.filter(item => {
                        if (this.query.shixsx == item.shixsx) {
                            return true;
                        }
                    })
                } 
                if (this.query.shixjb != '') {
                    this.tableData = this.tableData.filter(item => {
                        if (this.query.shixjb == item.shixjb) {
                            return true;
                        }
                    })
                } 
                if (this.query.banldw != '') {
                    this.tableData = this.tableData.filter(item => {
                        if (this.query.banldw == item.banldw) {
                            return true;
                        }
                    })
                } 
                if (this.query.guanjc != '') {
                    this.tableData = this.tableData.filter(item => {
                        if (item.shixmc.indexOf(this.query.guanjc) != -1) {
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
            this.query.shixlx = (typeof this.form.shixlx !== 'undefined' && this.form.shixlx != '') ? this.form.shixlx : '';
            this.query.hangylb = (typeof this.form.hangylb !== 'undefined' && this.form.hangylb != '') ? this.form.hangylb : '';
            this.query.shixsx = (typeof this.form.shixsx !== 'undefined' && this.form.shixsx != '') ? this.form.shixsx : '';
            this.query.shixjb = (typeof this.form.shixjb !== 'undefined' && this.form.shixjb != '') ? this.form.shixjb : '';
            this.query.banldw = (typeof this.form.banldw !== 'undefined' && this.form.banldw != '') ? this.form.banldw : '';
            this.query.guanjc = (typeof this.form.guanjc !== 'undefined' && this.form.guanjc != '') ? this.form.guanjc : '';
            this.$set(this.query, 'pageIndex', 1);
            this.getData();
        },
        // 多选操作
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        // 多选操作
        biaodhandleSelectionChange(val) {
            this.biaodmultipleSelection = val;
        },
        // 多选操作
        wenshandleSelectionChange(val) {
            this.wensmultipleSelection = val;
        },
        // 多选操作
        zhengzhandleSelectionChange(val) {
            this.zhengzmultipleSelection = val;
        },
        // 流程操作
        handleLiuc(index, row) {
            this.dialogFormLiucVisible = true;
        },
        // 表单
        handleForm(index, row) {
            this.biaodVisible = true;
        },
        // 文书
        handleWens(index, row) {
            this.wensVisible = true;
        },
        // 材料
        handleCail(index, row) {
            this.clglVisible = true;
        },
        // 证照
        handleZhengz(index, row) {
            this.zhengzVisible = true;
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
html, body, #app, .wrapper {
    width: 100%;
    height: 100%;
    overflow: auto;
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
