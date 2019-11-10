<template>
    <div>
        <div class="header basic_header">
            <div>header_1</div>
            <div>header_2</div>
            <div>header_3</div>
        </div>
        <div class="place_fixed"></div>
        <div class="content">
            <div class="header">
                <div @click="changeRouter('/scroll/a')">pageA</div>
                <div @click="changeRouter('/scroll/b')">pageB</div>
            </div>
        <router-view></router-view>

        </div>
    </div>
</template>

<script>
export default {
    methods: {
        changeRouter(path) {
            this.$router.push(path);
        }
    }
}
</script>

<style lang="scss" style="scoped">
.basic_header {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9999;
}

.place_fixed {
    height: 60px;
}
    .header {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 60px;
        background: skyblue;
        font-size: 18px;

        &>div {
            line-height: 60px;
            width: 100px;
            cursor: pointer;
        }
    }

    .content {
        width: 800px;
        min-height: 600px;
        margin-left: auto;
        margin-right: auto;
        padding-top: 10px;

        .header {
            justify-content: flex-start;
        }
    }
</style>