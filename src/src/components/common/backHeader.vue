<template>
<div class="topbanner">
  <section class="shead_goback" v-if="goBack" @click="clickAction">
    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" version="1.1">
      <polyline points="12,18 4,9 12,0" style="fill:none;stroke:rgb(255,255,255);stroke-width:2"/>
    </svg>
  </section>
  <section class="title_head ellipsis" v-if="headTitle">
    <span class="title_text">{{headTitle}}</span>
  </section>
</div>
</template>

<script>
import "@/style/default/backHeader.scss";
import "@/style/theme/black/backHeader.scss";
export default {
  data() {
    return {};
  },
  mounted() {},
  props: ["headTitle", "goBack"],
  computed: {},
  methods: {
    clickAction(){
      this.$router.go(-1);
    }
  }
};
</script>