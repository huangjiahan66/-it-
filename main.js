// #ifndef VUE3
import Vue from "vue";
import App from "./App";
import store from "./store";
import "./styles/global.scss";
import * as filters from "./filters";
// 文章详情样式
import "./styles/article-detail.scss";
Object.keys(filters).forEach((key) => {
  Vue.filter(key, filters[key]);
});
Vue.config.productionTip = false;

App.mpType = "app";

const app = new Vue({
  ...App,
  store,
});
app.$mount();
// #endif

// #ifdef VUE3
import { createSSRApp } from "vue";
import App from "./App.vue";

export function createApp() {
  const app = createSSRApp(App);
  return {
    app,
  };
}
// #endif
