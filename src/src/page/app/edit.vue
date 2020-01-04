<template>
  <div>
    <appNavs></appNavs>
    <div class="protals">
      <appCom :loading="loading" :isShow="false" :app="app"></appCom>
      <div class="protals-set">
        <appSet></appSet>
        <editMenu></editMenu>
      </div>
    </div>
  </div>
</template>

<script>
import appNavs from "@/components/app/appNavs";
import appCom from "@/components/app/appCom";
import appSet from "@/components/app/appSet";
import editMenu from "@/components/app/editMenu";
import api from "@/server/api";
import "@/components/app/init.js";
export default {
  data() {
    return {
      app: bi.app,
      loading:true
    };
  },
  created() {
    let id = this.$route.params.appid;
    if (id != 0) {
      api.appLoad({ id }).then(res => {
        Object.assign(this.app.data, res.data);
        this.app.defaultOpen.actives = res.data.aMenu.defaultOpen.actives;
        this.app.defaultOpen.nodes = res.data.aMenu.defaultOpen.nodes;
        this.app.status.sTheme = res.data.sTheme;
        this.app.status.attr = res.data.aMenu.home;
        this.loading = false;
      });
    } else {
      this.loading = false;
      Object.assign(this.app, this.copy(bi._app));
    }
  },
  components: {
    appNavs,
    appCom,
    appSet,
    editMenu
  },
  destroyed(){
     bi.app.loadingTheme('dark');
     this.app = undefined;
  }
};
</script>

<style lang="scss" scoped>
.protals {
  display: flex;
  position: absolute;
  top: 50px;
  left: 0;
  bottom: 0;
  right: 0;
  .protals-set {
    width: 400px;
    background: #f1f1f1;
    position: relative;
  }
}
</style>
