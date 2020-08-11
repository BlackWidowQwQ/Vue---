const localStorageKeyName = "tagList";

const tagListModel = {
  data: [] as TagItem[],
  create(tag: TagItem) {
    const flag = this.data.some((item) => item.name === tag.name);
    if (flag) {
      throw new Error("duplicated");
    } else {
      this.data.push(tag);
      this.save();
      return true;
    }
  },

  fetch() {
    this.data = JSON.parse(
      window.localStorage.getItem(localStorageKeyName) || "[]"
    );
    return this.data;
  },

  save() {
    return window.localStorage.setItem(
      localStorageKeyName,
      JSON.stringify(this.data)
    );
  },
};
export default tagListModel;
