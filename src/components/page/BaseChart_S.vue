<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-pie-chart"></i> 学习统计s
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="plugins-tips">
                请选择要统计的时间段:
                <el-form  label-width="100px">
                    <el-form-item label="请选择身份：" >
                        <el-radio-group v-model="radioTreaty" @change="agreeChange">

                            <el-radio  label="1">月</el-radio>
                            <el-radio  label="2">年</el-radio>
                        </el-radio-group>
                    </el-form-item>
                </el-form>
            </div>


            <div class="schart-box">
                <div class="content-title">教研室学习总时长汇总：</div>
                <schart class="schart"  canvasId="bar" :options="options1"></schart>
            </div>
        </div>
    </div>
</template>

<script>
    import Schart from 'vue-schart';
    export default {
        name: 'basecharts',
        data() {
            return {
                radioTreaty: '',
                btnstatus: true,
                //
                // timedata: [
                //     { name:'2012',value:111 },
                //     { name:'2013',value:111 },
                // ],


                options1: {

                    // type: 'bar',
                    // title: {
                    //     text: '近五个月学习情况'
                    // },
                    // bgColor: '#fbfbfb',
                    // labels: [new Date().getMonth()-3,  new Date().getMonth()-2,  new Date().getMonth()-1,
                    //     new Date().getMonth(),new Date().getMonth()+1],
                    // datasets: [
                    //     {
                    //         label: '学习时长',
                    //         fillColor: 'rgba(241, 49, 74, 0.5)',
                    //         data: [0, 0, 0, 0, 0]
                    //     }
                    // ]
                }

            };
        },
        created() {
            this.agreeChange

        },
        methods: {
            agreeChange: function(val) {
                //let that = this
                this.radioTreaty = val;


                if (this.radioTreaty == 2) {
                    var data_year = this.show_year();
                    this.options1 = {
                        type: 'bar',
                        title: {
                            text: '近三年学习情况对比'
                        },
                        bgColor: '#fbfbfb',
                        //labels: ['2015年', '2015年', '2015年', '2015年', '2015年'],
                        labels: [new Date().getFullYear()-2,new Date().getFullYear()-1,new Date().getFullYear()],
                        datasets: [
                            {
                                label: '学习时长',
                                fillColor: 'rgba(49)',
                                data: data_year
                            }
                        ]
                    }

                } else {//month
                   // var data_month =[2,2,2,2,2]
                    var data_month = this.show_month();
                    this.options1 = {
                        type: 'bar',
                        title: {
                            text: '近五个月学习情况'
                        },
                        bgColor: '#fbfbfb',
                        labels: [new Date().getMonth()-3,  new Date().getMonth()-2,  new Date().getMonth()-1,
                            new Date().getMonth(),new Date().getMonth()+1],
                        datasets: [
                            {
                                label: '学习时长',
                                fillColor: 'rgba(241)',
                                data: data_month
                            }
                        ]
                    }
                }

            },
            show_month(){
                const user_student = localStorage.getItem('user');//由学号遍历考勤表
                this.$axios.post('http://123.56.15.233:8000/charts',user_student)
                    .then((res) =>{
                        if(res.data.success === true){
                            // this.show_name  = res.data.s_name;//遍历到的姓名
                            // this.show_num = res.data.s_num ;
                            // this.show_t_name = res.data.tname ;
                            return res.data.time;//要改，返回数据变成数组形式
                        }else{
                            this.$message({
                                messgage: res.data.error,
                                type:'error',
                            });
                        }

                    }).catch((err)=>{
                    this.$message({
                        message: err +'here!!!',
                        type: 'warning',
                    });
                    console.log(err);
                });

            },
            show_year(){
                const user_student = localStorage.getItem('user');//由学号遍历考勤表
                this.$axios.post('http://123.56.15.233:8000/charts',user_student)
                    .then((res) =>{
                        if(res.data.success === true){
                            // this.show_name  = res.data.s_name;//遍历到的姓名
                            // this.show_num = res.data.s_num ;
                            // this.show_t_name = res.data.tname ;
                            return res.data.time;//要改，返回数据变成数组形式
                        }else{
                            this.$message({
                                messgage: res.data.error,
                                type:'error',
                            });
                        }

                    }).catch((err)=>{
                    this.$message({
                        message: err +'here!!!',
                        type: 'warning',
                    });
                    console.log(err);
                });

            },
        },
        mounted(){
            this.dataSet();
        },


        computed: {

        },
        components: {
                Schart
            },


    }
</script>

<style scoped>
    .line{

        margin-left: 40px;
        margin-right: 0px;
    }
    .dateSelect{
        margin-top: 20px;
    }
    .plugins-tips{
        height: 70px;
    }
    .schart-box {
        display: inline-block;
        margin: 20px;

    }
    .schart {
        width: 600px;
        height: 400px;
        margin-left: 240px;
    }
    .content-title {
        clear: both;
        font-weight: 400;
        line-height: 50px;
        margin: 10px 0;
        font-size: 22px;
        color: #1f2f3d;
    }
</style>