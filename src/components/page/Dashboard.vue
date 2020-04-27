<template>
    <div>
        <el-row :gutter="45">
            <el-col :span="8" class="left-bargin">
                <el-card shadow="hover" class="mgb20" style="height:230px;">
                    <div class="user-info">
                        <img src="../../assets/img/img.jpg" class="user-avator" alt />
                        <div class="user-info-cont">
                            <div class="user-info-name">{{name}}</div>
                            <div>{{role}}</div>
                        </div>
                    </div>
                    <div class="user-info-list">
                        学院：
                        <span>{{college}}</span>
                    </div>

                </el-card>
                <el-card shadow="hover" :body-style="{padding: '0px'}">
                    <div class="grid-content grid-con-1">
                        <i class="el-icon-lx-people grid-con-icon"></i>
                        <div class="grid-cont-right">
                            <div class="grid-num">12</div>
                            <div>学生数量</div>
                        </div>
                    </div>
                </el-card>


            </el-col>
            <el-col :span="15" class="right-bargin">
                <div class="container">
                    <el-tabs v-model="message">
                        <el-tab-pane :label="`未读消息(${unread.length})`" name="first">
                            <el-table :data="unread" :show-header="false" style="width: 100%">
                                <el-table-column>
                                    <template slot-scope="scope">
                                        <span class="message-title">{{scope.row.title}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="date" width="180"></el-table-column>
                                <el-table-column width="120">
                                    <template slot-scope="scope">
                                        <el-button size="small" @click="handleRead(scope.$index)">标为已读</el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                            <div class="handle-row">
                                <el-button type="primary">全部标为已读</el-button>
                            </div>
                        </el-tab-pane>
                        <el-tab-pane :label="`已读消息(${read.length})`" name="second">
                            <template v-if="message === 'second'">
                                <el-table :data="read" :show-header="false" style="width: 100%">
                                    <el-table-column>
                                        <template slot-scope="scope">
                                            <span class="message-title">{{scope.row.title}}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="date" width="150"></el-table-column>
                                    <el-table-column width="120">
                                        <template slot-scope="scope">
                                            <el-button type="danger" @click="handleDel(scope.$index)">删除</el-button>
                                        </template>
                                    </el-table-column>
                                </el-table>
                                <div class="handle-row">
                                    <el-button type="danger">删除全部</el-button>
                                </div>
                            </template>
                        </el-tab-pane>
                        <el-tab-pane :label="`回收站(${recycle.length})`" name="third">
                            <template v-if="message === 'third'">
                                <el-table :data="recycle" :show-header="false" style="width: 100%">
                                    <el-table-column>
                                        <template slot-scope="scope">
                                            <span class="message-title">{{scope.row.title}}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="date" width="150"></el-table-column>
                                    <el-table-column width="120">
                                        <template slot-scope="scope">
                                            <el-button @click="handleRestore(scope.$index)">还原</el-button>
                                        </template>
                                    </el-table-column>
                                </el-table>
                                <div class="handle-row">
                                    <el-button type="danger">清空回收站</el-button>
                                </div>
                            </template>
                        </el-tab-pane>
                    </el-tabs>
                </div>
               <!-- <el-card shadow="hover" style="height:252px;">
                    <div slot="header" class="clearfix">
                        <span>今日签到</span>
                    </div>Vue
                    <el-progress :percentage='7-30' color="#42b983"></el-progress>JavaScript
                    <el-progress :percentage="7-30" color="#f1e05a"></el-progress>CSS
                    <el-progress :percentage="7-30"></el-progress>HTML
                    <el-progress :percentage="7-30" color="#f56c6c"></el-progress>
                </el-card>-->

            </el-col>
        </el-row>
       <!-- <el-row :gutter="20">
            <el-col :span="12">
                <el-card shadow="hover">
                    <schart ref="bar" class="schart" canvasId="bar" :options="options"></schart>
                </el-card>
            </el-col>
            <el-col :span="12">
                <el-card shadow="hover">
                    <schart ref="line" class="schart" canvasId="line" :options="options2"></schart>
                </el-card>
            </el-col>
        </el-row>-->
    </div>
</template>

<script>
import Schart from 'vue-schart';
import bus from '../common/bus';
export default {
    name: 'dashboard',
    data() {
        return {
           // name: localStorage.getItem('ms_username'),
            college: '计算机',
            data: [
                {
                    name: '2018/09/04',
                    value: 1083
                },
                {
                    name: '2018/09/05',
                    value: 941
                },
                {
                    name: '2018/09/06',
                    value: 1139
                },
                {
                    name: '2018/09/07',
                    value: 816
                },
                {
                    name: '2018/09/08',
                    value: 327
                },
                {
                    name: '2018/09/09',
                    value: 228
                },
                {
                    name: '2018/09/10',
                    value: 1065
                }
            ],
            options: {
                type: 'bar',
                title: {
                    text: '最近一周各品类销售图'
                },
                xRorate: 25,
                labels: ['周一', '周二', '周三', '周四', '周五'],
                datasets: [
                    {
                        label: '家电',
                        data: [234, 278, 270, 190, 230]
                    },
                    {
                        label: '百货',
                        data: [164, 178, 190, 135, 160]
                    },
                    {
                        label: '食品',
                        data: [144, 198, 150, 235, 120]
                    }
                ]
            },
            options2: {
                type: 'line',
                title: {
                    text: '最近几个月各品类销售趋势图'
                },
                labels: ['6月', '7月', '8月', '9月', '10月'],
                datasets: [
                    {
                        label: '家电',
                        data: [234, 278, 270, 190, 230]
                    },
                    {
                        label: '百货',
                        data: [164, 178, 150, 135, 160]
                    },
                    {
                        label: '食品',
                        data: [74, 118, 200, 235, 90]
                    }
                ]
            },
            message: 'first',
            showHeader: false,
            unread: [{
                date: '2018-04-19 20:00:00',
                title: '【系统通知】该系统将于今晚凌晨2点到5点进行升级维护',
            },{
                date: '2018-04-19 21:00:00',
                title: '今晚12点整发大红包，先到先得',
            }],
            read: [{
                date: '2018-04-19 20:00:00',
                title: '【系统通知】该系统将于今晚凌晨2点到5点进行升级维护'
            }],
            recycle: [{
                date: '2018-04-19 20:00:00',
                title: '【系统通知】该系统将于今晚凌晨2点到5点进行升级维护'
            }]
        };
    },
    components: {
        Schart
    },
    computed: {
        unreadNum(){
            return this.unread.length;
        },
        name(){

                return  localStorage.getItem('user');

        },
        role() {
            return localStorage.getItem('status');
        }
    },


    // created() {
    //     this.handleListener();
    //     this.changeDate();
    // },
    // activated() {
    //     this.handleListener();
    // },
    // deactivated() {
    //     window.removeEventListener('resize', this.renderChart);
    //     bus.$off('collapse', this.handleBus);
    // },
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
