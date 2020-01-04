<template>
  <el-dialog
    title="创建文件夹"
    custom-class="bi-dialog"
    :visible.sync="doption.addFolderFlag"
    @close="doption.addFolderFlag=false"
    width="30%">
    <div class="onegroup">
     <span class="leftTitle" >所在目录</span>
      <select class="dialog-select s_groupselect" v-model="info.iParentId">
        <option value="0">根目录</option>
        <option v-for="item in treeData" :key="item.iNodeID"  :value="item.iNodeID">{{item.sNodeName}}</option>
      </select>
    </div>
    <div class="onegroup">
     <span class="leftTitle" >文件夹名称</span>
     <input type="text" class="dialog-input s_groupinput" v-model="info.sNodeName" placeholder="文件夹名称">
    </div>

    <span slot="footer" class="dialog-buttons">
        <button type="button" class="ngdialog-button" @click="fieldUpdate">确定</button>
        <button type="button" class="ngdialog-button" @click="doption.addFolderFlag=false">取消</button>
    </span>
  </el-dialog>
</template>

<script>
import api from '@/server/api';
export default {
  data() {
    return {
      info: {
        iUserID: 0,
        iNodeID: 0,
        sClass: 'datatable',
        sNodeName: '',
        iParentId:0,
        sIcon:"",
        sRemark:"",
        aChild: []
      }
    };
  },
  props: {
    doption: Object,
    treeData: Array
  },
  methods: {
    async fieldUpdate() {
       let res = await api.nodeAdd({class:'datatable',name:this.info.sNodeName,parent:this.info.iParentId});
        if (res.status) {
          this.info.iNodeID= res.data;
        if (this.info.iParentId == 0) {
              this.treeData.push(this.info);
            }else{
              let childFolder = this.treeData.filter(item => item.iNodeID == this.info.iParentId );
              if (childFolder[0].aChild) {
                childFolder[0].aChild.push(this.info);
              } else {
                childFolder[0].aChild = [];
              }
            }
        }
        this.doption.addFolderFlag = false;
    }
  }
};
</script>