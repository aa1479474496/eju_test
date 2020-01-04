
<template>
  <div>
    <attrCommon>
      <attrTitle></attrTitle>
      <attrAxis></attrAxis>
      <div class="oneblock">
        <div class="attr-block-title" onclick="bi.toggle()"><span class="el-icon-arrow-down"></span>3D参数</div>
        <div class="sdisplay">
          <span class="attr-span">启用3D:</span>
          <el-switch class="attr-input"
            :value="enabled3d"
            active-text="是"
            inactive-text="否" 
            @change="set3D($event)">
          </el-switch>
        </div>
        <div class="sdisplay">
          <span class="attr-span">颜色1:</span>
          <el-color-picker class="attr-colorpick" :value="color3d1" show-alpha @change="set3dColor1($event)"></el-color-picker>
          <input class="attr-input" style="width:185px" type="text" :value="color3d1" readonly>
				</div>
        <div class="sdisplay">
          <span class="attr-span">颜色2:</span>
          <el-color-picker class="attr-colorpick" :value="color3d2" show-alpha @change="set3dColor2($event)"></el-color-picker>
          <input class="attr-input" style="width:185px" type="text" :value="color3d2" readonly>
				</div>
      </div>
    </attrCommon>
  </div>
</template>

<script>
import attrCommon from '@/components/chart/attr/common';
import attrOption from '@/components/chart/attr/option';
import attrAxis from '@/components/chart/attr/hcharts/attrAxis';
import attrLegend from '@/components/chart/attr/hcharts/attrLegend';
import attrTitle from '@/components/chart/attr/hcharts/attrTitle';
export default {
  data() {
    return {
      color1: 'rgba(255,255,255,0.5)',
      color2: 'rgba(124,181,236,0.5)',
      state: false
    };
  },
  components: {
    attrCommon,
    attrAxis,
    attrLegend,
    attrTitle,
    attrOption
  },
  computed: {
    _this() {
      return this;
    },
    enabled3d() {
      let _fillColor = bi.chart.getSetting('plotOptions.bubble.marker.fillColor', null);
      this.state = _fillColor == null ? false : true;
      
      return this.state;
    },
    color3d1() {
      let stops = bi.chart.getSetting('plotOptions.bubble.marker.fillColor.stops', null);
      this.color = stops && stops[0] && stops[0][1] || 'rgba(255,255,255,0.5)';

      return this.color;
    },
    color3d2() {
      let stops = bi.chart.getSetting('plotOptions.bubble.marker.fillColor.stops', null);
      this.color = stops && stops[1] && stops[1][1] || 'rgba(124,181,236,0.5)';

      return this.color;
    }
  },
  methods: {
    set3D(state) {
      let _val = null;
      if (state) {
        _val = {
          radialGradient: { cx: 0.4, cy: 0.3, r: 0.7 },
          stops: [
              [0, this.color1],
              [1, this.color2]
          ]
        }
      }
      bi.chart.setSetting('plotOptions.bubble.marker.fillColor', _val, this);

      this.state = state;
    },
    set3dColor1(color) {
      this.color1 = color;
      this.set3D(this.state);
    },
    set3dColor2(color) {
      this.color2 = color;
      this.set3D(this.state);
    }
  }
}
</script>