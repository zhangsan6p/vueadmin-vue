import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

//引入element-ui
import Element from "element-ui"
import 'element-ui/lib/theme-chalk/index.css';

//引入axios
import axios from "axios";

//全局使用axios
Vue.prototype.$axios = axios; //

Vue.config.productionTip = false;



//使用ElementUI主件
Vue.use(Element)

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
