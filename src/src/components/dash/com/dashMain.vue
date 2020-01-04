<template>
  <div 
    :class="'dash-main-grid dash-theme-' + theme" 
    :style="dash.data.css" 
    v-loading.fullscreen="dash.loading" 
    element-loading-background="rgba(25, 26, 44, 0.7)"
    element-loading-text="拼命加载中..."
  >
    <dashGrid v-if="!dash.loading" class="dash-page" 
      :mode="mode" 
      :layout="dash.data.layout"
      :type="dash.info.iType"
      ></dashGrid>
  </div>
</template>

<script>
import Vue from "vue";
import "@/components/dash/init";
import dashGrid from "@/components/dash/com/dashGrid";
Vue.component("dashGrid", dashGrid);
import api from "@/server/api";
export default {
  data() {
    return {
      timer: 0,
      dash: bi.dash
    };
  },
  props: {
    mode: {
      type: String,
      default() {
        return "show";
      }
    }
  },
  computed: {
    theme() {
      return bi.dash.getTheme();
    }
  },
  created() {
    let _did = this.$route.params.id || "-1";
    bi.dash.loadData(_did);
  },
  watch: {
    "dash.data": {
      deep: true,
      handler: function(val, old) {
        if (this.mode != "edit" || !bi.dash.status) {
          return false;
        }

        let _this = this;
        clearTimeout(this.timer);
        this.timer = setTimeout(function() {
          _this.saveData();
        }, 1000);
      }
    },
    "$route.params.id"(val) {
      if (val != -1) {
        bi.dash.loadData(val);
        //  window.location.reload();
      } else {
        window.location.reload();
      }
    }
  },
  methods: {
    saveData() {
      bi.log("save dash: " + this.dash.info.iAutoID);
      api
        .dashSave({
          id: this.dash.info.iAutoID,
          data: this.dash.data,
          type: this.dash.info.iType,
          name: this.dash.info.sName,
          node: this.dash.info.iNodeID
        })
        .then(res => {
          if (!res.status) {
            bi.error("数据存储失败！");
          }
        });
    }
  }
};
</script>