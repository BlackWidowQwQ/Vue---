<template>
  <ul class="tags">
    <li
      v-for="(tag, index) in tagList"
      :key="index"
      :class="{ selected: selectedTag.name === tag.name }"
      @click="toggle(tag)"
    >
      <div>
        <Icon :name="tag.name" />
      </div>
      <span>{{ tag.value }}</span>
    </li>

    <li v-if="dynamic" class="new" @click="create">
      <div>
        <Icon name="addTag" />
      </div>
      <span>添加</span>
    </li>
  </ul>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import store from "@/store/index2";
@Component
export default class Tags extends Vue {
  @Prop() readonly selectedTag!: TagItem;
  @Prop({ type: Boolean, default: false }) dynamic!: boolean;
  @Prop({ type: Array, required: true }) tagList!: TagItem[];

  toggle(tag: TagItem) {
    this.$emit("update:selectedTag", tag);
  }

  create() {
    this.$router.push("/otherTags");
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";
.tags {
  padding: 16px;
  display: flex;
  flex-grow: 1;
  flex-direction: row;
  flex-wrap: wrap;
  align-content: flex-start;
  overflow: auto;
  > li {
    width: 25%;
    padding: 12px 0;
    font-size: 12px;
    display: flex;
    flex-direction: column;
    align-items: center;
    &.selected {
      .icon {
        background: lighten($color-theme-0, 20%);
      }
    }
    .icon {
      width: 48px;
      height: 48px;
      padding: 4px;
      border-radius: 50%;
      background: #f5f5f5;
      margin-bottom: 4px;
    }
  }
}
</style>
