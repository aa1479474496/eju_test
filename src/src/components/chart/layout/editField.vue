<template>
  <div>
    <div class="axis" ref="gfields">
      <span class="axis-head">维度</span>
      <div class="drag-content">
        <draggable v-model="chartData.query.group" class="dragArea" :options="dragoptions">
          <el-tooltip :content="zditem.field" placement="top" v-for="(zditem,index) in chartData.query.group" :key="index">
            <div class="sDrag" @mouseleave='toggleShowp($event)' @dragstart="dragstart" @dragend="dragend($event,zditem)">
              <span class="el-icon-arrow-down" @click.self.stop="togglenextShow($event)"><i  class="iconfont" :class="`icon-${zditem.order}`"></i>{{formatTitle(zditem, 0)}}</span>
              <span class="el-icon-close hoverclose" @click.stop="removeIndex(index,'group')"></span>
              <setField :doOperate="doOperate" @setFormat="setFormat" :zditem="zditem" group="group" class="shide"  @setAlias="setAlias"></setField>
            </div>
          </el-tooltip>
        </draggable>
      </div>
    </div>
    <div class="axis" ref="fields1">
      <span class="axis-head">数值</span>
      <div class="selectDown" v-if="axis2==2">
        <axis-type-change type="axis1"></axis-type-change>
      </div>
      <div class="drag-content" :style="{paddingLeft:leftpadding}">
        <draggable v-model="chartData.query.fields1"  class="dragArea" :options="dragoptions">
          <el-tooltip :content="zditem.field" placement="top" v-for="(zditem,index) in chartData.query.fields1" :key="index">
            <div class="sDrag" @mouseleave='toggleShowp($event)' @dragstart="dragstart" @dragend="dragend($event,zditem)">
              <span class="el-icon-arrow-down" @click.stop="togglenextShow($event)"><i  class="iconfont" :class="`icon-${zditem.order}`"></i> {{formatTitle(zditem, 1)}} </span>
              <span class="el-icon-close hoverclose" @click.stop="removeIndex(index,'fields1')"></span>
              <setField :doOperate="doOperate" @setFormat="setFormat"  :zditem="zditem" group="fields1" class="shide" @setAlias="setAlias"></setField>
            </div>
          </el-tooltip>
        </draggable>
      </div>
    </div>

    <div class="axis" v-show="axis2" ref="fields2">
      <span class="axis-head">数值</span>
      <div class="selectDown" v-if="axis2==2">
        <axis-type-change type="axis2"></axis-type-change>
      </div>
      <div class="drag-content" :style="{paddingLeft:leftpadding}">
        <draggable v-model="chartData.query.fields2" class="dragArea" :options="dragoptions">
          <el-tooltip :content="zditem.field" placement="top" v-for="(zditem,index) in chartData.query.fields2" :key="index">
            <div class="sDrag" @mouseleave='toggleShowp($event)' @dragstart="dragstart" @dragend="dragend($event,zditem)">
              <span class="el-icon-arrow-down" @click.stop="togglenextShow($event)"><i  class="iconfont" :class="`icon-${zditem.order}`"></i> {{formatTitle(zditem, 1)}} </span>
              <span class="el-icon-close hoverclose" @click.stop="removeIndex(index,'fields2')"></span>
              <setField :doOperate="doOperate" @setFormat="setFormat"   :zditem="zditem" group="fields2" class="shide"  @setAlias="setAlias"></setField>
            </div>
          </el-tooltip>
        </draggable>
      </div>
    </div>
    
    <dialogAlias v-if="doption.alias" :zditem="zditem" :doption="doption"></dialogAlias>
    <dialogsetFormat v-if="doption.format" :zditem="zditem" :doption="doption"></dialogsetFormat>
  </div>
</template>

<script>
import draggable from "vuedraggable";
import dialogAlias from "@/components/chart/dialog/setAlias";
import dialogsetFormat from "@/components/chart/dialog/setFormat";
import axisTypeChange from "@/components/chart/dialog/axisTypeChange";
import setField from "@/components/chart/dialog/setField";
import defaultStyle from '@/config/style';
export default {
  data() {
    let _funNames = {};
    for (let k in defaultStyle.chartFieldFun) {
      defaultStyle.chartFieldFun[k].forEach(item => {
        _funNames[item.value] = item.name;
      });
    }
    
    return {
      funNames: _funNames,
      doption: {
        alias: false,
        format:false
      },
      zditem: {},
      chartData: bi.chart.data,
      dragoptions: { group: { name: "tabledata" } }
    };
  },
  components: {
    draggable,
    dialogAlias,
    axisTypeChange,
    setField,
    dialogsetFormat
  },
  computed: {
    axis2() {
      let _type = this.chartData.type;
      return bi.chart.components[_type]["axis"] || 0;
    },
    leftpadding() {
      if (this.axis2) {
        return "115px";
      } else {
        return "55px";
      }
    }
  },
  methods: {
    formatTitle(item, type) {
      let _fun = item.fun;
      if (_fun == '') {
        return item.title;
      }

      let _funName = this.funNames[_fun] || '';
      let _title = item.title;
      if (_funName != '') {
        _title += '(' + this.funNames[_fun] + ')';
      }
      
      return _title;
    },
    removeIndex(index, type) {
      this.chartData.query[type].splice(index, 1);
      this.$set(this.doOperate,"status",false);

    },
    toggleShowp(el) {
      if (el.target && el.target.children[2]) {
        el.target.children[2].style.display = "none";
      }
    },
    togglenextShow(el) {
      if (el.target) {
         if(el.target.classList.contains("iconfont")){
            el.target.parentNode.parentNode.children[2].style.display = "block";
         }else{
            el.target.parentNode.children[2].style.display = "block";
         }
       
      }
    },
    setAlias(zditem) {
      this.zditem = zditem;
      this.doption.alias = true;
    },
    setFormat(zditem){
      this.zditem = zditem;
      this.doption.format = true;
    },
    getNowAxisfn(type, fieldnum) {
      //获取子组件传过来的轴信息
      // bi.log(type, fieldnum);
      // bi.log(this.mixFieldObj);
      if (fieldnum == "fields1") {
        this.mixFieldObj.field1.type = type;
      }
      if (fieldnum == "fields2") {
        this.mixFieldObj.field2.type = type;
      }
      //获取表格数据
      this.getChartData();
    },
    dragstart() {
      this.$set(this.doOperate,"status",false);
      //开始拖拽颜色变化
      this.$refs.gfields.style.backgroundColor = "#252c49";
      this.$refs.fields1.style.backgroundColor = "#252c49";
      this.$refs.fields2.style.backgroundColor = "#252c49";
      bi.chart.startdrag();
    },
    dragend(evt, itemdata) {
      let _this =this;
      this.$refs.gfields.style.backgroundColor = "";
      this.$refs.fields1.style.backgroundColor = "";
      this.$refs.fields2.style.backgroundColor = "";
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