<template>
    <div>
        <el-row>
            <el-col :span='24'>
                <el-table size="mini" :data="dataTabl" border style="width: 100%" highlight-current-row>
                    <el-table-column type="selection" min-width="3%" align="center"></el-table-column>
                    <el-table-column prop="id" label="序号" min-width="7%" align="center" type="index" ></el-table-column>
                    <el-table-column prop="cailmc" align="center" label="材料名称" min-width="35%" >
                        <template scope="scope">
                            <span v-if="scope.row.isSet">
                                <el-input v-model="sel.cailmc" placeholder="请输入材料名称"></el-input>
                            </span>
                            <span style="color:#0000EE;" v-else>{{scope.row.cailmc}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="shifbx" align="center" label="是否必须(是/否)" min-width="10%">
                        <template scope="scope">
                            <span v-if="scope.row.isSet">
                                <el-select v-model="sel.shifbx" :clearable="true" placeholder="请选择">
                                    <el-option key="1" label="是" value="是"></el-option>
                                    <el-option key="2" label="否" value="否"></el-option>
                                </el-select>
                            </span>
                            <span v-else>
                                <div style="color:#F56C6C;" v-if="scope.row.shifbx == '是'">
                                    {{scope.row.shifbx}}
                                </div>
                                <div v-else>
                                    {{scope.row.shifbx}}
                                </div>
                            </span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="mobwj" align="center" label="模板文件"  min-width="30%">
                        <template scope="scope">
                            <span v-if="scope.row.isSet">
                                <el-input v-model="sel.mobwj" readonly="readonly"></el-input>
                            </span>
                            <span v-else>
                                <a :href="'http://'+scope.row.mobwj" target="_blank" class="buttonText">{{scope.row.mobwj}}</a>
                            </span>
                        </template>
                    </el-table-column>

                    <el-table-column label="操作" align="center" min-width="15%">
                        <template slot-scope="scope">
                            <!-- <span class="el-tag el-tag--info el-tag--mini mr10" style="cursor: pointer;" @click="cailChange(scope.row,scope.$index,true)">
                                {{scope.row.isSet?'保存':"修改"}}
                            </span> -->
                            <span v-if="scope.row.isSet" class="el-tag el-tag--mini mr10" style="cursor: pointer;" @click="cailChange(scope.row,scope.$index,true)">
                                保存
                            </span>
                            <!-- <span v-if="!scope.row.isSet" class="el-tag el-tag--danger el-tag--mini mr10" style="cursor: pointer;" @click="delCailChange(scope.row,scope.$index)">
                                删除
                            </span> -->
                            <span v-if="scope.row.isSet" class="el-tag el-tag--danger el-tag--mini mr10" style="cursor: pointer;" @click="cailChange(scope.row,scope.$index,false)">
                                取消
                            </span>
                            <div style="text-align: center;" v-if="!scope.row.isSet">
                                <span class="el-tag el-tag--green el-tag--mini mr10" style="cursor: pointer;" @click="cailUpload(scope.row, scope.$index, $event)">
                                    材料上传
                                </span>
                                <input style="display: none;" type="file" name="check_img_url" @change="tirggerFile(scope.row, scope.$index, $event)" />
                            </div>
                        </template>
                    </el-table-column>
                </el-table>
            </el-col>
            <el-col :span='24'>
                <div class="el-table-add-row" style="width: 99.2%;" @click="addCail()"><span>+ 添加</span></div>
            </el-col>
        </el-row>
    </div>
</template>

 <!-- import Vue before Element -->
<script src="https://unpkg.com/vue@2.5.17/dist/vue.min.js"></script>
<!-- import JavaScript -->
<script src="https://unpkg.com/element-ui/lib/index.js"></script>
<script>
//id生成工具 这个不用看 示例而已 模拟后台返回的id
var generateId = {
    _count: 1,
    get(){return ((+new Date()) + "_" + (this._count++))}
};

export default {
    data() {
        return {
            sel: null,//选中行   
            dataTabl: [
                {
                    "id":"1",
                    "cailmc":"涉路施工活动许可申请表",
                    "shifbx":"是",
                    "mobwj":"示例样表",
                    "isSet": false, 
                    "_temporary": true 
                },
                {
                    "id":"2",
                    "cailmc":"建设单位有效身份证明材料",
                    "shifbx":"是",
                    "mobwj":"示例样表",
                     "isSet": false, 
                    "_temporary": true 
                },
                {
                    "id":"3",
                    "cailmc":"工程建设项目批准材料",
                    "shifbx":"是",
                    "mobwj":"示例样表",
                     "isSet": false, 
                    "_temporary": true 
                },
                {
                    "id":"4",
                    "cailmc":"设计方案",
                    "shifbx":"是",
                    "mobwj":"示例样表",
                     "isSet": false, 
                    "_temporary": true 
                },
                {
                    "id":"5",
                    "cailmc":"施工方案",
                    "shifbx":"是",
                    "mobwj":"示例样表",
                     "isSet": false, 
                    "_temporary": true 
                },
                {
                    "id":"6",
                    "cailmc":"施工现场管理方案",
                    "shifbx":"是",
                    "mobwj":"示例样表",
                     "isSet": false, 
                    "_temporary": true 
                },
                {
                    "id":"7",
                    "cailmc":"交通组织方案",
                    "shifbx":"是",
                    "mobwj":"示例样表",
                     "isSet": false, 
                    "_temporary": true 
                },
                {
                    "id":"8",
                    "cailmc":"处置施工险情和意外事故的应急方案",
                    "shifbx":"是",
                    "mobwj":"示例样表",
                     "isSet": false, 
                    "_temporary": true 
                },
                {
                    "id":"9",
                    "cailmc":"保障公路、公路附属设施质量和安全的技术评价报告",
                    "shifbx":"是",
                    "mobwj":"示例样表",
                     "isSet": false, 
                    "_temporary": true 
                },
                {
                    "id":"10",
                    "cailmc":"对公路路产损失的恢复或者补偿方案",
                    "shifbx":"是",
                    "mobwj":"示例样表",
                     "isSet": false, 
                    "_temporary": true 
                }
            ],
        }
    },
    methods: {
        //读取表格数据
        readCail() {
            //根据实际情况，自己改下啊 
            this.dataTabl.map(i => {
                i.id = generateId.get();//模拟后台插入成功后有了id
                i.isSet=false;//给后台返回数据添加`isSet`标识
                return i;
            });
        },
        //新增材料
        addCail() {
            for (let i of this.dataTabl) {
                if (i.isSet) return this.$message.warning("请先保存当前编辑项");
            }
            let j = { id: 0, "cailmc": "", "shifbx": "", "mobwj": "", "isSet": true, "_temporary": true };
            this.dataTabl.push(j);
            this.sel = JSON.parse(JSON.stringify(j));
        },
        //修改
        cailChange(row, index, cg) {
            //点击修改 判断是否已经保存所有操作
            for (let i of this.dataTabl) {
                if (i.isSet && i.id != row.id) {
                    this.$message.warning("请先保存当前编辑项");
                    return false;
                }
            }
            //是否是取消操作
            if (!cg) {
                if (!this.sel.id) this.dataTabl.splice(index, 1);
                return row.isSet = !row.isSet;
            }
            //提交数据
            if (row.isSet) {
                let data = JSON.parse(JSON.stringify(this.sel));
                for (let k in data) row[k] = data[k];
                this.$message({
                    type: 'success',
                    message: "保存成功!"
                });
                //然后这边重新读取表格数据
                this.readCail();
                row.isSet = false;
            } else {
                this.sel = JSON.parse(JSON.stringify(row));
                row.isSet = true;
            }
        },
        cailUpload(row, index, e) {
           e.currentTarget.nextElementSibling.click();
        },
        tirggerFile(row, index, event) {
            var file = event.target.files;
            var filename = file[0].name;
            row.mobwj = filename;
        },
        //删除
        delCailChange(row, index) {
            this.dataTabl.splice(index, 1);
            return row.isSet = !row.isSet;
        },
        addActive($event){
            $event.currentTarget.style.textDecoration="underline";
            $event.currentTarget.style.cursor="default";
        },
        removeActive($event){
            $event.currentTarget.style.textDecoration="none";
        }
    }
}
</script>
<style scoped>
    .el-table-add-row {
        margin-top: 10px;
        width: 100%;
        height: 34px;
        border: 1px dashed #c1c1cd;
        border-radius: 3px;
        cursor: pointer;
        justify-content: center;
        display: flex;
        line-height: 34px;
    }

    .mr10 {
        margin-right: 10px;
    }

    input[type="file" i] {
        -webkit-appearance: initial;
        background-color: initial;
        cursor: default;
        align-items: baseline;
        color: inherit;
        text-align: start !important;
        padding: initial;
        border: initial;
        font-size: 10px;
    }
</style>