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
        path: '/404',
        component: () =>
            import ('@/views/404'),
        hidden: true
    },

    {
        path: '/',
        component: Layout,
        redirect: '/dashboard',
        children: [{
            path: 'dashboard',
            name: 'Dashboard',
            component: () =>
                import ('@/views/dashboard/index'),
            meta: { title: '社团列表', icon: 'dashboard' }
        }]
    },

    {
        path: '/',
        component: Layout,
        redirect: '/application',
        children: [{
            path: 'application/:groupname',
            name: 'Application',
            component: () =>
                import ('@/views/application/index'),
        }]
    },

    {
        path: '/myapplication',
        component: Layout,
        redirect: '/myapplication',
        children: [{
            path: 'myapplication',
            name: 'Myapplication',
            component: () =>
                import ('@/views/myapplication/index'),
            meta: { title: '我的申请', icon: 'table' }
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
            meta: { title: '个人信息', icon: 'el-icon-s-custom' }
        }]
    },

    {
        path: '/brand',
        component: Layout,
        redirect: '/brand/list',
        name: 'Example',
        meta: { title: '品牌管理', icon: 'el-icon-s-help' },
        children: [{
                path: 'list',
                name: 'list',
                component: () =>
                    import ('@/views/brand/index'),
                meta: { title: '品牌列表', icon: 'table' }
            },
            {
                path: 'add',
                name: 'add',
                component: () =>
                    import ('@/views/brand/add'),
                meta: { title: '添加品牌', icon: 'tree' }
            },
            // 此路由用于编辑品牌信息，:id用于接收需要被修改的品牌id
            {
                // /brand/edit/123
                path: 'edit/:id',
                name: 'edit',
                // 此路由不需要在页面上显示
                hidden: true,
                component: () =>
                    import ('@/views/brand/add'),
                meta: { title: '编辑品牌', icon: 'tree' }
            }
        ]
    },
    {
        path: '/category',
        component: Layout,
        redirect: '/category/list',
        name: 'category',
        meta: { title: '分类管理', icon: 'el-icon-s-help' },
        children: [{
            path: 'list',
            name: 'category',
            component: () =>
                import ('@/views/category/index'),
            meta: { title: '分类列表', icon: 'table' }
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