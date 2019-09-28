<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <div>home</div>
    <!-- <p class="test">test</p>
    <current-user>
      <template v-slot:default="slotProps">{{ slotProps.user.firstName }}</template>

      <template v-slot:other="otherSlotProps">{{ otherSlotProps.animal.age }}</template>
    </current-user> -->
<!-- 
    <updated :list="list"></updated>
    <button @click="updateTitle">updated</button> -->
    <button @click="test">test promise</button>
    <async-fun v-if="show"></async-fun>
    <div v-for="(item, index) in list2" :key="index" :class="isExit(item.id)">{{item.name}}</div>
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
          { id: 1, name: 'a1' },
          { id: 2, name: 'a2' },
          { id: 3, name: 'a3' },
          { id: 4, name: 'a4' },
      ]
    };
  },

  methods: {
    updateTitle() {
      this.list = ["d", "e"];
    },

    isExit(id) {
        console.log('id', id);
        if (this.status.includes(id)) {
            return 'is_exit'
        }
        return ''
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
        console.log('list2发生改变');
    }
  },

  watch: {
      status(val, oldVal) {
          console.log('change');
          this.changeStatus();
      }
  }
};
</script>

<style lang="scss">
    .is_exit {
        color: red;
    }
</style>
