<template>
  <div class="otherTags">
    <header class="headBar">
      <div class="leftEle">
        <router-link to class="cancel">
          <button @click="$router.back(-1)">
            <Icon name="Cancel" />
          </button>
        </router-link>
        <span>添加新的支出类别</span>
      </div>
      <button @click="ok" class="ok">完成</button>
    </header>
    {{ lightTag }}
    <div class="current">
      <div class="label">
        <span>选中标签:</span>
        <Icon :name="lightTag.name" />
      </div>
      <span>{{ lightTag.value }}</span>
    </div>

    <div class="content">
      <div class="food">
        <span class="kind-name">餐饮</span>
        <Tags :tagList="foodTags" :selectedTag.sync="lightTag" />
      </div>
      <div class="shopping">
        <span class="kind-name">购物</span>
        <Tags :tagList="shoppingTags" :selectedTag.sync="lightTag" />
      </div>
      <div class="transport">
        <span class="kind-name">交通</span>
        <Tags :tagList="transportTags" :selectedTag.sync="lightTag" />
      </div>
      <div class="house">
        <span class="kind-name">居住</span>
        <Tags :tagList="houseTags" :selectedTag.sync="lightTag" />
      </div>
      <div class="entertainment">
        <span class="kind-name">娱乐</span>
        <Tags :tagList="entertainmentTags" :selectedTag.sync="lightTag" />
      </div>
      <div class="medical">
        <span class="kind-name">医疗</span>
        <Tags :tagList="medicalTags" :selectedTag.sync="lightTag" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Tags from "@/components/AddBill/Tags.vue";
import { Component, Prop } from "vue-property-decorator";

import tagInitial from "@/constants/tagInitial.ts";
import clone from "@/lib/clone";

const {
  foodTags,
  shoppingTags,
  transportTags,
  houseTags,
  entertainmentTags,
  medicalTags,
} = tagInitial;

@Component({
  components: { Tags },
})
export default class OtherTags extends Vue {
  lightTag: TagItem = { name: "food", value: "餐饮" };

  foodTags = foodTags;
  shoppingTags = shoppingTags;
  transportTags = transportTags;
  houseTags = houseTags;
  entertainmentTags = entertainmentTags;
  medicalTags = medicalTags;

  ok() {
    if (this.lightTag) {
      this.$store.commit("createTag", clone(this.lightTag));
      if (this.$store.state.createTagInf === "success") {
        this.$store.state.choseTag = clone(this.lightTag);
        this.$router.back();
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";
.otherTags {
  display: flex;
  height: 100vh;
  flex-direction: column;

  .headBar {
    background: $color-theme-0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-align: center;
    font-size: 20px;
    color: white;
    font-weight: bold;
    padding-right: 12px;
    button {
      height: 64px;
      background: transparent;
      border: none;
      color: inherit;
      .icon {
        height: 32px;
        width: 32px;
      }
    }
    .leftEle {
      display: flex;
      align-items: center;
    }
  }

  .current {
    background: $tab-grey;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 6px 12px;
    @extend %outer-shadow;
    .label {
      width: 120px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .icon {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        color: $color-theme-0;
        padding: 5px;
        border: 1px solid $color-theme-0;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }

  .content {
    padding-top: 20px;
    display: flex;
    flex-direction: column;
    align-content: center;
    flex-grow: 1;
    overflow: auto;
    text-align: center; //打开窗口

    .kind-name {
      color: #999999;
    }
  }
}
</style>
