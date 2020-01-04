<template>
  <div
        v-if="!!itemData.data.isHtml"
        :class="'textareabx '+(href && mode!='edit'?'link':'')" 
        ref="intexta"
        v-html="text"
        @click="click"
    ></div>
  <div 
      v-else
      :class="'textareabx pre '+(href && mode!='edit'?'link':'')" 
      :style="{'align-items':itemData.data.alignItems || 'normal','justify-content':itemData.data.justifyContent|| 'normal'}"
      ref="intexta"
      v-text="text"
      @click="click"
  ></div>
</template>

<script>
export default {
  props: {
    mode: String,
    itemData: Object
  },
  computed: {
    text() {
      return bi.dash.formatText(this.itemData.data.text);
    },
    href() {
      return bi.dash.formatText(this.itemData.data.href || '');
    }
  },
  methods: {
    click() {
      if (this.mode != "edit" && this.href.trim()) {
        if (this.itemData.data.isNew) {
          window.open(this.href);
        } else {
          location.replace(this.href);
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.textareabx {
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
.link {
  cursor: pointer;
}
.alignItems{
    align-items: center;
}
</style>