<template>
  <div>
    <myckeditor v-if="show" @handlChange='handleChangeFirst'></myckeditor>
    <el-button @click="test">test</el-button>
    <myckeditor @handlChange='handleChangeSecond'></myckeditor>
    <el-button @click="replaceRouter">replace router</el-button>
  </div>
</template>

<script>
import myckeditor from "@/components/ckeditor/index.vue";

export default {
  components: {
    myckeditor
  },
  data() {
    return {
     show: false
    };
  },

  methods: {
    test() {
      console.log("--");
      this.show = !this.show;
    },

    handleChangeFirst(val) {
      console.log('first val', val);
    },
    handleChangeSecond(val) {
      console.log('second val', val);
    },
    replaceRouter() {
      let { $route, $router } = this;
      let { path } = $route;
      let query = {
        time: +new Date()
      }
      $router.replace({ path, query });
    }
  }
};
</script>