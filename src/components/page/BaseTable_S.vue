<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 本周考勤
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div >
            <el-row gutter="3">
                <el-col :span="2">
                    <div class="plugins-tips">姓名:{{name}}</div>
                </el-col>
                <el-col :span="3" >
                    <div class="plugins-tips">学号:{{snum}}</div>
                </el-col>
            </el-row>



        </div>
        <div class="container">

            <el-table
                    :data="tableData1"
                    class="studentTable"
            >
                <el-table-column v-for="items in tableDataType"
                                 :prop="items.nameProp"
                                 :label="items.nameLable"
                                 width="150" border:none>
                </el-table-column>
            </el-table>

        </div>
    </div>
</template>

<script>
    import { fetchData } from '../../api/index';
    export default {
        name: 'basetable',
        data() {
            return {
                tableDataType: [
                    {
                        nameLable:'时间',
                        nameProp:'time'
                    }, {
                    nameLable:'周一',
                    nameProp:'mon'
                }, {
                    nameLable: '周二',
                    nameProp: 'tues'
                }, {
                    nameLable: '周三',
                    nameProp: 'wed'

                },{
                    nameLable: '周四',
                    nameProp: 'thurs'

                },{
                    nameLable: '周五',
                    nameProp: 'fri'

                } ,{
                    nameLable:'周六' ,
                    nameProp:'sat'
                },{
                    nameLable:'周日',
                    nameProp:'sun'
                }
                ],
                tableData1: [{
                    time: '签到时间' ,
                    mon: '7:14',
                    tues: '7:14',
                    wed: '7:14',
                    thurs: '7:14',
                    fri: '7:14',
                    sat: '7:14',
                    sun: '7:14',



                }, {
                    time: '离开时间' ,
                    mon: '7:14',
                    tues: '7:14',
                    wed: '7:14',
                    thurs: '7:14',
                    fri: '7:14',
                    sat: '7:14',
                    sun: '7:14',



                }

            ],

                query: {
                    address: '',
                    name: '',
                    pageIndex: 1,
                    pageSize: 10
                },
                tableData: [],
                multipleSelection: [],
                delList: [],
                editVisible: false,
                pageTotal: 0,
                form: {},
                idx: -1,
                id: -1
            };
        },
        created() {
            this.getData();
        },
        methods: {
            // 获取 easy-mock 的模拟数据
            getData() {
                fetchData(this.query).then(res => {//读取数据 res即为返回
                    console.log(res);
                    this.tableData = res.list;
                    this.pageTotal = res.pageTotal || 50;
                });
            },
            // 触发搜索按钮
            handleSearch() {
                this.$set(this.query, 'pageIndex', 1);
                this.getData();
            },
            // 删除操作
            handleDelete(index, row) {
                // 二次确认删除
                this.$confirm('确定要删除吗？', '提示', {
                    type: 'warning'
                })
                    .then(() => {
                        this.$message.success('删除成功');
                        this.tableData.splice(index, 1);
                    })
                    .catch(() => {});
            },
            // 多选操作
            handleSelectionChange(val) {
                this.multipleSelection = val;//val为所选事务集合
            },
            delAllSelection() {
                const length = this.multipleSelection.length;
                let str = '';
                this.delList = this.delList.concat(this.multipleSelection);
                for (let i = 0; i < length; i++) {
                    str += this.multipleSelection[i].name + ' ';
                }
                this.$message.error(`删除了${str}`);
                this.multipleSelection = [];
            },
            // 编辑操作
            handleEdit(index, row) {
                this.idx = index;
                this.form = row;
                this.editVisible = true;
            },
            // 保存编辑
            saveEdit() {
                this.editVisible = false;
                this.$message.success(`修改第 ${this.idx + 1} 行成功`);
                this.$set(this.tableData, this.idx, this.form);
            },
            // 分页导航
            handlePageChange(val) {
                this.$set(this.query, 'pageIndex', val);
                this.getData();
            }
        },
        computed:{
            name(){
                return  localStorage.getItem('sname');
            },
            snum(){
                return  localStorage.getItem('snum');
            }

        }
    };
</script>

<style scoped>
    .studentTable{
        width: 1300px;
        font-size: 14px;

        margin-left: 130px;
        text-align: center;
    }

    .el-table__row>td{
        border: none;
    }

    .el-table::before {
    height: 0px;
    }
    .handle-box {
        margin-bottom: 20px;

        text-align: left;
    }

    .handle-select {
        width: 120px;
    }

    .handle-input {
        width: 300px;
        display: inline-block;
        margin-left: 5px;
    }
    .table {
        width: 100%;
        font-size: 14px;
    }
    .red {
        color: #ff0000;
    }
    .mr10 {
        margin-right: 10px;
    }
    .table-td-thumb {
        display: block;
        margin: auto;
        width: 40px;
        height: 40px;
    }
</style>
