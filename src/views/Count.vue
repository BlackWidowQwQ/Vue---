<template>
  <Layout>
    <div class="parcel">
      <div>本月支出:</div>
      <span class="expenses">￥{{ sum("-", "month") }}</span>
      <div class="budget">
        <span>本月收入:￥{{ sum("+", "month") }}</span>
        <span @click="createBudget"
          >预算剩余:￥{{
            ($store.state.budget &&
              "" + ($store.state.budget - sum("-", "month")).toFixed(2)) ||
              "请设置预算"
          }}
        </span>
      </div>
    </div>

    <div class="today">
      <span>今日支出￥{{ sum("-", "day") }}</span>
      <span>今日收入￥{{ sum("+", "day") }}</span>
    </div>

    <ol>
      <li v-for="(group, index) in groupedList" :key="index">
        <h3 class="title">{{ beautifyDate(group.title) }}</h3>
        <ol>
          <li v-for="item in group.items" :key="item.name" class="record">
            <span class="left">
              <Icon :name="item.tag.name" />
              <span class="tag-notes">
                <span class="tag">{{ item.tag.value }}</span
                ><span class="notes">{{
                  item.notes || "暂无备注，点击添加"
                }}</span></span
              ></span
            >
            <span class="right">
              <span
                class="amount"
                :class="{
                  incomeType: item.type === '+',
                  outcomeType: item.type === '-',
                }"
                >{{ item.type }}￥{{ item.amount }}</span
              ><span class="time">{{
                beautifyTime(item.createdAt)
              }}</span></span
            >
          </li>
        </ol>
      </li>
    </ol>
  </Layout>
</template>

<script lang="ts">
import Vue from "vue";
import Tabs from "@/components/Tabs.vue";
import dayjs from "dayjs";
import clone from "@/lib/clone";
import { Component } from "vue-property-decorator";

@Component({ components: { Tabs } })
export default class Count extends Vue {
  sum(type: string, time: string) {
    let daily = 0;
    let monthly = 0;
    const now = dayjs();
    const { recordList } = this;
    const newList = clone(recordList).filter((r) => r.type === type);
    for (let i = 0; i < newList.length; i++) {
      if (now.isSame(dayjs(newList[i].createdAt), "day")) {
        daily += Number(newList[i].amount);
      }
      if (now.isSame(dayjs(newList[i].createdAt), "month")) {
        monthly += Number(newList[i].amount);
      }
    }
    if (time === "day") {
      return daily;
    }
    if (time === "month") {
      return monthly;
    } else {
      return;
    }
  }

  beautifyDate(string: string) {
    const now = new Date();
    const time = dayjs(string); //传入ISO字符串
    if (time.isSame(now, "day")) {
      return "今天";
    } else if (time.isBefore(now, "day")) {
      return "昨天";
    } else if (time.isSame(now, "year")) {
      return time.format("M月D日");
    } else {
      return time.format("YYYY年M月D日");
    }
  }

  beautifyTime(string: string) {
    return dayjs(string).format("HH:mm");
  }

  get recordList() {
    return this.$store.state.recordList as RecordItem[];
  }

  get groupedList() {
    const { recordList } = this;
    if (recordList.length === 0) {
      return [];
    }
    const newList = clone(recordList).sort(
      (a, b) => dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf()
    );
    // const hashTable: HashTableValue[] = [];
    const result = [
      {
        title: dayjs(newList[0].createdAt).format("YYYY-MM-DD"),
        items: [newList[0]],
      },
    ];
    for (let i = 1; i < newList.length; i++) {
      const current = newList[i];
      const last = result[result.length - 1];
      if (dayjs(last.title).isSame(dayjs(current.createdAt), "day")) {
        last.items.push(current);
      } else {
        result.push({
          title: dayjs(current.createdAt).format("YYYY-MM-DD"),
          items: [current],
        });
      }
    }
    return result;
  }

  mounted() {
    this.$store.commit("fetchRecord");
  }
  createBudget() {
    const moneySet = window.prompt("设置预算：");
    if (moneySet) {
      if (moneySet == "") {
        window.alert("您并未输入预算！预算清空！");
        this.$store.commit("removeBudget");
        return;
      }
      const moneySetNum = Number(moneySet);
      if (moneySetNum.toString() === "NaN") {
        window.alert("您的输入格式有误，请重新输入");
        return;
      }
      this.$store.commit("createBudget", moneySetNum);
    }
    return;
  }
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

.parcel {
  background: $color-theme-0;
  @extend %outer-shadow;
  @extend %item;
  color: #ffffff;
  padding: 5px 8px;
  display: flex;
  flex-direction: column;
  div {
    padding: 10px 8px;
  }
  .budget {
    display: flex;
    justify-content: space-between;
    span {
      font-size: 14px;
      padding-right: 5px;
    }
  }
  .expenses {
    font-size: 28px;
    font-weight: bold;
    padding-left: 10px;
  }
}

.today {
  margin: 12px;
  font-weight: bold;
  span {
    padding-right: 8px;
  }
}

.record {
  background: #f5f5f5;
  @extend %outer-shadow;
  @extend %item;
  margin: 4px 12px;
  padding: 10px 8px;
  .left {
    display: flex;
    align-items: center;
    .icon {
      height: 36px;
      width: 36px;
    }
    .tag-notes {
      padding-left: 8px;
      display: flex;
      flex-direction: column;
      .tag {
        font-weight: bold;
        font-size: 18px;
      }
      .notes {
        color: #c3c3c3;
      }
    }
  }

  .right {
    display: flex;
    flex-direction: column;
    text-align: end;
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
}

// .notes {
//   color: #999;
// }
</style>
