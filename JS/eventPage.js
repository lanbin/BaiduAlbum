var fav_btn = '',
	over_btn = false,
	cur_imgUrl = '',
	cid = '';

creatFavBtn();

$("img").live("mouseenter", function(){
	var img = $(this);
	if(cid) {
		clearTimeout(cid);
	}

	if(whCheck(img)){
		var img_offset = img.offset(),
			img_width = img.width();
		fav_btn.css({"left":img_offset.left + img_width + "px", "top": img_offset.top + "px"}).show();
		cur_imgUrl = img.attr("src");
	}
}).live("mouseout", function(){
	cid = setTimeout(function(){
		if(!over_btn && whCheck($(this))){
			fav_btn.hide();
			cur_imgUrl ='';
		}
	}, 50);
});

function whCheck(obj){
	return ((obj.width() >= 100) && (obj.height() >= 100));
}

function creatFavBtn(){

	var html = "<div id='baidu_pic_fav'>收藏之</div>";
	$(document.body).append(html);
	fav_btn = $("#baidu_pic_fav");

	fav_btn.live("mouseenter",function(){
		over_btn = true;
	}).live("mouseout", function(){
		$(this).hide();
		cur_imgUrl ='';
		over_btn = false;
	}).live("click", function(){
		upload();
	});
}

function upload(){
	if(cur_imgUrl){
		var s = "";
		var src = ['http://up.xiangce.baidu.com/opencom/picture/fav/upload?app_id=314406&descript=', 
				encodeURIComponent(document.title), '&source_url=' ,
				encodeURIComponent(window.location.href), '&tags=baidu_pic_picker', '&url=',
				encodeURIComponent(cur_imgUrl), '&callback=', 
				'jQuery','&_=1348731523335'].join("");

		if($("#baidu_pic_fav_script").length == 0){
			s = $(document.body).append("<script id='baidu_pic_fav_script' src='" + src + "'><script" + "/>");
		}else{
			s = $("#baidu_pic_fav_script");
			s.attr("src", src);
		}

		if(window.webkitNotifications.checkPermission() > 0) {
			window.webkitNotifications.requestPermission();		
		}else{
			var t = window.webkitNotifications.createNotification("","Baidu Album Picker","图片收藏成功");
			t.show();
			setTimeout(function(){
				t.cancel();
			}, 2000);
		}
	}
}
