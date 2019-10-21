<template>
  <div :class="['side_bar', isFold ? 'is_fold' : '']">
    <div class="btn" @click="toggle"></div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  computed: {
    ...mapState({
      isFold: state => state.isFold
    })
  },

  methods: {
    ...mapActions({
      setFold: "setFold"
    }),

    toggle() {
      let isFold = !this.isFold;
      this.setFold(isFold);
    }
  }
};
</script>

<style>
/* .side_bar {
  position: fixed;
  top: 138px;
  right: -280px;
  width: 310px;
  bottom: 0;
  background: gold;
  transition: all 0.3s;

  &.is_fold {
    right: 0;
  }
}
.btn {
  position: absolute;
  left: 0;
  top: 50px;
  width: 30px;
  height: 60px;
  background-color: #fff;
  z-index: 2;

  cursor: pointer;
} */
</style>