import Vue from "vue";
import Vuex from "vuex";
import clone from "@/lib/clone";

Vue.use(Vuex); //把store绑定到vue的prototype上 Vue.prototype.$store=store

const store = new Vuex.Store({
  state: {
    recordList: [] as RecordItem[],
    tagList: [] as TagItem[],
    createTagInf: "" as string,
  },
  mutations: {
    fetchRecord(state) {
      state.recordList = JSON.parse(
        window.localStorage.getItem("recordList") || "[]"
      ) as RecordItem[];
    },

    createRecord(state, record: RecordItem) {
      const record2: RecordItem = clone(record);
      record2.createdAt = new Date();
      state.recordList.push(record2);
      store.commit("saveRecord");
    },

    saveRecord(state) {
      window.localStorage.setItem(
        "recordList",
        JSON.stringify(state.recordList)
      );
    },
    //tags
    fetchTags(state) {
      return (state.tagList = JSON.parse(
        window.localStorage.getItem("tagList") || "[]"
      ));
    },

    createTag(state, tag: TagItem) {
      const flag = state.tagList.some((item) => item.name === tag.name);
      if (flag) {
        window.alert("标签重复了，请重新输入");
        state.createTagInf = "duplicated"; //用返回的字符串"duplicated"表重复了
      } else {
        state.tagList.push(tag);
        store.commit("saveTags");
        window.alert("添加新标签成功!");
        state.createTagInf = "success"; //用返回的字符串"success”表创建成功
      }
    },

    saveTags(state) {
      window.localStorage.setItem("tagList", JSON.stringify(state.tagList));
    },
  },
  actions: {},
  modules: {},
});

export default store;
