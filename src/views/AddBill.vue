<template>
  <div class="addBill">
    {{record}}
    <Head :typeValue.sync="record.type" />
    <Tags :data-source.sync="tags" @update:tagValue="onUpdateTags" />
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

type Record = {
  type: string;
  tags: string[];
  notes: string;
  amount: number;
};

@Component({
  components: { Head, Caculator, Tags },
})
export default class AddBill extends Vue {
  tags = ["衣", "食", "住", "行", "吃"];
  recordList: Record[] = [];
  record: Record = { tags: [], notes: "", type: "-", amount: 0 };

  onUpdateTags(tags: string[]) {
    this.record.tags = tags;
  }
  onUpdateNotes(notes: string) {
    this.record.notes = notes;
  }

  saveRecord() {
    const record2 = JSON.parse(JSON.stringify(this.record));
    this.recordList.push(record2);
    console.log(this.recordList);
  }
  @Watch("recordList")
  onRecordListChanged() {
    window.localStorage.setItem("recordList", JSON.stringify(this.recordList));
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
