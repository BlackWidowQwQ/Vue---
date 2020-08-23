<template>
  <Layout>
    <HeadTit />
    <Tabs class-prefix="interval" :dataSource="intervalList" :value.sync="interval" />
    {{interval}}
  </Layout>
</template>

<script lang="ts">
import Vue from "vue";
import Tabs from "@/components/Tabs.vue";
import HeadTit from "@/components/HeadTit.vue";
import { Component } from "vue-property-decorator";
@Component({ components: { HeadTit, Tabs } })
export default class Count extends Vue {
  interval = "day";
  intervalList = [
    { text: "按天", value: "day" },
    { text: "按周", value: "week" },
    { text: "按月", value: "month" },
  ];
}
</script>

<style lang="scss" scoped></style>
