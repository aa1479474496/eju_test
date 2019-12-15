<template>
  <div id="list-demo" class="demo">
    <button v-on:click="add">Add</button>
    <button v-on:click="remove">Remove</button>
    <!-- <transition-group name="list" tag="p">
      <span v-for="(item) in items" v-bind:key="item.name" class="list-item">{{ item.name }}</span>
    </transition-group>-->

    <transition-group name="list" tag="p">
      <span
        v-for="(item) in items"
        v-bind:key="item.name"
        class="list-item"
      >{{ item.name }}</span>
    </transition-group>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [],
      nextNum: 10
    };
  },
  created() {
    this.createItems();
  },
  methods: {
    createItems() {
      for (let i = 0; i < 10; i++) {
        this.items.push({
          name: `item-${i}`
        });

        //    this.items.push(i);
      }
    },
    randomIndex: function() {
      return Math.floor(Math.random() * this.items.length);
    },
    add: function() {
      this.items.unshift({
        name: `item-${this.nextNum++}`
      });
      //   this.items.splice(this.randomIndex(), 0, this.nextNum++);
    },
    remove: function() {
      this.items.splice(this.randomIndex(), 1);
    }
  }
};
</script>

<style lang="scss" scoped>
.list-item {
  //   display: inline-block;
  float: left;
  margin-right: 10px;
  display: flex;
}
.list-enter-active,
.list-leave-active {
  transition: all 1s;
}
.list-enter, .list-leave-to
/* .list-leave-active for below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
}
</style>