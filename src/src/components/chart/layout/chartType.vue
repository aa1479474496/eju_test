<template>
  <div>
    <span class="axis-head">类型</span>
    <div class="chartTypeSelect">
      <ul ref="iconlist" :style="{width:setWidth}">
        <el-tooltip 
          v-for="(item,type) in chartInfo.components" 
          :key="type" class="item" effect="dark"
          :content="scontent(item, type)"
          v-if="item.class.indexOf(chartInfo.data.class)!=-1"
          placement="bottom">
          <li>
            <!-- <a :class="item.icon"><s :class="chartType==type?'active':''"></s></a> -->
            <svg class="icon" aria-hidden="true" :class="chartType==type?'active':''"  :data-type="disabled(item.limit,item.icon)"  @click.stop="changeChart(type, item,$event)">
              <use :xlink:href="disabled(item.limit,item.icon)" :data-type="disabled(item.limit,item.icon)"  @click.stop="changeChart(type, item,$event)"></use>
            </svg>
          </li>
        </el-tooltip>
      </ul>
    </div>
  </div>
</template>

<script>
import "@/assets/fontIcon/iconfont.js"
export default {
  data() {
    return {
      chartInfo: bi.chart,
      setWidth: "auto"
    };
  },
  props: {
    chartType: String,
    doOperate:Object
  },
  mounted() {
    this.setWidths();
  },
  computed: {},
  methods: {
    scontent(item, type) {
      let limit = item.limit;
      let wd = limit[0], sz = limit[1];
      
      let _wdstr = wd[0]==wd[1] ? '' : (wd[1] == 99 ? '或多' : '~' + wd[1]);
      let _szstr = sz[0]==sz[1] ? '' : (sz[1] == 99 ? '或多' : '~' + sz[1]);
      let _tips = item.tips || '';
      return `${item.title}: ${wd[0]}${_wdstr}个维度, ${sz[0]}${_szstr}个数值${_tips}`;
    },

    disabled(limit,icon) {
      let wd = limit[0], sz = limit[1];
      let _fileds = [].push(
        ...this.chartInfo.data.query.fields1,
        ...this.chartInfo.data.query.fields2
      );
      let _group = [].push(...this.chartInfo.data.query.group);
      // bi.log(_fileds,"fileds");
      // bi.log(_group,"group");
      if (
        _group >= wd[0] &&
        _group <= wd[1] &&
        _fileds >= sz[0] &&
        _fileds <= sz[1]
      ) {
        return icon;
      } else {
        return icon+"-gray";
      }
      //TODO
    },

    changeChart(type, item, event) {
      let _this =this;
      if (event.target.getAttribute("data-type").indexOf("gray")!="-1") {
        return false;
      }
      bi.chart.changeType(this, type);
      // 处理多轴的问题
      let axis = item.axis || 1;
      if (axis == 1 && this.chartInfo.data.query.fields2.length > 0) {
        this.chartInfo.data.query.fields1.push(...this.chartInfo.data.query.fields2);
        this.chartInfo.data.query.fields2.length = 0;
      }
      
      this.chartInfo.data.axis1 = 'line';
      this.chartInfo.data.axis2 = 'line';
      // this.$parent.$parent.$children[3].toppxfn();
      this.$set(this.doOperate,"status",false);
      this.$set(this.doOperate,"type",type);
      //应付数据没有变的情况,2.5秒之后数据没有变化，更新为true
      setTimeout(function(){
        if(_this.doOperate.status==false){
          _this.$set(_this.doOperate,"status",true);
        }
      },2500)
    },
    setWidths() {
      this.$nextTick(() => {
        let lengths = this.$refs.iconlist.childNodes.length;
        this.setWidth = 45 * lengths + "px";
      });
    }
  },
  watch: {
    setWidth(val) {
      this.setWidth = val;
    }
  }
};
</script>


