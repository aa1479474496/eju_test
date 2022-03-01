<template>
  <el-popover placement="top-start" title="Title" :width="230" trigger="hover">
    <div>
     <i class="el-icon-lx-redpacket_fill" style="font-size: 30px;color: #ff5900"></i>
    </div>
    <template #reference>
      <el-button @click="updateUserName"
        >Hover to activate{{ userName }}</el-button
      >
    </template>
  </el-popover>
</template>

<script lang="ts">
import { ADataItem } from "/@/api/model/homeModel";
import Api from "/@/api/home";
import { useGroupList } from "./useGroupList";

import { defineComponent, reactive, ref, computed, onMounted } from "vue";
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
    const userGroupList = ref([]);
    const store = useStore();
    const userName = computed(() => store.state.home.userName);
    const updateUserName = function () {
      store.dispatch("home/updateUserName");
    };

    //获取所有的企业分组, 并整理数据存储到vuex中
    useGroupList();

    async function getUserGroupList() {
      //获取用户保存的分组
      let res = await Api.getUserGroupList();
      if (res.ErrorCode === 200) {
        let { Data = [] } = res;
        userGroupList.value = Data;
      }
    }

    onMounted(() => {
      getUserGroupList();
    });

    return {
      userName,
      userGroupList,
      updateUserName,
    };
  },
});
</script>
