import Vue from 'vue'
import Router from 'vue-router'
import login from '@/page/login'
import manage from '@/page/manage'
import Home from '@/page/Home'
import addShop from '@/page/addShop'
import addFood from '@/page/addFood'
import UserList from '@/page/UserList'
import ShopList from '@/page/ShopList'
import FoodList from '@/page/FoodList'
import OrderList from '@/page/OrderList'
import AdminList from '@/page/AdminList'
import AdminSetUp from '@/page/AdminSetUp'
import Explain from '@/page/Explain'
import UserDis from '@/page/UserDis'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      component: login
    },
    {
      path: '/manage',
      name: 'manage',
      component: manage,
      children: [
        {
          path: '/',
          name: 'Home',
          component: Home,
        },
        {
          path: '/UserList',
          name: 'UserList',
          component: UserList,
          meta: ['数据管理', '用户列表'],
        },
        {
          path: '/ShopList',
          name: 'ShopList',
          component: ShopList,
          meta: ['数据管理', '商家列表'],
        },
        {
          path: '/FoodList',
          name: 'FoodList',
          component: FoodList,
          meta: ['数据管理', '食品列表'],
        },
        {
          path: '/OrderList',
          name: 'OrderList',
          component: OrderList,
          meta: ['数据管理', '订单列表'],
        },
        {
          path: '/AdminList',
          name: 'AdminList',
          component: AdminList,
          meta: ['数据管理', '管理员列表'],
        },
        {
          path: '/addShop',
          name: 'addShop',
          component: addShop,
          meta: ['添加数据', '添加商铺'],
        },
        {
          path: '/addFood',
          name: 'addFood',
          component: addFood,
          meta: ['添加数据', '添加商品'],
        },
        {
          path: '/AdminSetUp',
          name: 'AdminSetUp',
          component: AdminSetUp,
          meta: ['设置', '管理员设置'],
        },
        {
          path: '/Explain',
          name: 'Explain',
          component: Explain,
          meta: ['说明', '说明'],
        },
        {
          path: '/UserDis',
          name: 'UserDis',
          component: UserDis,
          meta: ['图表', '用户分布'],
        },
      ]
    }
  ]
})
