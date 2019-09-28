<template>
  <div class="container">
    <div v-move v-only="{color: color1}" class="content">
      <span style="background:black;font-size:18px">1234555</span>
    </div>
    <div @click="setColor">测试color</div>
    <side-bar></side-bar>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import SideBar from "@/components/SideBar.vue";
export default {
  components: {
    SideBar
  },

  data() {
      return {
          color1: '',
          color2: ''
      }
  },

  computed: {
    ...mapState({
      isFold: state => state.isFold
    })
  },

  mounted() {
    //   console.log('$', $('.content'));
  },

  methods: {
      setColor() {
        //   this.color2 = 'red';
          this.color1 =  Math.random() > 0.5 ? 'blue' : 'red';
      }
  }
};
</script>

<style lang="scss">
.container {
  position: relative;
  padding-top: 60px;
  background: skyblue;
}
.content {
  text-align: left;
  width: 1080px;
  height: 300px;
  margin-top: 20px;
  margin-left: auto;
  margin-right: auto;
  background-color: green;
  transition: all 0.3s;
}
</style>