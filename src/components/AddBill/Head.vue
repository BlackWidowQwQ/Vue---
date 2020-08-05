<template>
  <div class="head">
    <router-link to class="cancel">
      <button @click="$router.back(-1)">
        <Icon name="Cancel"></Icon>
      </button>
    </router-link>
    <Headbar />
  </div>
</template>

<script lang="ts">
import Headbar from "@/components/AddBill/Headbar.vue";
export default {
  name: "Head",
  components: { Headbar },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";
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
</style>