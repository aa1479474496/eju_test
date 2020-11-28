export default [
  {
    path: '/',
    component: '@/pages/welcome/index'
  },
  {
    path: '/edit',
    component: '@/pages/edit/index'
  },
  {
    path: '/list',
    component: '@/pages/list/index',
    routes: [
      {
        path: '/list',
        redirect: '/list/basic',
      },
      {
        path: '/list/basic',
        component: '@/pages/list/basicList/index',
      },
      {
        path: '/list/advance',
        component: '@/pages/list/advanceList/index',
      }
    ]
  },
]