import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

//引入element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

//引入axios
import axios from "./utils/axios";

//全局使用axios
Vue.prototype.$axios = axios; //

Vue.config.productionTip = false;

require('./mock')



//使用ElementUI主件
Vue.use(ElementUI, { locale })

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
