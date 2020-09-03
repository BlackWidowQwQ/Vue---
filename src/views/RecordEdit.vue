<template>
  <Layout>
    <div class="navBar">
      <router-link to class="cancel">
        <button @click="$router.back(-1)">
          <Icon name="Cancel"></Icon>
        </button>
      </router-link>
      <span class="title">
        <Icon :name="record.tag.name" />
        {{ record.tag.value }}
      </span>
      <span class="rightIcon"></span>
    </div>
    <div class="form-wrapper">
      <label class="notes">
        <span>金额:</span>
        <input
          type="number"
          :value="record.amount"
          @change="editAmount($event.target.value)"
          placeholder="record.amount"
        />
      </label>
    </div>
    <div class="form-wrapper">
      <label class="notes">
        <span>备注:</span>
        <input
          type="text"
          :value="record.notes"
          @input="record.notes = $event.target.value"
          :placeholder="record.notes || '请输入点什么把~'"
        />
      </label>
    </div>
    <div class="button-wrapper">
      <Button @click="saveEdit">修改</Button>
      <Button class="deleteButton" @click="remove">删除</Button>
    </div>
  </Layout>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";

@Component({})
export default class RecordEdit extends Vue {
  record?: RecordItem = undefined;
  created() {
    const id = Number(this.$route.params.id);
    this.$store.commit("fetchRecord");
    const records = this.$store.state.recordList as RecordItem[];
    const record = records.filter((t) => t.id === id)[0];
    if (record) {
      this.record = record;
    } else {
      this.$router.replace("/404");
    }
  }

  editAmount(value: string) {
    if (Number(value).toString() == "NaN") {
      window.alert("输入有误，请重新输入");
    } else {
      this.record!.amount = Number(value);
    }
  }

  saveEdit() {
    this.$store.commit("updateRecord", {
      id: this.record?.id,
      notes: this.record?.notes,
      amount: this.record?.amount,
    });
    this.$router.back();
  }

  remove() {
    this.$store.commit("removeRecord", this.record?.id);
    this.$router.back();
  }
}
</script>

<style scoped lang="scss">
@import "~@/assets/style/helper.scss";

.notes {
  padding: 0 16px;
  display: flex;
  justify-content: space-between;
  text-align: center;
  align-items: center;
  span {
    padding-right: 16px;
  }
  input {
    text-align: right;
    height: 40px;
    flex-grow: 1;
    background: transparent;
    border: none;
    padding-right: 16px;
  }
}
.navBar {
  text-align: center;
  background: $tab-grey;
  display: flex;
  align-items: center;
  justify-content: space-between;
  //   @extend %inner-shadow;
  @extend %outer-shadow;
  > .title {
    display: flex;
    flex-direction: column;
    font-size: 13px;
    justify-content: center;
    .icon {
      width: 46px;
      height: 46px;
      color: $color-theme-0;
    }
  }
  .cancel {
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

  > .rightIcon {
    width: 24px;
    height: 24px;
  }
}
.form-wrapper {
  display: block;
  padding-left: 16px;
  display: flex;
  align-items: center;
  //   border-bottom: 2px grey solid;
  @extend %inner-shadow;
  span {
    font-weight: bold;
  }
}
.button-wrapper {
  text-align: center;
  padding: 16px;
  margin-top: 44px;
  button {
    background: #008000;
    color: #ffffff;
    font-size: 18px;
    border-radius: 4px;
    border: none;
    padding-left: 5px;
    width: 70px;
    height: 40px;
  }
  .deleteButton {
    background: darkred;
    margin-left: 15px;
  }
}
</style>
