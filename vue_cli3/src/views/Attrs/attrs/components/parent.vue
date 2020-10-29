<template>
  <div>
    <hr>
    <h5>parent组件</h5>
    <child v-bind="$attrs" v-on="$listeners"></child>
    <!-- <child v-bind="$props" v-on="$listeners"></child> -->
  </div>
</template>

<script>
import child from './child.vue';
export default {
  // props: {
  //    name: {
  //     type: String,
  //     default: ''
  //   },

  //   age: {
  //     type: [String, Number],
  //     default: ''
  //   },

  //   school: {
  //     type: String,
  //     default: ''
  //   },
  // },
  components: {
    child
  },
}
</script>