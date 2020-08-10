<template>
  <div class="caculator">
    <div>
      <label class="notes">
        <Icon name="Notes" />
        <span class="name">备注:</span>
        <input type="text" v-model="notevalue" placeholder="写点备注吧~" />
      </label>
    </div>

    <div class="numberpad">
      <div class="output">{{output}}</div>
      <div class="buttons">
        <button @click="inputContent">1</button>
        <button @click="inputContent">2</button>
        <button @click="inputContent">3</button>
        <button @click="remove">删除</button>
        <button @click="inputContent">4</button>
        <button @click="inputContent">5</button>
        <button @click="inputContent">6</button>
        <button @click="clear">清空</button>
        <button @click="inputContent">7</button>
        <button @click="inputContent">8</button>
        <button @click="inputContent">9</button>
        <button @click="ok" class="ok">OK</button>
        <button class="zero" @click="inputContent">0</button>
        <button @click="inputContent">.</button>
      </div>
    </div>
  </div>
</template>


<script lang="ts">
import Vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";

@Component
export default class Caculator extends Vue {
  @Prop() readonly amountValue!: number;
  output = this.amountValue.toString();
  notevalue = "";
  @Watch("notevalue")
  onNotevalueChanged(val: string) {
    this.$emit("update:noteValue", val);
  }

  onInput(event: KeyboardEvent) {
    const input = event.target as HTMLInputElement;
    this.notevalue = input.value;
  }

  inputContent(event: MouseEvent) {
    const button = event.target as HTMLButtonElement; //强制转换target 为button
    const input = button.textContent as string;
    if (this.output.length === 16) {
      return;
    }

    if (this.output === "0") {
      if ("0123456789".indexOf(input) >= 0) {
        this.output = input;
      } else {
        this.output += input;
      }
      return;
    }

    if (this.output.indexOf(".") >= 0 && input === ".") {
      return;
    }
    this.output += input;
  }
  remove() {
    if (this.output.length === 1) {
      this.output = "0";
    } else {
      this.output = this.output.slice(0, -1);
    }
  }
  clear() {
    this.output = "0";
  }
  ok() {
    this.$emit("update:amountValue", this.output);
    this.$emit("submit", this.output);
  }
}
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
      height: 60px;
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