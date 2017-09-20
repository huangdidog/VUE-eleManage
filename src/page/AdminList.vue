<template>
    <div>
        <el-table :data="tableData" highlight-current-row stripe style="width: 100%">
            <el-table-column
              prop="user_name"
              label="姓名">
            </el-table-column>
            <el-table-column
              prop="create_time"
              label="注册日期">
            </el-table-column>
            <el-table-column
              prop="city"
              label="地址">
            </el-table-column>
            <el-table-column
              prop="admin"
              label="权限">
            </el-table-column>
        </el-table>

         <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-size="20"
          layout="total, prev, pager, next"
          :total="adminCount">
        </el-pagination>
    </div>
</template>


<script>

import {getAdminList,getAdminCount} from '@/api/getData'

import {wan,p} from '@/function/fn'
export default {
    name: 'Home',
    components:{
    },
    data() {
      return {
        tableData: [
//          {
//            user_name: "s",
//            create_time: "2017-05-29 21:23",
//            city: "北京",
//            admin: "管理员"
//          }
        ],
        adminCount:0,//管理员数量
        currentPage: 1,//当前显示页
        offset: 0,//偏移量
        limit: 20//一页显示的数量
      }
    },
    methods: {
        handleSizeChange(val) {
        },
        handleCurrentChange(val) {
            this.currentPage = val;
            this.offset = (val - 1)*this.limit;
            this.getAdminList()
        },
        async getAdminList(){   /*根据偏移量获取用户信息列表*/
            getAdminList(this.offset,this.limit).then(v => {//用户列表
                this.tableData = [];
                v.data.forEach(item=>{
                    let info = {};
                    info.user_name=item.user_name;
                    info.create_time=item.create_time;
                    info.city=item.city;
                    info.admin=item.admin;
                    this.tableData.push(info);
                })
            })
        }

    },
    mounted(){
        this.getAdminList()
        getAdminCount().then(v => {  /*用户数量*/
            this.adminCount = v.count;
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
