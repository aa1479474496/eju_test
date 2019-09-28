
let isFold = false;

function setTranslate(el, status) {
    if (typeof status != 'undefined') {
        isFold = status;
    }
    let _width = window.innerWidth;
    let _elWidth = 1080;
    let _sideWidth = 310;
    let _abbr = `translateX(0)`;
    if (_width <= (_elWidth + _sideWidth)) {
        if (isFold) {
            let offset = Math.floor((_width - _elWidth) / 2);
            _abbr = `translateX(-${offset}px)`;
        }
        $(el).css({
            'transform': _abbr
        })
        return;
    }

    if (isFold) {
        let offset = Math.floor(_sideWidth / 2);
        _abbr = `translateX(-${offset}px)`;

    }
    $(el).css({
        'transform': _abbr
    })
}

export { setTranslate };