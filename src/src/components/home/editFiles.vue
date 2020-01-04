<template>
  <div class="g-dialog" :class="{iShow:createFiles}"  >
        <div class="gd-content">
            <form>
            <div class="gd-main">
                <div class="dialog-title">{{filesNodeName}}</div>
                <div class="dialog-center">
                    <div class="form-group">
                        <div class="fli">
                            <div class="label">所属目录</div>
                            <div class="inners">
                                <select v-model="iselected">
                                    <option v-for="item in files.parent"  v-if="item.iNodeID == files.iNodeID" selected :value="item.iNodeID" :key="item.iNodeID" >
                                    {{ item.sNodeName}}
                                    </option>

                                    <option v-for="item in files.parent" :value="item.iNodeID" :key="item.iNodeID">
                                    {{ item.sNodeName}}
                                    </option> 
                                </select>
                            </div>
                        </div>
                        <div class="fli">
                            <div class="label">仪表盘类型 </div>
                            <div class="inners">
                                <el-radio class="radio" v-model="dashType" label="1" :disabled="isDisabled">普通仪表盘</el-radio>
                                <el-radio class="radio" v-model="dashType" label="0" :disabled="isDisabled">高级仪表盘</el-radio>
                            </div>
                        </div>
                        <div class="fli">
                            <div class="label">仪表盘名称 </div>
                            <div class="inners">
                                <input type="text" autocomplete="false" name="filesName" v-model="files.filesName" >
                            </div>
                        </div>
                    </div>
                </div>
                <div class="dialog-buttons">
                    <button type="button" class="ngdialog-button" @click="addFiles">确定</button>
                    <button type="button" class="ngdialog-button" @click="cancleDialog">取消</button>
                </div>
            </div>
            </form>
        </div>
  </div>

</template>
<script>
import api from '@/server/api';
export default {
  data() {
    return {
        iselected: '',
        dashType:'0'
    };
  },
  methods: {
    cancleDialog() {
      this.$emit("cancleDialog", "files");
    },
    addFiles() {
      let iname = this.files.filesName;
      if (this.files.filesType === "add") {
        api
          .dashSave({ id: "", data: "", name: iname,type:this.dashType, node: this.iselected })
          .then(res => {
            res.status && this.$emit("cancleDialog", "files");
          });
      } else {
        let iAutoID = this.files.iAutoID;
        api.dashRename({ id: iAutoID, type:this.dashType, name: iname }).then(res => {
          res.status && this.$emit("cancleDialog", "files");
        });
      }
    }
  },
  props: {
    createFiles: Boolean,
    files: Object
  },
  watch:{
    files(){
      this.iselected = this.files.iNodeID != 0  ? this.files.iNodeID  : this.files.parent[0].iNodeID ;
      this.files.filesType == "add" ? this.dashType = "0" : this.dashType = this.files.iType;
    }
  },
  computed: {
    filesNodeName() {
      return this.files.filesType == "add" ? "新建仪表盘" : "编辑仪表盘";
    },
    isDisabled(){
       return this.files.filesType == "add" ? false : true;
    }
  }
};
</script>
