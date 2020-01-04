
<template>
<div>
  <div class="chart-right">
    <div class="oneblock">
      <div class="attr-block-title" onclick="bi.toggle()"><span class="el-icon-arrow-down"></span>图表参数</div>
      <div class="sdisplay">
        <span class="attr-span">图表类型:</span>
        <select class="attr-select" v-model="chartInfo.data.class">
          <option v-for="(option,index) in classs" :value="option.value" :key="index">{{ option.name }}</option>
        </select>
      </div>
      <div class="sdisplay">
        <span class="attr-span">图表模式:</span>
        <select class="attr-select" v-model="chartInfo.data.design">
          <option v-for="(option,index) in designs" :value="option.value" :key="index">{{ option.name }}</option>
        </select>
      </div>
      <div class="sdisplay">
        <span class="attr-span">当前主题:</span>
        <select class="attr-select" style="appearance: none;" :value="chartInfo.data.theme" disabled title="图表主题可以在仪表盘中修改">
          <option v-for="(option,index) in themes" :value="option.value" :key="index">{{ option.name }}</option>
        </select>
      </div>
      <div class="sdisplay">
        <span class="attr-span">过滤条件:</span>
        <input type="text" class="attr-input" :value="queryFilters1" @blur="chartInfo.data.query.filters1=$event.target.value.trim()" placeholder="输入过滤条件">
      </div>
      <div class="sdisplay">
        <span class="attr-span">排序字段:</span>
        <input type="text" class="attr-input" :value="queryOrder" @blur="chartInfo.data.query.order=$event.target.value.trim()" placeholder="输入排序字段">
      </div>
      <div class="sdisplay">
        <span class="attr-span">接收字段:</span>
        <input type="text" class="attr-input" :value="queryReceives" @blur="chartInfo.data.query.receives=$event.target.value.trim()" placeholder="接收的过滤字段">
      </div>
      <div class="sdisplay">
        <span class="attr-span">限制条数:</span>
        <input type="number" class="attr-input" :value="queryLimit" @blur="chartInfo.data.query.limit=$event.target.value.trim()" placeholder="获取数据限制的条数">
      </div>
      <div class="sdisplay">
        <span class="attr-span">多久更新:</span>
        <input type="number" class="attr-input" :value="queryUpdatetime" @blur="chartInfo.data.updatetime=$event.target.value.trim()" placeholder="数据缓存多久(秒)">
      </div>
      <div class="sdisplay">
        <span class="attr-span">最后更新:</span>
        <input type="text" class="attr-input" :value="queryLasttime" readonly placeholder="数据最后更新的时间">
      </div>
      <slot name="colorlist"></slot>
      <div class="sdisplay">
        <span class="attr-span">图表筛选器:</span>
        <i class="el-icon-edit editdialog" @click="doption.filter=true"></i>
      </div>
      <div class="sdisplay">
        <div class="row" v-for="(zditem,index) in chartInfo.data.filters2" :key="index">
          <span class="attr-span">{{zditem.title}}</span>
          <i class="el-icon-delete editdialog" @click="removeIndex(index)"></i>
        </div>
      </div>
    </div>
    <slot></slot>
    <attrOption v-if="$bi.chart.getDesign()==1"></attrOption>
  </div>
  <dialogFilter v-if="doption.filter" :doption="doption"></dialogFilter>
   <slot name="colordialog"></slot>
   <slot name="colorgongnengdialog"></slot>
</div>
</template>

<script>
import dialogFilter from "@/components/chart/dialog/setFilter";
import setColor from "@/components/chart/dialog/setColor";
import optionCompile from "@/components/chart/com/compile";
import defaultStyle from "@/config/style";
import attrOption from "@/components/chart/attr/option";

export default {
  data() {
    return {
      chartInfo: bi.chart,
      doption: { filter: false },
      themes: defaultStyle.chartTheme,
      classs: defaultStyle.chartClass,
      designs: defaultStyle.chartDesigns
    };
  },
  components: {
    dialogFilter,
    attrOption
  },
  created() {
    //设置setting中颜色为主题中默认颜色
    if (this.chartInfo.data.type != "table") {
      let colorName =
        this.chartInfo.data.class == "hcharts"
          ? this.chartInfo.data.type == "indexcard" ? "color" : "colors"
          : "color";
      let colors = bi.chart.getSetting(colorName);
      let themeColor = bi.copy(bi.dash.themes[bi.dash.getTheme()].colors);
      if (colors.length == 0) {
        bi.chart.setSetting(colorName, themeColor, this);
      }
    }
  },
  computed: {
    queryOrder() {
      return bi.chart.data.query.order || "";
    },
    queryFilters1() {
      return bi.chart.data.query.filters1 || "";
    },
    queryReceives() {
      return bi.chart.data.query.receives || "";
    },
    queryLimit() {
      return bi.chart.data.query.limit || 200;
    },
    queryUpdatetime() {
      return bi.chart.data.updatetime || 36000;
    },
    queryLasttime() {
      return bi.date("Y-m-d H:i:s", bi.chart.lasttime);
    }
  },
  methods: {
    //删除筛选项
    removeIndex(index) {
      let _item = this.chartInfo.data.filters2[index];
      delete this.chartInfo.data.query.filters2[_item.field];

      this.chartInfo.data.filters2.splice(index, 1);
    },
    addQoption() {
      if (!bi.isArray(this.chartInfo.data.qoption)) {
        this.chartInfo.data.qoption = [];
      }
      let _fields = this.chartInfo.data.query.fields1;
      if (_fields.length == 0) {
        return false;
      }
      let _tmp = { name: "", field: _fields[0].field };
      this.chartInfo.data.qoption.push(_tmp);
    },
    makeQoption() {
      this.$confirm("你确定要生成指标吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          //this.chartInfo.data.qoption = [];
          let _fields = this.chartInfo.data.query.fields1;
          let _list = [];
          for (let i = 1; i < _fields.length; i++) {
            let _name = _fields[i].title;
            _list.push({ name: _name, field: _fields[i].field });
          }
          this.chartInfo.data.qoption = _list;
        })
        .catch(() => {});
    },
    removeQoption(index) {
      this.chartInfo.data.qoption.splice(index, 1);
    }
  }
};
</script>