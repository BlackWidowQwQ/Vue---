<template>
  <Layout>编辑标签</Layout>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";

@Component({})
export default class RecordEdit extends Vue {
  created() {
    const id = this.$route.params.id;
    this.$store.commit("fetchRecords");
    const records = this.$store.state.recordList as RecordItem[];
    const record = records.filter((t) => t.id === id)[0];
    if (record) {
      console.log(record);
    } else {
      this.$router.replace("/404");
    }
  }
}
</script>

<style scoped lang="scss"></style>
