<template>
 <div>
   <div class="table-main">
     <div class="table-header-wrap">
       <div class="table-header">
         <div class="title">{{tableDatas.sName}}<span v-if="tableDatas.sComment">({{tableDatas.sComment}})</span></div>
         <span class="id">iAutoID:{{tableDatas.iAutoID}}</span>
         <div class="btn-layer">
           <div class="creat-table-btn" @click="doption.creatTabletyle=true"><i class="iconfont icon-link"></i>创建合表</div>
         </div>
       </div>
     </div>

     <div class="tab-body" ref="tabBodyHeight">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="数据预览"  name="first">
          <tableData v-if="loadStatus && activeName=='first'"  :tableDatas="tableDatas" :activeName=activeName></tableData>
        </el-tab-pane>
        <el-tab-pane label="字段设置" name="second">
          <dataSet :tableDatas="tableDatas"   v-if="loadStatus"></dataSet>
        </el-tab-pane>
        <el-tab-pane label="模型配置" name="thrid" v-if="tableDatas.aJoin">
          <tableModel :tableDatas="tableDatas" v-if="loadStatus && show"></tableModel>
        </el-tab-pane>

      </el-tabs>
     </div>
   </div>

   <creatTable :doption="doption"></creatTable>
 </div>
</template>
<script>
import tableData from "@/components/table/layout/tableData";
import dataSet from "@/components/table/layout/tableDataSet";
import creatTable from "@/components/table/dialog/creatTable";
import tableModel from "@/components/table/layout/tableModel";
import api from "@/server/api";
export default {
  data() {
    return {
      activeName: "first",
      doption: {
        creatTabletyle: false
      },
      tableDatas: {},
      show: false,
      loadStatus: false
    };
  },
  created() {
    this.getTableData(this.$route.params.id);
    if (this.activeName == "thrid") {
      this.show = true;
    } else {
      this.show = false;
    }
  },
  props: {
    statusObj: Object
  },
  methods: {
    handleClick(tab, event) {
      if (this.activeName == "thrid") {
        this.show = true;
      } else {
        this.show = false;
      }
    },
    async getTableData(_id) {
      let res = await api.tableLoad({ id: _id });
      if (res.status) {
        this.tableDatas = res.data;
        this.loadStatus = true;
        if (this.activeName == "thrid") {
          this.show = true;
        } else {
          this.show = false;
        }
      }
    }
  },
  components: {
    tableData,
    dataSet,
    creatTable,
    tableModel
  },
  watch: {
    "$route.params.id"(val) {
      this.loadStatus = false;
      if (val == -1) {
        window.location.reload()
      }else{
        this.getTableData(val);
      }
    
    }
  }
};
</script>
