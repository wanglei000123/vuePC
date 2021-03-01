<template>
    <div class="login-wrap">
        <div class="ms-login">
            <div class="ms-title">后台管理系统</div>
            <el-form :model="param" :rules="rules" ref="login" label-width="0px" class="ms-content">
                <el-form-item prop="username">
                    <el-input v-model="param.username" placeholder="username">
                        <el-button slot="prepend" icon="el-icon-lx-people"></el-button>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input
                        type="password"
                        placeholder="password"
                        v-model="param.password"
                        @keyup.enter.native="submitForm()"
                    >
                        <el-button slot="prepend" icon="el-icon-lx-lock"></el-button>
                    </el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm()">登录</el-button>
                </div>
                <p class="login-tips">Tips : 用户名和密码随便填。</p>
            </el-form>
        </div>
    </div>
</template>

<script>
export default {
    data: function() {
        return {
            param: {
                username: 'admin',
                password: '123123',
            },
            rules: {
                username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
                password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
            },
        };
    },
    methods: {
        submitForm() {
            this.$refs.login.validate(valid => {
                if (valid) {
                    this.$message.success('登录成功');
                    localStorage.setItem('ms_username', this.param.username);
                    this.$router.push('/');
                    this.$notify({
                        title: '通知',
                        dangerouslyUseHTMLString: true,
                        message: '<table style="clear:both;margin-left: 10px;font-size: 11px;line-height: 20px;display: inline;" width="224" border="0" cellspacing="0" cellpadding="0"><tbody><tr><td height="22" align="left" style="display: block;line-height: 22px;font-size: 12px;width: 170px;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">表彰公示</td><td align="center" width="150">2020-04-23 15:50</td></tr><tr><td height="22" style="display: block;line-height: 22px;font-size: 12px;width: 170px;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;" align="left">推荐全省交通运输行业精神文明建设先进集体先进个人公示</td><td align="center" width="150">2020-03-22 22:58</td></tr><tr><td height="22" style="display: block;line-height: 22px;font-size: 12px;width: 170px;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;" align="left">关于对拟推荐省级机关工委表彰的先进集体和优秀个人的公司</td><td align="center" width="150">2020-01-19 14:31</td></tr></tbody></table>',
                        position: 'bottom-right'
                    });
                } else {
                    this.$message.error('请输入账号和密码');
                    console.log('error submit!!');
                    return false;
                }
            });
        },
    },
};
</script>

<style scoped>
.login-wrap {
    position: relative;
    width: 100%;
    height: 100%;
    background-image: url(../../assets/img/login-bg.jpg);
    background-size: 100%;
}
.ms-title {
    width: 100%;
    line-height: 50px;
    text-align: center;
    font-size: 20px;
    color: #fff;
    border-bottom: 1px solid #ddd;
}
.ms-login {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 350px;
    margin: -190px 0 0 -175px;
    border-radius: 5px;
    background: rgba(255, 255, 255, 0.3);
    overflow: hidden;
}
.ms-content {
    padding: 30px 30px;
}
.login-btn {
    text-align: center;
}
.login-btn button {
    width: 100%;
    height: 36px;
    margin-bottom: 10px;
}
.login-tips {
    font-size: 12px;
    line-height: 30px;
    color: #fff;
}
</style>