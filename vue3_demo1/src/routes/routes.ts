const Home = () => 
    import(/* webpackChunkName: "Home" */ '/@/views/home/index.vue')

const routes = [
    {
        path: '/',
        redirect: '/home'
    },
    {
        path: '/home',
        component: Home
    }
]

export default routes;