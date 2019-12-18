<template>
  <div class="ani_container">
    <el-button @click="toggleEdit">切换编辑状态</el-button>
    <transition name="slide-left-fade" mode="out-in">
      <defaultPage v-if="isEdit"></defaultPage>
      <editPage v-else></editPage>
    </transition>
  </div>
</template>

<script>
import defaultPage from "./default.vue";
import editPage from "./edit.vue";
export default {
  components: {
    defaultPage,
    editPage
  },
  data() {
    return {
      isEdit: false
    };
  },

  methods: {
    toggleEdit() {
      this.isEdit = !this.isEdit;
    }
  }
};
</script>

<style lang="scss" scoped>
.ani_container {
  width: 1200px;
  height: 600px;
  border: 1px solid gray;
  margin: 30px auto;
}
</style>