var selectStartTime = {
    elem: '#sOnline',
    format: 'YYYY-MM-DD hh:mm',
    min: '1970-01-01', //设定最小日期
    max: '2030-12-31', //最大日期
    istime: true, //是否开启时间选择
    istoday: false,
};
laydate(selectStartTime);

$('#add_course_btn').on('click', function(){
    $('#modal_search div table').empty();
    $('#courseModal').modal();
});

// 搜索课程
$('#search_btn').on('click', function(){
    var iBusinessID = $('#iBusinessID').val();
    if (iBusinessID == 0) {
        toastr.warning('请选择业务线');return false;
    }
    var sName = $('#modal_sName').val();
    if (sName.length == 0) {
        toastr.warning('请填写搜索内容');
        return false;
    }
    $.post('/admin/coursecolumn/search', {sName:sName, iBusinessID:iBusinessID}, function(ret){

        $('#modal_search table').empty();

        if (ret.status == false) {
            toastr.warning(ret.data);
            return false
        } else {
            var sHtml = '';
            for (var i=0; i<ret.data.length; i++) {
                var sName = ret.data[i].sName;
                var iOnlineTime = ret.data[i].iOnlineTime;
                var sBannerSrc = ret.data[i].sBannerSrc;
                var iCourseID = ret.data[i].iCourseID;
                var sType = ret.data[i].sType;
                sHtml += '<tr>';
                sHtml += '<td><input class="modal_checkbox" type="checkbox" data-id="'+iCourseID+
                    '" data-src="'+sBannerSrc+'" data-sname="'+sName+'" data-online="'+iOnlineTime+
                    '" data-stype="'+sType+'" /></td>';
                sHtml += '<td><img src="'+getDFSViewURL(sBannerSrc)+'?w=70&h=35" class="ml2"/></td>';
                sHtml += '<td>'+sName+'</td>';
                sHtml += '<td>'+sType+'</td>';
                sHtml += '<td>'+iOnlineTime+'</td>';
                sHtml += '</tr>';
            }
            $('#modal_search table').append(sHtml);
        }
    }, 'json');
});

// 选择课程
$('#add_save_btn').on('click', function(){
    var sel_box = $('.modal_checkbox:checked');
    if (sel_box.length == 0) {
        toastr.warning('请选择课程');
        return false;
    }

    var existed_cnt = $('#course_tbl tr').length;

    var sHtml = '';
    var index= existed_cnt;
    for (var i=0; i<sel_box.length; i++) {
        var sName = $(sel_box[i]).data('sname');
        var iOnlineTime = $(sel_box[i]).data('online');
        var sBannerSrc = $(sel_box[i]).data('src');
        var iCourseID = $(sel_box[i]).data('id');
        var sType = $(sel_box[i]).data('stype');

        sHtml += '<tr><input type="hidden" class="chosen_iCourseID" value="'+iCourseID+'" data-isort="'+index+'" />';
        sHtml += '<td class="col-sm-1 control-label"><img src="'+getDFSViewURL(sBannerSrc)+'?w=150&h=75" /></td>';
        sHtml += '<td class="col-sm-2">'+sName+'</td>';
        sHtml += '<td class="col-sm-1">'+sType+'</td>';
        sHtml += '<td class="col-sm-1">'+iOnlineTime+'</td>';
        sHtml += '<td class="col-sm-1">'+
            '<a href="javascript:;" class="course-up">上移</a>'+
            '<a href="javascript:;" class="course-down">下移</a>'+
            '<a href="javascript:;" class="course-del">移除</a>'+
            '</td>';
        sHtml += '</tr>';

        index++;
    }
    $('#course_tbl').append(sHtml);
    $('#courseModal').modal('hide');
});

// 移除
$('body').on('click', '.course-del', function(){
    $(this).closest('tr').remove();
});

//上移
$('body').on('click', '.course-up', function(){
    var prevCnt = $(this).closest('tr').prevAll('tr').length;
    if (prevCnt == 0) return true;


    var selfTr = $(this).closest('tr');
    var prevTr = $(selfTr).prev('tr');

    var tmp = $(prevTr).html();
    $(prevTr).html($(selfTr).html());
    $(selfTr).html(tmp);

    resetSort()
});

//下移
$('body').on('click', '.course-down', function(){
    var nextCnt = $(this).closest('tr').nextAll('tr').length;
    if (nextCnt == 0) return true;


    var selfTr = $(this).closest('tr');
    var nextTr = $(selfTr).next('tr');

    var tmp = $(nextTr).html();
    $(nextTr).html($(selfTr).html());
    $(selfTr).html(tmp);

    resetSort()
});

function resetSort()
{
    var cnt = $('#course_tbl tr').length;
    for (var i=0; i < cnt; i++) {
        $('#course_tbl tr').eq(i).find('.chosen_iCourseID').data('isort', i);
    }
}

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
        '<input type="hidden" class="iColumnCateID" value="'+iCateID+'" />'+
        sText+'<i class="fa fa-times"></i><br /></a>';
    $('#cate_div').append(sHtml);
});

// 获取系列课分类
function getCateID()
{
    var cateLen = $('.iColumnCateID').length;
    if (cateLen == 0) return '';

    var aCate = new Array();
    for (var i=0; i < cateLen; i++) {
        aCate.push($('.iColumnCateID').eq(i).val());
    }
    return aCate.join(',');
}

// 分类删除按钮
$('body').on('click', '.dele_teacher, .dele_cate', function(){
    $(this).remove();
});


// 上传图片初始化
function showImg(val, ele)
{
    $('#sBannerSrc').val(val);
    $('#sBanner').attr('src', getDFSViewURL(val));
}

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