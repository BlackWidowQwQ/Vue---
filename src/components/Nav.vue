<template>
  <div class="nav">
    <!-- <router-link to="/MainWeb" class="item" active-class="selected">
      <Icon name="MainWeb" />首页
    </router-link> -->
    <router-link to="/count" class="item" active-class="selected">
      <Icon name="Count" />明细
    </router-link>
    <router-link to="/addBill" class="item" active-class="selected">
      <Icon name="AddBill" />记一笔
    </router-link>
    <router-link to="/statistics" class="item" active-class="selected">
      <Icon name="Statistics" />统计
    </router-link>
    <!-- <router-link to="/myOption" class="item" active-class="selected">
      <Icon name="MyOption" />我的
    </router-link> -->
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
@import "~@/assets/style/helper.scss";

.nav {
  @extend %outer-shadow;
  display: flex;
  flex-direction: row;
  > .item {
    padding: 2px 0;
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
  //记得优化点击后的特效！！
  // $baseColor: rgb(0, 153, 220);
  > .item.selected {
    color: $color-theme-0;

    .icon {
      width: 29px;
      height: 29px;
    }
  }
}
</style>
