<template>
  <div>
    <h3>drag2</h3> 
    <draggable class="list-group" :list="list2" group="people" @change="log">
        <div
          class="list-group-item"
          v-for="(element, index) in list2"
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
      list2: [
        { name: "Juan2", id: 5 },
        { name: "Edgard2", id: 6 },
        { name: "Johnson2", id: 7 }
      ]
    }
  },
  methods: {
    log(evt) {
      window.console.log('drag2::::', evt);
    }
  }
}
</script>