<template>
    <div class="login-wrap">
        <div class="ms-login">
            <div class="ms-title">新用户注册</div>
            <el-form :model="userparam" :rules="rules" ref="register" label-width="0px" class="ms-content">
                <el-form-item prop="username">
                    <el-input v-model="userparam.username" placeholder="username">
                        <el-button slot="prepend" icon="el-icon-lx-people"></el-button>
                    </el-input>
                </el-form-item>
                <el-form-item prop="tnum">
                    <el-input v-model="userparam.tnum" placeholder="tnum">
                        <el-button slot="prepend" icon="el-icon-lx-people"></el-button>
                    </el-input>
                </el-form-item>
                <el-form-item prop="college">
                    <el-input
                            placeholder="college"
                            v-model="userparam.college"
                    >
                        <el-button slot="prepend" icon="el-icon-lx-people"></el-button>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input
                            type="password"
                            placeholder="password"
                            v-model="userparam.password"
                            @keyup.enter.native="register()"
                    >
                        <el-button slot="prepend" icon="el-icon-lx-lock"></el-button>
                    </el-input>
                </el-form-item>

                <div class="login-btn">
                    <el-button type="primary" @click="register()">注册</el-button>
                </div>
            </el-form>
        </div>
    </div>
</template>

<script>
    export default {
        data: function() {
            return {
                userparam: {//data
                    username: '',
                    tnum:'',
                    college:'',
                    password: '',
                },
                rules: {//validation
                    username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
                    tnum: [{ required: true, message: '请输入工号', trigger: 'blur' }],
                    college: [{ required: true, message: '请输入学院', trigger: 'blur' }],
                    password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
                },
            };
        },
        methods: {
            register(){
                this.$refs.register.validate(valid => {
                    if (valid) {
                        localStorage.setItem('user',this.userparam.username);
                        localStorage.setItem('tnum',this.userparam.tnum);
                        localStorage.setItem('pwd',this.userparam.password);
                        localStorage.setItem('college',this.userparam.college);
                        this.$message.success('注册成功');
                        this.$router.push( '/');
                    };
                })

            }
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