<template>
  <div class="dash-attr" v-if="dash.status">
    <div class="dash-attr-block">
      <div class="dash-attr-title">{{dash.currItem.type}}</div>
    </div>
    <attrItem></attrItem>
    <attrCommon></attrCommon>
  </div>
  <div v-else class="dash-attr" v-loading="!dash.status" element-loading-background="#191a2c"></div>
</template>

<script>
import attrItem from '@/components/dash/com/attrItem';
import attrCommon from '@/components/dash/attr/common';
import '@/style/default/dashAttr';
import '@/style/theme/black/dashAttr';
export default {
  data() {
    return {
      dash: bi.dash
    };
  },
  components: {
    attrItem,
    attrCommon
  }
};
</script>