<template>
  <div class="tags">
    <ul class="current">
      <li>衣</li>
      <li>食</li>
      <li>住</li>
      <li>行</li>
    </ul>
    <div class="new">
      <button>输入标签吧</button>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "Tags",
};
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";
.tags {
  font-size: 14px;
  padding: 16px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  > .current {
    display: flex;
    > li {
      background: #d9d9d9;
      height: 36px;
      line-height: 36px;
      border-radius: 18px;
      padding: 0 16px;
      margin-right: 12px;
    }
  }

  > .new {
    padding-top: 16px;
    button {
      background: transparent;
      border: none;
      color: #999;
      border-bottom: 1px solid;
      padding: 0 6px;
    }
  }
}
</style>