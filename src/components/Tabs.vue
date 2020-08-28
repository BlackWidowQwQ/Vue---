<template>
  <ul class="tabs" :class="{[classPrefix+'-tabs']:classPrefix}">
    <li
      v-for="item in dataSource"
      :key="item.value"
      :class="liClass(item)"
      @click="select(item)"
    >{{item.text}}</li>
  </ul>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

type dataSourceItem = { text: string; value: string };
@Component
export default class Tabs extends Vue {
  @Prop({ required: true, type: Array }) dataSource!: dataSourceItem[]; //required强制传入
  @Prop(String) readonly value!: string;
  @Prop(String) classPrefix?: string;
  select(item: dataSourceItem) {
    this.$emit("update:value", item.value);
  }

  liClass(item: dataSourceItem) {
    return {
      [this.classPrefix + "-tabs-item"]: this.classPrefix,
      selected: item.value === this.value,
    };
  }
}
</script>

<style scoped lang="scss">
@import "~@/assets/style/helper.scss";
// .tabs {
// background: #c4c4c4;
// display: flex;
// text-align: center;
// font-size: 24px;
// > li {
//   width: 50%;
//   height: 64px;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   position: relative;
//   &.selected::after {
//     content: "";
//     position: absolute;
//     bottom: 0;
//     left: 0;
//     width: 100%;
//     height: 4px;
//     background: #333;
//   }
// }
.tabs {
  display: flex;
  text-align: center;
  font-size: 20px;
  height: 64px;
  align-items: flex-end;
  color: white;
  > li {
    // border: solid 1px;
    width: 96px;
    height: 75%;
    display: flex;
    justify-content: center;
    align-items: center;
    &.selected {
      background: lighten($color-theme-0, 100%);
      box-shadow: 4px -4px darken($color-theme-0, 10%);
      color: #333;
      font-size: 23px;
      font-weight: bold;
      position: relative;
      &.selected::after {
        content: "";
        position: absolute;
        bottom: -1px;
        left: 0;
        width: 100%;
        height: 3px;
        background: lighten($color-theme-0, 100%);
      }
      border-radius: 20px 20px 0 0;
    }
  }
}
// }
</style>