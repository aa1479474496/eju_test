<template>
  <div>
    <div class="fix_header">微信公众号排行榜</div>
    <div class="place_fix"></div>
    <div :class="['bg_container', isFold ? 'is_fold' : '']"></div>
    <!-- <div class="place_bg_container"></div> -->

    <div :class="['content',isFold ? 'is_fold' : '' ]"></div>

    <el-button @click="test" style="position:fixed;bottom:20px;right:20px;z-index:9999;">test</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isFold: false
    };
  },

  mounted() {
    window.addEventListener("scroll", this.handleScroll, true);
  },
  methods: {
    handleScroll() {
      //   let _top = document.documentElement.scrollTop || document.body.scrollTop;

      let _top = $("html").scrollTop();

      console.log(")top", _top);

      if (!this.isFold) {
        if (_top > 10) {
        //   this.test();
            this.isFold = true;

          let __top =
            document.documentElement.scrollTop || document.body.scrollTop;
          console.log("__", __top);
          //   document.body.onmousewheel = function () {return false;}
          //   window.removeListener("scroll", this.handleScroll, true);
        }
      }
    },

    test() {
      let _this = this;
      $("html").animate({ scrollTop: 0 }, function() {
        // $(":root").addClass("hidden");
        _this.isFold = true;
        setTimeout(() => {
          $(":root").removeClass("hidden");
        }, 2500);
      });

      //         $('body').css({
      // 　　"overflow-x":"hidden",
      // 　　"overflow-y":"hidden"
      // });

      // let _top = document.documentElement.scrollTop || document.body.scrollTop;
      // console.log('__', _top);
    }
  }
};
</script>


<style lang="scss" scoped>
.fix_header {
  position: fixed;
  z-index: 99;
  left: 0;
  right: 0;
  top: 0;
  height: 60px;
  line-height: 60px;
  text-align: center;
  background: skyblue;
}

.place_bg_container {
  margin-top: 20px;
  height: 400px;
}

.place_fix {
  height: 60px;
}

.bg_container {
  // position: absolute;
  // left: 0;
  // right: 0;
  // top: 80px;;
  width: 1280px;
  //   margin-top: 20px;
  height: 400px;

  background: linear-gradient(
    360deg,
    rgba(30, 92, 222, 1) 0%,
    rgba(88, 7, 108, 1) 100%
  );
  border-radius: 8px;
  transition: all cubic-bezier(0.075, 0.82, 0.165, 1) 2.5s;
  // transition:all cubic-bezier(0.075, 0.82, 0.165, 1) 2.5s;

  &.is_fold {
    height: 0;

    //   transform: translateY(-400px);
  }
}

.content {
  position: relative;
  z-index: 999;
//   transform: translateY(0);

  //   top: 0;
  width: 1280px;
  height: 1500px;
  margin: 20px auto;
  background: gray;
  transition: all cubic-bezier(0.075, 0.82, 0.165, 1) .5s;

  &.is_fold {
    // transform: translateY(-400px);

    // top: -300px;
  }
}
</style>