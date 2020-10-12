<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <div class="test">home</div>
    <!-- <p class="test">test</p>
    <current-user>
      <template v-slot:default="slotProps">{{ slotProps.user.firstName }}</template>

      <template v-slot:other="otherSlotProps">{{ otherSlotProps.animal.age }}</template>
    </current-user>-->
    <!-- 
    <updated :list="list"></updated>
    <button @click="updateTitle">updated</button>-->
    <button @click="test">test promise</button>
    <async-fun v-if="show"></async-fun>
    <div v-for="(item, index) in list2" :key="index" :class="isExit(item.id)">{{ item.name }}</div>

    <div class="test_theme_bg" @click="toggleTheme">测试切换主题背景色</div>
  </div>
</template>

<script>
import { mapState } from "vuex";

// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import CurrentUser from "@/components/CurrentUser.vue";
import Updated from "@/components/Updated.vue";
import asyncFun from "@/components/asyncFun.vue";

export default {
  name: "home",

  computed: {
    ...mapState({
      status: state => state.status
    })
  },

  components: {
    // HelloWorld,
    CurrentUser,
    Updated,
    asyncFun
  },

  data() {
    return {
      title: "init",
      list: ["a", "b", "c"],
      show: false,

      list2: [
        { id: 1, name: "a1" },
        { id: 2, name: "a2" },
        { id: 3, name: "a3" },
        { id: 4, name: "a4" }
      ],
      testId: ""
    };
  },

  async created() {
    window.document.documentElement.setAttribute("data-theme", "light");
    // await this.init();
    // await this.init2();
    await this.getParam();
    console.log("created");
    console.log("this", this.testId);
  },

  methods: {
    toggleTheme() {
      let theme = window.document.documentElement.getAttribute("data-theme");

      theme = theme == "light" ? "dark" : "light";
      window.document.documentElement.setAttribute("data-theme", theme);
    },
    async init2() {
      await this.timeout(2000);
      console.log("init2");
    },
    timeout(ms) {
      return new Promise(resolve =>
        setTimeout(function() {
          console.log("tttt");
          resolve();
        }, ms)
      );
    },
    init() {
      console.log("iiii");
      this.asyncTest1();
      this.asyncTest2();
    },
    async asyncTest1() {
      await this.getParam();
      console.log("asyncTest1");
    },
    async asyncTest2() {
      await this.getParam();
      console.log("asyncTest2");
    },

    async getParam() {
      return new Promise(resolve => {
        if (this.testId) {
          return resolve(this.testId);
        }
        setTimeout(() => {
          this.testId = 1;
          resolve(this.testId);
        }, 2000);
      });
    },

    async getId() {
      this.testId = 1;
    },

    updateTitle() {
      this.list = ["d", "e"];
    },

    isExit(id) {
      // console.log("id", id);
      if (this.status.includes(id)) {
        return "is_exit";
      }
      return "";
    },

    test() {
      this.show = true;
      this.asyncFun1();
    },

    async asyncFun1() {
      setTimeout(() => {
        console.log("asyncFun1");
      }, 2000);
    },

    changeStatus() {
      console.log("list2发生改变");
    }
  },

  watch: {
    status(val, oldVal) {
      console.log("change");
      this.changeStatus();
    }
  }
};
</script>

<style lang="scss">
.is_exit {
  color: red;
}
.test {
  // color: $header_color;
}
.test_theme_bg {
  width: 300px;
  text-align: center;
  height: 40px;
  line-height: 40px;
  color: red;
  cursor: pointer;
  @include bg_color("background_color1");
}
</style>
