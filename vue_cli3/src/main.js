import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'jquery';
import 'jquery.nicescroll';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);
import '@/assets/css/style.scss';

import '@/directives/index.js';
import Simple from "@/components/simple.jsx";

import Scrollbar from '@/components/scrollbar';
Vue.component("Scrollbar", Scrollbar);
Vue.component("Simple", Simple);


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
