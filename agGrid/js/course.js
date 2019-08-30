var selectOnlinetTime = {
    elem: '#sOnline',
    format: 'YYYY-MM-DD hh:mm',
    min: '1970-01-01', //设定最小日期
    max: '2030-12-31', //最大日期
    istoday: false,
    istime: true
};
laydate(selectOnlinetTime);

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

//子分类联动
$('#sel_cate_div').on('change', '.select_cateid',function(){
    var _this=$(this)
    var sTarget = $(this).data('target');
    var iCateID = $(this).val();

    if (iCateID == 0) {
        return false;
    }

    _this.parent('.select-box').nextAll('.select-box').remove();

    $.post('/admin/coursecate/getSub', {iCateID:iCateID}, function(ret){
        if (ret.status) {
            var aData = ret.data;
            var sHtml = '<div class="col-sm-2 select-box">'+
                '<select class="select_cateid form-control">'+
                '<option value="0">请选择</option>';

            for(var i=0; i<aData.length; i++) {
                sHtml += '<option value="'+aData[i].iAutoID+'">'+aData[i].sName+'</option>';
            }
            sHtml += '</select></div>';
            _this.parent('.select-box').after(sHtml);
        }
    }, 'json');
});

// 添加分类按钮
$('#add_cate_btn').on('click', function(){
    var sBusniess = $('#iBusinessID').find('option:selected').text();
    var iCateID = $('.select_cateid:last').val();
    if (iCateID == 0) {
        toastr.warning('请选择分类'); return false;
    }

    var sText = sBusniess;
    for (var i =0; i < $('.select_cateid').length; i++) {
        sText += ' '+ $('.select_cateid').eq(i).find('option:selected').text();
    }
    var sHtml = '<a class="btn btn-white btn-bitbucket dele_cate">'+
        '<input type="hidden" class="iCourseCateID" value="'+iCateID+'" />'+
        sText+'<i class="fa fa-times"></i><br /></a>';
    $('#cate_div').append(sHtml);
});



// 讲师 模糊匹配
$('#sTeacherName').keyup(function () {
    var object = $(this);
    var sName  = object.val();
    var iBusinessID = $('#iBusinessID').val();
    if (iBusinessID == 0) {
        toastr.warning('请先选择业务线'); return false;
    }

    if(sName.length >= 1){
        $.post("/admin/course/teacherSearch", {sKey:sName, iBusinessID:iBusinessID},
            function (ret) {
                var datas = ret.data;
                for (var i in datas){
                    ret.data[i].label   = ret.data[i].sName;
                    ret.data[i].value   = ret.data[i].sName;
                    ret.data[i].iAutoID = ret.data[i].iAutoID;
                };
                $('#sTeacherName')  .autocomplete({
                        source:datas,
                        minLength: 1,
                        width:6,
                        max:3,
                        delay: 500,
                        select: function(event, ui){
                            console.log(ui);
                            var sHtml = '<a class="btn btn-white btn-bitbucket dele_teacher" data-id="'+ui.item.iAutoID+'" >'+
                                '<input type="hidden" class="iTeacherID iTeacherID'+ui.item.iAutoID+'" value="'+ui.item.iAutoID+'" />'+
                                ui.item.sName+'<i class="fa fa-times"></i></a>';
                            $('#teacher_div').append(sHtml);
                            event.preventDefault();
                        }
                    }
                )
            },
            'json'
        );
    }
});

// 讲师、分类删除按钮
$('body').on('click', '.dele_teacher, .dele_cate', function(){
    $(this).remove();
});

// 讲师、分类删除按钮
$('body').on('click', '.dele_courseware', function(){
    $(this).remove();
    $('#kejian_cnt').text($('input[name="courseware[]"]').length);
    if ($('input[name="courseware[]"]').length == 0) {
        $('#kejian_show_div').closest('.form-group').hide();
    }
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

function getTeacher()
{
    var teacherLen = $('.dele_teacher').length;
    if (teacherLen == 0) return '';

    var aTeacher = new Array();
    for (var i=0; i < teacherLen; i++) {
        aTeacher.push($('.dele_teacher').eq(i).data('id'));
    }
    return aTeacher.join(',');
}

function getCateID()
{
    var cateLen = $('.iCourseCateID').length;
    if (cateLen == 0) return '';

    var aCate = new Array();
    for (var i=0; i < cateLen; i++) {
        aCate.push($('.iCourseCateID').eq(i).val());
    }
    return aCate.join(',');
}



// 上传图片回调
function showImg(val, ele)
{
    $('#sBannerSrc').val(val);
    $('#sBanner').attr('src', getDFSViewURL(val));
}

function getUrl(val, ele)
{
    $('#sUrl').val(val);
}

function getFrontBusiness()
{
    var len = $('input[name="front_business"]:checked').length;
    if (len == 0) return '';

    var aFront = new Array();
    for (var i=0; i<len; i++) {
        aFront.push($('input[name="front_business"]:checked').eq(i).val());
    }
    var sFront = aFront.join(',');
    return sFront;
}

function getFangyouVisible()
{
    var len = $('input[name="fangyou_business"]:checked').length;
    if (len == 0) return '';

    var aFangyou = new Array();
    for (var i=0; i<len; i++) {
        aFangyou.push($('input[name="fangyou_business"]:checked').eq(i).val());
    }
    var sFangyou = aFangyou.join(',');
    return sFangyou;
}

// 课件上传回调
function showKejian(val, originName, ele)
{
    var showHtml = '<a class="btn btn-white btn-bitbucket dele_courseware">'+originName+
                   '<input type="hidden" name="courseware[]" value="'+val+'" data-origin="'+originName+'"/>'+
                   '<i class="fa fa-times"></i></a><br>';
    $('#kejian_show_div').append(showHtml);

    $('#kejian_cnt').text($('input[name="courseware[]"]').length);
    $('#kejian_show_div').closest('.form-group').show();

}

function getKejian()
{
    var len = $('input[name="courseware[]"]').length;
    if (len == 0) return '';

    var aKejian = new Array();
    for (var i=0; i<len; i++) {
        var sFile = $('input[name="courseware[]"]').eq(i).val();
        var sOrigin = $('input[name="courseware[]"]').eq(i).data('origin');
        aKejian.push(sFile+'-'+sOrigin);
    }
    var sKejian = aKejian.join(',');
    return sKejian;
}

// 上传大文件回调
function getUploadKey(file,response,ele) {
    console.log('getUploadKey--start');
    console.log(file);
    console.log(response);
    console.log('getUploadKey--stop');

    $('#sUrl').val(response.file.sFile);
    $('#sFileName').val(response.file.sName);
    if ($('#sFileTime').length) {
        // $('#sFileTime').val(response.file.sTime);
        $('#sFileTime').val(0);
    }

    // 删除上传对象
    var $li = $( '#'+file.id );
    $li.on('click', '#'+file.id, function() {
        $("#"+file.id).remove();
        $('#sUrl').val('');
        $('#sFileName').val('');
    })
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

// 获取课程价格
function getCoursePrice()
{
    var iRadioValue = $('input[name="iCoursePrice"]:checked').val();
    if (iRadioValue == '=0') {
        // 免费
        return 0;
    } else {
        // 收费
        var iPrice = $.trim($('input[name="iPrice"]').val());
        if (iPrice == '') {
           return 'error';
        }
        return iPrice;
    }

}
// 切换免费收费时显示学习币input
$('input[name="iCoursePrice"]').on('click', function(){
    var iRadioVal = $(this).val();
    if (iRadioVal == '=0') {
        $(this).siblings('span').hide();
    } else {
        $(this).siblings('span').show();
    }
});
