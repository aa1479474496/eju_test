<template>
  <el-dialog
    title="设置字段别名"
    custom-class="bi-dialog"
    :visible.sync="doption.alias"
    @close="doption.alias=false"
    width="30%" >
    <input class="dialog-input" v-model="aliasName" type="text" placeholder="别名">
    <span slot="footer" class="dialog-buttons">
        <button type="button" class="ngdialog-button" @click="rename">确定</button>
        <button type="button" class="ngdialog-button" @click="doption.alias=false">取消</button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      aliasName: ""
    };
  },
  props: {
    doption: Object,
    zditem: Object
  },
  components: {
  },
  mounted(){
    this.aliasName = this.zditem.title
  },
  methods: {
    rename() {
      this.zditem.title = this.aliasName;
      this.zditem.alias = true;
      this.doption.alias = false;
    }
  }
};
</script>