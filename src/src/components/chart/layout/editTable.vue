<template>
  <div>
    <div class="chart-edit-left">
      <div class="chart-worktitle">工作表</div>
      <div class="chart-table-info">
        <span class="ellipsis">{{chartData.query.tblname||chartData.query.tbl}}</span>
        <i class="el-icon-document" @click="doption.table=true"></i>
      </div>
      <div class="chart-worktitle">
        <span>字段</span>
        <div class="chart-add-field">
          <span class="el-dropdown-link">
            <i class="el-icon-plus" @click="fieldAdd"></i>
          </span>
        </div>
      </div>
      <div class="chart-worktitle">
        <input type="text" class="chart-search-input" v-model="fieldFilter">
        <div class="chart-zd-ul">
          <draggable v-model="chartData.fields" :options="dragoptions" :move="dragoptions.onMove" :clone="dragoptions.onClone">
            <div class="chart-zd-li item" group="table" v-for="(zditem,index) in chartData.fields" :key="index" @dragstart="dragstart" @dragend="dragend($event,zditem)" >
              <el-tooltip placement="right-start" effect="dark" :content="zditem.field">
                <div style="float:left">
                  <span :class="'iconfont ' + (zditem.type=='date'?'icon-riqi2':(zditem.add?'icon-plus1 yellow':(zditem.type=='number'?' icon-iconjing':'icon-T')))"></span>{{zditem.title}}
                </div>
              </el-tooltip>
              <div style="float:right;margin-top:2px;cursor:pointer">
                <span v-show="zditem.add" class="el-icon-edit" @click="fieldEdit(index)"></span>
                <span v-show="zditem.add" class="el-icon-delete" @click="fieldDelete(index)"></span>
              </div>
            </div>
          </draggable>
        </div>
      </div>
    </div>
    <dialogTable v-if="doption.table" :doption="doption"></dialogTable>
    <dialogField v-if="doption.field" :doption="doption" :fieldCurr="fieldCurr" :fieldIndex="fieldIndex"></dialogField>
  </div>
</template>

<script>
import dialogField from "@/components/chart/dialog/addField";
import dialogTable from "@/components/chart/dialog/setTable";
import draggable from "vuedraggable";
export default {
  data() {
    return {
      numbers: {
        fields1:0,
        fields2:0, 
        group: 0
      },
      dragoptions: {
        group: {
          name: "tabledata",
          pull: "clone",
          put: false
        },
        onMove(evt, originalEvent) {
          if (originalEvent.clientX < 284) {
            return false;
          }
        }
      },
      doption: {
        field: false,
        table: false
      },
      fieldFilter: "",
      fieldCurr: {},
      fieldIndex: -1,
      chartData: bi.chart.data
    };
  },
  components: {
    dialogField,
    dialogTable,
    draggable
  },
  watch: {
    fieldFilter(val) {
      if (val != "") {
        this.chartData.fields.forEach((item, index) => {
          item.hidden =
            item.sName.toLowerCase().indexOf(val.toLowerCase()) == -1;
        });
      } else {
        this.chartData.fields.forEach((item, index) => {
          delete item.hidden;
        });
      }
    }
  },
  methods: {
    fieldAdd() {
      this.fieldCurr = {
        field: "",
        title: "",
        comment: "",
        type: "",
        add: true,
        fun: ""
      };
      this.doption.field = true;
    },
    fieldDelete(index) {
      this.chartData.fields.splice(index, 1);
    },
    fieldEdit(index) {
      this.fieldCurr = this.chartData.fields[index];
      this.fieldIndex = index;
      this.doption.field = true;
    },
    dragstart(evt) {
      this.$set(this.doOperate,"status",false);
      //开始拖拽颜色变化
      this.$parent.$refs.editfield.$refs.gfields.style.backgroundColor =  "#252c49";
      this.$parent.$refs.editfield.$refs.fields1.style.backgroundColor = "#252c49";
      this.$parent.$refs.editfield.$refs.fields2.style.backgroundColor =  "#252c49";
      bi.chart.startdrag();
    },
    dragend(evt,itemdata) {
      let _this=this;
      this.$parent.$refs.editfield.$refs.gfields.style.backgroundColor = "";
      this.$parent.$refs.editfield.$refs.fields1.style.backgroundColor = "";
      this.$parent.$refs.editfield.$refs.fields2.style.backgroundColor = "";
      let _type = bi.chart.enddrag(itemdata);
      //应付拖拽失败的情况,2.5秒之后数据没有变化，更新为true
      setTimeout(function(){
        if(_this.doOperate.status==false){
          _this.$set(_this.doOperate,"status",true);
        }
      },2500)
    }
  },
  props:{
    doOperate:Object
  }
};
</script>