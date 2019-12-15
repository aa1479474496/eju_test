<template>
  <div>
    <div class="fix_header">微信公众号排行榜3</div>
    <div class="place_fix"></div>
    <div class="bg_container">
        <span class="img_point"></span>
        <span class="img_line"></span>
        <span class="ani_block">关键字1</span>

        <!-- <div></div> -->
    </div>
    <!-- <div class="place_bg_container"></div> -->

    <div :class="['content',isFold ? 'is_fold' : '' ]"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isFold: false,
      points: [
        { keyword: "关键字1", left: 300, top: 120,distance: 50 },
        // { keyword: "关键字2", left: 500, top: 130 }
      ]
    };
  },

  mounted() {
    window.addEventListener("scroll", this.handleScroll, true);
  },
  methods: {}
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
  position: relative;
  margin: auto;
  width: 1280px;
  height: 400px;

  background: linear-gradient(
    360deg,
    rgba(30, 92, 222, 1) 0%,
    rgba(88, 7, 108, 1) 100%
  );
  border-radius: 8px;
  transition: all cubic-bezier(0.075, 0.82, 0.165, 1) 2.5s;

  .ani_block {
      z-index:9;
    position: absolute;
    left: 300px;
    top: 120px;
    padding: 0 22px;
    height: 34px;
    line-height: 34px;
    background: rgba(216, 216, 216, 0.1);
    border-radius: 8px;
    color: #fff;

    transform: translate(-50%, -50%);
    animation: point_move 5.8s ease infinite; 

    &::before {
        content: '';
        position: absolute;
        z-index: 2;
        left: 50%;
        margin-left: -2px;
        bottom:-5px;
        width: 4px;
        height: 4px;
        border-radius: 50%;
        background:rgba(3,169,244,.7);
    }

    &::after {
        // content: '';
        // position: absolute;
        // z-index: 1;
        // left: 50%;
        // // margin-left: -2px;
        // bottom:-35px;
        // width: 1px;
        // height: 35px;
        // background:red;
    }
  }
}
.img_line {
    position: absolute;
    z-index: 1;
    left: 300px;
    top:142px;
    width: 2px;
    height: 35px;
    background:red;
    margin-left:-1px;
    // background:rgba(216,216,216,0.1);
}
.img_point {
    position: absolute;
    z-index: 2;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: yellow;
    left: 300px;
    top: 180px;
    transform: translate(-50%, -50%);
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
  transition: all cubic-bezier(0.075, 0.82, 0.165, 1) 0.5s;

  &.is_fold {
    // transform: translateY(-400px);

    // top: -300px;
  }
}

@keyframes point_move {
  0% {
      transform: translate(-50%, -50%);
  }
  50% {
      transform: translate(-50%,0);
  }
  100% {
      transform: translate(-50%,-50%);
  }


//    0% {
//      margin-top: 0;
//   }
//   50% {
//       margin-top: 17px;
//   }
//   100% {
//        margin-top: 0;
//   }
}
</style>