<template>
  <div class="dash-edit-item-opt" v-show="bPoint" @mouseleave.stop="hideOptUI()" v-if="$bi.user.hasDashAuth()">
    <i class="el-icon-more" @click.stop="showOptUI()"></i>
    <div class="dash-edit-item-opt-ul" v-show="bOptui">
      <div v-if="option.copy" class="dash-edit-item-opt-li" @click.stop="copyItem">
        复制
      </div>
      <div v-if="option.edit" class="dash-edit-item-opt-li" @click.stop="goItem">
        编辑
      </div>
      <div v-if="option.delete" class="dash-edit-item-opt-li" @click.stop="delItem">
        删除
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      bOptui: false,
      index: this.itemData.i
    };
  },
  props: {
    bPoint: Boolean,
    option: Object,
    layout: Array,
    itemData: Object
  },
  methods: {
    showOptUI() {
      this.bOptui = true;
    },
    hideOptUI() {
      this.bOptui = false;
    },
    delItem() {
      bi.log("delItem:" + this.itemData.type + this.index);
      let index = -1;
      for (let i in this.layout) {
        if (this.layout[i].i == this.index) {
          index = i;
          break;
        }
      }
      this.layout.splice(index, 1);
    },
    copyItem() {
      bi.log("copyItem:" + this.itemData.type + this.index, this.itemData);

      let index = 0;
      if (this.layout.length > 0) {
        let _arr = this.layout.map(el => el.i);
        index = Math.max.apply(null, _arr) + 1;
      }

      // 深拷贝
      let newItem = JSON.parse(JSON.stringify(this.itemData));
      newItem.i = index + "";
      newItem.y = newItem.y + newItem.h;

      // 判断是否要特殊处理
      if (typeof this.option.copy == "function") {
        this.option.copy(newItem, this.layout);
      } else {
        this.layout.push(newItem);
      }
    },
    goItem() {
      this.option.edit(this.itemData, this.$router);
    }
  }
};
</script>
