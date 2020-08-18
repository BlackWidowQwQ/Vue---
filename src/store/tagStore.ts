const localStorageKeyName = "tagList";
const tagStore = {
  //tag store
  tagList: [] as TagItem[],
  fetchTags() {
    this.tagList = JSON.parse(
      window.localStorage.getItem(localStorageKeyName) || "[]"
    );

    return this.tagList;
  },
  createTag(tag: TagItem) {
    const flag = this.tagList.some((item) => item.name === tag.name);
    if (flag) {
      window.alert("标签重复了，请重新输入");
      return "duplicated"; //用返回的字符串"duplicated"表重复了
    } else {
      this.tagList.push(tag);
      this.saveTags();
      window.alert("添加新标签成功!");
      return "success"; //用返回的字符串"success”表创建成功
    }
  },
  removeTag(tagValue: string) {
    let index = -1;
    for (let i = 0; i < this.tagList.length; i++) {
      if (this.tagList[i].value === tagValue) {
        index = i;
        break;
      }
    }
    this.tagList.splice(index, 1);
    this.saveTags();
    return true;
  },

  // updateTag = (tag: TagItem) => {
  //   return tagListModel.update(tag);
  // };

  findTag(tagValue: string) {
    return this.tagList.filter((t) => t.value === tagValue)[0];
  },

  saveTags() {
    window.localStorage.setItem(
      localStorageKeyName,
      JSON.stringify(this.tagList)
    );
  },
};

tagStore.fetchTags();

export default tagStore;
