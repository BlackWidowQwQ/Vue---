<template>
  <div class="addBill">
    {{ recordList }}
    <Head :typeValue.sync="record.type" />
    <Tags
      :data-source.sync="tags"
      :selectedTag.sync="record.tag"
      :dynamic="true"
    />
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
import recordListModel from "@/model/recordListModel.ts";
import tagListModel from "@/model/tagListModel.ts";
const recordList = recordListModel.fetch();
const tagList = tagListModel.fetch();

@Component({
  components: { Head, Caculator, Tags },
})
export default class AddBill extends Vue {
  tags = tagList;
  // [
  //     { name: "food", value: "餐饮" },
  //     { name: "shopping", value: "购物" },
  //     { name: "house", value: "居住" },
  //     { name: "transport", value: "交通" },
  //     { name: "entertainment", value: "娱乐" },
  //     { name: "medical", value: "医疗" },
  //   ];
  recordList: RecordItem[] = recordList;

  record: RecordItem = {
    tag: { name: "food", value: "餐饮" },
    notes: "",
    type: "-",
    amount: 0,
  };

  onUpdateNotes(notes: string) {
    this.record.notes = notes;
  }

  saveRecord() {
    const record2: RecordItem = recordListModel.clone(this.record);
    record2.createdAt = new Date();
    this.recordList.push(record2);
  }
  @Watch("recordList")
  onRecordListChanged() {
    recordListModel.save(this.recordList);
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
