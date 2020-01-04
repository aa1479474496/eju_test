<template>
  <div>
    <div class="editBx">
      <i class="el-icon-plus" @click="showYbp"></i>
      <div class="editBx-ul" :style="{display: ybdstus}"  @mouseleave="showYbp">
        <div class="editbx-li" @click="creat('folder')">
            添加文件夹
        </div>
        <div class="editbx-li" @click="creat('files')">
            添加仪表盘
        </div>
      </div>
    </div>

    <div class="bi-leftnav">
      <div class="ul" v-for="item in menus" :key = "item.iNodeID" >
        <div class="ul-header" @click="hoverFolde($event)"  @mouseleave="hoverFolde">
          <span>{{item.sNodeName}}</span>
          <div class="opt" >
            <i class="bdp-icon el-icon-more" @click.stop="nodesClick"></i>
            <div class="optList"  v-show="ishow"  >
                <div  class="ipti" @click.stop="eidtFolder(item.iNodeID)">编辑</div>
                <div  class="ipti" @click.stop="delFolder(item.iNodeID,item.sNodeName)">删除</div>
            </div>
          </div>
        </div>
        <div class="li" v-if="item.aChild.length != 0" >
          <div 
            class="items"  
            v-for="el in item.aChild" 
            :key = "el.iAutoID"  
            :class="{iactive : el.iAutoID == activeId ? true : false }" 
            @click.stop="nodeClicks(menus,item.iNodeID,el.iAutoID)"  
            @mouseleave="hoverFolde" 
          >
            <span>{{el.sName}}</span>
            <div class="opt" >
              <i class="bdp-icon el-icon-more" @click.stop="nodesClick"></i>
              <div class="optList"  v-show="ishowChild"  >
                <div  class="ipti"  @click.stop="eidtFils(el.iAutoID,item.iNodeID,el.iType)">编辑</div>
                <div  class="ipti"  @click.stop="delFils(el.iAutoID,item.iNodeID,el.sName)">删除</div>
              </div>
            </div>
          </div>
        </div>
      </div> 
    </div>
    
    <edit-folder
      :createFolder="createFolder" 
      @cancleDialog="cancleDialog"  
      :folder="folder" 
    >
    </edit-folder>
    <edit-files
      :createFiles = "createFiles" 
      @cancleDialog="cancleDialog"  
      :files="files" 
    >
    </edit-files>
  </div>
</template>

<script>
import api from "@/server/api";
import editFolder from "./editFolder";
import editFiles from "./editFiles";
import "@/style/default/homeDialog";
import "@/style/theme/black/homeDialog";
export default {
  methods: {
    nodeClicks(menus, iNodeID, iAutoID, tag = "") {
      this.activeId = iAutoID;
      this.ishow = false;
      this.ishowChild = false;
      if (tag == "first") {
        this.$router.replace({
          path: "/home/" + iAutoID
        });
      } else {
        this.$router.push({
          path: "/home/" + iAutoID
        });
      }
    },
    nodesClick() {
      this.ishow = !this.ishow;
      this.ishowChild = !this.ishowChild;
    },
    hoverFolde(el) {
      if (el.type == "click") {
        if (el.target.parentNode.className.match("ul-header")) {
          el.target.parentNode.parentNode.classList.toggle("hideChild");
        }
        if (el.target.parentNode.className.match("ul")) {
          el.target.parentNode.classList.toggle("hideChild");
        }
      }
      this.ishow = false;
      this.ishowChild = false;
    },
    eidtFolder(iNodeID) {
      this.createFolder = true;
      this.folder = {
        folderType: "eidt",
        folderName: this.menus.filter(elem => elem.iNodeID == iNodeID)[0]
          .sNodeName,
        iNodeID: iNodeID
      };
    },
    delFolder(iNodeID, sName) {
      this.$confirm("此操作将永久删除该文件夹, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          api.nodeDelete({ id: iNodeID }).then(res => {
            this.menus = this.menus.filter(elem => elem.iNodeID != iNodeID);
          });
        })
        .catch(() => {});
    },
    eidtFils(iAutoID, iNodeID, iType) {
      let _child = this.menus.filter(elem => elem.iNodeID == iNodeID)[0].aChild;
      this.createFiles = true;
      this.files = {
        filesType: "eidt",
        parent: this.menus,
        filesName: _child.filter(val => val.iAutoID == iAutoID)[0].sName,
        iNodeID: iNodeID,
        iAutoID: iAutoID,
        iType: iType
      };
    },
    delFils(iAutoID, iNodeID, sName) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          api.dashDelete({ id: iAutoID }).then(res => {
            api.dashList().then(res => {
              if (res.status) {
                this.menus = res.data;
                if (this.activeId == iAutoID) {
                  let _iAutoID = -1;
                  let _iNodeID = -1;
                  for (let i = 0; i < this.menus.length; i++) {
                    if (this.menus[i].aChild.length > 0) {
                      _iNodeID = this.menus[i].iNodeID;
                      _iAutoID = this.menus[i].aChild[0].iAutoID;
                      break;
                    }
                  }
                  this.activeId = _iAutoID;
                  if (_iAutoID != -1) {
                    let _menus = this.menus;
                    this.nodeClicks(_menus, _iNodeID, _iAutoID);
                  }
                  this.$router.push({ path: "/" });
                }
              }
            });
          });
        })
        .catch(() => {});
    },
    showYbp() {
      this.ybdstus == "block"
        ? (this.ybdstus = "none")
        : (this.ybdstus = "block");
    },
    creat(type) {
      let iType = type || "folder";
      if (iType === "folder") {
        this.createFolder = true;
        this.folder = {
          folderType: "add",
          folderName: "",
          iNodeID: 0
        };
      }
      if (iType === "files") {
        this.createFiles = true;
        this.files = {
          filesType: "add",
          parent: this.menus,
          filesName: "",
          iNodeID: 0
        };
      }
    },
    cancleDialog(type) {
      type == "folder"
        ? (this.createFolder = false)
        : (this.createFiles = false);
      api.dashList().then(res => {
        if (res.status) {
          this.menus = res.data;
        }
      });
    }
  },
  data() {
    return {
      filterText: "",
      ishow: false,
      ishowChild: false,
      createFolder: false,
      createFiles: false,
      ybdstus: "none",
      folder: {},
      files: {},
      menus: [],
      activeId: -1,
      did: this.$route.params.id || -1
    };
  },
  created() {
    api.dashList().then(res => {
      this.menus = res.data;

      if (this.did == -1) {
        var _iAutoID = -999;
        var _iNodeID = -999;
        for (let i = 0; i < this.menus.length; i++) {
          if (this.menus[i].aChild.length > 0) {
            _iNodeID = this.menus[i].iNodeID;
            _iAutoID = this.menus[i].aChild[0].iAutoID;
            break;
          }
        }
        this.activeId = _iAutoID;
        if (_iAutoID != -999) {
          let _menus = this.menus;
          this.nodeClicks(_menus, _iNodeID, _iAutoID, "first");
        }
      } else {
        let _iNodeID = -999;
        for (let i = 0; i < this.menus.length; i++) {
          for (let j = 0; j < this.menus[i].aChild.length; j++) {
            if (this.menus[i].aChild[j].iAutoID == this.did) {
              _iNodeID = this.menus[i].iNodeID;
              break;
            }
          }
        }
        this.activeId = this.did;
        this.nodeClicks(this.menus, _iNodeID, this.activeId, "first");
      }
    });
  },
  components: {
    editFolder,
    editFiles
  }
};
</script>
