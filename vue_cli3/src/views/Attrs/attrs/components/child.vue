<template>
  <div>
    <hr>
    <h6>child组件</h6>
    <div>父组件传过来的名称:{{name}}</div>
    <div>父组件传过来年龄:{{age}}</div>
    <div>父组件传过来学校:{{school}}</div>
    <button @click="say1">say1</button>
    <button @click="say2">say2</button>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      default: ''
    },

    age: {
      type: [String, Number],
      default: ''
    },

    school: {
      type: String,
      default: ''
    },
  },

  methods: {
    say1() {
      this.$emit('say1', 'child say1');
    },

    say2() {
      this.$emit('say2', 'child say2');
    }
  }
}
</script>