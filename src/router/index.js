import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [{
  path: '/login',
  component: () =>
    import ('@/views/login/index'),
  hidden: true
},

{
  path: '/register',
  component: () =>
    import ('@/views/register/index')
},

{
  path: '/404',
  component: () =>
    import ('@/views/404'),
  hidden: true
},

{
  path: '/dashboard',
  component: Layout,
  redirect: '/dashboard',
  children: [{
    path: 'dashboard',
    name: 'Dashboard',
    component: () =>
      import ('@/views/dashboard/index'),
    meta: { title: '管理用户', icon: 'dashboard',requiresStaff:1 }
  }]
},

{
  path: '/',
  component: Layout,
  redirect: '/basicAnalysis',
  children: [{
    path: 'basicAnalysis',
    name: 'BasicAnalysis',
    component: () =>
      import ('@/views/basicAnalysis/index'),
    meta: { title: '数据基本分析', icon: 'table',requiresStaff:0 }
  }]
},

{
  path: '/crawl',
  component: Layout,
  redirect: '/crawl',
  children: [{
    path: 'crawl',
    name: 'Crawl',
    component: () =>
      import ('@/views/crawl/index'),
    meta: { title: '爬虫信息', icon: 'form',requiresStaff:0 }
  }]
},

{
  path: '/trendPrediction',
  component: Layout,
  redirect: '/trendPrediction',
  children: [{
    path: 'trendPrediction',
    name: 'TrendPrediction',
    component: () =>
      import ('@/views/trendPrediction/index'),
    meta: { title: '短视频热点预测', icon: 'el-icon-s-marketing' }
  }]
},

{
  path: '/profile',
  component: Layout,
  redirect: '/profile',
  children: [{
    path: 'profile',
    name: 'Profile',
    component: () =>
      import ('@/views/profile/index'),
    meta: { title: '个人信息', icon: 'el-icon-s-custom',requiresStaff:0 }
  }]
},

{
  path: '/graph',
  component: Layout,
  redirect: '/graph',
  children: [{
    path: 'graph',
    name: 'graph',
    component: () =>
      import ('@/views/graph/index'),
    meta: { title: '图谱', icon: 'tree',requiresStaff:0 }
  }]
},

{
  path: '/crawlDetail',
  component: Layout,
  redirect: '/crawlDetail',
  children: [{
    path: 'crawlDetail/:name',
    name: 'crawlDetail',
    component: () =>
      import ('@/views/crawlDetail/index')
  }]
},

// 404 page must be placed at the end !!!
{ path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
