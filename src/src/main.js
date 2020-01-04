// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './router/';
import env from './config/env';
import ElementUI from 'element-ui';
// import iView from 'iview';
// import 'iview/dist/styles/iview.css';
import './style/theme/black/common';
import './style/default/common';
import './assets/fontIcon/iconfont.css';
import biplugin from './bi';
import './server/user';

import Vtip from 'vtip'
import 'vtip/lib/index.min.css'

import App from './App';


//Vue.prototype
Vue.config.productionTip = false

// 注册指令使用
Vue.use(Vtip.directive)
// 工具函数调用
Vue.prototype.$tip = Vtip.tip

Vue.use(VueRouter);
Vue.use(ElementUI);
// Vue.use(iView);
Vue.use(biplugin);

Vue.mixin({
  beforeRouteEnter(from, to, next) {
    // if (!bi.user.logined && from.path != '/user/login') {
    //   location.replace('/user/login');
    // }
    // console.log('beforeRouteEnter:', from, to);
    next();
  },
  beforeRouteUpdate(from, to, next) {
    // console.log('beforeRouteUpdate:', from, to, next);
    next();
  },
  beforeRouteLeave(to, from, next) {
    // console.log('beforeRouteLeave:', from, to, next);
    next();
  }
});

const router = new VueRouter({
  routes,
  canReuse: false,
  mode: env.routerMode,
  linkActiveClass: "current",
  strict: process.env.NODE_ENV !== 'production',
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      if (from.meta.keepAlive) {
        from.meta.savedPosition = document.body.scrollTop;
      }
      return { x: 0, y: to.meta.savedPosition || 0 }
    }
  }
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

