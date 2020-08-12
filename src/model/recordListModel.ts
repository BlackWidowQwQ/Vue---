import clone from "@/lib/clone.ts";
const localStorageKeyName = "recordList";
const recordListModel = {
  data: [] as RecordItem[],

  create(record: RecordItem) {
    const record2: RecordItem = clone(record);
    record2.createdAt = new Date();
    this.data.push(record2);
  },

  fetch() {
    return JSON.parse(
      window.localStorage.getItem(localStorageKeyName) || "[]"
    ) as RecordItem[];
  },
  save() {
    return window.localStorage.setItem(
      localStorageKeyName,
      JSON.stringify(this.data)
    );
  },
};
export default recordListModel;
