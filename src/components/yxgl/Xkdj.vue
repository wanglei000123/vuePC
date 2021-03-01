<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-calendar"></i> 运行管理
                </el-breadcrumb-item>
                <el-breadcrumb-item>许可登记</el-breadcrumb-item>
            </el-breadcrumb>
        </div>

        <el-dropdown
            size="small"
            placement="bottom"
            trigger="click"
            @command="batchOperate"
            style="margin-left: 10px;">
            <el-button type="primary">
                下一步
                <i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="flow_xingssc">形式审查</el-dropdown-item>
                <el-dropdown-item command="flow_kuaijcl">快捷处理</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
        <el-button type="primary" style="margin-left: 10px;" @click="save('ruleForm')">
            保存
        </el-button>
        <el-button type="primary" @click="returnBack">
            返回
        </el-button>

        <div class="titleDiv" style="margin-top: 20px;">
            <span>许可事项信息</span>
        </div>
        <div class="container">
            <div class="form-box">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                    <!-- <el-form-item label="办件名称：" prop="banjmc" :label-width="labelWidth">
                        <el-input v-model="ruleForm.banjmc"></el-input>
                    </el-form-item> -->
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="办件名称：" prop="banjmc" :label-width="labelWidth">
                                <el-input v-model="ruleForm.banjmc"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="事项地点：" prop="shixdd" :label-width="labelWidth">
                                <el-input v-model="ruleForm.shixdd"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="所在路线：" prop="suozlx" :label-width="labelWidth">
                                <el-input v-model="ruleForm.suozlx"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="路线桩号：" prop="luxzh" :label-width="labelWidth">
                                <el-input v-model="ruleForm.luxzh"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="申请类型：" prop="shenqlx" :label-width="labelWidth">
                                <el-select v-model="ruleForm.shenqlx" placeholder="请选择申请类型">
                                    <el-option label="一般申请" value="ybsq"></el-option>
                                    <el-option label="延续申请" value="yxsq"></el-option>
                                    <el-option label="变更申请" value="bgsq"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="延续、变更申请原案号：" prop="yuanah" :label-width="labelWidth">
                                <el-input v-model="ruleForm.yuanah"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="指定许可单位：" prop="zhidxkdw" :label-width="labelWidth">
                                <el-input v-model="ruleForm.zhidxkdw"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </div>
        </div>
        <br/>

        <div class="titleDiv">
            <span>申请人信息</span>
        </div>
        <div class="container">
            <div class="form-box">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="申请者类别："  prop="sqzlb" :label-width="labelWidth">
                        <el-radio-group v-model="ruleForm.sqzlb">
                        <el-radio label="自然人"></el-radio>
                        <el-radio label="法人"></el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <div v-if="ruleForm.sqzlb==='自然人'">
                        <el-form-item label="姓名：" prop="zrr_xingm" :label-width="labelWidth">
                            <el-input v-model="ruleForm.zrr_xingm"></el-input>
                        </el-form-item>
                        <el-row>
                            <el-col :span="12">
                                <el-form-item label="证件类型：" prop="zrr_zjlx" :label-width="labelWidth">
                                    <el-select v-model="ruleForm.zrr_zjlx" placeholder="请选择证件类型">
                                        <el-option label="身份证" value="sfz"></el-option>
                                        <el-option label="护照" value="hz"></el-option>
                                        <el-option label="居住证" value="jzz"></el-option>
                                        <el-option label="台胞证" value="tbz"></el-option>
                                        <el-option label="通行证" value="txz"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="证件号码：" prop="zrr_zjhm" :label-width="labelWidth">
                                    <el-input v-model="ruleForm.zrr_zjhm" style="width: 200px;"></el-input>
                                    <el-button type="primary" style="margin-left: 10px;" >
                                        身份校验
                                    </el-button>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="12">
                                <el-form-item label="电话：" prop="zrr_dianh" :label-width="labelWidth">
                                    <el-input v-model="ruleForm.zrr_dianh"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="电子邮箱：" prop="zrr_dianzyx" :label-width="labelWidth">
                                    <el-input v-model="ruleForm.zrr_dianzyx"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="12">
                                <el-form-item label="地址：" prop="zrr_diz" :label-width="labelWidth">
                                    <el-input v-model="ruleForm.zrr_diz"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="邮编：" prop="zrr_youb" :label-width="labelWidth">
                                    <el-input v-model="ruleForm.zrr_youb"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </div>
                    <div v-if="ruleForm.sqzlb==='法人'">
                        <el-form-item label="单位名称：" prop="fr_danwmc" :label-width="labelWidth">
                            <el-input v-model="ruleForm.fr_danwmc"></el-input>
                        </el-form-item>
                        <el-row>
                            <el-col :span="12">
                                <el-form-item label="证件类型：" prop="fr_zjlx" :label-width="labelWidth">
                                    <el-select v-model="ruleForm.fr_zjlx" placeholder="请选择证件类型">
                                        <el-option label="统一社会信用代码" value="tyshxydm"></el-option>
                                        <el-option label="组织机构代码" value="zzjgdm"></el-option>
                                        <el-option label="工商登记码" value="gsdjm"></el-option>
                                        <el-option label="税务登记号" value="swdjh"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="证件号码：" prop="fr_zjhm" :label-width="labelWidth">
                                    <el-input v-model="ruleForm.fr_zjhm" style="width: 200px;"></el-input>
                                    <el-button type="primary" style="margin-left: 10px;" >
                                        身份校验
                                    </el-button>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="12">
                                <el-form-item label="法人/负责人：" prop="fr_farxm" :label-width="labelWidth">
                                    <el-input v-model="ruleForm.fr_farxm"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="法人/负责人证件：" prop="fr_farzj" :label-width="labelWidth">
                                    <el-input v-model="ruleForm.fr_farzj"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </div>
                </el-form>
            </div>
        </div>
        <br/>

        <div class="titleDiv">
            <span>EMS收件人信息</span>
        </div>
        <div class="container">
            <div class="form-box">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="收件人姓名：" prop="shoujrxm" :label-width="labelWidth">
                                <el-input v-model="ruleForm.shoujrxm"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="收件人电话：" prop="shoujrdh" :label-width="labelWidth">
                                <el-input v-model="ruleForm.shoujrdh"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24">
                            <el-form-item label="收件省/市/县：" prop="shoujssx" :label-width="labelWidth">
                                <v-distpicker  v-model="ruleForm.shoujssx" province="江苏省" city="南京市" area="鼓楼区"></v-distpicker>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="收件地址：" prop="shoujdz" :label-width="labelWidth">
                                <el-input v-model="ruleForm.shoujdz"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="收件邮编：" prop="shoujyb" :label-width="labelWidth">
                                <el-input v-model="ruleForm.shoujyb"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </div>
        </div>
        <br/>

        <div class="titleDiv">
            <span>办理摘要和附件</span>
        </div>
        <div class="container">
            <div class="form-box">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                    <el-row>
                        <el-col :span="24">
                            <el-form-item label="办理摘要：" prop="banlzy" :label-width="labelWidth">
                                <el-input v-model="ruleForm.banlzy"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="24">
                            <el-form-item label="附件上传：" prop="fujsc" :label-width="labelWidth">
                                <el-upload
                                    class="upload-demo"
                                    drag
                                    action="https://jsonplaceholder.typicode.com/posts/"
                                    multiple>
                                    <i class="el-icon-upload"></i>
                                    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                                    <!-- <div class="el-upload__tip" slot="tip">只能上传不超过500kb</div> -->
                                </el-upload>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </div>
        </div>

    </div>
</template>
<script>
import bus from '../common/bus';
import VDistpicker from 'v-distpicker';

export default {
    data() {
      return {
        labelWidth:"170px",
        ruleForm: {
            banjmc: '',
            shixdd: '',
            suozlx: '',
            luxzh: '',
            shenqlx: '',
            zrr_xingm: '',
            zrr_zjlx: '',
            zrr_zjhm: '',
            zrr_dianh: '',
            fr_danwmc: '',
            fr_zjlx: '',
            fr_zjhm: '',
            fr_farxm: '',
            shoujrxm: '',
            shoujrdh: '',
            shoujssx: '',
            shoujdz: '',
            sqzlb: '自然人',
            shenqlx: '一般申请',
            zrr_zjlx: '身份证',
            fr_zjlx: '统一社会信用代码'
        },
        rules: {
            banjmc: [
                { required: true, message: '请输入办件名称', trigger: 'blur' }
            ],
            shixdd: [
                { required: true, message: '请输入事项地点', trigger: 'blur' }
            ],
            suozlx: [
                { required: true, message: '请输入所在路线', trigger: 'blur' }
            ],
            luxzh: [
                { required: true, message: '请输入路线桩号', trigger: 'blur' }
            ],
            shenqlx: [
                { required: true, message: '请输入申请类型', trigger: 'blur' }
            ],
            zrr_xingm: [
                { required: true, message: '请输入自然人姓名', trigger: 'blur' }
            ],
            zrr_zjlx: [
                { required: true, message: '请输入自然人证件类型', trigger: 'blur' }
            ],
            zrr_zjhm: [
                { required: true, message: '请输入自然人证件号码', trigger: 'blur' }
            ],
            zrr_dianh: [
                { required: true, message: '请输入自然人电话', trigger: 'blur' }
            ],
            fr_danwmc: [
                { required: true, message: '请输入法人单位名称', trigger: 'blur' }
            ],
            fr_zjlx: [
                { required: true, message: '请输入法人证件类型', trigger: 'blur' }
            ],
            fr_zjhm: [
                { required: true, message: '请输入法人证件号码', trigger: 'blur' }
            ],
            fr_farxm: [
                { required: true, message: '请输入法人证件号码', trigger: 'blur' }
            ],
            shoujrxm: [
                { required: true, message: '请输入法人收件人姓名', trigger: 'blur' }
            ],

            shoujrdh: [
                { required: true, message: '请输入收件人电话', trigger: 'blur' }
            ],
            shoujssx: [
                { required: true, message: '请输入收件省/市/县', trigger: 'blur' }
            ],
            shoujdz: [
                { required: true, message: '请输入收件地址', trigger: 'blur' }
            ],

        },
        };
    },
    components: {
        VDistpicker
    },
    methods: {
        batchOperate(command) {
            switch (command) {
                case "flow_xingssc":
                this.xingsscFlow();
                break;
                case "flow_kuaijcl":
                this.kuaijclFlow();
                break;
            }
        },
        save(formName) {
            this.$refs[formName].validate((valid) => {
            if (valid) {
                var formData = this.$refs[formName].model;//表单数据获取
                formData.status='许可登记';
                localStorage.setItem();
            } else {
                console.log('error submit!!');
                return false;
            }
            });
        },
        returnBack() {
            this.$router.go(-1);//返回上一层
        },
        xingsscFlow() {
            console.log("xingsscFlow")
        },
        kuaijclFlow() {
            console.log("kuaijclFlow")
        },
    }
  }
</script>
<style>
.titleDiv{
    padding: 12px;
    background-color:#c0c4cc;
}
.el-card__header{
    padding:10px 20px;
}
.container{
    border-radius:0px 0px 5px 5px;
}
.form-box{
    width: 100%;
}
.el-form .el-select{
  width: 80%;
}
.el-input{
    width: 80%;
}
.distpicker-address-wrapper select{
    width: 176px;
}
</style>
