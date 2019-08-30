/**
 * Created by qing on 2017/8/9.
 */

// webupload上传自定义js
$(function () {
    /*
     *传文件
     */
    $('.webupload').each(function () {
        var ele = this,
            $ = jQuery,
            state     = 'pending',
            $list     = $('#'+$(ele).data("list")),
            $btn      = $(ele),
          $pick     = '#'+$(ele).data("picker"),
            $swf      = global.swf,
            $server   = global.sUploadUrl,          // 上传地址
            $chunked  = $(ele).data("chunked"),    // 是否分片
            $callback = $(ele).data("callback"),  // 是否分片
            $fileSizeLimit = $(ele).data("limit"); // 限制大小

        // webupload上传格式类型  图片 音频 视频
        var webuploadType = $(ele).data("webupload");
        var webuploadAccept;
        var typeErrorMsg;

        var webuploadAcceptObj = {
            'all':{
                'accept':{
                    title: 'all',
                    extensions: 'jpg,png,gif,jpeg,svg,mp4,mp3,ppt,pdf,pptx,xlsx,xls,doc,docx,csv'
                },
                'typeErrorMsg':'文件格式不正确，请上传jpg,png,gif,jpeg,svg,mp4,mp3,ppt,pdf,pptx,xlsx,xls,doc,docx,csv格式的文件',
            },
            'image':{
                'accept':{
                    title: 'Image',
                    extensions: 'jpg,png,gif,jpeg,svg',
                },
                'typeErrorMsg':'文件格式不正确,请上传jpg,png,gif,jpeg格式的图片',
            },
            'nonstandard_file':{
                'accept': {
                    title: 'all',
                    extensions: 'jpg,png,gif,jpeg,ppt,pdf,pptx,xlsx,xls,doc,docx'
                },
                'typeErrorMsg':'文件格式不正确，请上传PPT、PDF、WORD、EXCEL、JPG、PNG、JPEG格式的文件'
            },
            'user_file':{
                'accept': {
                    title: 'all',
                    extensions: 'jpg,png,gif,jpeg,pdf,doc,docx'
                },
                'typeErrorMsg':'文件格式不正确，请上传PDF、JPG、PNG、JPEG格式的文件'
            },
            'batch_upload':{
                'accept': {
                    title: 'all',
                    extensions: 'csv'
                },
                'typeErrorMsg':'文件格式不正确，请上传csv的文件'
            },
            'upload_excel_file':{
                'accept': {
                    title: 'all',
                    extensions: 'xlsx,xls,csv'
                },
                'typeErrorMsg':'文件格式不正确，请上传XLSX、XLS、CSV格式的文件'
            },
            'etl_tablefield_upload':{
                'accept': {
                    title: 'all',
                    extensions: 'pdf,xlsx,xls,doc,docx,csv'
                },
                'typeErrorMsg':'文件格式不正确，请上传PDF、WORD、EXCEL、CSV格式的文件'
            }
        };

        // 默认图片
        webuploadAccept = webuploadAcceptObj.image.accept;
        typeErrorMsg    = webuploadAcceptObj.image.typeErrorMsg;

        if(typeof webuploadType != 'undefined' ){
            webuploadAccept = webuploadAcceptObj[webuploadType].accept;
            typeErrorMsg    = webuploadAcceptObj[webuploadType].typeErrorMsg;
        }

        var uploader = WebUploader.create({

            // swf文件路径
            swf: $swf,

            // 文件接收服务端。
            server: $server,

            // 选择文件的按钮。可选。
            // 内部根据当前运行是创建，可能是input元素，也可能是flash.
            pick: {
                id :$pick,
                multiple: false
            },

            // 不压缩image, 默认如果是jpeg，文件上传前会压缩一把再上传！
            resize: false,

            // 开起分片上传。
            chunked: $chunked,

            // 是否自动上传
            auto:true,

            // 接收的文件格式
            accept: webuploadAccept,
            duplicate: true,
            fileSizeLimit:$fileSizeLimit,
        });

        // 验证文件格式以及文件大小
        uploader.on("error",function (type){

            if (type=="Q_TYPE_DENIED"){
                alert(typeErrorMsg);
            }
            if (type=="Q_EXCEED_SIZE_LIMIT"){
                alert('文件大小超出限制');
            }
        });

        //根据文件大小 配置切片大小
        uploader.on("uploadStart",function (file){
            var file_size = file.size / (1024*1024*1024);

            if(file_size >=2){
                uploader.options.chunkSize= '31457280';
            }else if(file_size >=1){
                uploader.options.chunkSize= '15728640';
                uploader.options.threads= 5;
            }
        });

        // 当有文件被添加进队列的时候
        uploader.on( 'fileQueued', function( file ) {
            $list.find('div.item').remove();        //只保留一个，先清空
            $list.append( '<div id="' + file.id + '" class="item">' +
                '<h4 class="info">' + file.name + '<a class="delupload" id="' + file.id + '"  style="margin-left:5px" href="javascript:void(0)">删除</a></h4>' +
                '<p class="state">等待上传...</p>' +
                '</div>' );
        });

        // 文件上传过程中创建进度条实时显示。
        uploader.on( 'uploadProgress', function( file, percentage ) {
            var $li = $( '#'+file.id ),
                $percent = $li.find('.progress .progress-bar');

            // 避免重复创建
            if ( !$percent.length ) {
                $percent = $('<div class="progress progress-striped active">' +
                    '<div class="progress-bar" role="progressbar" style="width: 0%">' +
                    '</div>' +
                    '</div>').appendTo( $li ).find('.progress-bar');
            }

            $li.find('p.state').text('上传中');
            $percent.css( 'width', percentage * 100 + '%' );
        });

        uploader.on( 'uploadSuccess', function( file ,response) {
            if (response.iError == 0 && response.file != "0" && response.file.iError == 0) {
                $( '#'+file.id ).find('p.state').text('已上传');
                if ($callback) {
                    var callback = eval($callback);
                    callback(file,response,ele);
                }
            } else {
                console.log(response);
                $( '#'+file.id ).find('p.state').text('上传失败, 请刷新重试');
            }
        });

        uploader.on( 'uploadError', function( file,response ) {
            alert('上传出错，请重新上传');
            $("#"+file.id).remove();
            // $( '#'+file.id ).find('p.state').text('上传出错');

        });

        uploader.on( 'uploadComplete', function( file ) {
            $( '#'+file.id ).find('.progress').fadeOut();
        });

        $btn.on( 'click', function() {
            if ( state === 'uploading' ) {
                uploader.stop(true);
                state = "pending";
            } else {
                uploader.upload();
                state = "uploading";
            }
        });
    });
});

