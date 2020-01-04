const home = r => require.ensure([], () => r(require('@/page/bi/dash/home')), 'home')
const chartedit = r => require.ensure([], () => r(require('@/page/bi/chart/edit')), 'chart')
const dashedit = r => require.ensure([], () => r(require('@/page/bi/dash/edit')), 'dash')
const dashshow = r => require.ensure([], () => r(require('@/page/bi/dash/show')), 'dash')
const mapindex = r => require.ensure([], () => r(require('@/page/map/index')), 'map')
const mapcity = r => require.ensure([], () => r(require('@/page/map/children/city')), 'map')
const mapland = r => require.ensure([], () => r(require('@/page/map/children/land')), 'map')
const mapblock = r => require.ensure([], () => r(require('@/page/map/children/block')), 'map')
const mapdash = r => require.ensure([], () => r(require('@/page/map/children/children/dash')), 'map')
const appedit = r => require.ensure([], () => r(require('@/page/app/edit')), 'apps')
const applist = r => require.ensure([], () => r(require('@/page/app/list')), 'apps')
const appshow = r => require.ensure([], () => r(require('@/page/app/show')), 'apps')
const userlogin = r => require.ensure([], () => r(require('@/page/bi/user/login')), 'user')
const user404 = r => require.ensure([], () => r(require('@/page/bi/user/404')), 'user')
const userpasswd = r => require.ensure([], () => r(require('@/page/bi/user/password')), 'user')
const tablelist = r => require.ensure([], () => r(require('@/page/table/list')), 'table')
const tablejoin = r => require.ensure([], () => r(require('@/page/table/join')), 'table')

const sourcelist = r =>require.ensure([], () => r(require('@/page/source/list')), 'source')
const sourcemysql = r =>require.ensure([], () => r(require('@/page/source/mysql')), 'source')
const sourcetable = r => require.ensure([], () => r(require('@/page/source/table')), 'source')
const sourceadd = r => require.ensure([], () => r(require('@/page/source/add')), 'source')
const sourceexcel = r => require.ensure([], () => r(require('@/page/source/excel')), 'source')


const datav = r => require.ensure([], () => r(require('@/page/datav/list')), 'datav')
const datavadd = r => require.ensure([], () => r(require('@/page/datav/add')), 'datav')
const datavedit = r => require.ensure([], () => r(require('@/page/datav/edit')), 'datav')
const datavshow = r => require.ensure([], () => r(require('@/page/datav/show')), 'datav')

export default [
    {
      path: '/user/login',
      component: userlogin
    }, {
      path: '/user/password',
      component: userpasswd
    }, {
      path: '/404',
      component: user404
    }, {
      path: '/',
      redirect: '/home/-1'
    },{
      path: '/site',//针对site做跳转
      redirect: '/home/-1'
    },{
      path: '/site/index',//针对site做跳转
      redirect: '/home/-1'
    },{
      path: '/home',
      redirect: '/home/-1'
    }, {
      path: '/home/:id',
      component: home
    }, {
      path: '/dash/show/:id',
      component: dashshow
    }, {
      path: '/dash/edit/:id',
      component: dashedit
    }, {
      path: '/chart/edit/:id',
      component: chartedit
    }, {
      path: '/app/list',
      component: applist
    }, {
      path: '/app/edit/:appid',
      component: appedit
    }, {
      path: '/app/edit/:appid/dash/:id',
      component: appedit
    },{
      path: '/app/show/:appid',
      component: appshow
    },{
      path: '/app/show/:appid/dash/:id',
      component: appshow
    },
    {
      path: '/table/list',
      redirect: '/table/list/-1/-1'
    },
    {
      path: '/table/list/:parent/:id',
      component: tablelist
    },{
      path: '/table/join',
      component: tablejoin
    },{
      path: '/source/list',
      component: sourcelist
    },{
      path: '/source/mysql/:sourceid',
      component: sourcemysql
    },{
      path: '/source/table/:sourceid',
      component: sourcetable
    },{
      path: '/source/addexcel',
      component: sourceexcel
    },{
      path: '/source/add',
      component: sourceadd
    },{
      path: '/datav/list',
      component: datav
    },{
      path: '/datav/add',
      component: datavadd
    },{
      path: '/datav/edit/:id',
      component: datavedit
    },{
      path: '/datav/show/:id',
      component: datavshow
    },{
      path: '/map',
      component: mapindex,
      redirect: '/map/city',
      children: [{
        path: 'city', //城市进入
        component: mapcity,
        children: [{
          path: 'dash/:id', //全屏显示
          component: mapdash,
        }]
      }, {
        path: 'block', //板块进入
        component: mapblock,
        children: [{
          path: 'dash/:id', //全屏显示
          component: mapdash,
        }]
      }, {
        path: 'land', //土地分析
        component: mapland,
        children: [{
          path: 'dash/:id', //全屏显示
          component: mapdash,
        }]
      }]
    }
  ]
