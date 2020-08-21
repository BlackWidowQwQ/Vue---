<template>
  <Layout>
    <HeadTit />
    Count.vue
  </Layout>
</template>

<script lang="ts">
import Vue from "vue";
import HeadTit from "@/components/HeadTit.vue";
import { Component } from "vue-property-decorator";
@Component({ components: { HeadTit } })
export default class Count extends Vue {}
</script>

<style lang="scss" scoped></style>
