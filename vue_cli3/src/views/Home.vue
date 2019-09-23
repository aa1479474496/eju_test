<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <div>home</div>
    <p class="test">test</p>
    <current-user>
      <template v-slot:default="slotProps">{{ slotProps.user.firstName }}</template>

      <template v-slot:other="otherSlotProps">{{ otherSlotProps.animal.age }}</template>
    </current-user>

    <updated :list="list"></updated>
    <button @click="updateTitle">updated</button>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import CurrentUser from "@/components/CurrentUser.vue";
import Updated from "@/components/Updated.vue";

export default {
  name: "home",

  components: {
    // HelloWorld,
    CurrentUser,
    Updated
  },

  data() {
    return {
        title: 'init',
        list: ['a', 'b', 'c']
    };
  },

  methods: {
      updateTitle() {
          this.list = ['d', 'e'];
      }
  }
};
</script>
