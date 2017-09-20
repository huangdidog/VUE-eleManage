<template>
  <div class="login">
    <div class="box" ref="box">
      <h1 class="title">elm后台管理系统</h1>
      <el-form :model="loginform" :rules="rules" ref="loginform">
        <el-form-item prop="username">
          <el-input class="input userName" v-model="loginform.username" placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input class="input userPassword" v-model="loginform.password" placeholder="密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="button primary" type="primary" @click="submitform">登录</el-button>
        </el-form-item>
      </el-form>
      <p>温馨提示：</p>
      <p>未登录过的新用户，自动注册</p>
      <p>注册过的用户可凭账号密码登录</p>
    </div>
  </div>
</template>
<script>
  import { loginApp } from '@/api/getData'
  export default{
      name: 'login',
      data() {
          return {
            loginform: {
              username: '',
              password: '',
            },
            rules: {
              username: [
                { required: true, message: '请输入用户名' }
              ],
              password: [
                { required: true, message: '请输入密码' }
              ]
            },
            isshow: false,
          }
      },
      methods: {
          async submitform(){
              this.$refs.loginform.validate(async vaild => {
                  if (vaild) {
                    try {
                      const login = await loginApp({
                        user_name: this.loginform.username,
                        password: this.loginform.password,
                      });
                      if (login.status == 1) {
                        this.$message({
                          type: 'success',
                          message: '登录成功'
                        });
                        this.$router.push('manage')
                      }else {
                        this.$notify.error({
                          title: '错误',
                          message: obj.message,
                          offset: 100
                        });
                      }
                    } catch (e) {
                      this.$notify.error({
                        title: '错误',
                        message: '请求超时',
                        offset: 100
                      });
                    }

                  }else {
                    this.$notify.error({
                      title: '错误',
                      message: '请输入正确的用户名密码',
                      offset: 100
                    });
                  }
              })
          }
      },
      mounted() {
        let box = this.$refs.box;
        Velocity(box, {top: "50%", opacity: 1}, 1000, "easeIn");

      }
  }
</script>

<style scoped="">
 .login {
   background: #324057;
   width: 100%;
   height: 100%;
   position: relative;
 }
 .title {
   color: white;
   margin: 0;
   padding: 0;
   position: absolute;
   top: -100px;
   width: 100%;
   text-align: center;
   left: 0;
 }
 .box {
   background: white;
   width: 320px;
   height: 210px;
   border-radius: 7px;
   padding: 20px;
   position: absolute;
   margin-top: -100px;
   margin-left: -175px;
   top: 40%;
   opacity: 0.5;
   left: 50%;
 }
 .form {
   display: block;
   margin-top: 0;
 }
 .input {
   /*margin-bottom: 20px;*/
 }
 .button{
   width: 100%;
 }
 p {
   margin: 0;
   padding: 0;
   color: red;
   font-size: 12px;
 }
 p:first-of-type {
   /*margin-top: 5px;*/
 }
</style>
