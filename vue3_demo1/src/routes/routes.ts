const Home = () => 
    // import(/* webpackChunkName: "Home" */ '../views/home/index.vue')
    import(/* webpackChunkName: "Home" */ '@/views/home/index.vue')

const routes = [
    {
        path: '/home',
        component: Home
    }
]

export default routes;