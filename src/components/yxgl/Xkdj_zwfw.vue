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

        <div class="titleDiv">
            <span>基本信息</span>
        </div>
        <div class="container">
            <div class="form-box">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="办件名称：" prop="bjmc" :label-width="labelWidth">
                        <el-input v-model="ruleForm.bjmc"></el-input>
                    </el-form-item>
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
                                    <el-input v-model="ruleForm.zrr_zjhm"></el-input>
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
                                    <el-input v-model="ruleForm.fr_zjhm"></el-input>
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
            <span>业务信息</span>
        </div>
        <div class="container">
            <div class="form-box">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
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
                            <el-form-item label="路线桩号：" prop="luxzh" :label-width="labelWidth">
                                <el-input v-model="ruleForm.luxzh"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="办件摘要：" prop="banjzy" :label-width="labelWidth">
                                <el-input v-model="ruleForm.banjzy"></el-input>
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
                            <el-form-item label="所在路线：" prop="suozlx" :label-width="labelWidth">
                                <el-input v-model="ruleForm.suozlx"></el-input>
                            </el-form-item>
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
            <span>材料信息</span>
        </div>
        <div class="container">
            <div class="form-box">
                <el-table
                    :data="tableData"
                    border
                    class="table"
                    ref="multipleTable"
                    header-cell-class-name="table-header"
                >
                    <el-table-column prop="id" label="序号" min-width="10%" align="center"></el-table-column>
                    <el-table-column prop="cailmc" min-width="20%"  label="材料名称" align="center"></el-table-column>
                    <el-table-column label="是否必须" min-width="10%" align="center">
                        <template scope="scope">
                            <span v-if="scope.row.shifbx=='是'" style="color:red;">是</span>
                            <span v-if="scope.row.shifbx=='否'" >否</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="yiscwj" min-width="30%" label="已上传文件" align="center"></el-table-column>
                    <el-table-column label="文件上传" min-width="30%" align="center">
                        <template slot-scope="scope">
                            <!-- <el-upload ref="upload" :data="uploadData" :show-file-list="false" action="uploadUrl" 
                                    :on-success="handleSucess" :on-error="handleError" :auto-upload="true">
                                <el-button size="small" type="primary" @click="curRowIndex=scope.$index">点击上传</el-button>
                            </el-upload> -->
                            <el-button
                                type="text"
                                icon="el-icon-bank-card"
                                @click="zhengzsc(scope.$index, scope.row)"
                            >证照上传</el-button>
                            <el-button
                                type="text"
                                icon="el-icon-folder-opened"
                                class="red"
                                @click="xuanzwj(scope.$index, scope.row)"
                            >选择文件</el-button>
                            <span v-if="scope.row.yiscwj==''">还未上传</span>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>

    </div>
</template>
<script>
import bus from '../common/bus';
export default {
    data() {
      return {
        labelWidth:"170px",
        ruleForm: {
          bjmc: '',
          sqzlb: '自然人',
        },
        rules: {
          bjmc: [
            { required: true, message: '请输入办件名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
        },
        tableData: [
            {id: '1',cailmc: '许可申请表',shifbx: '是',yiscwj:''}, 
            {id: '2',cailmc: '建设单位有效身份证明材料',shifbx: '是',yiscwj:''}, 
            {id: '3',cailmc: '项目批准材料复印件',shifbx: '是',yiscwj:''}, 
            {id: '4',cailmc: '公路路产损失赔补偿方案、协议或承诺书',shifbx: '是',yiscwj:''}, 
            {id: '5',cailmc: '设计方案',shifbx: '是',yiscwj:''}, 
            {id: '6',cailmc: '施工方案',shifbx: '是',yiscwj:''}, 
            {id: '7',cailmc: '安全建议及保障措施',shifbx: '是',yiscwj:''}, 
            {id: '8',cailmc: '交通组织方案',shifbx: '否',yiscwj:''}, 
            {id: '9',cailmc: '保障公路、公路附属设施质量和安全的技术评价报告',shifbx: '是',yiscwj:''}
        ],
        uploadData: {
            file_key: 'file',
            business_id: '',
            },
            uploadUrl: '',
            curRowIndex: null,
        };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      handleSucess(response, file, fileList){
		console.log('handleSucess',file)
      },
      handleError(err, file, fileList){
		console.log('handleError',file)
	  }
    }
  }
</script>
<style scoped>
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
</style>
