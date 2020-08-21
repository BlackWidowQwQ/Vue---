<template>
  <div>
    <Layout>
      <HeadTit />
      Statistics.vue
    </Layout>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import HeadTit from "@/components/HeadTit.vue";
import { Component } from "vue-property-decorator";
@Component({ components: { HeadTit } })
export default class Statistics extends Vue {}
</script>

<style lang="scss" scoped></style>
