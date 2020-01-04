<template>
  <MarqueeTips 
    class="MarqueeTips" 
    :content="content" 
    :speed="speed" 
    :font="font" 
    :style="{'align-items':itemData.data.alignItems || 'normal'}">
  </MarqueeTips>
</template>
<script>
  import MarqueeTips from "@/components/common/marquee.vue";
  export default {
    components: {
      MarqueeTips
    },
    props: {
      mode: String,
      itemData: Object
    },
    computed: {
      content() {
        return bi.dash.formatText(this.itemData.data.text);
      },
      speed() {
        let _val = Number(this.itemData.data.speed);
        return !Number.isNaN(_val) ? _val : 5;
      },
      font() {
        let _css = this.itemData.css;
        return `${_css["font-size"]}  ${_css["font-family"]}`;
      }
    }
  };

</script>
<style lang="scss" scoped>
  .MarqueeTips {
    width: 100%;
    height: 100%;
    overflow: hidden;
    box-sizing: border-box;
    display: flex;
    outline: none;
    padding: 0;
    border: none;
    background: transparent;
    box-sizing: border-box;
    word-break: break-all;
  }

</style>
