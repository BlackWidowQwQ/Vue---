<template>
  <div class="addBill">
    <Head />
    <Tags />
    <Caculator />
  </div>
</template>

<script lang="ts">
import Head from "@/components/AddBill/Head.vue";
import Caculator from "@/components/AddBill/Caculator.vue";
import Tags from "@/components/AddBill/Tags.vue";
export default {
  name: "AddBill",
  components: { Head, Caculator, Tags },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";
.addBill {
  display: flex;
  height: 100vh;
  flex-direction: column;
}
</style>
