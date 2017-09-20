<template>
    <div id="explain">
        <el-row>
          <el-col :offset="3">
            <h2>后台管理系统附加说明：</h2>
            <h3>登录页</h3>
            <div>
              <p>elm后台管理系统</p>
              <p>第一次登录的用户自动注册成为普通管理员</p>
              <p>普通管理员可以添加，修改信息</p>
            </div>
            <h3>首页</h3>
            <div>
              <p>显示今日数据</p>
              <p>显示总数据</p>
              <p>走势图显示7日数据</p>
            </div>
            <h3>用户列表</h3>
            <div>
              <p>显示注册用户时间名字地点</p>
            </div>
            <h3>商家列表</h3>
            <div>
              <p>简单显示商家名字、地址、介绍</p>
              <p>展开可查看详细介绍，详细数据当展开时请求</p>
              <p>商家信息可编辑，当点击编辑时，请求详细数据，并在分类列表展示（可编辑）</p>
              <p>可以在商家中添加食品，当点击时，商家ID保存到store，并跳转到添加食品页，添加食品页从store获取商店ID</p>
            </div>
            <h3>食品列表</h3>
            <div>
              <p>简单显示食品名字、介绍、评分</p>
              <p>展开可查看详细介绍，详细数据当展开时请求</p>
              <p>食品信息可编辑，当点击编辑时，请求详细数据，并在分类列表展示（可编辑）</p>
            </div>
            <h3>订单列表</h3>
            <div>
              <p>显示订单信息</p>
              <p>展开显示详细信息</p>
            </div>
            <h3>管理员列表</h3>
            <div>
              <p>显示管理员列表</p>
            </div>
            <h3>添加商铺</h3>
            <div>
              <p>包含 输入商铺信息，搜索位置并选择，多级联选择器，营业时间选择，上传图片，优惠活动表格</p>
            </div>
            <h3>添加食品</h3>
            <div>
              <p>如果没有选择过店铺，则会提示选择店铺，并跳转至店铺列表</p>
              <p>包含 输入商铺信息，上传图片，商品规格表格</p>
            </div>

            <h2>技术栈</h2>
            <div>
              <span>vue</span>
              <span>vuex</span>
              <span>vue-router</span>
              <span>element-ui</span>
              <span>velocity-animate</span>
              <span>echarts</span>
            </div>
            <h2>项目布局</h2>
            <div>

            </div>
            <h2>项目记录</h2>
            <div>

            </div>
          </el-col>
        </el-row>
    </div>
</template>


<script>


export default {
    name: 'Home',
    components:{

    },
    data() {
        return {
        }
    },
    mounted(){

    },
    watch:{

    },
    methods:{

    },
    created() {

    }

}
</script>

<style scoped="">
  span{
    padding: 5px;
    border: 1px solid black;
  }
</style>
