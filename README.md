# my-ele

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

# 后台管理系统附加说明：

## 登录页
- elm后台管理系统
- 第一次登录的用户自动注册成为普通管理员
- 普通管理员可以添加，修改信息

## 首页
- 显示今日数据
- 显示总数据
- 走势图显示7日数据

## 用户列表
- 显示注册用户时间名字地点

## 商家列表
- 简单显示商家名字、地址、介绍
- 展开可查看详细介绍，详细数据当展开时请求
- 商家信息可编辑，当点击编辑时，请求详细数据，并在分类列表展示（可编辑）
- 可以在商家中添加食品，当点击时，商家ID保存到store，并跳转到添加食品页，添加食品页从store获取商店ID

## 食品列表
- 简单显示食品名字、介绍、评分
- 展开可查看详细介绍，详细数据当展开时请求
- 食品信息可编辑，当点击编辑时，请求详细数据，并在分类列表展示（可编辑）

## 订单列表
- 显示订单信息
- 展开显示详细信息

## 管理员列表
- 显示管理员列表

## 添加商铺</h3>
- 包含 输入商铺信息，搜索位置并选择，多级联选择器，营业时间选择，上传图片，优惠活动表格

## 添加食品</h3>
- 如果没有选择过店铺，则会提示选择店铺，并跳转至店铺列表
- 包含 输入商铺信息，上传图片，商品规格表格

# 技术栈</h2>
- vue</span>
- vuex</span>
- vue-router
- element-ui
- velocity-animate
- echarts
