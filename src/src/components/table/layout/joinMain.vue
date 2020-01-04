<template>
 <div>
   <div class="join-main">
      <div class="jointable_title">
        <span>工作表名称</span>
        <input type="text" v-model="tableName" class="common_input">
      </div>
      <div class="save-btn" @click="saveTable()">
        <i class="iconfont icon-pay"></i>
        <span>保存</span>
      </div>

     <div class="tab-body">
      <el-tabs v-model="activeName" >
        <el-tab-pane label="模型配置"  name="modelset">
          <joinModelset v-if="statusObj.status && flag" :modelData="modelData" :tableName="tableName"></joinModelset>

        </el-tab-pane>
        <el-tab-pane label="字段设置" name="dataset">
          <joinDateset :modelData="modelData"></joinDateset>
        </el-tab-pane>
      </el-tabs>
     </div>
   </div>
    <el-alert
      :title="errorTip.title"
      type="error"
      style="width:45%;margin:0 auto;"
      v-show="errorTip.show"
      show-icon>
    </el-alert>
 </div>
</template>
<script>
import joinModelset from "@/components/table/layout/joinModelset";
import joinDateset from "@/components/table/layout/joinDataset";
import api from "@/server/api";
export default {
  data() {
    return {
      activeName: "modelset",
      tableName: "",
      errorTip: {
        title: "",
        show: false
      },
      aFields: [],
      modelData: {
        showSamename: false,
        chart: {
          nodes: [],
          edges: []
        },
        list: [],
        data: [],
        query: []
      },
      flag: false
    };
  },
  mounted() {
    this.getEditData();
  },
  props: {
    statusObj: Object
  },
  methods: {
    async getEditData() {
      let _this = this;
      let id = _this.$route.query.id;
      if (id) {
        let res = await api.tableLoad({ id });
        if (res.status) {
          _this.tableName = res.data.sName;
          let chartData = res.data.aJoin.g6Data;
          if (chartData) {
            _this.$set(_this.modelData, "chart", chartData);
            _this.$set(_this.modelData, "query", res.data.aJoin.tables);
            _this.$set(_this.modelData, "data", res.data.aJoin.edit);
            //获取id列表
            chartData.nodes.forEach(item => {
              _this.modelData.list.push(item.id);
            });
            this.flag = true;
            setTimeout(() => {
              //左侧选中
              let eleDrags = document.getElementsByClassName("table-tree-leaf"),
                lDrags = eleDrags.length;
              for (let i = 0; i < lDrags; i++) {
                if (_this.modelData.list.includes(eleDrags[i].dataset.id)) {
                  eleDrags[i].classList.add("tree-current");
                  eleDrags[i].removeAttribute("draggable");
                }
              }
            }, 300);
          }
        }
      } else {
        this.flag = true;
      }
    },
    saveTable() {
      let _this = this;
      if (this.modelData.list.length > 0) {
        if (this.tableName == "") {
          this.errorTips("请先输入工作表名称!");
          return false;
        }
        this.modelData.data.forEach(item => {
          let temp = item.aFields.filter(list => {
            return list.checked;
          });
          this.aFields.push(...temp);
        });
        let iAutoID = {};
        if (_this.$route.query.id) {
          iAutoID = { iAutoID: _this.$route.query.id };
        } else {
          iAutoID = {};
        }
        let param = {
          sName: this.tableName,
          iDbID: this.modelData.data[0].iDbID,
          iNodeID: this.modelData.data[0].iNodeID,
          sComment: this.modelData.data[0].sComment,
          aFields: this.aFields,
          ...iAutoID,
          aJoin: {
            edit:this.modelData.data,
            g6Data: this.modelData.chart,
            tables: this.modelData.query
          }
        };
        api.tableCreate(param).then(res => {
          if (res.status) {
            _this.$router.replace(`/table/list/${res.data}`);
          } else {
            _this.errorTips(res.data);
            _this.aFields.splice(0);
            bi.log(res);
          }
        }).catch(error=>{
            _this.aFields.splice(0);
            bi.log(error);
        })
        ;
      } else {
        this.errorTips("请先拖拽工作表!");
        return false;
      }
    },
    errorTips(title) {
      let _this = this;
      this.errorTip.show = true;
      this.errorTip.title = title;
      setTimeout(() => {
        _this.errorTip.show = false;
      }, 2000);
      return false;
    }
  },
  components: {
    joinModelset,
    joinDateset
  },
  watch: {}
};
</script>
