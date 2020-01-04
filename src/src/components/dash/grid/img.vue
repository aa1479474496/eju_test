<template>
  <img 
    :class="'imgbx '+(href && mode!='edit'?'link':'')" 
    :src="imgUrl" draggable="false" @click="click" />
</template>

<script>
export default {
  props: {
    mode: String,
    itemData: Object
  },
  computed: {
    imgUrl() {
      if(!this.itemData.data.isUpload){
        return bi.dash.formatText(this.itemData.data.url);
      }
      return  this.itemData.data.uploadImgUrl ? this.itemData.data.uploadImgUrl.url :'' ;
    },
    href() {
      return bi.dash.formatText(this.itemData.data.href || '');
    }
  },
  methods: {
    click() {
      if (this.mode != "edit") {
        if (!!this.itemData.data.isNew) {
          !!this.href && window.open(this.href);
        } else {
          !!this.href && location.replace(this.href);
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.imgbx {
  box-sizing: border-box;
  overflow: hidden;
  display: block;
  width: 100%;
  position: relative;
}
.link {
  cursor: pointer;
}
</style>