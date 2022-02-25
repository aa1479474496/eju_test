<template>
  <el-popover
    placement="top-start"
    title="Title"
    :width="200"
    trigger="hover"
    content="this is content, this is content, this is content"
  >
    <template #reference>
      <el-button @click="updateUserName">Hover to activate{{userName}}</el-button>
    </template>
  </el-popover>
</template>

<script lang="ts">
import Api from "/@/api/home";

import { defineComponent, computed, onMounted } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  name: "companyGroup",
  props: {
    iGroupID: {
      type: Number,
      default: 0, // 如果为-1 没有选中的情况 展示自定义企业组的样式
      // default: -1, // 如果为-1 没有选中的情况 展示自定义企业组的样式
    },
  },
  setup(props, { emit }) {
    const store = useStore();
    const userName = computed(() => store.state.home.userName);
    const updateUserName = function () {
        console.log('1233');
        store.dispatch('home/updateUserName')
    }

    onMounted(async () => {
      getGroupList();
    });

    async function getGroupList() {
      //获取所有的企业分组
      let res = await Api.getGroupList();
      console.log("getGroupList:", res);
    };



    return {
        userName,
        updateUserName
    }
  },
});
</script>