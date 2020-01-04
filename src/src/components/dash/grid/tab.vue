<template>
  <el-tabs v-model="itemData.data.index" 
    :class="itemData.data.class"
    :type="itemData.data.type" 
    :tabPosition="itemData.data.position">
    <el-tab-pane
      v-for="(item, index) in itemData.data.tabs"
      :key="index"
      :label="item.title"
      :name="''+index"
    >
      <dashGrid
        :layout="item.layout"
        :type="itemData.type"
        :mode="mode"
        >
      </dashGrid>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
export default {
  data() {
    return {
      show: true
    };
  },
  props: {
    mode: String,
    itemData: Object
  },
  updated() {
    //这里的两个dispatchEvent不是重复，否则echart图标不会更新或者显示。
    window.dispatchEvent(new Event("resize"));
    window.dispatchEvent(new Event("resize"));
  }
};
</script>

<style lang="scss" scoped>
.el-tabs {
  width: 100%;
  height: 100%;
}
.white {
  /deep/ .el-tabs__item {
    color: rgba(100, 100, 100, 0.7);
  }
  /deep/ .el-tabs__item.is-active,
  /deep/ .el-tabs__item:hover {
    color: rgba(255, 255, 255, 0.7);
  }
}
.gray {
  /deep/ .el-tabs__item {
    color: rgba(0, 0, 0, 0.7);
  }
  /deep/ .el-tabs__item.is-active,
  /deep/ .el-tabs__item:hover {
    color: rgba(100, 100, 100, 0.7);
  }
  /deep/ .el-tabs__nav-wrap::after {
    background-color: rgba(100, 100, 100, 0.7);
  }
  /deep/ .el-tabs__header .el-tabs__nav,
  /deep/ .el-tabs__header .el-tabs__item,
  /deep/ .el-tabs__header {
    border-color: rgba(100, 100, 100, 0.7);
  }
}
.red {
  /deep/ .el-tabs__item {
    color: rgba(226, 95, 78, 0.7);
  }
  /deep/ .el-tabs__item.is-active,
  /deep/ .el-tabs__item:hover {
    color: rgba(221, 35, 12, 0.7);
  }
  /deep/ .el-tabs__nav-wrap::after {
    background-color: rgba(226, 95, 78, 0.7);
  }
  /deep/ .el-tabs__active-bar {
    background-color: rgba(221, 35, 12, 0.7);
  }
  /deep/ .el-tabs__header .el-tabs__nav,
  /deep/ .el-tabs__header .el-tabs__item,
  /deep/ .el-tabs__header {
    border-color: rgba(226, 95, 78, 0.7);
  }
}
.green {
  /deep/ .el-tabs__item {
    color: rgba(144, 235, 153, 0.7);
  }
  /deep/ .el-tabs__item.is-active,
  /deep/ .el-tabs__item:hover {
    color: rgba(17, 187, 33, 0.7);
  }
  /deep/ .el-tabs__nav-wrap::after {
    background-color: rgba(144, 235, 153, 0.7);
  }
  /deep/ .el-tabs__active-bar {
    background-color: rgba(17, 187, 33, 0.7);
  }
  /deep/ .el-tabs__header .el-tabs__nav,
  /deep/ .el-tabs__header .el-tabs__item,
  /deep/ .el-tabs__header {
    border-color: rgba(144, 235, 153, 0.7);
  }
}
</style>
