import Vue from "vue";
import Vuex from "vuex";
import clone from "@/lib/clone";
import router from "@/router";
import tagInitial from "@/constants/tagInitial";
Vue.use(Vuex); //把store绑定到vue的prototype上 Vue.prototype.$store=store

const store = new Vuex.Store({
  state: {
    recordList: [] as RecordItem[],
    tagList: [] as TagItem[],
    createTagInf: "" as string,
    choseTag: { name: "food", value: "餐饮" } as TagItem,
    budget: "" as string,
  },
  mutations: {
    //budget
    removeBudget(state) {
      state.budget = "";
      store.commit("saveBudget");
    },
    fetchBudget(state) {
      state.budget = window.localStorage.getItem("budget" || "") || "";
    },
    createBudget(state, money: number) {
      state.budget = money + "";
      store.commit("saveBudget");
    },
    saveBudget(state) {
      window.localStorage.setItem("budget", JSON.stringify(state.budget));
    },
    //record
    fetchRecord(state) {
      state.recordList = JSON.parse(
        window.localStorage.getItem("recordList") || "[]"
      ) as RecordItem[];
    },

    createRecord(state, record: RecordItem) {
      const record2: RecordItem = clone(record);
      record2.createdAt = new Date().toISOString();
      state.recordList.push(record2);
      store.commit("saveRecord");
      window.alert("已保存");
    },

    updateRecord(state, payload) {
      const { id, notes, amount } = payload;
      const idList = state.recordList.map((item) => item.id);
      if (idList.indexOf(id) >= 0) {
        const record = state.recordList.filter((item) => item.id === id)[0];
        record.notes = notes;
        record.amount = amount;
        store.commit("saveRecord");
      }
    },

    removeRecord(state, id: number) {
      let index = -1;
      for (let i = 0; i < state.recordList.length; i++) {
        if (state.recordList[i].id === id) {
          index = i;
          break;
        }
      }
      if (index >= 0) {
        state.recordList.splice(index, 1);
        store.commit("saveRecord");
      } else {
        window.alert("删除失败！");
      }
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
      state.tagList = JSON.parse(
        window.localStorage.getItem("tagList") ||
          JSON.stringify(tagInitial.defaultExpenseTags)
      );
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

    removeTag(state, tagValue: string) {
      let index = -1;
      for (let i = 0; i < state.tagList.length; i++) {
        if (state.tagList[i].value === tagValue) {
          index = i;
          break;
        }
      }
      if (index >= 0) {
        state.tagList.splice(index, 1);
        store.commit("saveTags");
        router.back();
      } else {
        window.alert("删除失败");
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
