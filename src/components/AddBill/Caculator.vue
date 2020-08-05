<template>
  <div class="caculator">
    <div>
      <label class="notes">
        <Icon name="Notes" />
        <span class="name">备注:</span>
        <input type="text" placeholder="写点备注吧~" />
      </label>
    </div>

    <div class="numberpad">
      <div class="output">100</div>
      <div class="buttons">
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
        <button class="ok">OK</button>
        <button class="zero">0</button>
        <button>.</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "Caculator",
};
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";
.caculator {
  .notes {
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
      height: 36px;
      padding-right: 16px;
      flex-grow: 1;
      background: transparent;
      border: none;
    }
  }
  .numberpad {
    @extend %clear-fix;
    .output {
      font-size: 28px;
      font-family: Consolas, monospace;
      padding: 9px 16px;
      text-align: right;
      @extend %inner-shadow;
    }

    .buttons {
      > button {
        //flex布局宽度可用百分比，高度不行
        width: 25%;
        height: 8vh;
        float: left;
        background: transparent;
        border: none;

        &.ok {
          height: 8 * 2vh;
          float: right;
        }
        &.zero {
          width: 50%;
        }
        $bg: #f2f2f2;
        &:nth-child(1) {
          background: $bg;
        }
        &:nth-child(2),
        &:nth-child(5) {
          background: darken($bg, 4%);
        }
        &:nth-child(3),
        &:nth-child(6),
        &:nth-child(9) {
          background: darken($bg, 4 * 2%);
        }
        &:nth-child(4),
        &:nth-child(7),
        &:nth-child(10) {
          background: darken($bg, 4 * 3%);
        }
        &:nth-child(8),
        &:nth-child(11),
        &:nth-child(13) {
          background: darken($bg, 4 * 4%);
        }

        &:nth-child(14) {
          background: darken($bg, 4 * 5%);
        }
        &:nth-child(12) {
          background: darken($bg, 4 * 6%);
        }
      }
    }
  }
}
</style>