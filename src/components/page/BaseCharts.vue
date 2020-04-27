<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-pie-chart"></i> 学习统计
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="plugins-tips">
                请选择要统计的时间段:
                <div class="dateSelect">
                    <el-col :span="4">
                        <el-date-picker
                                type="date"
                                placeholder="选择日期"
                                v-model="form.date1"
                                value-format="yyyy-MM-dd"
                                style="width: 100%;"
                        ></el-date-picker>
                    </el-col>
                    <el-col class="line" :span="1">至</el-col>
                    <el-col :span="4">
                        <el-date-picker
                                type="date"
                                placeholder="选择日期"
                                v-model="form.date2"
                                value-format="yyyy-MM-dd"
                                style="width: 100%;"
                        ></el-date-picker>

                    </el-col>
                </div>
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
    components: {
        Schart
    },
    data() {
        return {
            form: {
                date1: '',
                date2: '',
            },
            options1: {
                type: 'bar',
                title: {
                    text: '该时间段内学习情况汇总'
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
    }
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