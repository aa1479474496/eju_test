<template>
    <div @mouseleave="showOption=false" class="axisTypeChange">
      <div class="selectIcon" @click="showOption=!showOption">
          <svg class="icon" aria-hidden="true">
            <use :xlink:href="className"></use>
          </svg>
          <span class="el-icon-arrow-down"></span>
      </div>
      <div class="changeOptions" v-show="showOption">
        <svg class="icon" aria-hidden="true" v-for="(item, index) in typeList" :key="index" @click.stop="setNowAxis(item)">
          <use :xlink:href="item.class"></use>
        </svg>
      </div>
    </div>
</template>
<script>
export default {
  data() {
    return {
      showOption: false,
    };
  },
  props: {
    type: String
  },
  computed: {
    typeList() {
      return bi.chart.components[bi.chart.data.type]['types'];
    },
    className() {
      let _className = '';
      let _axisType = bi.chart.data[this.type];
      for (let k in this.typeList) {
        if (this.typeList[k].type == _axisType) {
          _className = this.typeList[k].class;
          break;
        }
      }

      return _className;
    }
  },
  methods: {
    setNowAxis(item) {
      this.showOption = false;
      bi.chart.data[this.type] = item.type;
    }
  }
};
</script>

