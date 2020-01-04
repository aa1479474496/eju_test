
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
import attrLegend from '@/components/chart/attr/hcharts/attrLegend';
import attrTitle from '@/components/chart/attr/hcharts/attrTitle';
export default {
  data() {
    return {
    };
  },
  components: {
    attrCommon,
    attrLegend,
    attrTitle,
    attrOption
  }
}
</script>