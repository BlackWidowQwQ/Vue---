<template>
  <Layout>
    <div class="parcel">
      <span class="dateBoard">
        <div>今天是:</div>
        <span>{{ todayDate }}</span>
      </span>
      <div>本月支出:</div>
      <span class="expenses">￥{{ sum("-", "month") }}</span>
      <div class="budget">
        <span>本月收入:￥{{ sum("+", "month") }}</span>
        <span @click="createBudget"
          >预算剩余:￥{{
            ($store.state.budget &&
              (Number($store.state.budget) - sum("-", "month"))
                .toFixed(2)
                .toString()) ||
              "请设置预算"
          }}
          <Icon name="Cancel" style="transform:rotate(180deg)" />
        </span>
      </div>
      <span>点击下方「记账」来记一笔吧~</span>
    </div>

    <div class="today">
      <span>今日支出￥{{ sum("-", "day") }}</span>
      <span>今日收入￥{{ sum("+", "day") }}</span>
    </div>

    <ol>
      <li v-for="(group, index) in groupedList" :key="index">
        <h3 class="title">{{ beautifyDate(group.title) }}</h3>
        <router-link
          v-for="item in group.items"
          :key="item.id"
          class="record"
          :to="`count/edit/${item.id}`"
        >
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
            ><span class="time">{{ beautifyTime(item.createdAt) }}</span></span
          >
        </router-link>
      </li>
    </ol>
  </Layout>
</template>

<script lang="ts">
import Vue from "vue";
import Tabs from "@/components/Tabs.vue";
import dayjs from "dayjs";
import clone from "@/lib/clone";
import addAmount from "@/lib/addAmount";
import { Component } from "vue-property-decorator";

@Component({ components: { Tabs } })
export default class Count extends Vue {
  sum(type: string, time: string) {
    const { recordList } = this;
    return addAmount(type, time, recordList);
  }

  beautifyDate(string: string) {
    const now = dayjs();
    const time = dayjs(string); //传入ISO字符串
    if (time.isSame(now, "day")) {
      return "今天";
    } else if (time.isSame(now.subtract(1, "day"), "day")) {
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

  get todayDate() {
    const now = dayjs();
    return now.format("YYYY年M月D日");
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
    this.$store.commit("fetchBudget");
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

.tab {
  background: $color-theme-0;
  display: flex;
  align-items: center;
  justify-content: center;
}

%item {
  padding: 4px 16px;
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
  padding: 5px;
  padding-bottom: 8px;
  display: flex;
  flex-direction: column;
  div {
    padding: 8px;
  }
  .dateBoard {
    display: flex;
    flex-direction: column;
    :nth-child(2) {
      font-size: 35px;
      text-align: center;
    }
  }

  .budget {
    display: flex;
    justify-content: space-between;
    span {
      font-size: 14px;
    }
  }
  .expenses {
    font-size: 28px;
    font-weight: bold;
    padding-left: 10px;
  }
  :last-child {
    text-align: center;
  }
}

.today {
  margin: 8px 12px;
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
</style>
