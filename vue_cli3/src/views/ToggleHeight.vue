<template>
  <div class="toggle_box">
    <div>
      <div class="toggle_line" v-toggleHeight="{list: list1}">
          list1
        <div class="toggle_label_wrapper">
          <span class="toggle_label" v-for="(item, index) in list1" :key="index">{{item}}</span>
        </div>
      </div>
      <span class="see_more">查看更多</span>
    </div>


    <!--  -->

    <div style="margin-top:20px;">
      <div class="toggle_line" v-toggleHeight="{list: list2}">
          list2
        <div class="toggle_label_wrapper">
          <span class="toggle_label" v-for="(item, index) in list2" :key="index">{{item}}</span>
        </div>
      </div>
      <span class="see_more">查看更多</span>
    </div>

    <div @click="update">update button{{count}}</div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      list1: [],
      list2: [],
      count: 1
    };
  },

  mounted() {

      setTimeout(() => {
          this.list1 = this.tempData("关键词", 10);
          console.log('update list1');
      }, 2000);

      setTimeout(() => {
        //   this.list2 = this.tempData("热词", 2);
          this.count = 2;
          console.log('update list2');
      }, 1000);
  },

  methods: {
      update() {
          this.count++;
          console.log('count', this.count);
        //   this.list1 = this.tempData("关键词", this.count);
      },
    tempData(name, num) {
      return Array.from({ length: num }).map((item, index) => {
        return `${name}-${index}`;
      });
    }
  }
};
</script>


<style lang="scss" scoped>
.toggle_box {
  width: 500px;
  padding: 10px;
  margin: 30px auto;
  border: 1px solid green;
  .toggle_line {
    max-width: 320px;
    display: inline-block;
    vertical-align: top;
    height: 30px;
    overflow: hidden;
    transition: all cubic-bezier(0.075, 0.82, 0.165, 1) .3s;
  }
  .toggle_label {
    display: inline-block;
    background: skyblue;
    padding: 4px;
    line-height: 24px;
    text-align: center;
    color: #333;
    border-radius: 4px;
    margin: 0 4px 4px 0;
  }

  .see_more {
      opacity: 0;
      &.show_more {
          opacity: 1;
      }
  }
}
</style>