<template>
  <el-popover
    placement="top-start"
    title="Title"
    :width="200"
    trigger="hover"
    content="this is content, this is content, this is content"
  >
    <template #reference>
      <el-button @click="updateUserName">Hover to activate{{ userName }}</el-button>
    </template>
  </el-popover>
</template>

<script lang="ts">
import { ADataItem } from '/@/api/model/homeModel';
import Api from "/@/api/home";
import  { useGroup } from './useGroup';

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
    
    const joinWord = ref("囖");
    const groupList = reactive([]);

    const { count } = useGroup()

  

    const store = useStore();
    const group: typeof store.state.home.group = computed(() => store.state.home.group);
    const userName = computed(() => store.state.home.userName);
    const updateUserName = function () {
      store.dispatch("home/updateUserName");
    };

    onMounted(async () => {
        console.log('onMounted2');

    //   getGroupList();
    });

    async function getGroupList() {
      //获取所有的企业分组
      let { aData = [] } = group;
      console.log("aData", aData);
      if (aData.length) {
        return;
      }
      let res = await Api.getGroupList();
      if (res.ErrorCode === 200) {
        let { aData = [] } = res.Data;
        formatDataToHah(aData);
      }
      console.log("getGroupList:", res);
    }

    function formatDataToHah(aData: ADataItem[]) {}

    return {
      userName,
      updateUserName,
    };
  },
});
</script>
