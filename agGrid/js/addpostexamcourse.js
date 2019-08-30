    //保存
    $("#submit_btn").on('click',function(){
        var iBusinessID = $("#iBusinessID").val();
        var iPostExamID = $("#iPostExamID").val();//编辑
        var iCourseEdit = $("#iCourseEdit").val();//编辑 或新增
        var iCourseType = $("input[name='iCourseType']:checked").val();//课程 1：单课程 2：系列课程
        var iLearnType = $("input[name='learnType']:checked").val();//学习模式 1：随机模式 2：进阶模式

        //课程
        var data_one = [];
        var trElement = $("#course_content_all").find(".course_content_input");
        $.each(trElement, function(i,k){
            var data = {};
            var iCourseId = $(k).attr("data-courseid");
            var iCourseQuizID = $(k).attr("data-iCourseQuizID");
            var iSort = $(k).attr("data-isort");
            var iExamType = $(k).attr("data-type");//1:开启 2：关闭
            iCourseQuizID = (typeof(iCourseQuizID)=='undefined') ? '0': iCourseQuizID;

            data.iCourseId = iCourseId;
            data.iCourseQuizID = iCourseQuizID;
            data.iExamType = iExamType;
            data.iLearnType = iLearnType;
            data.iCourseType = iCourseType;
            data.iBusinessID = iBusinessID;
            data.iPostExamID = iPostExamID;
            data.iSort = iSort;

            array_push(data_one,data);
        });

        if(iCourseType.length==0) {toastr.warning('请选择课程类型');return false;}
        if(iLearnType.length==0) {toastr.warning('请选择学习模式');return false;}
        if(data_one.length==0){toastr.warning('请选择课程！');return false;}

        var aData= {
            iBusinessID:iBusinessID,
            iPostExamID:iPostExamID,
            iCourseType:iCourseType,
            iLearnType:iLearnType,
            iCourseEdit:iCourseEdit,
            data_one:data_one
        };
        console.log(aData);
        $.post('/admin/postexam/saveCourse', aData, function (ret) {
            if (ret.status) {
                var sGoUrl = 'window.location.href="'+'/admin/postexam/addExam/iPostExamID/'+ret.data+'/iBusinessID/'+iBusinessID+'"';
                setTimeout(sGoUrl, 1000);
            } else {
                toastr.warning(ret.data);
                return false;
            }
        }, 'json');
    });

    //选择课程模态框
    $('.add_course_button').on('click', function(){
        $('#modal_search div table').empty();
        var iBusinessID = $('#iBusinessID').val();
        var iCourseType = $('input[name="iCourseType"]:checked').val();//1:单课 2：系列课
        $('#modelCourseType').val(iCourseType);
        $('#courseLearnModal').modal();
    });

    // 搜索课程
    $('.course_search_btn_must').on('click', function(){
        var iBusinessID = $('#iBusinessID').val();
        var iPostExamID = $('#iPostExamID').val();
        var course_sName = $('#course_sName').val();
        var iCourseType = $('input[name="iCourseType"]:checked').val();//1:单课 2：系列课
        var sSelectString = '';
        if (iBusinessID == 0) {
            toastr.warning('操作失败');return false;
        }
        if (!iCourseType.length) {
            toastr.warning('请选择单课或者系列课');return false;
        }

        //过滤已有的课程
        var trElement = $("#course_content_all").find(".course_content_input");
        $.each(trElement, function(i, k){
            var iCourseId = $(k).attr("data-courseid");
            if(iCourseId.length){
                sSelectString += iCourseId+',';
            }
        });
        var sFinalString = '';
        sFinalString = sFinalString.slice(0,-1);
        var data = {
            sName:course_sName,
            iBusinessID:iBusinessID,
            iCourseType:iCourseType,
            iPostExamID:iPostExamID,
            sFinalString:sFinalString
        };

        $.post('/admin/postexam/searchCourse', data, function(ret){

            $('#modal_search table').empty();
            if (ret.status == false) {
                toastr.warning(ret.data);
                return false
            } else {
                var sHead = '';

                sHead += '<tr>';
                sHead += '<td></td>';
                sHead += '<td>课程名</td>';
                if(iCourseType==1){
                    sHead += '<td>类型</td>';
                }
                sHead += '<td style="padding-left: 10px;">测验名</td>';
                sHead += '<td>关联岗位</td>';
                sHead += '</tr>';

                var sHtml = '';
                for (var i=0; i<ret.data.length; i++) {
                    console.log(ret.data[i]);
                    //课程id
                    var iAutoID = ret.data[i].iCourseID;

                    var sName = ret.data[i].sName;
                    var iCreateTime = ret.data[i].iOnlineTime;
                    var sCateName = ret.data[i].sCateName;
                    sCateName = sCateName ? sCateName : '';
                    var iTotal = ret.data[i].iTotal;
                    var iType = ret.data[i].iType;
                    var iCourseQuizID = ret.data[i].iCourseQuizID;
                    iCourseQuizID = (typeof(iCourseQuizID)=='undefined')? '0': iCourseQuizID;
                    var iPrice = ret.data[i].iPrice;
                    var sCourseQuizName = (ret.data[i].sCourseQuizName.length) ? ret.data[i].sCourseQuizName : '暂无试题';
                    var sExamJob = (ret.data[i].sExamJob.length) ? ret.data[i].sExamJob : '暂无试题岗位';

                    var iOnType = (ret.data[i].sCourseQuizName.length) ? 1 : 2;

                    var sType = iType==1? '视频':(iType==2? '音频':(iType==3? 'PPT/PDF':(iType==4? '图文':'')));

                    sHtml += '<tr>';
                    sHtml += '<td><input class="modal_checkbox" data-iType="'+iType+'" data-iCourseQuizID="'+iCourseQuizID+'" data-type="'+iOnType+'" data-sExamJob="'+sExamJob+'" data-sCourseQuizName="'+sCourseQuizName+'"  data-iprice="'+iPrice+'" data-itotal="'+iTotal+'" type="checkbox" data-id="'+iAutoID+ '"  data-time="'+iCreateTime+ '"  data-sname="'+sName+'" /></td>';
                    sHtml += '<td>'+sName+'</td>';
                    if(iCourseType==1){
                        sHtml += '<td >'+sType+'</td>';
                    }
                    sHtml += '<td style="padding-left: 10px;">'+sCourseQuizName+'</td>';
                    sHtml += '<td>'+sExamJob+'</td>';
                    sHtml += '</tr>';
                }
                $('#modal_search table').append(sHead);
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
        //courseType 1:单课 2：系列课
        var iCourseType = $('input[name="iCourseType"]:checked').val();//1:单课 2：系列课

        //单课程
        var existed_cnt = $('#course_content_all .course_content_list tr').length;
        var table_head  = '<thead class="mythead"><tr>';
        table_head += '<th width="15%">课程名称</th>';
        table_head += '<th width="6%" >价格</th>';
        table_head += '<th width="5%">类型</th>';
        table_head += '<th width="20%">课程测验</th>';
        table_head += '<th width="5%">测验关联岗位</th>';
        table_head += '<th width="5%">测验状态</th>';
        table_head += '<th >操作</th>';
        table_head += '</tr>';
        table_head += '</thead>';

        var sHtml = '';
        for (var i=0; i<sel_box.length; i++) {
            var sName = $(sel_box[i]).data('sname');
            var id = $(sel_box[i]).data('id');
            var time = $(sel_box[i]).data('time');
            var itype = $(sel_box[i]).data('itype');
            var iprice = $(sel_box[i]).data('iprice');
            var iCourseQuizID = $(sel_box[i]).data('icoursequizid');
            var sExamJob = $(sel_box[i]).data('sexamjob');
            var sCourseQuizName = $(sel_box[i]).data('scoursequizname');
            sExamJob = (typeof(sExamJob)=="undefined") ? '': sExamJob;
            iCourseQuizID = (typeof(iCourseQuizID)=="undefined") ? '0': iCourseQuizID;
            sCourseQuizName = (typeof(sCourseQuizName)=="undefined") ? '': sCourseQuizName;
            var iExamType = $(sel_box[i]).data('type');

            var sExamType = (iExamType==1) ? '开启':'关闭';

            var typeName = '';
            switch(itype){
                case 0:
                    typeName = '系列课';
                    break;
                case 1:
                    typeName = '视频';
                    break;
                case 2:
                    typeName = '音频';
                    break;
                case 3:
                    typeName = 'PPT/PDF';
                    break;
                case 4:
                    typeName = '图文';
                    break;
            }
            console.log(typeName);

            //过滤已有的课程
            var iHave = false;
            //已经存在课程不计入课程
            var trElement = $("#course_content_all").find(".course_content_input");
            $.each(trElement, function(i, k){
                var iCourseId = $(k).attr("data-courseid");
                if(iCourseId == id){
                    iHave = true;
                    return false;
                }
            });

            if(!iHave){
                sHtml += '<tr><input type="hidden" class="course_content_input input_value"  data-credit="0" data-type="'+iExamType+'" data-iCourseQuizID="'+iCourseQuizID+'" data-courseid="'+id+'"  data-iprice="'+iprice+'" data-sName="'+sName+'" data-time="'+time+'" />'+
                '<td class="col-sm-1">'+sName+'</td>'+
                '<td class="col-sm-1">'+iprice+'</td>'+
                '<td class="col-sm-1 single_credit">'+typeName+'</td>'+
                '<td class="col-sm-1 single_courseTime">'+sCourseQuizName+'</td>'+
                '<td class="col-sm-1">'+sExamJob+'</td>'+
                '<td class="col-sm-1 cou_on_off">'+sExamType+'</td>'+
                '<td class="col-sm-1">';

                sHtml += '<a href="javascript:void(0)" class="btn btn-primary course-up"  data-id="">上移</a>&nbsp;';
                sHtml += '<a href="javascript:void(0)" class="btn btn-primary course-down" data-id="">下移</a> &nbsp;';

                if(iExamType==1){
                    sHtml += '<a href="javascript:;" class="btn btn-primary course-button" data-type="2">关闭</a>&nbsp;';
                }else{
                    sHtml += '<a href="javascript:;" class="btn btn-primary course-button" data-type="1">开启</a>&nbsp;';
                }
                sHtml += '<a href="javascript:;" class="btn btn-primary course-del">移除</a>'+
                '</td>'+
                '</tr>';
            }
        }
        //查看是否有数据 决定头
        if ($('#course_content_all .mythead').length == 0) {
            $('#course_content_all').append(table_head);//没数据 先上头
            sHtml = '<tbody class="course_content_list">'+sHtml+'</tbody>';//上数据
        }
        $('#course_content_all').append(sHtml);

        $('#courseLearnModal').modal('hide');

        resetSort();

        return false;
    });

    //移出方法
    $("#course_content_all").on('click', '.course-del', function(){
        var _this = this;
        var index = $(_this).parents("tr").index();
        var table = $(_this).parents().find('table');
        var obj = $(_this).parents("tbody").find("tr").length;
        if(obj==1){
            if(index==0){
                table.html('');
            }
        }
        $(_this).closest('tr').remove();
    });

    //开启关闭设置
    $("#course_content_all").on('click', '.course-button', function(){
        var _this = this;
        var obj = $(_this).parents("tr");
        var trInput = obj.find(".course_content_input");
        var iCourseQuizID = trInput.attr("data-icoursequizid");
        console.log(iCourseQuizID);
        iCourseQuizID = (typeof(iCourseQuizID) == "undefined") ? '' : iCourseQuizID;
        var type = $(_this).attr("data-type");
        var tex = (type == 1) ? '开启' : '关闭';
        var buttonTex = (type == 1) ? '关闭' : '开启';
        var changeTy = (type == 1) ? 2 : 1;

        if(type == 2){
            //关闭课程
            obj.find(".cou_on_off").text(tex);
            obj.find(".course_content_input").attr("data-type",type);
            $(_this).attr("data-type",changeTy);
            $(_this).text(buttonTex);
        }else{
            //开启课程的前提是有课程测验
            if(iCourseQuizID.length){
                obj.find(".cou_on_off").text(tex);
                obj.find(".course_content_input").attr("data-type",type);
                $(_this).attr("data-type",changeTy);
                $(_this).text(buttonTex);
            }else{
                toastr.warning('该课程没有设置考试不能开启');
                return false;
            }
        }
    });

    //单课，系列课切换
    $(".single_serize").on('click','.iCourseType',function(){
        $("#course_content_all").html('');
    });

    //上移
    $('body').on('click', '.course-up', function(){
        var prevCnt = $(this).closest('tr').prevAll('tr').length;
        if (prevCnt == 0) return true;

        var selfTr = $(this).closest('tr');
        console.log(selfTr);
        var prevTr = $(selfTr).prev('tr');
        console.log(prevTr);
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

    //重新排序
    function resetSort()
    {
        var obj = $(".course_content_list tr");
        var cnt = $(".course_content_list tr").length;
        console.log('in');
        console.log(cnt);
        for (var i=0; i < cnt; i++) {
            if(cnt-i>0){
                obj.eq(i).find('.course_content_input').attr('data-isort', cnt-i);
                console.log("hah");
            }
        }
    }