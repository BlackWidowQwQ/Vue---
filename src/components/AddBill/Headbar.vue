<template>
  <div>
    <ul class="type">
      <li :class="type==='-' && 'selected'" @click="selectType('-')">支出</li>
      <li :class="type==='+' && 'selected'" @click="selectType('+')">收入</li>
    </ul>
  </div>
</template>

<script lang="ts">
// export default {
//   name: "Headbar",
//   data(){
//     return {
//       type:"-", //"-"表示支出，"+"表示收入
//     }
//   },
//   methods:{
//     selectType(type){ //type只能是"-"和"+"哦
//       if(type!=="-" && type!=="+")
//       throw new Error("type is unknown");
//       this.type=type;
//     }
//   }
// };
import Vue from "vue";
import { Component } from "vue-property-decorator";

@Component({
  props: {
    propMessage: String,
  },
}) //装饰器，自动把type和selectType()处理成数据和方法
export default class Headbar extends Vue {
  type = "-"; //"-"表示支出，"+"表示收入
  helloMsg = "Hello, " + this.propMessage;
  selectType(type: string) {
    //type只能是"-"和"+"哦
    if (type !== "-" && type !== "+") throw new Error("type is unknown");
    this.type = type;
  }
}
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
</style>