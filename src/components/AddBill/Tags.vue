<template>
  <ul class="tags">
    <li
      v-for="(tag, index) in dataSource"
      :key="index"
      :class="{selected:selectedTag.indexOf(tag)>=0}"
      @click="toggle(tag)"
    >
      <div>
        <Icon :name="tag.name" />
      </div>
      <span>{{tag.value}}</span>
    </li>

    <li class="new" @click="create">
      <div>
        <Icon name="addTag" />
      </div>
      <span>添加</span>
      <!-- <button @click="create">输入标签吧</button> -->
    </li>
  </ul>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
@Component
export default class Tags extends Vue {
  @Prop() readonly dataSource: TagItem[] | undefined;
  selectedTag: TagItem[] = [];

  toggle(tag: TagItem) {
    const index = this.selectedTag.indexOf(tag);
    if (index >= 0) {
      this.selectedTag.splice(index, 1);
    } else {
      this.selectedTag.push(tag);
    }
    this.$emit("update:tagValue", this.selectedTag);
  }

  create() {
    const name = window.prompt("请输入标签名");
    if (name === "") {
      window.alert("标签名不能为空!"); //name为用户输入的内容
    } else if (this.dataSource && name) {
      this.$emit("update:dataSource", [...this.dataSource, name]);
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";
.tags {
  border: 1px solid red;
  padding: 16px;
  display: flex;
  flex-grow: 1;
  flex-direction: row;
  flex-wrap: wrap;
  align-content: flex-start;
  overflow: auto;
  > li {
    width: 25%;
    padding: 12px 0;
    font-size: 12px;
    display: flex;
    flex-direction: column;
    align-items: center;
    &.selected {
      .icon {
        background: lighten($color-theme-0, 20%);
      }
    }
    .icon {
      width: 48px;
      height: 48px;
      padding: 4px;
      border-radius: 50%;
      background: #f5f5f5;
      margin-bottom: 4px;
    }
  }
}
</style>