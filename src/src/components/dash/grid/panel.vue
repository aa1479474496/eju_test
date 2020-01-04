<template>
    <dashGrid 
      :layout="itemData.data.layout"
      :mode="mode"
      :type="itemData.type"
      >
    </dashGrid>
</template>

<script>
export default {
  props: {
    mode: String,
    itemData: Object
  }
};
</script>