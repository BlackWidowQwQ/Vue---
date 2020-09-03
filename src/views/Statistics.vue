<template>
  <div>
    <Layout>
      <div class="top">{{ currentYearMonth }}</div>
      <LineChart :xData="xData" :yData="yData" />
      <div class="show">
        <span>支出: {{ collect[0] }} 元 | 收入: {{ collect[1] }} 元</span>
      </div>
    </Layout>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import LineChart from "@/components/Statistics/LineChart.vue";
import dayjs from "dayjs";
import { Component } from "vue-property-decorator";
import clone from "@/lib/clone";
import addAmount from "@/lib/addAmount";
@Component({ components: { LineChart } })
export default class Statistics extends Vue {
  type = "-";
  mounted() {
    this.$store.commit("fetchRecord");
  }
  get recordList() {
    return this.$store.state.recordList as RecordItem[];
  }
  get xData() {
    const date = new Date();
    const array = [];
    date.setMonth(date.getMonth() + 1);
    date.setDate(0);
    for (let i = 1; i <= date.getDate(); i++) {
      array.push(i);
    }
    return array;
  }
  get currentYearMonth() {
    return dayjs().format("YYYY年M月");
  }

  get yData() {
    // 1. 筛选出当月的有效数据
    const usefulRecords = [];
    const cloneList = clone(this.recordList);
    for (let i = 0; i < cloneList.length; i++) {
      const recordYearMonth = dayjs(cloneList[i].createdAt).format("YYYY年M月");
      if (recordYearMonth === this.currentYearMonth) {
        usefulRecords.push(cloneList[i]);
      }
    }
    // 2. 区分收入和支出归类
    const length = this.xData.length;
    const commitData1 = new Array(length).fill(0);
    const commitData2 = new Array(length).fill(0);

    for (let i = 0; i < usefulRecords.length; i++) {
      const recordDay = Number(dayjs(usefulRecords[i].createdAt!).format("D"));
      const location = recordDay - 1;
      if (usefulRecords[i].type === "-") {
        commitData1[location] += Number(usefulRecords[i].amount);
      } else {
        commitData2[location] += Number(usefulRecords[i].amount);
      }
    }
    return [commitData1, commitData2];
  }
  get collect() {
    let collect1 = 0;
    let collect2 = 0;
    for (let i = 0; i < this.yData[0].length; i++) {
      collect1 += this.yData[0][i];
      collect2 += this.yData[1][i];
    }
    return [collect1, collect2];
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";
.top {
  background: $color-theme-0;
  line-height: 24px;
  color: white;
  vertical-align: center;
  padding: 13px 15px;
}
.show {
  color: white;
  text-align: center;
  background: $color-theme-0;
  border-radius: 10px;
  margin: 10px;
  padding: 5px 10px;
}
</style>
