<template>
  <div>
    <Layout>
      <div class="head">
        <router-link to class="cancel">
          <button @click="$router.back(-1)">
            <Icon name="Cancel"></Icon>
          </button>
        </router-link>
        <Headbar class="headbar" />
      </div>

      <div class="date">这是日期栏</div>
      <div class="tags">这是标签栏</div>
      <div>
        <label class="notes">
          <Icon name="Notes" />
          <span class="name">备注:</span>
          <input type="text" placeholder="写点备注吧~" />
        </label>
      </div>
      <div class="number">
        <div>100</div>
        <button>1</button>
        <button>2</button>
        <button>3</button>

        <button>删除</button>
        <button>4</button>
        <button>5</button>
        <button>6</button>

        <button>清空</button>
        <button>7</button>
        <button>8</button>
        <button>9</button>
        <button>ok</button>
        <button>0</button>
        <button>.</button>
      </div>
    </Layout>
  </div>
</template>

<script lang="ts">
import Headbar from "@/components/Headbar.vue";
export default {
  name: "AddBill",
  components: { Headbar },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";

.head {
  background: $color-theme-0;
  display: flex;
  justify-content: space-between;
  .cancel {
    // flex-grow: 1;
    // border: 1px solid red;
    > button {
      height: 100%;
      background: transparent;
      border: none;
      .icon {
        // vertical-align: middle;
        height: 32px;
        width: 32px;
      }
    }
  }
  > .headbar {
    // margin-right: 20px;
  }
}

.notes {
  font-size: 14px;
  background: #f5f5f5;
  display: block;
  // box-shadow: 0 0 3px rgba(0, 0, 0, 0.4);
  padding-left: 16px;
  display: flex;
  // justify-content: center;
  align-items: center;
  .icon {
    height: 14px;
    width: 14px;
  }
  .name {
    padding-right: 16px;
  }
  input {
    // line-height和padding都可以，自己尝试;
    height: 32px;
    padding-right: 16px;
    flex-grow: 1;
    background: transparent;
    border: none;
  }
}
</style>
