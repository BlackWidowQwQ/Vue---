<template>
  <Layout>
    <HeadTit />
    <div class="tab">
      <Tabs class-prefix="interval" :dataSource="intervalList" :value.sync="interval" />
    </div>
    {{interval}}
  </Layout>
</template>

<script lang="ts">
import Vue from "vue";
import Tabs from "@/components/Tabs.vue";
import HeadTit from "@/components/HeadTit.vue";
import tabList from "@/constants/tabList";
import { Component } from "vue-property-decorator";
@Component({ components: { HeadTit, Tabs } })
export default class Count extends Vue {
  interval = "day";
  intervalList = tabList.intervalList;
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";

// ::v-deep .interval-tabs-item {
//   border: solid red;
// }

.tab {
  background: $color-theme-0;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
