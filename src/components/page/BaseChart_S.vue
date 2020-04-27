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
                            <el-radio  label="1">周</el-radio>
                            <el-radio  label="2">月</el-radio>
                            <el-radio  label="3">年</el-radio>
                        </el-radio-group>
                    </el-form-item>
                </el-form>
            </div>


            <div class="schart-box">
                <div class="content-title">教研室学习总时长汇总：</div>
                <schart class="schart" canvasId="bar" :options="options1"></schart>
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
                radioTreaty: '1',
                btnstatus:true,

                options1: {
                    type: 'bar',
                    title: {
                        text: '每周学习情况对比'
                    },
                    bgColor: '#fbfbfb',
                    labels: ['一', '二', '三', '四', '五'],
                    datasets: [
                        {
                            label: '学习时长',
                            fillColor: 'rgba(241, 49, 74, 0.5)',
                            data: [234, 278, 270, 190, 230]
                        }
                    ]
                }

            };
        },
        created(){
            this.agreeChange
        },
        methods:{
            agreeChange:function(val){
                let that = this
                that.radioTreaty = val;

                if(that.radioTreaty == 2 ){
                    that.options1 = {
                        type: 'bar',
                        title: {
                            text: '每月学习情况对比'
                        },
                        bgColor: '#fbfbfb',
                        labels: ['1月', '2月', '3月', '4月', '5月'],
                        datasets: [
                            {
                                label: '学习时长',
                                fillColor: 'rgba(74, 0.5)',
                                data: [34, 78, 70,190, 30]
                            }
                        ]
                    }
                }else if (that.radioTreaty == 3) {
                    that.options1 = {
                        type: 'bar',
                        title: {
                            text: '每年学习情况对比'
                        },
                        bgColor: '#fbfbfb',
                        labels: ['2015年', '2015年', '2015年', '2015年', '2015年'],
                        datasets: [
                            {
                                label: '学习时长',
                                fillColor: 'rgba(49, 74, 0.5)',
                                data: [4, 8, 20,10, 3]
                            }
                        ]
                    }
                }else{
                    that.options1 = {
                        type: 'bar',
                        title: {
                            text: '每周学习情况对比'
                        },
                        bgColor: '#fbfbfb',
                        labels: ['一', '二', '三', '四', '五'],
                        datasets: [
                            {
                                label: '学习时长',
                                fillColor: 'rgba(241, 49, 74, 0.5)',
                                data: [234, 278, 270, 190, 230]
                            }
                        ]
                    }
                }
                //that.btnstatus=(val==='1')?true:false;
                // localStorage.setItem('ident',val);
                //this.$message.success('当前 '+ val);
            },
        },
        components: {
            Schart
        },

    };
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