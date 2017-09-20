<template>

  <el-row class="tac">
    <el-col :span="4" style="height: 100%">
      <el-menu :default-active="defaultActive" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" theme="dark" style="height: 100%; border-radius: 0" router>

        <el-menu-item index="manage"><i class="el-icon-menu"></i>首页</el-menu-item>

        <el-submenu index="1">
          <template slot="title"><i class="el-icon-document"></i>数据管理</template>
          <el-menu-item index="UserList">用户列表</el-menu-item>
          <el-menu-item index="ShopList">商家列表</el-menu-item>
          <el-menu-item index="FoodList">食品列表</el-menu-item>
          <el-menu-item index="OrderList">订单列表</el-menu-item>
          <el-menu-item index="AdminList">管理员列表</el-menu-item>
        </el-submenu>

        <el-submenu index="2">
          <template slot="title"><i class="el-icon-plus"></i>添加数据</template>
          <el-menu-item index="addShop">添加商铺</el-menu-item>
          <el-menu-item index="addFood">添加商品</el-menu-item>
        </el-submenu>

        <el-submenu index="3">
          <template slot="title"><i class="el-icon-star-on"></i>图表</template>
          <el-menu-item index="/UserDis">用户分布</el-menu-item>
        </el-submenu>

        <!--<el-submenu index="4">-->
          <!--<template slot="title"><i class="el-icon-edit"></i>编辑</template>-->
          <!--<el-menu-item index="4-1">文本编辑</el-menu-item>-->
        <!--</el-submenu>-->

        <!--<el-submenu index="5">-->
          <!--<template slot="title"><i class="el-icon-setting"></i>设置</template>-->
          <!--<el-menu-item index="/AdminSetUp">管理员设置</el-menu-item>-->
        <!--</el-submenu>-->

        <el-submenu index="6">
          <template slot="title"><i class="el-icon-information"></i>说明</template>
          <el-menu-item index="/Explain">说明</el-menu-item>
        </el-submenu>

      </el-menu>
    </el-col>

    <el-col :span="20" style="height: 100%;overflow: scroll">
      <el-col :span="24" style="background: #eff2f7;height: 60px">
        <head-top></head-top>
      </el-col>
      <el-col :span="24" style="background: white">
        <router-view></router-view>
      </el-col>
    </el-col>

  </el-row>
</template>

<script>
  import headTop from '../components/headTop'
  export default {
    name: 'manage',
    methods: {
      handleOpen(key, keyPath) {
      },
      handleClose(key, keyPath) {
      }
    },
    components: {
        headTop,
    },
    computed: {
      defaultActive: function(){
        return this.$route.path.replace('/', '');
      }
    },
  }
</script>

<style scoped="">
  * {
    text-align: left;
  }
  .tac {
    height: 100%;
  }
</style>
