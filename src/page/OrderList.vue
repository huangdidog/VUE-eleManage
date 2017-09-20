<template>
    <div>
    <el-table :data="tableData" style="width: 100%" @expand="isExpand">
        <el-table-column type="expand">
            <template scope="props">
                <el-form label-position="left" inline class="demo-table-expand">
                    <el-form-item label="用户名">
                        <span>{{ props.row.user_name }}</span>
                    </el-form-item>
                    <el-form-item label="店铺名称">
                        <span>{{ props.row.restaurant_name }}</span>
                    </el-form-item>
                    <el-form-item label="收货地址">
                        <span>{{ props.row.address }}</span>
                    </el-form-item>
                    <el-form-item label="店铺 ID">
                        <span>{{ props.row.restaurant_id }}</span>
                    </el-form-item>
                    <el-form-item label="店铺地址">
                        <span>{{ props.row.restaurant_address }}</span>
                    </el-form-item>

                </el-form>
            </template>
        </el-table-column>

        <el-table-column label="订单 ID" prop="id"></el-table-column>
        <el-table-column label="总价格" prop="total_amount"></el-table-column>
        <el-table-column label="订单状态" prop="status"></el-table-column>


    </el-table>

<el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-size="20"
          layout="total, prev, pager, next"
          :total="orderCount">
        </el-pagination>

    </div>
</template>

<script>

import { getOrderList,getUserInfo,getShopInfo,getAddressInfo,getOrderCount } from '@/api/getData'

import {wan,p} from '@/function/fn'
export default {
    name: 'Home',
    components:{
    },
    data() {
        return {
            tableData: [  /*商家列表信息*/
//                {
//                    user_name:'用户名',
//                    restaurant_name:'店铺名称',
//                    address:'收获地址',
//                    restaurant_id:'店铺id',
//                    restaurant_address:'店铺地址',
//                    id:'订单id',
//                    total_amount:'总价',
//                    status:'订单状态'
//
//                }
            ],
            orderCount:0,
            currentPage: 1,
            offset: 0,
            limit: 20


        }
    },
    methods: {
        //展开列表 请求数据
        isExpand(row, expanded) {
          if (expanded == false) {
              return
          }
          const user_id = row.user_id;
          const restaurant_id = row.restaurant_id;
          const address_id = row.address_id;
          const index = row.index;
          getUserInfo(user_id).then(v => {
            this.tableData[index].user_name = v.username;
          });

          getShopInfo(restaurant_id).then(v => {
            this.tableData[index].restaurant_address = v.address;
          });

          getAddressInfo(address_id).then(v => {
            this.tableData[index].address = v.address;
          });


        },
        handleSizeChange(val) {
        },
        handleCurrentChange(val) { /*页偏移量*/
            this.currentPage = val;
            this.offset = (val - 1)*this.limit;
            this.getOrders()
        },
        async getOrders(){ /*根据经纬度 跟偏移量获取商家列表信息*/
            getOrderList(this.offset,this.limit).then(v => {//用户列表
                this.tableData = [];
                v.forEach((item,index)=>{
                    let info = {};
                    info.id = item.id;
                    info.total_amount = item.total_amount;
                    info.status = item.status_bar.title;
                    info.user_id = item.user_id;
                    info.restaurant_id = item.restaurant_id;
                    info.address_id = item.address_id;
                    info.restaurant_name = item.restaurant_name;
                    info.restaurant_id =item.restaurant_id;
                    info.user_name = '';
                    info.restaurant_address = '';
                    info.address = '';
                    info.index = index;
                    this.tableData.push(info);
                })
            })
        },
    },
    mounted(){
        this.getOrders()
        getOrderCount().then(v => {  /*获取商铺列表*/
            this.orderCount = v.count;
        })

    }
}
</script>

<style scoped>
.demo-table-expand {
    font-size: 0;
}
.demo-table-expand label {
    width: 90px;
    color: #99a9bf;
}
.demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
}
.el-pagination{
    margin: 10px 0 10px 10px;
}
</style>
