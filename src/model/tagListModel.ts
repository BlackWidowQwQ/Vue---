const localStorageKeyName = "tagList";

const tagListModel = {
  data: [] as TagItem[],
  create(tag: TagItem) {
    const flag = this.data.some((item) => item.name === tag.name);
    if (flag) {
      return "duplicated"; //用返回的字符串"duplicated"表重复了
    } else {
      this.data.push(tag);
      this.save();
      return "success"; //用返回的字符串"success”表创建成功
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
