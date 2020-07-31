<template>
  <div class="nav">
    <router-link to="/MainWeb" class="item">
      <Icon name="MainWeb" />首页
    </router-link>|
    <router-link to="/count" class="item">
      <Icon name="Count" />明细
    </router-link>|
    <router-link to="/addBill" class="item">
      <Icon name="AddBill" />记账
    </router-link>|
    <router-link to="/statistics" class="item">
      <Icon name="Statistics" />统计
    </router-link>|
    <router-link to="/myOption" class="item">
      <Icon name="MyOption" />我的
    </router-link>
  </div>
</template>

<script lang="ts">
// import x from "@/assets/icons/AddBill.svg";
// console.log(x);

//全局导入icon

export default {
  name: "Nav",
};
</script>

<style lang="scss" scoped>
.nav {
  display: flex;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.35);
  flex-direction: row;
  > .item {
    width: 33.333333%;
    justify-content: center;
    align-items: center;
    display: flex;
    flex-direction: column;
    .icon {
      width: 32px;
      height: 32px;
    }
  }
}
</style>
