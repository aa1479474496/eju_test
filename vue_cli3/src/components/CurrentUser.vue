<template>
  <!-- <span>
    <slot :user="user">{{ user.lastName }}</slot>
  </span>-->

  <span>
    <slot v-bind:user="user">{{ user.lastName }}</slot> <br>
    <slot name="other" v-bind:animal="animal"></slot>
  </span>
</template>

<script>
export default {
  data() {
    return {
      user: {
        firstName: "Mical13",
        lastName: "john"
      },

      animal: {
        name: "dog",
        age: 12
      }
    };
  }
};
</script>