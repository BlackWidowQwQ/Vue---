<template>
  <div>
    <ul class="type">
      <li class="selected">支出</li>
      <li>收入</li>
    </ul>
  </div>
</template>

<script lang="ts">
export default {
  name: "Headbar",
};
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";
.type {
  display: flex;
  text-align: center;
  font-size: 20px;
  height: 64px;
  align-items: flex-end;
  color: white;
  > li {
    // border: solid 1px;
    width: 128px;
    height: 75%;
    display: flex;
    justify-content: center;
    align-items: center;
    &.selected {
      background: lighten($color-theme-0, 50%);
      box-shadow: 4px -4px darken($color-theme-0, 10%);
      color: #333;
      font-size: 22px;
      font-weight: bold;
      //使用伪元素添加下划线，不喜欢
      // &.selected::after {
      //   content: "";
      //   position: absolute;
      //   bottom: 0;
      //   left: 0;
      //   width: 100%;
      //   height: 3px;
      //   background: #333;
      // }
      border-radius: 20px 20px 0 0;
    }
  }
}
</style>