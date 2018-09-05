import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
 * hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
 *                                if not set alwaysShow, only more than one route under the children
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
 **/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    hidden: true,
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index')
    }]
  }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [
  {
    path: '/example',
    component: Layout,
    redirect: '/example/table',
    name: 'example',
    meta: {
      title: '用户管理',
      icon: 'form'
    },
    children: [
      {
        path: 'players',
        name: 'playersAdmin',
        component: () => import('@/views/roleAdmin/index'),
        meta: { title: '玩家管理', icon: 'form' ,  roles: ['admin']}
      },
      {
        path: 'delegates',
        name: 'delegateAdmin',
        component: () => import('@/views/delegateAdmin/index'),
        meta: { title: '代理管理', icon: 'form' ,  roles: ['admin']}
      },
      {
        path: 'partners',
        name: 'partnerAdmin',
        component: () => import('@/views/partnerAdmin/index'),
        meta: { title: '合伙人', icon: 'form',  roles: ['admin']}
      },
      {
        path: 'tree2',
        name: 'tree2',
        component: () => import('@/views/tree/test2'),
        meta: { title: '代理关系', icon: 'peoples',  roles: ['admin', 'delegate']}
      }
    ]
  },
  {
    path: '/statistics',
    component: Layout,
    redirect: '/example/table',
    name: 'statistics',
    meta: { title: '统计', icon: 'chart', roles: ['admin'] },
    children: [
      {
        path: 'index',
        name: 'statistics',
        component: () => import('@/views/statistics/index'),
        meta: { title: '每日数据', icon: 'chart' ,  roles: ['admin']}
      },
      {
        path: 'index2',
        name: 'statistics2',
        component: () => import('@/views/statistics/index2'),
        meta: { title: '数据走势', icon: 'chart' ,  roles: ['admin']}
      }
    ]
  },
  {
    path: '/orderAdmin',
    component: Layout,
    meta: { roles: ['admin'] },
    children: [
      {
        path: 'index',
        name: 'orderAdmin',
        component: () => import('@/views/orderAdmin/index'),
        meta: { title: '订单管理', icon: 'example', roles: ['admin']}
      }
    ]
  },
  {
    path: '/personInfo',
    component: Layout,
    redirect: '/personInfo/index',
    name: 'person',
    meta: { title: '个人中心', icon: 'people' },
    children: [
      {
        path: 'index',
        name: 'personInfo',
        component: () => import('@/views/personInfo/index'),
        meta: { title: '修改密码', icon: 'password',  roles: ['admin', 'delegate'] }
      }
    ]
  },
  {
    path: '/myBusiness',
    component: Layout,
    redirect: '/myBusiness/income',
    name: 'myBusiness',
    meta: { title: '业务管理', icon: 'table' },
    children: [
      {
        path: 'income',
        name: 'income',
        component: () => import('@/views/myBusiness/income'),
        meta: { title: '收益记录', icon: 'form' ,  roles: ['delegate']}
      },
      // {
      //   path: 'level1',
      //   name: 'level1',
      //   component: () => import('@/views/myBusiness/level1'),
      //   meta: { title: '直接玩家', icon: 'form' }
      // },
      // {
      //   path: 'level2',
      //   name: 'level2',
      //   component: () => import('@/views/myBusiness/level2'),
      //   meta: { title: '二级代理', icon: 'form' }
      // },
      // {
      //   path: 'level3',
      //   name: 'level3',
      //   component: () => import('@/views/myBusiness/level3'),
      //   meta: { title: '三级代理', icon: 'form' }
      // },
      // {
      //   path: 'level4',
      //   name: 'level4_n',
      //   component: () => import('@/views/myBusiness/level4_n.vue'),
      //   meta: { title: '四-N', icon: 'form' }
      // }
    ]
  },
  {
    path: '/tools',
    component: Layout,
    redirect: '/tools/index',
    name: 'tools',
    meta: { title: '管理工具', icon: 'table' },
    children: [
      {
        path: 'tools',
        name: 'tools',
        component: () => import('@/views/tools/index'),
        meta: { title: '解散房间', icon: 'form' ,  roles: ['admin']}
      },
      {
        path: 'constant',
        name: 'constant',
        component: () => import('@/views/tools/constant'),
        meta: { title: '游戏常量', icon: 'form' ,  roles: ['admin']}
      },
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]
