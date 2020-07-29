<template>
  <div>
    <router-link to="/MainWeb">首页</router-link>
    |
    <router-link to="/count">明细</router-link>
    |
    <router-link to="/addBill">记账</router-link>
    |
    <router-link to="/statistics">统计</router-link>
    |
    <router-link to="/myOption">我的</router-link>
  </div>
</template>

<script lang="ts">
export default {
  name: "Nav",
};
</script>

<style lang="scss" scoped></style>
