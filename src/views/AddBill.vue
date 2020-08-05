<template>
  <div class="addBill">
    <div class="head">
      <router-link to class="cancel">
        <button @click="$router.back(-1)">
          <Icon name="Cancel"></Icon>
        </button>
      </router-link>
      <Headbar class="headbar" />
    </div>

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

    <Caculator />
  </div>
</template>

<script lang="ts">
import Headbar from "@/components/AddBill/Headbar.vue";
import Caculator from "@/components/AddBill/Caculator.vue";
export default {
  name: "AddBill",
  components: { Headbar, Caculator },
};
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
      height: 100%;
      left: 0;
      > button {
        height: 100%;
        background: transparent;
        border: none;
        .icon {
          height: 32px;
          width: 32px;
        }
      }
    }
  }

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
}
</style>
