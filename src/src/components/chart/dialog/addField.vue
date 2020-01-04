<template>
  <el-dialog
    title="新增字段"
    custom-class="bi-dialog"
    :visible.sync="doption.field"
    @close="doption.field=false"
    width="30%">
    <input type="text" class="dialog-input" v-model="fieldCurr.title" placeholder="字段名称">
    <select class="dialog-select" style="width:90%;margin:20px" v-model="fieldCurr.type">
        <option value="">请选择字段类型</option>
	      <option value="string">文本</option>
	      <option value="number">数值</option>
	      <option value="date">日期</option>
	  </select>
	  <textarea class="dialog-textarea" v-model="fieldCurr.field" placeholder=" A + B "></textarea>
    <span slot="footer" class="dialog-buttons">
        <button type="button" class="ngdialog-button" @click="fieldUpdate">确定</button>
        <button type="button" class="ngdialog-button" @click="doption.field=false">取消</button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
    };
  },
  props: {
    doption: Object,
    fieldCurr: Object,
    fieldIndex: Number
  },
  methods: {
    fieldUpdate() {
      if (this.fieldIndex == -1) {
        bi.chart.data.fields.push(this.fieldCurr);
      }
      this.doption.field = false;
    }
  }
};
</script>