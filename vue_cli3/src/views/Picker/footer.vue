<template>
  <div class="date_btn" @click="submit">确定</div>
</template>

<script>
export default {
  methods: {
    submit() {
      this.$emit("submit");
    }
  }
};
</script>

<style lang="scss" scoped>
.date_btn {
  position: absolute;
  z-index: 3;
  right: 24px;
  bottom: 16px;
  width: 80px;
  height: 32px;
  line-height: 32px;
  text-align: center;
  background: $compon_sec_color;
  border-radius: 4px;
  color: #fff;
  cursor: pointer;
}
</style>