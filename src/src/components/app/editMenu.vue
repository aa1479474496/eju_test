<template>
  <div class="appmemu-setarea">
    <div class="appmemu-setarea-box">
      <div class="appmemu-box-title">
        <span>菜单设置</span>
        <div class="appmemu-button">
          <el-button type="primary" size="small" @click="addMenu">新建导航</el-button>
        </div>
      </div>
      <appMenu :menu="menu" :theme="theme" :isEdit="true" ></appMenu>
    </div>
    <editMenuAttr  ></editMenuAttr>
  </div>
</template>
<script>
import appMenu from "@/components/app/menu";
import editMenuAttr from "@/components/app/editMenuAttr";
import menuVue from "./menu.vue";
export default {
  data() {
    return {
      theme: {
        backgroundColor: "#eaeaea",
        textColor: "#000",
        activeTextColor: "#409eff",
        headerBackground:'#fff',
        headerColor:'#000'
      },
      menu: bi.app.data.aMenu
    };
  },
  components: {
    appMenu,
    editMenuAttr
  },
  methods: {
    addMenu() {
      bi.app.data.aMenu.list.push(bi.app.menulist());
    }
  }
};
</script>

<style lang="scss" scoped>
.appmemu-setarea {
  display: flex;
  min-height: 100%;
  .appmemu-setarea-box {
    flex: 1;
    overflow: hidden;
    .appmemu-box-title {
      margin-left: 30px;
      margin-top: 30px;
      line-height: 1;
      margin-bottom: 16px;
      font-size: 20px;
      .appmemu-button {
        margin-top: 15px;
      }
    }
  }
}
</style>
