import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import Nav from "@/components/Nav.vue";
import Layout from "@/components/Layout.vue";
import Icon from "@/components/Icon.vue";
import tagListModel from "@/model/tagListModel";

Vue.config.productionTip = false;

Vue.component("Nav", Nav);
Vue.component("Layout", Layout);
Vue.component("Icon", Icon);

window.tagList = tagListModel.fetch();
window.createTag = (name: TagItem) => {
  const message = tagListModel.create(name);
  if (message === "duplicated") {
    window.alert("标签重复了，请重新输入");
  } else if (message === "success") {
    window.alert("添加新标签成功!");
  }
  return message;
};

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
