<template>
  <Layout>
    <HeadTit />
    <div class="content">
      <div class="dateBoard">
        <div>今天是:</div>
        <div>{{today}}</div>
        <div>点击下方「记账」来记一笔吧~</div>
      </div>
      <div class="rencent">最近的账单</div>
    </div>
  </Layout>
</template>

<script lang="ts">
import Vue from "vue";
import HeadTit from "@/components/HeadTit.vue";
import { Component } from "vue-property-decorator";
@Component({ components: { HeadTit } })
export default class MainWeb extends Vue {
  time = new Date();
  today =
    this.time.getFullYear() +
    "年" +
    (this.time.getMonth() + 1) +
    "月" +
    this.time.getDate() +
    "日";
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";
.dateBoard {
  background: $color-theme-0;
  height: 170px;
  color: white;
  display: flex;
  flex-direction: column;
  padding: 15px 30px;
  div {
    flex-grow: 1;
    display: flex;
    align-items: center;
    &:nth-child(2) {
      justify-content: center;
      font-size: 35px;
    }
    &:nth-child(3) {
      justify-content: center;
    }
  }
}
</style>
