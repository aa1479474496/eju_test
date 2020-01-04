
<template>
  <div>
    <attrCommon>
      <attrTitle></attrTitle>
    </attrCommon>
  </div>
</template>

<script>
import attrCommon from '@/components/chart/attr/common';
import attrOption from '@/components/chart/attr/option';
import attrAxis from '@/components/chart/attr/echarts/attrAxis';
import attrLegend from '@/components/chart/attr/echarts/attrLegend';
import attrTitle from '@/components/chart/attr/echarts/attrTitle';
import optionCompile from '@/components/chart/com/compile'
export default {
  data() {
    return {
    };
  },
  components: {
    attrCommon,
    attrAxis,
    attrLegend,
    attrTitle,
    attrOption
  }
}
</script>