  // 파일 업로드 - 이미지
  var _URL = window.URL || window.webkitURL;
  $(document).on('change', '.file_only_img', function(){
    file_upload_image(this);
  });

  function file_upload_image(obj, size, ext){
    size = typeof size !== 'undefined' ? size : 2;
    ext = typeof ext !== 'undefined' ? ext : 'gif,png,jpg,jpeg';

    var fileName = $(obj).val().replace(/C:\\fakepath\\/i, '');
    var fileExt = fileName.split('.').pop().toLowerCase();
    var extArray = ext.split(',');
    size = parseInt(size);
    if($.inArray(fileExt, extArray) == -1){
      alert("이미지 파일만 업로드 가능합니다.");

      if($.browser.msie){ // ie
        $(obj).replaceWith($(obj).clone(true));
      }else{ // other browser
        $(obj).val('');
      }

      return;
    }else{
      var file = obj.files[0];
      var fileSize = file.size;
      var maxSize = size * 1024 * 1024;

      if(fileSize > maxSize){
        alert('이미지 용량이 '+size+'MB를 초과하였습니다.');

        if($.browser.msie){ // ie
          $(obj).replaceWith($(obj).clone(true));
        }else{ // other browser
          $(obj).val('');
        }
        return;
      }

      var img = new Image();
      img.onload = function(){
        if($('.img_w').length > 0) $('.img_w').val(this.width);
        if($('.img_h').length > 0) $('.img_h').val(this.height);
      }
      img.src = _URL.createObjectURL(file);

      if($(obj).parents('.multi_file').length > 0){
        $(obj).parents('.multi_file').append('<div class="preview"><div class="img_box" style="background-image: url('+img.src+');"></div><div class="file_edit_icon" onclick="fileDel(this)"><a href="#" onclick="return false" class="preview_del"><i class="xi-close"></i></a></div></div>');
      }else{
        $(obj).siblings('.file_txt_input').val(fileName);
      }
    }
  }
  function fileDel(e){
    $(e).parents('.multi_file').find('input[name^=old_clothes_pic]').val('');
    $(e).parents('.multi_file').find('input[name^=clothes_pic]').val('');
    $(e).parents('.multi_file').find('.preview').remove();
  }