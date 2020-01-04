<template>
  <el-dialog
    title="颜色设置"
    custom-class="bi-dialog"
    :visible="colorption.show"
    @close="colorption.show=false">
    <div class="chart-filter-box">
      <div class="leftfield">
        <div class="stitle">数值轴</div>
        <ul class="colorLists">
          <li class="ellipsis" :class="{active:activeindex==index}" @click="leftSelect(getdefaultColor[index],index)" v-for="(item,index) in colorList" :key="index"><i class="cricle" :style="{'background-color':getdefaultColor[index]}"></i>{{item.title}}</li>
        </ul>

      </div>
      <div class="rightselect">
        <div class="stitle">
          <span class="inlineblock sleft">配色方案</span>
          <select class="dialog-select" :value="chartData.theme" disabled>
            <option v-for="(option,index) in themes" :value="option.value" :key="index">{{ option.name }}</option>
          </select>
        </div>
        <div class="colorList">
          <div class="colorli" :class="{current:selectIndex==index}" @click="changeColor(item,index)"  v-for="(item,index) in colorSelect" :key="index" :style="{'background-color':item}"><i class="iconfont icon-check"></i></div>
        </div>

        <div class="colorzdy">
          <el-color-picker v-model="scolor" class="inlineblock" @change="dialogcolorchange" show-alpha size="mini"></el-color-picker>
          <span class="sfonts inlineblock">自定义颜色</span>
        </div>


      </div>
    </div>
  </el-dialog>
</template>

<script>
import defaultStyle from "@/config/style";
export default {
  data() {
    return {
      chartData: bi.chart.data,
      activeindex: this.colorption.index || 0,
      selectIndex: -1,
      themes: defaultStyle.chartTheme,
      themesColor: bi.chart.data.theme,
      scolor: ''
    };
  },
  props: {
    colorption: Object
  },
  mounted() {
    this.setSelect();
  },
  components: {},
  computed: {
    colorList() {
      let fields = [
        ...this.chartData.query.fields1,
        ...this.chartData.query.fields2
      ];
      return fields;
    },
    getdefaultColor: {
      get() {
          let colorName =this.chartData.class== "hcharts"
          ? this.chartData.type == "indexcard" ? "color" : "colors"
          : "color";
          let colors = bi.chart.getSetting(colorName);
          
          //假如主题颜色不够，动态从原来颜色重补齐
          if (colors.length < this.colorList.length) {
            let chadata = this.colorList.length - colors.length;
            for (let i = 0; i < chadata; i++) {
              colors.push(colors[i]);
            }
          }
          return colors;
      }
    },
    colorSelect() {
      return bi.copy(bi.dash.themes[this.themesColor].colors);
    }
  },
  methods: {
    setSelect() {
      this.scolor =this.getdefaultColor[this.activeindex];
      let sindex = this.colorSelect.indexOf(
        this.getdefaultColor[this.activeindex]
      );
      if (sindex != -1) {
        this.selectIndex = sindex;
      } else {
        this.selectIndex = -1;
      }
    },
    changeColor(color, index) {
      let colorName =this.chartData.class== "hcharts"
          ? this.chartData.type == "indexcard" ? "color" : "colors"
          : "color";;
      this.$set(this.getdefaultColor, this.activeindex, color);
      this.selectIndex = index;
      bi.chart.setSetting(colorName, this.getdefaultColor, this);
      this.dialogcolorchange();
    },
    leftSelect(color,index){
      this.activeindex =index;
      this.scolor =color;
      let sindex = this.colorSelect.indexOf(color);
      if (sindex != -1) {
        this.selectIndex = sindex;
      } else {
        this.selectIndex = -1;
      }
    },
    dialogcolorchange(){
      let _this =this;
      setTimeout(function() {
        _this.colorption.show = false;
      }, 100);
    }
  },
  watch:{
    scolor(val){
      let _this =this;
      let sindex = this.colorSelect.indexOf(val);
      if (sindex != -1) {
        this.selectIndex = sindex;
      } else {
        this.selectIndex = -1;
      }
       this.$set(this.getdefaultColor, this.activeindex, this.scolor);
    }
  }
};
</script>
<style langue="sass" scoped>

</style>
