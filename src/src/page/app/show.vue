<template>
  <div class="protals">
    <appCom :loading="loading" :isShow="true" :app="app"></appCom>
  </div>
</template>

<script>
import appCom from "@/components/app/appCom";
import api from "@/server/api";
import "@/components/app/init.js";
export default {
  data() {
    return {
      app: bi.app,
      loading: true
    };
  },
  created() {
    let id = this.$route.params.appid;
    if (id != 0) {
      api.appLoad({ id }).then(res => {
        Object.assign(this.app.data, res.data);
        Object.assign(this.app.defaultOpen, res.data.aMenu.defaultOpen);
        this.app.status.attr = res.data.aMenu.home;
        this.app.status.sTheme = res.data.sTheme;
        this.loading = false;
        bi.app.loadingTheme(res.data.sTheme);
      });
    }
  },
  components: {
    appCom
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
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}
</style>
