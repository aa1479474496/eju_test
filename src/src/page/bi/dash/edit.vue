<template>
    <div>
        <back-header head-title="编辑仪表盘" go-back='true'></back-header>
        <dashAdd></dashAdd>

        <div class="dash-edit-pages">
            <div class="dash-edit-left" id="maindashGrid"  @click="dashClick">
              <dashMain mode="edit"></dashMain>
            </div>
            <dashAttr></dashAttr>
        </div>
    </div>
</template>

<script>
import backHeader from "@/components/common/backHeader";
import dashAdd from "@/components/dash/com/dashAdd";
import dashAttr from "@/components/dash/com/dashAttr";
import dashMain from "@/components/dash/com/dashMain";
import "@/style/default/dashLayout";
import "@/style/theme/black/dashLayout";
export default {
  data(){
    return{
       dash: bi.dash
    }
  },
  components: {
    backHeader,
    dashAdd,
    dashAttr,
    dashMain
  },
  methods: {
    dashClick() {
      this.dash.currItem.type = "page";
      this.dash.currItem.info = this.dash.data;
    }
  }
};
</script>