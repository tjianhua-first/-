// window.addEventListener('load',function(){
	//  原生JS 页面滚动事件
	// var fixedtool = document.querySelector('.fixedtool');
	// var toubu = document.querySelector('.toubu');
	// document.addEventListener('scroll',function(){
		// pageYOffset 页面被卷去的头部长度
	// 	console.log(window.pageYOffset);
	// 	if(window.pageYOffset >= 150) {
	// 		fixedtool.style.position = 'fixed';
	// 		toubu.style.display = 'block';
	// 	}else {
	// 		fixedtool.style.position = 'absolute';
	// 		toubu.style.display = 'none';
	// 	}
	// })
// });

// jQuery 页面滚动事件
$(function(){
	var boxTop = $(".main").offset().top;
	toggleTool();
	function toggleTool(){
		$(document).scroll(function(){
			$(this).scrollTop() >= boxTop ? $(".fixedtool").fadeIn() : $(".fixedtool").fadeOut(); 
		})
	}
	// 节流阀 互斥锁
	var flag = true;
	$(window).scroll(function(){
		toggleTool();
		// 页面滚动到相应区域，电梯导航相应区域也变色
		// 节流阀 互斥锁
		if(flag){
			$(".floor .w").each(function(i,ele){
				if($(document).scrollTop() > $(ele).offset().top){
					$(".fixedtool li").eq(i + 1).addClass("current").siblings().removeClass();
				}
			})
		}
	})
	// 点击电梯导航滚动到相应内容区域
	$(".fixedtool li").click(function(){
		// 节流阀 互斥锁
		flag = false;
		// 滚动的高度
		var current = $(".floor .w").eq($(this).index() - 1).offset().top;
		// 页面滚动
		if ($(this).index() == 0){
			$("body,html").stop().animate({
				scrollTop:0
			})
		}else {
			$("body,html").stop().animate({
				scrollTop:current
			},function(){
				// 回调函数，节流阀 互斥锁
				flag = true;
			})
		}
		$(this).addClass("current").siblings().removeClass();
	})
})

