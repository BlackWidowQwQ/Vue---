import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "../views/Home.vue";
import MainWeb from "@/views/MainWeb.vue";
import Count from "@/views/Count.vue";
import Statistics from "@/views/Statistics.vue";
import AddBill from "@/views/AddBill.vue";
import MyOption from "@/views/MyOption.vue";
import NotFound from "@/views/NotFound.vue";
import OtherTags from "@/views/OtherTags.vue";
import RecordEdit from "@/views/RecordEdit.vue";

Vue.use(VueRouter);

const routes = [
  //重定向，设置首页
  {
    path: "/",
    redirect: "/count",
  },

  // {
  //   path: "/mainWeb",
  //   component: MainWeb,
  // },

  {
    path: "/count",
    component: Count,
  },

  {
    path: "/addBill",
    component: AddBill,
  },

  {
    path: "/otherTags",
    component: OtherTags,
  },

  {
    path: "/statistics",
    component: Statistics,
  },

  {
    path: "/count/edit/:id",
    component: RecordEdit,
  },

  // {
  //   path: "/myOption",
  //   component: MyOption,
  // },

  {
    path: "*",
    component: NotFound,
  },

  // {
  //   path: "/about",
  //   name: "About",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/About.vue"),
  // },
];

const router = new VueRouter({
  routes,
});

export default router;
