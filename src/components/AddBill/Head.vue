<template>
  <div class="head">
    <router-link to class="cancel">
      <button @click="$router.back(-1)">
        <Icon name="Cancel"></Icon>
      </button>
    </router-link>
    <Tabs :dataSource="recordTypeList" :value.sync="typeValue" />
    <!-- <ul class="type">
      <li :class="typeValue === '-' && 'selected'" @click="selectType('-')">
        支出
      </li>
      <li :class="typeValue === '+' && 'selected'" @click="selectType('+')">
        收入
      </li>
    </ul>-->
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";

@Component //装饰器，自动把type和selectType()处理成数据和方法
export default class Head extends Vue {
  @Prop() readonly typeValue!: string; //type只能是"-"和"+"哦
  selectType(type: string) {
    if (type !== "-" && type !== "+") throw new Error("type is unknown");
    this.$emit("update:typeValue", type);
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";

.head {
  background: $color-theme-0;
  display: flex;
  justify-content: center;
  position: relative;
  .cancel {
    position: absolute;
    left: 0;
    height: 100%;
    > button {
      height: 64px;
      background: transparent;
      border: none;
      .icon {
        height: 32px;
        width: 32px;
      }
    }
  }

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
}
</style>
