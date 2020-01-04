<template>
  <el-dialog
    :title="doption.typeName"
    custom-class="bi-dialog"
    :visible.sync="doption.moveFileflag"
    @close="doption.moveFileflag=false"
    width="30%">
    <div class="dialogtree">
     <tableMenuItem :doption="doption"  :treeData="treeData" :listType="listType"  :openDialog="dialogType"></tableMenuItem>
    </div>

    <span slot="footer" class="dialog-buttons">
        <button type="button" class="ngdialog-button" @click="moveItfn">确定</button>
        <button type="button" class="ngdialog-button" @click="doption.moveFileflag=false">取消</button>
    </span>
  </el-dialog>
</template>

<script>
import tableMenuItem from "@/components/table/layout/leftMenu";
import api from "@/server/api";
export default {
  data() {
    return {
      listType: false,
      dialogType: true,
      fileData: {},
      folderData: {},
      moveOrnot: true
    };
  },
  props: {
    doption: Object,
    treeData: Array
  },
  components: {
    tableMenuItem
  },
  methods: {
    moveItfn() {
      if (this.doption.moveObj.type == "file") {
        let copydata = this.filterFileData(
          this.treeData,
          this.doption.moveObj.fromId,
          this.doption.moveObj.index
        );
        if (this.moveOrnot) {
          this.moveData(
            this.treeData,
            copydata,
            this.doption.moveObj.toId,
            "file"
          );
        }
        this.doption.moveFileflag = false;
      }
      if (this.doption.moveObj.type == "folder") {
        let folderData = this.filterFolderData(
          this.treeData,
          this.doption.moveObj.fromId,
          this.doption.moveObj.index
        );
        if (this.moveOrnot) {
          this.moveData(
            this.treeData,
            folderData,
            this.doption.moveObj.toId,
            "folder"
          );
        }
        this.doption.moveFileflag = false;
      }
    },
    filterFileData(element, id, index) {
      element.forEach(el => {
        if (el.aChild) {
          this.filterFileData(el.aChild, id, index);
        }
        if (el.aList) {
          el.aList.forEach(inele => {
            if (inele.iAutoID == id) {
              this.fileData = inele;
              if (el.iNodeID != this.doption.moveObj.toId) {
                el.aList.splice(index, 1);
                this.moveOrnot = true;
              } else {
                this.moveOrnot = false;
              }
            }
          });
        }
      });
      return this.fileData;
    },
    filterFolderData(element, id, index) {
      element.forEach(el => {
        if (el.aChild) {
          this.filterFolderData(el.aChild, id, index);
        }
        if (el.iNodeID == id) {
          this.folderData = el;
          if (el.iNodeID != this.doption.moveObj.toId) {
            element.splice(index, 1);
            this.moveOrnot = true;
          } else {
            this.moveOrnot = false;
          }
        }
      });
      return this.folderData;
    },
    moveData(element, data, id, type) {
      element.forEach(el => {
        if (el.aChild) {
          this.moveData(el.aChild, data, id, type);
        }
        if (el.iNodeID == id) {
          if (type == "file") {
            if(el.aList){
                el.aList.push(data);
             }else{
               this.$set(el, "aList", []);
               el.aList.push(data);
             }
           
          } else {
            if (el.aChild) {
              el.aChild.push(data);
            } else {
              this.$set(el, "aChild", []);
              el.aChild.push(data);
            }
            api.nodeParentUpdate({id:this.doption.moveObj.fromId,parent:id});

          }
        }
      });
    }
  }
};
</script>
