<template>
  <div class="addBill">
    <div class="head">
      <router-link to class="cancel">
        <button @click="$router.back(-1)">
          <Icon name="Cancel"></Icon>
        </button>
      </router-link>
      <Tabs :dataSource="recordTypeList" :value.sync="record.type" />
    </div>
    <Tags
      v-if="record.type === '-'"
      :tagList="tags"
      :selectedTag.sync="record.tag"
      :dynamic="true"
    />
    <Tags
      v-else-if="record.type === '+'"
      :selected-tag.sync="record.tag"
      :tag-list="incomeTags"
      class="tag-list"
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
import Caculator from "@/components/AddBill/Caculator.vue";
import Tabs from "@/components/Tabs.vue";
import Tags from "@/components/AddBill/Tags.vue";
import { Component, Watch } from "vue-property-decorator";
import store from "@/store/index";
import tabList from "@/constants/tabList";
import tagInitial from "@/constants/tagInitial";

@Component({
  components: { Caculator, Tags, Tabs },
})
export default class AddBill extends Vue {
  recordTypeList = tabList.recordTypeList;
  incomeTags = tagInitial.defaultIncomeTags;
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
  .head {
    background: $color-theme-0;
    display: flex;
    justify-content: center;
    position: relative;
    .cancel {
      position: absolute;
      left: 0;
      height: 100%;
      > button {
        height: 64px;
        background: transparent;
        border: none;
        .icon {
          height: 32px;
          width: 32px;
        }
      }
    }
  }
}
</style>
