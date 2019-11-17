<template>
  <div>
    <div class="test_c"></div>
    <div class="content_box">
      <div class="content_box_header">header</div>
      <div class="content_c">
        <scrollbar
          :native="false"
          wrapStyle
          wrapClass
          viewClass
          viewStyle
          :noresize="false"
          tag="section"
        >
          <div class="item" v-for="n in 10" :key="n">{{n}}</div>
        </scrollbar>
        <!-- <div class="item" v-for="n in 10" :key="n">{{n}}</div> -->
      </div>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      value1: ""
    };
  },

  methods: {},
  mounted() {
    this.$nextTick(() => {});
  }
};
</script>
z
<style lang="scss" style="scoped">
.test_c {
  height: 900px;
  background: red;
}

.content_box {
  position: relative;
  height: 500px;
  background: skyblue;
  display: flex;
  flex-direction: column;

  .content_box_header {
    height: 140px;
    line-height: 140px;
    background: green;
  }
}
.content_c {
  // position: absolute;
  // left: 0;
  // right: 0;
  // top: 30px;
  // bottom: 30px;
  flex: 1;
  border: 1px solid black;
  padding-bottom: 10px;
  overflow: hidden;

  .el-scrollbar__view {
    height: 100%;
  }

  .scroll {
    max-height: 300px;
    margin-right: -17px;
    margin-bottom: -17px;
    overflow: scroll;
    background: gold;
  }

  .item {
    height: 40px;
    line-height: 40px;
    text-align: center;
    background: #eee;
    margin-bottom: 10px;
  }
}
</style>