


import Vue from 'vue';
import { setTranslate } from '@/utils/index.js';

// 注册一个全局自定义指令 v-focus
Vue.directive('move', {
    // 当绑定元素插入到 DOM 中。
    bind: function (el, binding, vnode) {
        let _vue = vnode.context;

        let isFold = _vue.isFold;

        setTranslate(el, isFold);

        $(window).resize(function () {
            setTranslate(el);
        });
    },

    update: function (el, binding, vnode) {
        let _vue = vnode.context;
        let isFold = _vue.isFold;
        setTranslate(el, isFold);
    },
});


Vue.directive('only', {
    // 当绑定元素插入到 DOM 中。

    update: function (el, binding, vnode) {
        let { color } = binding.value;
        if (color) {
            $(el).css({
                color
            })
        }

    },
})