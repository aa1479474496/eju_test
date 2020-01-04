<template>
  <countTo 
    class="countto"
    ref ="mycountto"
    :startVal="startVal"  
    :endVal="endVal"  
    :duration="duration" 
    :autoplay="autoplay" 
    :decimals="decimals" 
    :separator="separator" 
    :prefix="prefix" 
    :suffix="suffix" 
    :style="{'align-items':itemData.data.alignItems || 'normal','justify-content':align}">
    >
  </countTo>
</template>
<script>
import countTo from "vue-count-to";
export default {
  components: {
    countTo
  },
  props: {
    itemData: Object
  },
  computed: {
    autoplay() {
      return !!this.itemData.data.autoplay;
    },
    separator() {
      return bi.dash.formatText(this.itemData.data.separator);
    },
    prefix() {
      return bi.dash.formatText(this.itemData.data.prefix);
    },
    suffix() {
      return bi.dash.formatText(this.itemData.data.suffix);
    },
    startVal() {
      let _val = Number(this.itemData.data.startVal);
      return !Number.isNaN(_val) ? _val : 0;
    },
    endVal() {
      let _val = Number(this.itemData.data.endVal);
      return !Number.isNaN(_val) ? _val : 2017;
    },
    duration() {
      let _val = Number(this.itemData.data.duration);
      return !Number.isNaN(_val) ? _val : 3000;
    },
    decimals() {
      let _val = Number(this.itemData.data.decimals);
      return !Number.isNaN(_val) ? _val : 0;
    },
    align() {
      let _css = this.itemData.css;
      if (_css["text-align"] == "justify") {
        return "space-between";
      } else {
        return _css["text-align"];
      }
    }
  },
  methods: {},
  watch: {
    separator() {
      this.$refs.mycountto.start();
    },
    prefix() {
      this.$refs.mycountto.start();
    },
    suffix() {
      this.$refs.mycountto.start();
    }
  }
};
</script>
<style lang="scss" scoped>
.countto {
  display: flex;
  height: 100%;
}
</style>

