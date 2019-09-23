<template>
    <div>
        <p v-for="(item, index) in list" :key="index">{{item}}</p>
    </div>
</template>

<script>
export default {
    props: {
        list: Array
    },

    data() {
        return {}
    },

    updated() {
        console.log('updated');
    },


}
</script>