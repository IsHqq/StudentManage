<template>
    <div class="login-wrap">
        <div class="ms-login">
            <div class="ms-title">新用户注册</div>
            <el-row gutter="5">
                <el-col :span="10" class="col">
                    <el-form :model="userparam" :rules="rules" ref="register" label-width="0px" class="ms-content">
                        <el-form-item prop="name">
                            <el-input v-model="userparam.sname" placeholder="姓名">
                                <el-button slot="prepend" icon="el-icon-lx-people"></el-button>
                            </el-input>
                        </el-form-item>
                        <el-form-item prop="num">
                            <el-input v-model="userparam.snum" placeholder="学号">
                                <el-button slot="prepend" icon="el-icon-lx-people"></el-button>
                            </el-input>
                        </el-form-item>
                        <el-form-item prop="num">
                            <el-input v-model="userparam.tnum" placeholder="导师工号">
                                <el-button slot="prepend" icon="el-icon-lx-people"></el-button>
                            </el-input>
                        </el-form-item>
                        <el-form-item prop="password">
                            <el-input
                                    type="password"
                                    placeholder="密码"
                                    v-model="userparam.spwd"
                                    @keyup.enter.native="register()"
                            >
                                <el-button slot="prepend" icon="el-icon-lx-lock"></el-button>
                            </el-input>
                        </el-form-item>

                    </el-form>

                </el-col>
                <el-col :span="10" class="col1">
                    <el-form :model="form">
                        <div >上传图片</div>
                        <el-form-item class="uploadp">
                            <el-upload
                                    ref="upload"
                                    :action="UploadUrl()"
                                    accept="image/png,image/gif,image/jpg,image/jpeg"
                                    list-type="picture-card"
                                    :limit=limitNum
                                    :auto-upload="false"
                                    :class="{hide:hideUpload}"
                                    :on-exceed="handleExceed"
                                    :on-change="handleonchange"
                                    :before-upload="handleBeforeUpload"
                                    :on-preview="handlePictureCardPreview"
                                    :on-remove="handleRemove">
                                <i class="el-icon-plus"></i>
                            </el-upload>
                            <el-dialog :visible.sync="dialogVisible">
                                <img width="100%" :src="dialogImageUrl" alt="">
                            </el-dialog>
                        </el-form-item>
                    </el-form>

                </el-col>


            </el-row>
            <div class="login-btn">
                <el-button type="primary" @click="register()">注册</el-button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data: function() {
            return {
                dialogImageUrl: '',
                dialogVisible: false,
                formLabelWidth: '80px',
                limitNum: 1,
                hideUpload: false,
                form: {},
                userparam: {//data
                    sname: '',
                    snum: '',
                    spwd: '',
                    tnum:'',

                },
                rules: {//validation
                    sname: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
                    snum: [{ required: true, message: '请输入学号', trigger: 'blur' }],
                    spwd: [{ required: true, message: '请输入密码', trigger: 'blur' }],
                     tnum:[{required:true,message:'请输入导师工号',trigger: 'blur'}],
                },
            };
        },
        methods: {
            UploadUrl: function() {
                return "";
            },
            handleonchange(files, fileList) {
                this.hideUpload = fileList.length >= this.limitNum;
            },
            // 上传文件之前的钩子
            handleBeforeUpload(file) {
                console.log('before')
                if (!(file.type === 'image/png' || file.type === 'image/gif' || file.type === 'image/jpg' || file.type === 'image/jpeg')) {
                    this.$notify.warning({
                        title: '警告',
                        message: '请上传格式为image/png, image/gif, image/jpg, image/jpeg的图片'
                    })
                }
                let size = file.size / 1024 / 1024 / 2
                if (size > 2) {
                    this.$notify.warning({
                        title: '警告',
                        message: '图片大小必须小于2M'
                    })
                }


            },
            // 文件超出个数限制时的钩子
            handleExceed(files, fileList) {
                this.$message.error('上传一张照片');

            },
            // 文件列表移除文件时的钩子
            handleRemove(file, fileList) {
                this.hideUpload = fileList.length >= this.limitNum;
                console.log(file, fileList);
            },
            // 点击文件列表中已上传的文件时的钩子
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
            uploadFile() {
                this.$refs.upload.submit()

            },
            register() {
                this.$refs.register.validate(valid => {
                    if (valid) {
                        const s_data = {
                            sname: this.userparam.sname,
                            snum: this.userparam.snum,
                            tnum: this.userparam.tnum,
                            spwd: this.userparam.spwd,
                        };

                        this.$axios.post('http://123.56.15.233:8000/register_s', s_data)
                            .then((res) => {
                                if (res.data.success === true) {
                                    this.$message({
                                        message: '注册成功!',
                                        type: 'success',
                                    });
                                    this.$router.push({ path: '/' });
                                } else {
                                    this.$message({
                                        message: res.data.error,
                                        type: 'warning',
                                    });
                                    console.log(res.data.error);
                                }

                            })
                            .catch((err) => {
                                this.$message({
                                    mesage: err,
                                    type: 'warning',
                                });
                                console.log(err);
                            });

                        this.$refs.upload.submit();
                        console.log('已经上传！！！！');
                        this.$message.success('注册成功');
                        this.$router.push('/');

                    }
                    ;


                })


            },
        },
    }
</script>

<style >
    .hide .el-upload--picture-card {
        display: none;
    }
    .col{
        margin-left: 50px;
    }
    .col1{
        margin-left: 70px;
        margin-top: 10px;
    }
    .uploadp{
        margin-top: 10px;
        margin-left: 60px;

    }
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
        left: 35%;
        top: 50%;
        width: 800px;
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
        width: 700px;
        height: 36px;
        margin-bottom: 10px;
    }
    .login-tips {
        font-size: 12px;
        line-height: 30px;
        color: #fff;
    }
</style>