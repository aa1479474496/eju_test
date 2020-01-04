<template>
  <div>
    <div v-for="(item,i) in menuList" :key="i">
      <el-submenu v-if="item.children && item.children != 0" :index="index+'-'+i">
        <template slot="title">
          <div @mouseenter="handleHover($event,'block')" @mouseleave="handleHover($event,'none')" @click="handleClick((index+'-'+i),item,'folder')">
            <i class="iconfont" :class="item.icon" v-if="item.useIcon" ></i>
            <span  class="menu-names" v-show="!collapse">{{item.name}}</span>
            <div v-if="isEdit" class="menu-edit-btns">
              <i class="el-icon-plus" @click.stop="addMenu(item,i,menuList)"></i>
              <i class="el-icon-delete" @click.stop="delMenu(i,menuList)"></i>
            </div>
          </div>
        </template> 
        <biMenuItem :menuList="item.children" :index="index+'-'+i" :isEdit="isEdit"   :isShow="isShow">
        </biMenuItem>
      </el-submenu>
      <el-menu-item v-if="!item.children || item.children == 0" :index="index+'-'+i" @click="handleClick((index+'-'+i),item,'pages')" @mouseenter.native="handleHover($event,'block')"
        @mouseleave.native="handleHover($event,'none')"  :class="{myActive:isShow}">
        <i class="iconfont" :class="item.icon" v-if="item.useIcon" ></i>
        <span class="menu-names"  v-show="!collapse" slot="title">{{item.name}}</span>
        <div v-if="isEdit" class="menu-edit-btns">
          <i class="el-icon-plus"  @click="addMenu(item,i,menuList,(index+'-'+i))" title="添加"></i>
          <i class="el-icon-delete"  @click.stop="delMenu(i,menuList)" title="删除"></i>
          <i class="el-icon-menu" :style="{color:activeColor(index+'-'+i)}"  @click.stop="setHomeMenu(item,(index+'-'+i),menuList)" title="设置为首页"></i>
        </div>
      </el-menu-item>
    </div>
  </div>
</template>
<script>
export default {
  name: "biMenuItem",
  data() {
    return {
      status: bi.app.status,
      aMenu: bi.app.data.aMenu
    };
  },
  props: {
    menuList: Array,
    index: String,
    isEdit: Boolean,
    isShow: Boolean,
    collapse: Boolean
  },
  methods: {
    activeColor(index) {
      if (bi.app.data.aMenu.defaultOpen.actives == index) {
        return "rgb(64, 158, 255)";
      }
      return "#878d99";
    },
    handleClick(index, item, type) {
      if (this.isShow && type == "folder") {
        return false;
      }
      bi.app.defaultOpen.actives = index;
      bi.app.status.iSiteSet = false;
      this.status.attr = item;
      this.status.showAt = true;
      bi.app.status.isEdit = true;
      if (!this.isEdit) {
        bi.app.status.isEdit = false;
        this.navChange(this.status.attr);
      }
    },
    handleHover(e, styles) {
      if (!this.isEdit) {
        return false;
      }
      let _arr = Array.prototype.slice.call(e.target.children);
      let editDom = _arr.filter((elem, index, Arr) =>
        elem.className.match("menu-edit-btns")
      );
      editDom[0].style.display = styles;
    },
    addMenu(item, index, list, key) {
      if (!item["children"]) {
        this.$set(item, "children", []);
      }
      item["children"].push(bi.app.menulist());
      let _len = item["children"].length - 1;
      bi.app.defaultOpen.actives = key + "-" + _len;
    },
    delMenu(index, list) {
      this.$confirm("确定要删除当前目录吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.menuList.splice(index, 1);
        })
        .catch(() => {});
    },
    setHomeMenu(item, index, menuList) {
      bi.app.data.aMenu.home = item;
      bi.app.data.aMenu.defaultOpen.actives = index;
    },
    navChange(val) {
      let __iurl = "show";
      if (!this.isShow) {
        __iurl = "edit";
      }
      if (val.children && val.children.length > 0) {
        return false;
      }
      if (val.lookType == "blank") {
        if (val.linkType == "dash") {
          val.dashAddr &&
            window.open(`${window.location.origin}/dash/show/${val.dashAddr}`);
        } else {
          val.linkAddr && window.open(val.linkAddr);
        }
      } else {
        if (val.linkType != "dash") {
          this.$router.replace(`/app/${__iurl}/${this.$route.params.appid}`);
        } else {
          val.dashAddr &&
            this.$router.replace(
              `/app/${__iurl}/${this.$route.params.appid}/dash/${val.dashAddr}`
            );
        }
      }
    }
  }
};
</script>
<style lang="scss" >
.menu-edit-btns {
  position: absolute;
  background: #f1f1f1;
  top: 0;
  right: 0;
  z-index: 1;
  color: #878d99;
  display: none;
  box-sizing: border-box;
  padding: 0 5px;
  border-left: 1px solid #999;
  i {
    font-size: 14px;
    margin-right: 0;
    width: 18px;
    text-align: center;
  }
  i:hover {
    color: #409eff;
  }
}

.myActive.is-active {
  background: #192b3b !important;
}
.myActive.is-active::after {
  position: absolute;
  content: "";
  width: 4px;
  height: 100%;
  background: #1992eb;
  left: 0;
  top: 0;
}
.menu-names {
  width: 110px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  margin-right: 20px;
  display: inline-block;
}
.el-menu {
  border: none !important;
  width: 218px;
}
.el-menu.el-menu--collapse {
  width: 60px !important;
}
.el-menu--collapse .el-submenu__icon-arrow {
  display: none !important;
}
.el-menu--collapse .el-icon-arrow-right {
  display: none !important;
}
.el-menu--collapse .el-submenu.is-active .el-submenu__title {
  background: #192b3b !important;
}
.el-menu--collapse .el-submenu.is-active .iconfont {
  color: #fff;
}
.el-menu--collapse .el-submenu.is-active .el-submenu__title::after {
  position: absolute;
  content: "";
  width: 4px;
  height: 100%;
  background: #1992eb;
  left: 0;
  top: 0;
}
</style>
