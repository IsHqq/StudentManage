<template>
    <div class="login-wrap">
        <div class="ms-login">
            <div class="ms-title">新用户注册</div>
            <el-form  label-width="100px">
                <el-form-item label="请选择身份：" >
                    <el-radio-group v-model="radioTreaty" @change="agreeChange">
                       <el-radio  label="1">教师</el-radio>
                       <el-radio  label="2">学生</el-radio>
                    </el-radio-group>
                 </el-form-item>
            </el-form>
            <div class="login-btn">
                <el-button type="primary" @click="to_register()">下一步</el-button>
            </div>



        </div>
    </div>
</template>

<script>
    export default {
        data: function() {
            return {
                radioTreaty: '1',
                btnstatus:true,
            };
        },
        methods: {
            agreeChange:function(val){
                let that = this
                that.radioTreaty = val;
                //that.btnstatus=(val==='1')?true:false;
               // localStorage.setItem('ident',val);
                //this.$message.success('当前 '+ val);
            },
            to_register(){
              //  this.$message.success(' '+ this.radioTreaty);
                if (this.radioTreaty == 1) {
                    this.$router.push( '/L_Register');
                }else{
                    this.$router.push( '/L_Reg_s');
                    //this.$message.success('当前 '+ this.radioTreaty);
                }

            }

        },
    };
</script>

<style scoped>
    .login-wrap {
        position: relative;
        width: 100%;
        height: 100%;
        background-image: url(../../assets/img/bg.jpg);
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