(function ($, undefined) {

    $.fn.toggleHeight = function(child) {
        var _this = $(this);
        var _child = $(this).find(child);
        var toggleOverflowBtn = $(this).find('.toggle_overflow_btn');
        var originHeight = _this.innerHeight();
        checkHeight();

        function checkHeight() {
            var _height = _this.innerHeight();
            var _childHeight = _child.innerHeight();
            if (_childHeight > 1.2 * originHeight) {
                toggleOverflowBtn.show();
            }
            else {
                toggleOverflowBtn.hide();
            }
        }

        window.addEventListener("resize", () => {
            checkHeight();
        });

        
        toggleOverflowBtn.on('click', function() {
            if (!toggleOverflowBtn.hasClass('is_fold')) {
                toggleOverflowBtn.find('span').text('收起');
                toggleOverflowBtn.addClass('is_fold');
                _this.css({
                    'height': 'auto'
                });
            }
            else {
                toggleOverflowBtn.removeClass('is_fold');
                toggleOverflowBtn.find('span').text('展开');
                _this.css({
                    'height': originHeight
                });
            }         
        });
    }

    $.fn.seemore = function(options = {}) {
        var { fontSize = 12, clamp = 2 } = options;
        var _this = $(this);
        var _width = _this.parent().width();
        var _text = _this.attr('data-text');
        var sliceCount = parseInt(_width / fontSize * clamp);
        console.log('sliceCount', sliceCount);
        var text = _text.slice(0, sliceCount) + '...';
        _this.text(text);

    }

})(jQuery);


