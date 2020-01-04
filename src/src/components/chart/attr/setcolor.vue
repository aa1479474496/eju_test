
<template>
  <div class="sdisplay">
    <span class="attr-span">颜色列表:</span>
    <ul class="colorList">
      <li class="ellipsis"  @click="showDialog(index)" v-for="(item,index) in colorList" :key="index"><i class="cricle" :style="{'background-color':getdefaultColor[index]}"></i>{{item.title}}</li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      chartInfo: bi.chart
    };
  },
  components: {},
  props: {
    colorption: Object
  },
  computed: {
    colorList() {
      let fields = [
        ...this.chartInfo.data.query.fields1,
        ...this.chartInfo.data.query.fields2
      ];
      return fields;
    },
    getdefaultColor() {
      let colorName =this.chartInfo.data.class== "hcharts"
          ? this.chartInfo.data.type == "indexcard" ? "color" : "colors"
          : "color";
      let colors = bi.chart.getSetting(colorName)||bi.copy(bi.dash.themes[bi.dash.getTheme()].colors);
       
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
  methods: {
    showDialog(index) {
      this.colorption.show = true;
      this.colorption.index =index;

    }
  }
};
</script>