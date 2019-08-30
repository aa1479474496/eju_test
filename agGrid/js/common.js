function showDebugInfo(aDebug) {
    if(navigator.appName!="Microsoft Internet Explorer"){
	if (console && console.debug && aDebug) {
		console.groupCollapsed(aDebug.shift());
		while(aDebug.length) {
			try {
        var msg = aDebug.shift();
        if (Array.isArray(msg)) {
          console[msg[0]](msg[1]);
        } else {
          console.log(msg);
        }
			} catch (e) {
				console.log(msg);
				console.log(e);
			}
		}
		console.groupEnd();
	}
    }
}

$(function(){
	$.ajaxSetup({dataType: 'json', dataFilter:function(ret, type){
		if (type == 'json') {
			ajax_ret = eval('(' + ret + ')');
			if (ajax_ret && ajax_ret.debug) {
				showDebugInfo(ajax_ret.debug);
				delete ajax_ret.debug;
				if (! ajax_ret.status && ajax_ret.url) {
					alert(ajax_ret.data);
					window.location.href = ajax_ret.url;
				}
				ret = json_encode(ajax_ret);

			}
		}
		return ret;
	}});

	//切换城市
	$('.city-menu a').click(function(){
		$.get(this.href, function(ret){
			if (ret.status == 0) {
				alert(ret.data);
			} else {
				location.reload();
			}
		});
		return false;
	});

	//日期选择
	if ($('.datepicker').datepicker) {
		$('.datepicker').datepicker({dateFormat:'yy-mm-dd'});
	}
	$('.laydatetime').click(function(){
		if (typeof laydate != 'function') {
			alert('请先引入laydate.js!');
			return false;
		}
		var format = 'YYYY-MM-DD hh:mm:ss';
		if ($(this).attr('format')) {
			format = $(this).attr('format');
		}
		laydate.skin('molv');
		laydate({istime: true, format: format});

	});

	$('.listbtn').click(function(){
		var url = this.href;
		if (confirm(this.title)) {
			$.get(url, function(ret){
				alert(ret.data);
				if (ret.status) {
					location.reload();
				}
			}, 'json');
		}
		
		return false;
  });
  $('.hrefbtn').click(function(){
    window.location.href = $(this).attr('href');
  });
  
  if ($('.validateform').validate) {
    $('.validateform').each(function(){
      $(this).validate({submitHandler: function(form) {
        var okurl = $(form).data('okurl') || '';
        $.post(form.action, $(form).serialize(), function(ret){
            alert(ret.data);
            if (ret.status) {
              if (okurl) {
                location.href = okurl;
              } else {
                location.reload();
              }
            }
        }, 'json');
        return false;
      }});
    });
  }
  
	//TIPS
	// $("[data-toggle='tooltip']").tooltip();


	function sSlideSearch(){
		if($('.form_Search').height() > 80 && $(document).width() < 1663 && $(document).width() > 680){
			$('.form_Search .isformSearch').show();
			$('.form_Search').addClass('searchminHeight')
	}else{
			$('.form_Search .isformSearch').hide();
			$('.form_Search').removeClass('searchminHeight')
		}
	};
	sSlideSearch();
	$(window).resize(function() { 
		sSlideSearch();
	});
	$('.form_Search .isformSearch').on('click',function(){
		var isText = $(this).find('span').text()
		$(this).find('span').text(isText == '展开'?'收起':'展开')
		$(this).parents('.form_Search').toggleClass('searchHeight');
		$(this).toggleClass('inShow');
	});
});

function toastrTimeOut(val){
    toastr.options = {
        timeOut: val,  
    }; 
};

/**
 *
 * @param url
 * @param params
 * @param func
 * @returns {boolean}
 *  公共弹层
 */
function showLayoutMainModal(url,params,func)  {
    $('#layoutMainModal .modal-content').empty();
    $.ajax({
        type: 'GET',
        url:url,
        data: params,
        dataType:'html',
        success: function(data){
            $('#layoutDialog').removeAttr("style");
            $('#layoutDialog').attr('class', 'modal-dialog');
            $('#layoutMainModal .modal-content').html(data);
            if(func) {
                func();
            }
        }
    });
    return false;
}

/**
 *
 * @param file
 * @param response
 * @param ele
 * 上传文件回调函数
 */
function getUploadKey(file,response,ele) {
    console.log('getUploadKey--start');
    console.log(file);
    console.log(response);
    console.log('getUploadKey--stop');
    $('#sFile').val(response.file.sFile);
    $('#sFileName').val(response.file.sName);
    $('#iFileSize').val(response.file.iSize);
    // 删除上传对象
    var $li = $( '#'+file.id );
    $li.on('click', '#'+file.id, function() {
        $("#"+file.id).remove();
        $('#sUrl').val('');
        $('#sFileName').val('');
    })
}

var __nextid = {};
function setNextID (key, val) {
	__nextid[key] = val;
}
function getNextID (key) {
	if (__nextid[key]) {
		return __nextid[key]++;
	} else {
		__nextid[key] = 0;
		return __nextid[key];
	}
}

function trim(x) {
    return x.replace(/^\s+|\s+$/gm,'');
}

function strToArray(str, c1, c2) {
	var ret = {};
	if (typeof(str) != 'string')
		return ret;
	var t1 = str.split(c1);
	for (var i = 0; i < t1.length; i++) {
		var t2 = t1[i].split(c2);
		if (t2.length == 2) {
			ret[trim(t2[0])] = trim(t2[1]);
		}
	}
	
	return ret;
}