<template>
  <el-dialog
    title="请选择添加工作表方式"
    custom-class="bi-dialog"
    :visible.sync="doption.creatTabletyle"
    @close="doption.creatTabletyle=false"
    width="30%">

    <div class="tableType clear">
      <div class="creatList clear">
        <router-link class="creatMerge" to="/table/join">
          <i class="iconfont icon-link sicon"></i>
          <span>多表关联</span>
        </router-link>
        <p class="tips">使用已有工作表进行关联合并，生成新的工作表以新建图表</p>
      </div>
    </div>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
    };
  },
  props: {
    doption: Object
  },
  methods: {
    fieldUpdate() {

    }
  }
};
</script>
