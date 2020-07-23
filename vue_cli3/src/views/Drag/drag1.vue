<template>
  <div>
    <h3>drag1</h3> 
    <draggable class="list-group" :list="list1" group="people" @change="log">
        <div
        slot="header"
          class="list-group-item"
          v-for="(element, index) in list1"
          :key="element.name"
        >
          {{ element.name }} {{ index }}
        </div>
      </draggable>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
export default {
  components: {
    draggable
  },
  data() {
    return {
      list1: [
        { name: "John", id: 1 },
        { name: "Joao", id: 2 },
        { name: "Jean", id: 3 },
        { name: "Gerard", id: 4 }
      ],
    }
  },
  methods: {
    log(evt) {
      window.console.log('drag1::::', evt);
    }
  }
}
</script>