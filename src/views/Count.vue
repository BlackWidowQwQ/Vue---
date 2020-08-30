<template>
  <Layout>
    <HeadTit />
    <div class="tab">
      <Tabs class-prefix="interval" :dataSource="intervalList" :value.sync="interval" />
    </div>
    {{interval}}
    <ol>
      <li v-for="(group,index) in result" :key="index">
        <h3 class="title">{{group.title}}</h3>
        <ol>
          <li v-for="item in group.items" :key="item.name" class="record">
            <Icon :name="item.tag.name" />
            <span>{{item.tag.value}}</span>
            <!-- <div class="notes">{{item.notes}}</div> -->
            <span
              class="amount"
              :class="{'incomeType':item.type==='+','outcomeType':item.type==='-'}"
            >{{item.type}}￥{{item.amount}}</span>
          </li>
        </ol>
      </li>
    </ol>
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
  get recordList() {
    return this.$store.state.recordList as RecordItem[];
  }

  get result() {
    const { recordList } = this;
    type HashTableValue = { title: string; items: RecordItem[] };

    const hashTable: { [key: string]: HashTableValue } = {};
    for (let i = 0; i < recordList.length; i++) {
      const [date, time] = recordList[i].createdAt!.split("T");
      hashTable[date] = hashTable[date] || { title: date, items: [] }; //若存在，则存在，不存在，则空
      hashTable[date].items.push(recordList[i]);
    }

    return hashTable;
  }

  mounted() {
    this.$store.commit("fetchRecord");
  }

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

%item {
  padding: 8px 16px;
  line-height: 24px;
  display: flex;
  justify-content: space-between;
  align-content: center;
}

.title {
  @extend %item;
}

.record {
  background: #f5f5f5;
  @extend %outer-shadow;
  @extend %item;
  margin: 4px 12px;
  padding: 10px 8px;
  .icon {
    height: 32px;
    width: 32px;
  }
  .amount {
    font-weight: bold;
    &.incomeType {
      color: orangered;
    }
    &.outcomeType {
      color: green;
    }
  }
}

// .notes {
//   color: #999;
// }
</style>
