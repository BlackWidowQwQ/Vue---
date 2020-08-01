<template>
  <div>
    <Layout>
      <div>
        <ul class="type">
          <li class="selected">支出</li>
          <li>收入</li>
        </ul>
      </div>
      <div class="date"></div>
      <div class="tags"></div>
      <div>
        <label class="note">
          <span class="name">备注</span>
          <input type="text" />
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
export default {
  name: "AddBill",
};
</script>

<style lang="scss" scoped></style>
