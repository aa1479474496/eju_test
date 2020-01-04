<template>
  <video-player class="video-player-box" ref="videoPlayer" :options="playerOptions" :playsinline="true" >
  </video-player>
</template>

<script>
import "video.js/dist/video-js.css";
import { videoPlayer } from "vue-video-player";
export default {
  props: {
    mode: String,
    itemData: Object
  },
  computed: {
    playerOptions() {
      return {
        muted: true,
        language: "zh",
        playbackRates: [0.5, 1.0, 1.5, 2.0],
        sources: [
          {
            type: this.itemData.data.type,
            src: bi.dash.formatText(this.itemData.data.src)
          }
        ],
        poster: this.itemData.data.poster,
        loop: this.itemData.data.loop,
        autoplay: this.itemData.data.autoplay
      };
    }
  },
  components: {
    videoPlayer
  }
};
</script>

<style lang="scss" scoped>
.video-player-box {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;

  /deep/ .video-js {
    width: 100%;
    max-height: 100%;
    position: absolute;
    top: 0;
  }
  /deep/ .vjs-big-play-button {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
