window.addEventListener('load',function(){
	// 放大镜效果
	var preview_img = document.querySelector('.preview_img');
	var mask = document.querySelector('.mask');
	var big = document.querySelector('.big');
	preview_img.addEventListener('mouseover', function(){
		mask.style.display = 'block';
		big.style.display = 'block';
	})
	preview_img.addEventListener('mouseout', function(){
		mask.style.display = 'none';
		big.style.display = 'none';
	})
	preview_img.addEventListener('mousemove',function(e){
		var x = e.pageX - this.offsetLeft;
		var y = e.pageY - this.offsetTop;
		var maskX = x - mask.offsetWidth / 2;
		var maskY = y -mask.offsetHeight / 2;
		// mask最大移动距离
		var maskMax = preview_img.offsetWidth - mask.offsetWidth;
		// var maskMaxY = preview_img.offsetHeight - mask.offsetHeight;
		if(maskX <= 0) {
			maskX = 0;
		}else if(maskX >=maskMax){
			maskX = maskMax;
		}
		if(maskY <=0 ) {
			maskY = 0;
		}else if(maskY >= maskMax) {
			maskY =maskMax;
		}
		mask.style.left = maskX  + 'px';
		mask.style.top = maskY + 'px';
		// big图
		var bigImg = document.querySelector('.bigImg');
		var bigMax = bigImg.offsetWidth - big.offsetWidth;
		var bigX = maskX * bigMax / maskMax;
		var bigY = maskY * bigMax / maskMax;
		bigImg.style.left = -bigX + 'px';
		bigImg.style.top = -bigY + 'px';
	})
	
	// tab栏切换
	// 1. 原生js
	// var detailTabList = document.querySelector('.detail_tab_list ul');
	// var lis = detailTabList.querySelectorAll('li');
	// var item = document.querySelectorAll('.item');
	// for(var i = 0; i < lis.length; i++){
		
	// 	lis[i].setAttribute('index',i); 设定索引号
	// 	lis[i].onclick = function(){
	// 		for(var i = 0; i < lis.length; i++){
	// 			lis[i].className = '';
	// 		}
	// 		this.className = 'current';
	// 		var index = this.getAttribute('index');
	// 		for(var i = 0; i < item.length; i++) {
	// 			item[i].style.display = 'none';
	// 		}
	// 		item[index].style.display = 'block';
	// 	}
	// }
	
	// 2. jQuery
	$(function(){
		$('.detail_tab_list li').click(function(){
			$(this).addClass('current').siblings().removeClass('current');
			var index = $(this).index();
			$('.item').eq(index).show().siblings().hide();
		})
	})
})