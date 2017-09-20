<template>
    <div>
        <el-table :data="tableData" highlight-current-row stripe style="width: 100%">
            <el-table-column
              type="index"
              label="ID"
              width="100">
            </el-table-column>
            <el-table-column
              prop="registe_time"
              label="日期"
              width="200">
            </el-table-column>
            <el-table-column
              prop="username"
              label="姓名">
            </el-table-column>
            <el-table-column
              prop="city"
              label="地址">
            </el-table-column>
        </el-table>

         <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-size="20"
          layout="total, prev, pager, next"
          :total="userCount">
        </el-pagination>
    </div>
</template>


<script>

import {getUserList, getUser} from '@/api/getData'

import {wan,p} from '@/function/fn'
export default {
    name: 'Home',
    components:{
    },
    data() {
      return {
        tableData: [
//          {
//            index: 1,
//            registe_time: '2016-05-03',
//            username: '王小虎',
//            city: '上海市普陀区金沙江路 1518 弄'
//          }
        ],
        userCount:null,
        currentPage: 1,
        offset: 0,
        limit: 20
      }
    },
    methods: {
        handleSizeChange(val) {

        },
        handleCurrentChange(val) {
            this.currentPage = val;
            this.offset = (val - 1)*this.limit;
            this.getUsers()
        },
        async getUsers(){   /*根据偏移量获取用户信息列表*/
            getUserList(this.offset,this.limit).then(v => {//用户列表
                this.tableData = [];
                v.forEach(item=>{
                    let info = {};
                    info.username = item.username;
                    info.registe_time = item.registe_time;
                    info.city=item.city;
                    this.tableData.push(info);
                })
            })
        }

    },
    mounted(){
        this.getUsers()
        getUser().then(v => {  /*用户数量*/
            this.userCount = v.count;
        })

    }
  }
</script>

<style scoped>
.el-table .info-row {
    background: #c9e5f5;
}

.el-table .positive-row {
    background: #e2f0e4;
}
.el-pagination{
    margin: 10px 0 10px 10px;
}
</style>
