<template>
    <div>
        <el-row :gutter="45">
            <el-col :span="8" class="left-bargin">
                <el-card shadow="hover" class="mgb20" style="height:230px;">
                    <div class="user-info">
                        <img src="../../assets/img/img.jpg" class="user-avator" alt />
                        <div class="user-info-cont">
                            <div class="user-info-name">{{show_name}}</div>
                            <div>学生</div>
                        </div>
                    </div>
                    <div class="user-info-list">
                        学号：
                        <span>{{show_num}}</span>
                    </div>

                </el-card>
                <el-card shadow="hover" :body-style="{padding: '0px'}">
                    <div class="grid-content grid-con-1">
                        <i class="el-icon-lx-people grid-con-icon"></i>
                        <div class="grid-cont-right">
                            <div class="grid-num">{{show_t_name}}</div>
                            <div>导师</div>
                        </div>
                    </div>
                </el-card>


            </el-col>
            <el-col :span="15" class="right-bargin">
                <div class="container">
                    <el-table
                            :data="tableData1"
                            class="studentTable"
                    >
                        <el-table-column v-for="items in tableDataType"
                                         :prop="items.nameProp"
                                         :label="items.nameLable"
                                         width="250">
                        </el-table-column>
                    </el-table>
                </div>

            </el-col>
        </el-row>
    </div>
</template>

<script>
    import Schart from 'vue-schart';
    import bus from '../common/bus';
    export default {
        name: 'dashboard',
        data() {
            return {
                show_name:'',
                show_num:'',
                show_t_name:'',

                tableDataType: [{
                    nameLable:'日期',
                    nameProp:'date'
                }, {
                    nameLable: '签到',
                    nameProp: 'inTime'
                },  {
                    nameLable:'离开' ,
                    nameProp:'outTime'
                }
                ],
                 tableData1: [
                     //{
                //     date: '5/24' ,
                //     inTime:'7:14',
                //     outTime:'22:30',
                //
                // }, {
                //     date: '5/24' ,
                //     inTime:'7:14',
                //     outTime:'22:30',
                // }, {
                //     date: '5/24' ,
                //     inTime:'7:14',
                //     outTime:'22:30',
                // }, {
                //     date: '5/24' ,
                //     inTime:'7:14',
                //     outTime:'22:30',
                // }
                ],

               // message: 'first',
               // showHeader: false,

            };
        },
        components: {
            Schart
        },
        computed: {

            show(){
                const user_student = localStorage.getItem('user');//由工号遍历学生表
                this.$axios.post('http://123.56.15.233:8000/student',user_student)
                    .then((res) =>{
                        if(res.data.success === true){
                            this.show_name  = res.data.s_name;//遍历到的姓名
                            this.show_num = res.data.s_num ;
                            this.show_t_name = res.data.tname ;
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
            time_table_show(){
                this.$axios.get('http://123.56.15.233:8000/records1',user_student)//根据学生id遍历考勤表 获取近七日的最早最晚时间
                    .then((res) => {
                        if (res.data.success === true) {
                            this.tableData1 = JSON.parse(res.data.data);
                        }
                    })
                    .catch((err) => {
                        this.$message({
                            message: err,
                            type: 'warning',
                        });
                    });
            }
        },

        created(){
            this.show();
            this.time_table_show();
           // this.sname  = 'kkkk';
        },

        methods: {
            handleRead(index) {
                const item = this.unread.splice(index, 1);
                console.log(item);
                this.read = item.concat(this.read);
            },
            handleDel(index) {
                const item = this.read.splice(index, 1);
                this.recycle = item.concat(this.recycle);
            },
            handleRestore(index) {
                const item = this.recycle.splice(index, 1);
                this.read = item.concat(this.read);
            },
            changeDate() {
                const now = new Date().getTime();
                this.data.forEach((item, index) => {
                    const date = new Date(now - (6 - index) * 86400000);
                    item.name = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
                });
            }
            // handleListener() {
            //     bus.$on('collapse', this.handleBus);
            //     // 调用renderChart方法对图表进行重新渲染
            //     window.addEventListener('resize', this.renderChart);
            // },
            // handleBus(msg) {
            //     setTimeout(() => {
            //         this.renderChart();
            //     }, 200);
            // },
            // renderChart() {
            //     this.$refs.bar.renderChart();
            //     this.$refs.line.renderChart();
            // }
        }
    };
</script>


<style scoped>
    el-table__row>td {
        border: none;
    }

    .el-table::before {
        height: 0px;
    }
    .studentTable{
        width: 750px;
        font-size: 14px;
        margin-left: 70px;
        margin-right: 30px;
        margin-top: 10px;
    }
    .el-row {
        margin-bottom: 20px;
    }

    .left-bargin{
        margin-left: 30px;
        margin-top: 25px;
    }

    .right-bargin{
        margin-right: 25px;
        margin-top: 25px;
    }
    .grid-content {
        display: flex;
        align-items: center;
        height: 100px;
    }

    .grid-cont-right {
        flex: 1;
        text-align: center;
        font-size: 14px;
        color: #999;
    }

    .grid-num {
        font-size: 30px;
        font-weight: bold;
    }

    .grid-con-icon {
        font-size: 50px;
        width: 100px;
        height: 100px;
        text-align: center;
        line-height: 100px;
        color: #fff;
    }

    .grid-con-1 .grid-con-icon {
        background: rgb(45, 140, 240);
    }

    .grid-con-1 .grid-num {
        color: rgb(45, 140, 240);
    }

    .grid-con-2 .grid-con-icon {
        background: rgb(100, 213, 114);
    }

    .grid-con-2 .grid-num {
        color: rgb(45, 140, 240);
    }

    .grid-con-3 .grid-con-icon {
        background: rgb(242, 94, 67);
    }

    .grid-con-3 .grid-num {
        color: rgb(242, 94, 67);
    }

    .user-info {
        display: flex;
        align-items: center;
        padding-bottom: 20px;
        border-bottom: 2px solid #ccc;
        margin-bottom: 20px;
    }

    .user-avator {
        width: 120px;
        height: 120px;
        border-radius: 50%;
    }

    .user-info-cont {
        padding-left: 50px;
        flex: 1;
        font-size: 14px;
        color: #999;
    }

    .user-info-cont div:first-child {
        font-size: 30px;
        color: #222;
    }

    .user-info-list {
        font-size: 14px;
        color: #999;
        line-height: 25px;
    }

    .user-info-list span {
        margin-left: 70px;
    }

    .mgb20 {
        margin-bottom: 20px;
    }

    .todo-item {
        font-size: 14px;
    }

    .todo-item-del {
        text-decoration: line-through;
        color: #999;
    }

    .schart {
        width: 100%;
        height: 300px;
    }
    .message-title{
        cursor: pointer;
    }
    .handle-row{
        margin-top: 30px;
    }
</style>
