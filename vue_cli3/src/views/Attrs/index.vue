<template>
  <div>
    <h3>$attrs,$props, $listeners 测试</h3>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  methods: {
    changeRouter(path) {
      let _path = this.$route.path;
      if (path === _path) {
        console.log('same page');
        return;
      }
      this.$router.push(path);
    }
  }
};
</script>

<style lang="scss" scoped>
  .header {
    display: flex;
    width: 300px;
    height: 40px;
    align-items: center;
    justify-content: space-between;

    span {
      cursor: pointer;
    }
  }
</style>