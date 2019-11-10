<template>
    <div>
    scroll_b
    </div>
</template>

<style lang="scss" style="scoped">
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