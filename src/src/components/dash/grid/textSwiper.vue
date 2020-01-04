<template>
    <swiper class="myswper" ref="mySwiper" :options="swiperOption" :class="{'noData':swiperSlides.length == 0 ? true :false}"  :key="swiperSlides.length+'-'+times" >
        <swiper-slide   class="swiper-no-swiping" v-for="(file, index) in swiperSlides" :key="index"  >
            <div class="text-slide">{{file.text}}</div>
        </swiper-slide>
    </swiper>
</template>
<script>
import "swiper/dist/css/swiper.css";
import swiper from "@/components/common/bi-swiper.vue";
import swiperSlide from "@/components/common/bi-slide.vue";
export default {
  data() {
    return {
      times: new Date().getTime()
    };
  },
  props: {
    mode: String,
    itemData: Object
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper;
    },
    swiperSlides() {
      this.times = new Date().getTime();
      return this.itemData.data.fileList.map((elem, index) => {
        return { text: bi.dash.formatText(elem.text) };
      });
    },
    swiperOption() {
      let swiperOption = {
        notNextTick: true,
        effect: "slide",
        direction: this.itemData.data.direction,
        slidesPerView: this.itemData.data.slidesPerView,
        loop: true,
        autoplay: {
          delay: this.itemData.data.duration
        },
        noSwiping: this.mode == "edit" ? true : false
      };
      return swiperOption;
    }
  },
  components: {
    swiper,
    swiperSlide
  },
  watch: {
    swiperSlides: {
      deep: true,
      handler() {
        this.swiper.update();
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.myswper {
  position: absolute;
  height: 100%;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  overflow: hidden;
}
.noData {
  position: relative;
  height: 0;
}
.myImgs {
  position: absolute;
  width: 100%;
  height: 100%;
}
.text-slide {
  position: relative;
}
</style>
