
<template>
  <div>
    <attrCommon>
      <attrTitle></attrTitle>
      <attrAxis></attrAxis>
      <attrLegend></attrLegend>
      <setcolor slot="colorlist" :colorption="colorption"></setcolor>
      <setColorDialog slot="colordialog" v-if="colorption.show" :colorption="colorption"></setColorDialog>
    </attrCommon>
  </div>
</template>

<script>
import attrCommon from '@/components/chart/attr/common';
import attrOption from '@/components/chart/attr/option';
import setcolor from '@/components/chart/attr/setcolor';
import setColorDialog from '@/components/chart/dialog/setColor';
import attrAxis from '@/components/chart/attr/echarts/attrAxis';
import attrLegend from '@/components/chart/attr/echarts/attrLegend';
import attrTitle from '@/components/chart/attr/echarts/attrTitle';
import optionCompile from '@/components/chart/com/compile'
export default {
  data() {
    return {
       colorption: { show: false }
    };
  },
  components: {
    attrCommon,
    attrAxis,
    attrLegend,
    attrTitle,
    setcolor,
    setColorDialog,
    attrOption
  }
}
</script>