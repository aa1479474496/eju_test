<template>
  <div>
    <h2>$attrs测试</h2>
    <parent :name="name" :age="age" :school="school" @say1="say1" @say2="say2"></parent>
    <button @click="changeName">修改名字</button>
  </div>
</template>

<script>
let nameId = 1;
import parent from './components/parent.vue';
export default {
  components: {
    parent
  },
  data() {
    return {
      name: 'Jack',
      age: 12,
      school: 'middle school'
    }
  },
  methods: {
    changeName() {
      nameId++;
      this.name = 'Jack' + nameId;
    },

    say1(val) {
      console.log('say1::', val);
    },

    say2(val) {
      console.log('say2::', val);
    }
  }
}
</script>