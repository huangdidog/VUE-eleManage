<template>
    <div>
        <header class="title"><h2>数据统计</h2></header>
        <el-row>
            <el-col :span="4">
                <div class="grid-content firstBg1">
                    <span>今日数据</span>
                </div>
            </el-col>
            <el-col :span="4">
                <div class="grid-content">
                    <span>{{apiCount?apiCount:''}}</span>
                    <span>今日api请求量</span>
                </div>
            </el-col>
            <el-col :span="4">
                <div class="grid-content">
                    <span>{{userCount}}</span>
                    <span>新增用户</span>
                </div>
            </el-col>
            <el-col :span="4">
                <div class="grid-content">
                    <span>{{orderCount}}</span>
                    <span>新增订单</span>
                </div>
            </el-col>
            <el-col :span="4">
                <div class="grid-content">
                    <span>{{adminCount}}</span>
                    <span>新增管理员</span>
                </div>
            </el-col>
        </el-row>

        <el-row>
            <el-col :span="4">
                <div class="grid-content firstBg2">
                    <span>总数据</span>
                </div>
            </el-col>
            <el-col :span="4">
                <div class="grid-content">
                    <span>{{apiAllCount?apiAllCount:''}}</span>
                    <span>api请求总量</span>
                </div>
            </el-col>
            <el-col :span="4">
                <div class="grid-content">
                    <span>{{userAllCount}}</span>
                    <span>注册用户</span>
                </div>
            </el-col>
            <el-col :span="4">
                <div class="grid-content">
                    <span>{{orderAllCount}}</span>
                    <span>订单</span>
                </div>
            </el-col>
            <el-col :span="4">
                <div class="grid-content">
                    <span>{{adminAllCount}}</span>
                    <span>管理员</span>
                </div>
            </el-col>
        </el-row>
        <chart :sevenDate='sevenDate' :sevenDay='sevenDay' ></chart>
    </div>
</template>


<script>
import chart from '@/components/chart'

import {getToDayApi, getNewUser, getNewOrder, getNewAdmin, getApi, getUser, getOrder, getAdmin} from '@/api/getData'
import {wan,p} from '@/function/fn'
export default {
    name: 'Home',
    components:{
        chart
    },
    data() {
        return {
            apiCount:null,
            userCount:null,
            orderCount:null,
            adminCount:null,
            apiAllCount:null,
            userAllCount:null,
            orderAllCount:null,
            adminAllCount:null,
            toDay:'',
            sevenDay:[],
            sevenDate:[]
        }
    },
    mounted(){
        this.getDays();
        /*今日api请求量*/
        getToDayApi(this.toDay).then(v => {
            this.apiCount = wan(v.count);
        }),
        /*新增用户*/
        getNewUser(this.toDay).then(v => {
            this.userCount = wan(v.count);
        }),
        /*新增订单*/
        getNewOrder(this.toDay).then(v => {
            this.orderCount = wan(v.count);
        }),
        /*新增管理员*/
        getNewAdmin(this.toDay).then(v => {
            this.adminCount = wan(v.count);
        }),
        /*总api*/
        getApi().then(v => {
            this.apiAllCount = wan(v.count);
        }),
        /*总用户*/
        getUser().then(v => {
            this.userAllCount = wan(v.count);
        }),
        /*总订单*/
        getOrder().then(v => {
            this.orderAllCount = wan(v.count);
        }),
        /*总管理员*/
        getAdmin().then(v => {
            this.adminAllCount = wan(v.count);
        }),
        this.getSevenData();

    },
    methods:{
        async getSevenData(){

            let apiArr = [[],[],[],[]];
            this.sevenDay.forEach(item => {
                apiArr[0].push(getToDayApi(item))
                apiArr[1].push(getNewUser(item))
                apiArr[2].push(getNewOrder(item))
                apiArr[3].push(getNewAdmin(item))
            })

            let promiseArr = [...apiArr[0], ...apiArr[1], ...apiArr[2], ...apiArr[3]]

            Promise.all(promiseArr).then(res=>{
                let resArr = [[],[],[],[]];
                res.forEach((item,index)=>{
                    if (item.status == 1) {
                        resArr[Math.floor(index/7)].push(item.count)
                    }
                })
                this.sevenDate = resArr
            }).catch(err=>{
                console.log(err)
            })
        }
        ,
        getDays(){
            let myDate = new Date(); //获取今天日期
            myDate.setDate(myDate.getDate() - 7);
            let dateArray = [];
            let dateTemp;

            for (let i = 0; i < 7; i++) {
                dateTemp = myDate.getFullYear()+"-"+p((myDate.getMonth()+1))+"-"+p(myDate.getDate()+1);
                dateArray.push(dateTemp);
                myDate.setDate(myDate.getDate() + 1);
                this.sevenDay=dateArray;
            }
            this.toDay=dateTemp;

        }
    },
    created() {

    }

}
</script>

<style scoped>
.title {
    height: 40px;
    margin: 20px;
    font: 18px/40px "微软雅黑";
    text-align: center;
}
.el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }

}
.el-col {
    margin-left: 20px;
    text-align: center;
    font-size: 20px;
    line-height: 36px;
    border-radius: 4px;
}
.el-col .firstBg1{
    color: #fff;
    background: #FF9800;
}
.el-col .firstBg2{
    color: #fff;
    background: #20A0FF;
}
.grid-content>span:nth-of-type(2){
    color: #555;
}
.grid-content {
    background: #d3dce6;
    border-radius: 4px;
    min-height: 36px;
}
.grid-content>span:nth-of-type(2){
    font-size: 12px;
}
.row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
}
</style>
