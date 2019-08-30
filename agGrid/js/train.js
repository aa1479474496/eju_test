var iStartTime = {
    elem: '#iStartTime',
    format: 'YYYY-MM-DD hh:mm',
    min: '1970-01-01', //设定最小日期
    max: '2030-12-31', //最大日期
    istoday: false,
    istime: true
};
var iEndTime = {
    elem: '#iEndTime',
    format: 'YYYY-MM-DD hh:mm',
    min: '1970-01-01', //设定最小日期
    max: '2030-12-31', //最大日期
    istoday: false,
    istime: true
};
laydate(iStartTime);
laydate(iEndTime);

// 业务线选择后分类联动
$('#iBusinessID').on('change', function(){
    var iBusinessID = $(this).val();
    if (iBusinessID == 0) return false;

    $.post('/admin/coursecate/getCatByBusinessID', {iBusinessID:iBusinessID}, function(ret){
        if($('.dele_cate').length > 0) {
            $('.dele_cate').remove();
        }

        var aData = ret.data;
        var sHtml = '<option value="0">请选择</option>';
        for(var i=0; i<aData.length; i++) {
            sHtml += '<option value="'+aData[i].iAutoID+'">'+aData[i].sName+'</option>';
        }
        $('.select_cateid').eq(0).empty().append(sHtml);
        if ($('.select-box').length > 2) {
            $('.select-box:gt(1)').remove();
        }
    }, 'json');
});

// 内部可见性
$('input[name="iOpen"]').on('click', function(){
    $('.kejian_div').hide();
    if ($(this).val() == 0) {
        $('.kejian_div').hide();
        $('#div_front_business').show();
    }
});
// 房友可见性
$('input[name="front_business"]').on('click', function(){
    if ($(this).val() == 3){
        if ($(this).is(':checked')) {
            $('#div_fangyou').show();
        } else {
            $('#div_fangyou').hide();
        }
    }
});
// 上传图片回调
function showImg(val, ele)
{
    $('#sBannerSrc').val(val);
    $('#sBanner').attr('src', getDFSViewURL(val));
}

// 上传证书图片回调
function showCertificateImg(val, ele)
{
    $('#sCertificate').val(val);
    $('#certificate').attr('src', getDFSViewURL(val));
}

// 内部全选
$('input[name="front_business[]"]').on('click', function(){
    // 全选按钮
    if ($(this).hasClass('front_business-all')){
        if(!$(this).is(':checked')){
            $('input[name="front_business"]').each(function () {
                $(this).removeAttr("checked");
                // 房友
                $('#div_fangyou').hide();
                $('input[name="fangyou_business"]').each(function () {
                    $(this).removeAttr("checked");
                });
            });
        }else {
            $('input[name="front_business"]').each(function () {
                $(this).prop("checked","true");
                // 房友
                $('#div_fangyou').show();
            });
        }
        // 其他
    }else{
        var flag = true;
        $('input[name="front_business"]').each(function () {
            if(!$(this).hasClass('front_business-all') ){
                if(!$(this).is(':checked')){
                    flag = false;
                }
            }
            if ($(this).val() == 3){
                if ($(this).is(':checked')) {
                    $('#div_fangyou').show();
                } else {
                    $('#div_fangyou').hide();
                }
            }
        });
        if(flag){
            $('.front_business-all').prop("checked","true");
        }else{
            $('.front_business-all').removeAttr("checked");
        }
    }
});
// 房友全选
$('input[name="fangyou_business[]"]').on('click', function(){
    if ($(this).hasClass('fangyou_business-all')){
        if(!$(this).is(':checked')){
            $('input[name="fangyou_business"]').each(function () {
                $(this).removeAttr("checked");
            });
        }else {
            $('input[name="fangyou_business"]').each(function () {
                $(this).prop("checked","true");
            });
        }
    }else{

        var flag = true;
        $('input[name="fangyou_business"]').each(function () {
            if(!$(this).hasClass('fangyou_business-all') ){
                if(!$(this).is(':checked')){
                    flag = false;
                }
            }
        });
        if(flag){
            $('.fangyou_business-all').prop("checked","true");
        }else{
            $('.fangyou_business-all').removeAttr("checked");
        }
    }
});
