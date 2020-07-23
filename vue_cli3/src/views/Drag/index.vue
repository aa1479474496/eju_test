<template>
  <div>
    <h3>test drag</h3>
    <drag1></drag1>

    <div style="height: 20px;background: skyblue"></div>
    <drag2></drag2>
  </div>
</template>

<script>
import drag1 from "./drag1.vue";
import drag2 from "./drag2.vue";
export default {
  components: {
    drag1,
    drag2
  }
};
</script>


