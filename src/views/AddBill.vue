<template>
  <div class="addBill">
    <Head :typeValue.sync="record.type" />
    <Tags :tagList="tags" :selectedTag.sync="record.tag" :dynamic="true" />
    <Caculator
      :amountValue.sync="record.amount"
      @submit="saveRecord"
      @update:noteValue="onUpdateNotes"
    />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Head from "@/components/AddBill/Head.vue";
import Caculator from "@/components/AddBill/Caculator.vue";
import Tags from "@/components/AddBill/Tags.vue";
import { Component, Watch } from "vue-property-decorator";

import store from "@/store/index";

@Component({
  components: { Head, Caculator, Tags },
})
export default class AddBill extends Vue {
  get recordList(): RecordItem[] {
    return this.$store.state.recordList;
  }
  get choseTag(): TagItem {
    return this.$store.state.choseTag;
  }

  get tags(): TagItem[] {
    return this.$store.state.tagList;
  }

  record: RecordItem = {
    tag: this.choseTag,
    notes: "",
    type: "-",
    amount: 0,
  };

  created() {
    this.$store.commit("fetchRecord");
  }

  onUpdateNotes(notes: string) {
    this.record.notes = notes;
  }

  saveRecord() {
    this.$store.commit("createRecord", this.record);
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";
.addBill {
  display: flex;
  height: 100vh;
  flex-direction: column;
}
</style>
