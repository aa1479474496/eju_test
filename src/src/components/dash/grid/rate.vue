<template>
<div class="rate">
    <el-rate
        v-model="itemData.data.score"
        disabled
        show-score
        :text-color="itemData.data.fontcolor"
        :disabled-void-color="itemData.data.unselectcolor"
        :colors="[itemData.data.selectcolor,itemData.data.selectcolor,itemData.data.selectcolor]"
        score-template="{value}">
    </el-rate>
</div>
</template>
<script>    
export default {
  props: {
    mode: String,
    itemData: Object
  }
};
</script>

<style lang="scss" scoped>
    .rate {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>
