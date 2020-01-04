<template>
    <div style="width:100%;height:100%;">
        <div class="iframeMask"></div>
        <iframe :src="iframeUrl"></iframe>
    </div>
</template>

<script>
export default {
  props: {
    mode: String,
    itemData: Object
  },
  computed: {
    iframeUrl() {
      return bi.dash.formatText(this.itemData.data.url);
    }
  }
};
</script>

<style lang="scss" scoped>
.iframeMask {
  position: absolute;
  z-index: 90;
  width: 100%;
  height: 100%;
  background-color: transparent;
}
iframe {
  display: block;
  margin: 0px;
  padding: 0px;
  border: 0px;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  z-index: 5;
  width: 100%;
  height: 100%;
}
</style>