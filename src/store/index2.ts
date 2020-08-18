import tagStore from "@/store/tagStore";
import recordStore from "@/store/recordStore";

const store = { ...tagStore, ...recordStore };
console.log(store);
export default store;
