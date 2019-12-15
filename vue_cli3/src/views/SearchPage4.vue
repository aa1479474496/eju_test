<template>
  <div>
    <div class="fix_header">微信公众号排行榜4</div>
    <div class="place_fix"></div>
    <div class="bg_container">
      <!-- <span class="img_point"></span>
      <div class="ani_block_box">
        <span class="ani_block">
          <span class="word">关键字1</span>
          <span class="img_line"></span>
        </span>
      </div>-->

      <div v-for="(item, index) in position" :key="index">
        <span class="img_point" :style="{left:item.left+'px',top:item.top + 'px'}"></span>
        <div class="ani_block_box" :style="{left:item.left+'px',top:item.pTop + 'px', height: item.pHeight+'px'}">
          <span class="ani_block" :style="{'animation-duration':item.duration}">
            <span class="word">{{item.keyword}}</span>
            <span class="img_line"></span>
          </span>
        </div>
      </div>

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
      pointR: 6,
      blockHeight: 34,
      points: [
        { keyword: "关键字1", left: 500, top: 180, distance: 50 },
        { keyword: "关键字2", left: 300, top: 180, distance: 50 },
        { keyword: "关键字3", left: 600, top: 280, distance: 100 },
      ],
      position: []
    };
  },

  mounted() {
    this.createPosition();
  },
  methods: {
    createPosition() {
      this.position = this.points.map(item => {
        let { left, top, distance } = item;
        let pTop = top - distance - this.pointR - this.blockHeight;
        let pHeight = distance + this.blockHeight;
        // var delay = "animation-delay:" + (i * 0.5).toFixed(2) + "s" ;
        // let delay = (Math.random()*(0.5 - 0.1) + 0.1).toFixed(2) + "s";
        let duration = (Math.random()*(5 - 2) + 2).toFixed(2) + "s";
        return Object.assign({}, item, { pHeight, pTop,duration });
      });

      console.log("position", this.position);
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

  .ani_block_box {
    box-sizing: border-box;
    padding-top: 0;
    z-index: 9;
    position: absolute;
    // left: 300px;
    // top: 90px; // 180 - -2.5-50 - 34
    // height: 84px;
    overflow: hidden;
    transform: translate(-50%, 0);
  }

  .ani_block {
    height: 100%;
    border-radius: 8px;
    color: #fff;

    transform: translate(0, 0);

    display: flex;
    align-items: center;
    flex-direction: column;
    // animation: point_move 4.8s linear infinite;
    animation: point_move linear infinite;
    // animation-duration:2s;

    .word {
      position: relative;
      display: block;
      height: 34px;
      line-height: 34px;
      padding: 0 22px;
      background: rgba(216, 216, 216, 0.1);
      border-radius: 8px;

      &::before {
        content: "";
        position: absolute;
        z-index: 2;
        left: 50%;
        margin-left: -2px;
        bottom: -4px;
        width: 4px;
        height: 4px;
        border-radius: 50%;
        background: rgba(3, 169, 244, 0.7);
      }
    }
    // animation: point_move 5.8s ease infinite;

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
  flex: 1;
  width: 2px;
  //   height: 35px;
  background: red;
  //   margin-left: -1px;
  // background:rgba(216,216,216,0.1);
}
.img_point {
  position: absolute;
  z-index: 2;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: yellow;
//   left: 300px;
//   top: 180px;
  transform: translate(-50%, -50%);
}

@keyframes point_move {
  0% {
    transform: translate(0, 30px);
  }
  50% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(0, 30px);
  }

  //   0% {
  //     padding-top: 0;
  //   }
  //   50% {
  //     padding-top: 17px;
  //   }
  //   100% {
  //     padding-top: 0;
  //   }
}
</style>