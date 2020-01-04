
<template>
  <div>
    <attrCommon>
      <attrTitle></attrTitle>
    </attrCommon>
  </div>
</template>

<script>
import attrCommon from '@/components/chart/attr/common';
import attrTitle from '@/components/chart/attr/echarts/attrTitle';
import optionCompile from '@/components/chart/com/compile'
export default {
  data() {
    return {
    };
  },
  components: {
    attrCommon,
    attrTitle,
  }
}
</script>