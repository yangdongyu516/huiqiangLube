import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

// 引入mint-ui组件库
import MintUi from 'mint-ui';
import "mint-ui/lib/style.css";

// 使用全局方法使用插件
Vue.use(MintUi);

import './assets/mui/css/mui.css'
import "./assets/mui/css/icons-extra.css";
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
