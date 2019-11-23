


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
});
var colors = ['red', 'blue', 'green', 'gold', 'pink','skyblue'];

Vue.directive('toggleHeight', {
    // 当绑定元素插入到 DOM 中。

    bind: function (el, binding, vnode) {
        //    console.log('el', el);
        setTimeout(() => {

            toggleInit(el);
            $(el).on('click', function() {
                let index = Math.round(Math.random() * 4);
                console.log('index', index);
                $(this).css({
                    color: colors[index]
                })
            })
        }, 0);
    },

    update: function(el, binding, vnode) {
        console.log('directi update');
        let { value, oldValue } = binding;
        console.log('val', value, oldValue);


    }
});


function toggleInit(el) {
    let child = $(el).find('.toggle_label_wrapper');
    let more_btn = $(el).siblings('.see_more');
    let _height = $(el).innerHeight();
    let _childHeight = child.innerHeight();

    if (_childHeight > 1.5 * _height) {
        more_btn.addClass('show_more');

        // console.log('test',more_btn);
        // more_btn.addClass('is_fold');
    }

    more_btn.on('click', function () {
        if (!$(this).hasClass('show_more')) {
            return;
        }
        if (!$(this).hasClass('is_fold')) {
            $(this).addClass('is_fold');
            $(el).css({
                height: _childHeight + 'px'
            })
        }
        else {
            $(this).removeClass('is_fold');

            $(el).css({
                height: '30px'
            })
        }
    })

    console.log('h', _height, _childHeight, child);
}