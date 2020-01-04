<template>
    <swiper class="myswper" ref="mySwiper" :options="swiperOption" :class="{'noData':swiperSlides.length == 0 ? true :false}"  :key="swiperSlides.length" >
        <swiper-slide   class="swiper-no-swiping" v-for="(file, index) in swiperSlides" :key="index"  >
            <img class="myImgs" :src="file.url"  :draggable="false" >
        </swiper-slide>
        <div v-show="itemData.data.controlBar == 'pagination'" class="swiper-pagination"  slot="pagination"></div>
        <div v-show="itemData.data.controlBar == 'navigation'" class="swiper-button-prev" slot="button-prev"></div>
        <div v-show="itemData.data.controlBar == 'navigation'" class="swiper-button-next" slot="button-next"></div>
        <div v-show="itemData.data.controlBar == 'scrollbar'" class="swiper-scrollbar"   slot="scrollbar"></div>
    </swiper>
</template>
<script>
import "swiper/dist/css/swiper.css";
import swiper from "@/components/common/bi-swiper.vue";
import swiperSlide from "@/components/common/bi-slide.vue";
export default {
  props: {
    mode: String,
    itemData: Object
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper;
    },
    swiperSlides() {
      return this.itemData.data.fileList;
    },
    swiperOption() {
      let _controls = {};
      if (this.itemData.data.controlBar == "pagination") {
        _controls = { pagination: { el: ".swiper-pagination" } };
      } else if (this.itemData.data.controlBar == "navigation") {
        _controls = {
          navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev"
          }
        };
      } else if (this.itemData.data.controlBar == "scrollbar") {
        _controls = { scrollbar: { el: ".swiper-scrollbar" } };
      }
      let swiperOption = {
        notNextTick: true,
        effect: this.itemData.data.effect,
        direction: this.itemData.data.direction,
        slidesPerView: this.itemData.data.slidesPerView,
        loop: true,
        autoplay: {
          delay: this.itemData.data.duration
        },
        noSwiping: this.mode == "edit" ? true : false
      };
      Object.assign(swiperOption, _controls);
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
</style>
