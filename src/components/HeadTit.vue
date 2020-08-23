<template>
  <div class="headTit">
    <Icon name="MyOnhead" />
    <span>小凯记账</span>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";

@Component
export default class HeadTit extends Vue {}
</script>

<style scoped lang="scss">
@import "~@/assets/style/helper.scss";
.headTit {
  background: $color-theme-0;
  border-bottom: white solid 2px;
  display: flex;
  justify-content: center;
  font-size: 22px;
  align-items: center;
  color: white;
  position: relative;
  .icon {
    position: absolute;
    left: 20px;
    height: 25px;
    width: 25px;
  }
  span {
    height: 58px;
    display: flex;
    align-items: center;
  }
}
</style>
