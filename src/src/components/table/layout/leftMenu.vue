<template>
   <div>
      <details v-for="(folderitem,index) in treeData" :key="folderitem.iNodeID" :open="doption.parentId==folderitem.iNodeID">
        <summary  @click="dialogClickfn($event,folderitem.iNodeID)" :title="folderitem.sNodeName">
          <i class="iconfont icon-folder"></i>
          <span v-show="!folderitem.editAble">{{folderitem.sNodeName}}</span>
          <input v-model="folderitem.sNodeName" v-show="folderitem.editAble &&listType" class="editinput" />
          <i class="iconfont icon-check" v-show="folderitem.editAble && listType" @click="reName(folderitem.iNodeID,index,$event,'done')"></i>
          <div class="down-opt" v-if="listType">
            <i class="iconfont icon-moreandroid moreicon" @click.prevent></i>
            <div class="down-optList" v-show="!folderitem.editAble">
                <div class="ipti" @click.stop="goFirst(folderitem.iNodeID,index,$event)">置顶</div>
                <div class="ipti" @click.stop="reName(folderitem.iNodeID,index,$event,'edit')">重命名</div>
                <div class="ipti" @click.stop="moveFile(folderitem.iNodeID,index,$event,'folder')">移动至</div>
                <div class="ipti" @click.stop="deleteNode(index,$event,'folder',folderitem.iNodeID)">删除</div>
            </div>
          </div>
        </summary>
        <tableMenuItem :doption="doption" v-if="folderitem.aChild" :treeData="folderitem.aChild" :listType="listType"  :openDialog="openDialog"></tableMenuItem>
        <div v-if="folderitem.aList.length>0 && !openDialog" :data-id="tblist.iAutoID" :data-db="tblist.iDbID" :data-name="tblist.sName" :data-table="tblist.sTable" class="table-tree-leaf" draggable="true"  @click="nodeClick(tblist.iAutoID,folderitem.iNodeID)" :class="{'activeClass':tblist.iAutoID==doption.activeId}" v-for="(tblist,idx) in folderitem.aList" :key="tblist.iAutoID" @mouseout="doption.hoverflag=false" @mouseover.stop="hovershow($event,tblist.sTable)">
          <i class="iconfont" :class="`icon-${tblist.sType}`"></i>
          <span v-show="!tblist.editAble">{{tblist.sName}}</span>
           <input v-model="tblist.sName" v-show="tblist.editAble &&listType" @click.stop.prevent class="editinput" style="width:105px;display:inline-block" />
          <i class="iconfont icon-check" v-show="tblist.editAble &&listType" @click.stop="reNamelist(folderitem.iNodeID,tblist.iAutoID,idx,$event,'done')"></i>
          <div class="down-opt" v-if="listType">
            <i class="iconfont icon-moreandroid moreicon" @click.prevent></i>
            <div class="down-optList">
                <!-- <div class="ipti" @click.stop="moveFile(tblist,idx,$event,'file')">移动至</div>  -->
                <div class="ipti"  @click.stop="reNamelist(folderitem.iNodeID,tblist.iAutoID,idx,$event,'edit')">重命名</div> 
                <div class="ipti" @click.stop="deleteNode(idx,$event,'file',tblist.iAutoID,index)">删除</div>
            </div>
          </div>
        </div>
      </details>
  </div>
</template>
<script>
import api from "@/server/api";
export default {
  name: "tableMenuItem",
  data() {
    return {
      ishow: false
    };
  },
  props: {
    treeData: {
      type: Array,
      default() {
        return [];
      }
    },
    listType: Boolean,
    openDialog: Boolean,
    doption: Object
  },
  created() {},
  methods: {
    nodeClick(id, parent) {
      if (this.listType) {
        this.doption.activeId = id;
        this.doption.parentId = parent;
        this.$router.push({ path: `/table/list/${parent}/${id}` });
      }
    },
    goFirst(iNodeID, index, e) {
      let folder = this.treeData.filter(Element => Element.iNodeID == iNodeID);
      this.treeData.splice(index, 1);
      this.treeData.unshift(folder[0]);
      api.nodePlaceChange({ id: iNodeID, direct: 0 });
      e.preventDefault();
    },
    reName(iNodeID, index, e, tag) {
      let folder = this.treeData.filter(Element => Element.iNodeID == iNodeID);
      if (tag == "edit") {
        this.$set(folder[0], "editAble", true);
      } else {
        this.$set(folder[0], "editAble", false);
        api.nodeUpdate({ id: iNodeID, name: folder[0].sNodeName });
      }
      e.preventDefault();
    },
    reNamelist(iNodeID, iautoid, index, e, tag) {
      let folder = this.treeData.filter(Element => Element.iNodeID == iNodeID);
      if (tag == "edit") {
        this.$set(folder[0].aList[index], "editAble", true);
      } else {
        this.$set(folder[0].aList[index], "editAble", false);
        api.nodelistUpdate({ id: iautoid, name: folder[0].aList[index].sName });
      }
      e.preventDefault();
    },
    moveFile(iNodeID, index, e, tag) {
      this.doption.moveFileflag = true;
      this.doption.moveObj.type = tag;
      this.doption.moveObj.index = index;
      if (tag == "file") {
        this.doption.typeName = `移动文件"${iNodeID.sName}"`;
        this.doption.moveObj.fromId = iNodeID.iAutoID;
      }
      if (tag == "folder") {
        this.doption.typeName = "移动文件夹";
        this.doption.moveObj.fromId = iNodeID;
      }

      e.preventDefault();
    },
    dialogClickfn(event, id) {
      if (this.openDialog) {
        let selects = document
          .getElementsByClassName("dialogtree")[0]
          .querySelectorAll(".select");
        for (let i = 0; i < selects.length; i++) {
          selects[i].classList.remove("select");
        }
        if (event.target.nodeName == "SPAN" || event.target.nodeName == "I") {
          event.target.parentNode.classList.add("select");
        } else {
          event.target.classList.add("select");
        }
        this.doption.moveObj.toId = id;
      }
    },
    deleteNode(index, e, tag, _id, folderindex) {
      if (tag == "file") {
        this.treeData[folderindex].aList.splice(index, 1);
        api.tableDelete({ id: _id });
      }
      if (tag == "folder") {
        this.treeData.splice(index, 1);
        api.nodeDelete({ id: _id });
      }
      e.preventDefault();
    },
    hovershow(e, showname) {
      if (e.target.dataset.name) {
        let top = e.target.getBoundingClientRect().top;
        this.doption.hoverflag = true;
        this.doption.hoverName = showname;
        this.doption.hovertop = `${top - 65}px`;
      }
    }
  },
  watch: {},
  components: {}
};
</script>
