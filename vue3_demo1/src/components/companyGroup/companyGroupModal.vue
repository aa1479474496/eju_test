<template>
  <div class="group_modal_wrap">
    <div class="dialog">
      <div class="header">
        <span>{{ groupPro.row.iGroupID > 0 ? "编辑" : "新增" }}筛选企业组</span>
        <el-icon @click="groupPro.setModalStatus(false)">
          <CloseBold></CloseBold>
        </el-icon>
      </div>

      <div class="modal_body">
        <el-input
          class="name_input"
          maxlength="10"
          v-model="groupPro.row.sGroupName"
          placeholder="请输入企业组名称，最多10个字"
          clearable
          size="small"
        ></el-input>

        <div class="modal_content">
          <div class="left">
            <el-input
              class="search_input"
              placeholder="请输入企业名称快捷搜索"
              v-model="keyword"
              clearable
            >
              <!-- <i slot="prefix" class="iconfont iconsearch"></i> -->
            </el-input>
            <div
              class="screen_box local_beauty_checkbox"
              v-if="group.aData.length"
            >
              <el-checkbox
                v-if="group.allSnames && group.allSnames.includes(keyword)"
                :disabled="keyword ? true : false"
                style="margin-bottom: 4px"
                :indeterminate="false"
                @change="checkAll"
                :value="
                  checked.length &&
                  checked.length == Object.keys(group.hashWithId).length
                "
                >全选</el-checkbox
              >

              <div v-for="item in group.aData" :key="item.sGroup">
                <p
                  class="group_num"
                  v-if="
                    group.hashWithLetter[item.sGroup] &&
                    group.hashWithLetter[item.sGroup].includes(keyword)
                  "
                >
                  {{ item.sGroup }}
                </p>
                <!-- <div>
                  <el-checkbox
                    v-if="!keyword"
                    class="sname_checkbox"
                    :indeterminate="false"
                    :value="isGroupCheckAll(item.aList)"
                    @change="(val) => handleGroupCheckAll(val, item.aList)"
                    >全选</el-checkbox
                  >
                  <el-checkbox
                    class="sname_checkbox"
                    :class="
                      aItem.sName.indexOf(keyword) != -1 ? '' : 'is_hidden'
                    "
                    v-for="aItem in item.aList"
                    :label="aItem.sName"
                    :key="aItem.iAutoID"
                    :title="aItem.sName"
                    :value="checked.includes(aItem.iAutoID)"
                    @change="(value) => handleChange(value, aItem)"
                    >{{ aItem.sName }}</el-checkbox
                  >
                </div> -->
              </div>

              <!-- <EmptyBox
                size="small"
                style="width: 95%"
                :height="80"
                text="暂无匹配企业"
                v-if="group.allSnames && !group.allSnames.includes(keyword)"
              ></EmptyBox> -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  inject,
  reactive,
  ref,
  computed,
  onMounted,
} from "vue";
import { useStore } from "vuex";

import { CloseBold } from "@element-plus/icons-vue";

export default defineComponent({
  name: "companyGroupModal",
  components: {
    CloseBold,
  },

  setup(props, { emit }) {
    const groupPro: any = inject("companyGroup");
    const store = useStore();
    const group: typeof store.state.home.group = computed(
      () => store.state.home.group
    );
    const keyword = ref<string>("");
    const checked = ref<number[]>([]);
    console.log("55555", group.value);

    function checkAll(val: boolean) {
      console.log("vvvvvvv", val);
      let _checked = [];
      if (val) {
        for (let k in group.value.hashWithId) {
          let item = group.value.hashWithId[k];
          _checked.push(item.iAutoID);
        }
      }
      checked.value = _checked;

      console.log("2222222", _checked);
    }

    function isGroupCheckAll() {
        
    }

    return {
      groupPro,
      group,
      keyword,
      checked,
      checkAll,
    };
  },
});
</script>

<style lang="scss" scoped>
// @import "@/assets/scss/variables.scss";
// @import "@/assets/scss/mixin.scss";
$blue: #2c82fa;
.group_modal_wrap {
  position: fixed;
  background: rgba(71, 95, 123, 0.2);
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 100;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;

  .dialog {
    width: 800px;
    display: inline-block;
    vertical-align: middle;
    background: #fff;
    box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.2);
    border-radius: 8px;
  }

  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 60px;
    padding: 0 20px;
    font-size: 16px;
    font-weight: 600;
    border-bottom: 1px solid #eee;
    color: #272f4c;

    .el-icon {
      font-size: 22px;
      color: #475f7b;
      font-weight: normal;
      cursor: pointer;
      //   @include closeAnimate;
    }
  }

  .modal_body {
    position: relative;
    padding: 12px 20px 12px;
    text-align: left;

    &::after {
      content: "";
      position: absolute;
      left: 50%;
      top: 74px;
      bottom: 44px;
      width: 1px;
      background-color: transparent;
    }
  }

  .modal_content {
    margin-top: 10px;
    display: flex;
    border: 1px solid #dde6f2;
    border-radius: 2px;
    font-size: 13px;
    .left {
      flex: 1;
      border-right: 1px solid #dde6f2;

      .search_input {
        padding-right: 20px;
        border-bottom: 1px solid #dde6f2;

        :deep(.el-input__inner) {
          border: none;
          font-size: 13px;
        }

        :deep(.el-input__prefix) {
          left: 10px;
          line-height: 40px;
          color: $blue;
          .iconfont {
            font-size: 13px;
          }
        }
      }
    }

    .right {
      width: 214px;
      flex-shrink: 0;

      .res_header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 10px;
        height: 41px;
        font-size: 13px;
        color: $blue;
        border-bottom: 1px solid #dde6f2;

        .left_txt {
          color: #989caf;
        }

        .iconfont {
          margin-right: 6px;
          font-size: 14px;
        }
      }
    }
  }

  .screen_box {
    position: relative;
    padding: 12px 0 0 12px;
    max-height: 364px;
    height: 364px;
    overflow-y: auto;

    .group_num {
      margin-bottom: 10px;
      font-size: 13px;
      color: #656c86;
      height: 18px;
      line-height: 18px;
    }
  }

  .res_box {
    padding: 6px 0 6px;
    max-height: 364px;
    height: 364px;
    overflow-y: auto;

    .res_item {
      display: flex;
      align-items: center;
      height: 25px;
      line-height: 25px;
      padding: 0 10px;
      font-size: 13px;

      .res_name {
        flex: 1;
        color: #272f4c;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .el-icon-close {
        // @include closeAnimate;
      }
    }
  }

  .modal_footer {
    display: flex;
    align-items: center;
    justify-content: center;
    padding-bottom: 16px;
    text-align: center;
    .el-button {
      padding-left: 25px;
      padding-right: 25px;
    }
  }
}
.all_check {
  &.is_hidden {
    visibility: hidden;
  }
}
</style>


<style lang="scss">
.local_beauty_checkbox {
  .el-checkbox__inner {
    width: 13px;
    height: 13px;
    border-radius: 3px;

    &::after {
      height: 6px;
      left: 3px;
    }
  }
  .el-checkbox__input {
    vertical-align: top;
    height: 13px;
    line-height: 13px;
  }
  .el-checkbox.is-disabled {
    .el-checkbox__label {
      color: #999 !important;
    }
  }
  .el-checkbox__label {
    padding-left: 6px;
    font-size: 13px;
    line-height: 13px;
    vertical-align: top;
    height: 13px;
    color: #272f4c !important;
    font-weight: normal;
  }
}

.el-checkbox {
  &.sname_checkbox {
    margin-right: 0;
    width: 20%;
    margin-bottom: 4px;

    &.is_hidden {
      display: none;
    }

    .el-checkbox__label {
      max-width: 90px;
      padding-right: 6px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}
.name_input {
  .el-input__inner {
    border-color: #dde6f2;
  }
}
</style>