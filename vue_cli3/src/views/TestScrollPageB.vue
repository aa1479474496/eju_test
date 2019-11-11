<template>
    <div class="content_b">
    <div class="scroll">scroll</div>
    </div>
</template>


<script>
export default {
    mounted() {
        this.$nextTick(() => {
            // console.log('aaa');
            // $('.content_b').niceScroll();
        })
    }
}
</script>

<style lang="scss" style="scoped">
   .content_b {
       border: 1px solid black;
       max-height: 300px;
       overflow-y: auto;

       .scroll {
           height: 500px;
           background: gold;
       }
   }
</style>