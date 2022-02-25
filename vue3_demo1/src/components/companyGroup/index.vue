<template>
  <el-popover
    placement="top-start"
    title="Title"
    :width="200"
    trigger="hover"
    content="this is content, this is content, this is content"
  >
    <template #reference>
      <el-button>Hover to activate</el-button>
    </template>
  </el-popover>
</template>

<script lang="ts">
import Api from "/@/api/home";

import { defineComponent, onMounted } from "vue";

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
    onMounted(async () => {
        getGroupList(); 
    });

    async function getGroupList() {
      //获取所有的企业分组
      let res = await Api.getGroupList();
      console.log("getGroupList:", res);
    }
  },
});
</script>