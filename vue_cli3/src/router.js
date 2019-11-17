import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/about',
            name: 'about',
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
        },
        {
            path: '/account',
            name: 'account',
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import(/* webpackChunkName: "about" */ './views/Account.vue')
        },

        {
            path: '/table',
            name: 'table',
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import(/* webpackChunkName: "table" */ './views/Table.vue')
        },

        {
            path: '/loading',
            name: 'loading',
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import(/* webpackChunkName: "Loading" */ './views/Loading.vue')
        },

        {
            path: '/scroll',
            name: 'scroll',
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import(/* webpackChunkName: "scroll" */ './views/TestScroll.vue'),

            // TestScrollPageB.vue
            children: [
                {
                    path:'/scroll/a',
                    name: 'scrollA',
                    component: () => import(/* webpackChunkName: "scroll" */ './views/TestScrollPageA.vue'),
                },
                {
                    path:'/scroll/B',
                    name: 'scrollB',
                    component: () => import(/* webpackChunkName: "scroll" */ './views/TestScrollPageB.vue'),
                },
                {
                    path:'/scroll/C',
                    name: 'scrollC',
                    component: () => import(/* webpackChunkName: "scroll" */ './views/TestScrollPageC.vue'),
                }
            ]
        }
    ]
})
