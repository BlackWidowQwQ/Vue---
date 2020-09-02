<template>
  <Layout>
    <div class="content">
      <div class="dateBoard">
        <div>今天是:</div>
        <div>{{ today }}</div>
        <div>点击下方「记账」来记一笔吧~</div>
      </div>
      <span class="recent">最近的账单</span>
      <ol>
        <li v-for="(item, index) in showList" :key="index">
          {{ item.tag.value }}{{ item.amount }}
        </li>
      </ol>
    </div>
  </Layout>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import clone from "@/lib/clone";
@Component({ components: {} })
export default class MainWeb extends Vue {
  time = new Date();
  today =
    this.time.getFullYear() +
    "年" +
    (this.time.getMonth() + 1) +
    "月" +
    this.time.getDate() +
    "日";

  get showList() {
    const { recordList } = this;
    const recentList = clone(recordList).slice(-6, -1);
    return recentList;
  }
  get recordList() {
    return this.$store.state.recordList as RecordItem[];
  }

  mounted() {
    this.$store.commit("fetchRecord");
  }
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
