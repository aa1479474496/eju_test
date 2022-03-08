<template>
  <el-popover
    v-model:visible="visible"
    popper-class="local_group_popper"
    placement="bottom-start"
    :width="230"
    trigger="click"
  >
    <div class="local_group_container" v-click-outside="vcoConfig">
      <div class="local_group_item is_header">
        <span>新增企业组</span>
      </div>

      <div class="group_scroll">
        <div
          class="local_group_item"
          v-for="item in userGroupList"
          :key="item.iGroupID"
          @click="changeGroup(item)"
        >
          <span class="left">{{ item.sName }}（{{ item.iNum }}）</span>
          <template v-if="item.iGroupID > 0">
            <el-icon>
              <EditPen></EditPen>
            </el-icon>
            <el-icon>
              <Delete></Delete>
            </el-icon>
          </template>
        </div>
      </div>
    </div>
    <template #reference>
      <span class="local_reference" @click="toggleVisible">
        {{ renderText }}
        <el-icon :class="arrowClass">
          <ArrowDown></ArrowDown>
        </el-icon>
      </span>
    </template>
  </el-popover>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, computed, onMounted } from "vue";
import { useStore } from "vuex";

import { ArrowDown, EditPen, Delete } from "@element-plus/icons-vue";
import { UserGroupItem } from "./typing";

import Api from "/@/api/home";
import { useGroupList } from "./useGroupList";

export default defineComponent({
  name: "companyGroup",
  props: {
    iGroupID: {
      type: Number,
      default: 0, // 如果为-1 没有选中的情况 展示自定义企业组的样式
      // default: -1, // 如果为-1 没有选中的情况 展示自定义企业组的样式
    },
  },
  components: {
    ArrowDown,
    EditPen,
    Delete,
  },
  //    directives: { ClickOutside },
  setup(props, { emit }) {
    const userGroupList = ref<UserGroupItem[]>([]);
    const arrowClass = ref<string>("");
    const visible = ref<boolean>(false);
    const vcoConfig = reactive<any>({
      handler: onClickOutside,
      middleware: middleware,
    });
    const store = useStore();
    const userName = computed(() => store.state.home.userName);
    const updateUserName = function () {
      store.dispatch("home/updateUserName");
    };

    //获取所有的企业分组, 并整理数据存储到vuex中
    useGroupList();

    const renderText = computed(() => {
      if (props.iGroupID < 0 || !userGroupList.value.length) {
        return "";
      }
      let current = userGroupList.value.find(
        (item: UserGroupItem) => item.iGroupID === props.iGroupID
      );
      if (current) {
        let { sName = "", iNum = "" } = current;
        return `${sName}(${iNum})`;
      } else {
        return "";
      }
    });

    function toggleVisible() {
      let _val = visible.value;
      visible.value = _val ? false : true;
      arrowClass.value = _val ? "" : "is_show";
    }

    function handleClose() {
      // close popover
      visible.value = false;
      arrowClass.value = "";
    }

    function onClickOutside() {
      if (visible.value) {
        handleClose();
      }
    }

    function changeGroup(item: UserGroupItem) {
      //切换分组
      let { iGroupID } = item;
      if (iGroupID !== props.iGroupID) {
        emit("setGroupId", iGroupID);
      }
      handleClose();
    }

    function middleware(event: any) {
      //   console.log("event", event);s
      let { path = [] } = event;
      for (let i = 0; i < path.length; i++) {
        let { className = "" } = path[i];
        if (
          className &&
          typeof className === "string" &&
          className.includes("local_reference")
        ) {
          return false;
        }
      }
      return true;
    }

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
      arrowClass,
      userGroupList,
      updateUserName,
      renderText,
      visible,
      toggleVisible,
      handleClose,
      onClickOutside,
      vcoConfig,
      changeGroup,
    };
  },
});
</script>

<style lang="scss" scoped>
.local_group_container {
  color: #2c82fa;

  .iconfont {
    font-size: 14px;
  }

  .group_scroll {
    max-height: 160px;
    overflow-y: auto;
  }

  .local_group_item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 38px;
    padding: 0 10px 0 20px;
    color: #272f4c;
    cursor: pointer;

    &:hover {
      background: #f3f8ff;
      color: #2c82fa;
      .el-icon {
        opacity: 1;
      }
    }

    &.is_header {
      justify-content: flex-start;
      cursor: pointer;
      color: #2c82fa;
    }
    .el-icon {
      opacity: 0;
      margin-left: 12px;
      transition: all cubic-bezier(0.175, 0.885, 1.275) 0.3s;
    }
    .left {
      flex: 1;
    }
  }
}
.local_reference {
  display: inline-flex;
  align-items: center;
  font-size: 13px;
  line-height: 26px;
  color: #2c82fa;
  cursor: pointer;

  :deep(.el-icon) {
    margin-left: 4px;
    transition: all cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.3s;
    &.is_show {
      transform: rotate(-180deg);
    }
  }
}
</style>

<style lang="scss">
.el-popover {
  &.local_group_popper {
    padding: 5px 0;

    min-width: 230px;
    width: auto !important;
  }
}
</style>
