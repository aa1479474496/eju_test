import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import vClickOutside from "click-outside-vue3"

import router from '/@/routes/index';
import store from '/@/store/index'

const app = createApp(App);
app.use(router);
app.use(store);
app.use(ElementPlus);
app.use(vClickOutside);
app.mount('#app');
