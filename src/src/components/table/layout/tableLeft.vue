<template>
 <div>
  <div class="table-left-layout">
    <div class="table-left-title">
      <span class="inlineblock">工作表</span>
      <div class="table-left-plus" v-if="listType">
        <i class="iconfont icon-add1" @click="showYbp"></i>
        <div class="table-editBx-ul" :style="{display: ybdstus}"   @mouseleave="showYbp">
          <div class="table-editbx-li" @click="doption.addFolderFlag=true"> 创建文件夹</div>
          <div class="table-editbx-li" @click="doption.creatTabletyle=true"> 创建合表 </div>
        </div>
      </div>
    </div>
    <div class="table-left-tree" ref="table-left-tree">
      <tableMenuItem :doption="doption" :treeData="treeData" :listType="listType" :openDialog="openDialog" v-loading="statusObj.loading" 
    element-loading-background="#191a2c"
    element-loading-text="拼命加载中..."></tableMenuItem>
    </div>
  </div>
  <div class="showTips" :style="{top:doption.hovertop}" v-show="doption.hoverflag">原名：{{doption.hoverName}}</div>
  <addFolder v-if="listType" :doption="doption" :treeData="treeData"></addFolder>
  <creatTable v-if="listType" :doption="doption" ></creatTable>
  <moveFile v-if="listType" :doption="doption" :treeData="treeData"></moveFile>
 </div>
</template>
<script>
import api from "@/server/api";
import "@/style/default/tableLeft";
import "@/style/theme/black/tableLeft";
import tableMenuItem from "@/components/table/layout/leftMenu";
import addFolder from "@/components/table/dialog/addFolder";
import creatTable from "@/components/table/dialog/creatTable";
import moveFile from "@/components/table/dialog/moveFile";
export default {
  data() {
    return {
      ybdstus: "none",
      openDialog: false,
      doption: {
        activeId: this.$route.params.id || -1,
        parentId:this.$route.params.parent || -1,
        moveObj: {
          index: "",
          type: "",
          fromId: "",
          toId: ""
        },
        typeName: "移动文件夹",
        addFolderFlag: false,
        creatTabletyle: false,
        moveFileflag: false,
        hoverflag: false,
        hoverName: "",
        hovertop: "100px"
      },
      treeData: []
    };
  },
  created() {
    this.getTreeData();
  },
  props: {
    listType: Boolean,
    statusObj: Object
  },
  methods: {
    async getTreeData() {
      let res = await api.tableList();
      if (res.status) {
        this.treeData = res.data;
        this.statusObj.status = true;
        this.statusObj.loading = false;
        this.getFirstTableId();
      } else {
        bi.log(res);
        this.statusObj.loading = true;
      }
    },
    showYbp() {
      this.ybdstus == "block"
        ? (this.ybdstus = "none")
        : (this.ybdstus = "block");
    },
    getFirstTableId() {
      if (this.listType) {
        if (this.doption.activeId == -1) {
          for (let i = 0; i < this.treeData.length; i++) {
            if (this.treeData[i].aList && this.treeData[i].aList.length > 0) {
              this.doption.parentId =this.treeData[i].iNodeID;
              this.doption.activeId = this.treeData[i].aList[0].iAutoID;
              this.$router.replace({
                path: `/table/list/${this.doption.parentId}/${this.doption.activeId}`
              });
              break;
            }
          }
        }
      }
    }
  },
  components: {
    tableMenuItem,
    addFolder,
    creatTable,
    moveFile
  },
  watch: {
  }
};
</script>
