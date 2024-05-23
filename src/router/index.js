import {createRouter, createWebHistory} from 'vue-router'

const routes = [
    {
        path: '/',
        name: 'index',
        redirect: '/home',
        component: () => import('../views/IndexView.vue'),
        children: [
            {
                path: 'home',
                name: 'home',
                component: () => import('../views/HomeView.vue')
            },
            {
                //以后要用第一个，带id进页面，现在仅用于测试
                // path: 'movie/info/:id',
                path: 'movie/info',
                name: 'movieInfo',
                component: () => import('../views/details/MovieInfoView.vue')
            },
            {
                path: 'classification',
                name: 'classification',
                component: () => import('../views/classification/ClassificationView.vue'),
            },
            {
                path: 'searchResult',
                name: 'searchResult',
                component: () => import('../views/SearchResultView.vue'),
            },
         ]
     },
    {
        path: '/login',
        name: 'login',
        component: () => import('../views/LoginView.vue')
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

/**
 * 全局后置守卫：
 * 1. 每次路由跳转后，页面回到顶部。
 */
// router.afterEach((to, from, next) => {
//     document.body.scrollTop = 0;
//     document.documentElement.scrollTop = 0;
//
//     // 兼容IE
//     window.scrollTo(0, 0);
//      next();
// })

export default router
