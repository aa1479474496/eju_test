<template>
    <el-menu
      :defaultActive ="App.defaultOpen.actives"
      :defaultOpeneds ="App.defaultOpen.nodes"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @select="selectHandler"
      :background-color="theme.backgroundColor"
      :text-color="theme.textColor"
      :collapse="getCollapse"
      :active-text-color="theme.activeTextColor">
     <biMenuItem 
        :menuList="App.data.aMenu.list" 
        :isEdit="isEdit" 
        :isShow="isShow"
        :collapse="getCollapse"
        index="root" >
      </biMenuItem>
    </el-menu>
</template>
<script>
import biMenuItem from "@/components/app/menuItem";
export default {
  data() {
    return {
      App: bi.app
    };
  },
  props: {
    theme: Object,
    isEdit: {
      type: Boolean,
      default: false
    },
    isShow: Boolean,
    collapse: Boolean
  },
  methods: {
    handleOpen(key, keyPath) {
      this.App.defaultOpen.actives = key;
      this.App.defaultOpen.nodes = keyPath;
      this.App.status.iSiteSet = false;
    },
    selectHandler(key, keyPath) {
      this.App.defaultOpen.nodes = keyPath;
    }
  },
  computed: {
    getCollapse() {
      return this.isShow ? this.collapse : false;
    }
  },
  components: {
    biMenuItem
  }
};
</script>
