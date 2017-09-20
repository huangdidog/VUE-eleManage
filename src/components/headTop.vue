<template>
  <div class="headTop">
    <el-breadcrumb separator="/" class="breadcrumb">
      <el-breadcrumb-item :to="{ path: '/manage' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item v-for="(item, index) in $route.meta" key="index">{{item}}</el-breadcrumb-item>
    </el-breadcrumb>

    <el-dropdown @command="handleCommand" class="command" menu-align="start">
      <span class="el-dropdown-link">
        <img src="../assets/avator.jpg" alt="">
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="a">首页</el-dropdown-item>
        <el-dropdown-item command="b">退出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
  export default {
    name: 'headTop',
    methods: {
      async handleCommand(command) {
        if (command == 'a') {
          this.$router.push('/manage');
        }else if (command == 'b') {
            const aaa = await fetch('http://cangdu.org:8001/admin/singout');
            const res = await aaa.json();
            if (res.status == 1) {
              console.log('退出成功');
              this.$message({
                type: 'success',
                message: '退出成功'
              });
              this.$router.push('/');
            }else {
              console.log('退出失败');
              this.$message({
                type: 'error',
                message: res.message
              });
            }
        }
      }
    }
  }
</script>

<style>
  .headTop {
    height: 100%;
  }
  .breadcrumb {
    float: left;
    height: 100%;
    line-height: 60px;
    margin-left: 25px;
  }
  .command {
    float: right;
    height: 100%;
    margin-right: 50px;
    position: relative;
    width: 30px;
  }
  .el-dropdown-link {
    width: 45px;
    height: 45px;
    border-radius: 50%;
    display: inline-block;
    position: absolute;
    margin-top: -22.5px;
    top: 50%;
  }
  .el-dropdown-link img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
</style>
