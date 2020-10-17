// 原生js轮播图
window.addEventListener('load',function() {
	// 鼠标经过隐藏按钮
	var arrow_l = document.querySelector(".arrow-l");
	var arrow_r = document.querySelector(".arrow-r");
	var focus = document.querySelector('.focus');
	focus.addEventListener('mouseenter',function(){
		arrow_l.style.display = 'block';
		arrow_r.style.display = 'block';
		clearInterval(timer);
		timer = null;
	})
	focus.addEventListener('mouseleave',function(){
		arrow_l.style.display = 'none';
		arrow_r.style.display = 'none';
		timer = setInterval(function(){
			arrow_r.click();
		},2000);
	})
	// 动态生成小圆圈
	var ol = focus.querySelector('.circle');
	var ul = focus.querySelector('ul');
	var focusWidth = focus.offsetWidth + 13;
	for(var i = 0; i < ul.children.length; i++){
		var li = document.createElement('li');
		li.setAttribute('index',i);
		ol.appendChild(li);
		// 小圆圈的排他
		li.addEventListener('click',function(){
			for(var i = 0;i < ol.children.length; i++){
				ol.children[i].className = "";
				
			}
			
			this.className = "current";
			// 点击圆圈，移动图片
			var index = this.getAttribute('index');
			console.log(index);
			num = index;
			circle = index;
			animate(ul,-index * focusWidth);
		})
	}
	ol.children[0].className = 'current';
	// 点击按钮 滚动图片
	var num = 0;
	// 控制小圆圈的播放
	var circle = 0;
	// 克隆第一张图片（li）放到最后面
	var first = ul.children[0].cloneNode(true);
	ul.appendChild(first);
	arrow_r.addEventListener('click',function(){
		
		// 如果走到了最后一张图片，此时，我们的ul要快速复原left为0
		if (num == ul.children.length - 1){
			ul.style.left = 0;
			num = 0;
		}
		num++;
		animate(ul,-num * focusWidth);
		// 点击按钮，小圆圈一起变化
		circle++;
		if(circle == ol.children.length){
			circle = 0;
		}
		circleChange();
	})
	arrow_l.addEventListener('click',function(){
		
		// 如果走到了最后一张图片，此时，我们的ul要快速复原left为0
		if (num == 0){
			num = ul.children.length - 1;
			ul.style.left = -num * focusWidth + 'px';
		}
		num--;
		animate(ul,-num * focusWidth);
		// 点击按钮，小圆圈一起变化
		circle--;
		if(circle < 0){
			circle = ol.children.length -1 ;
		}
		circleChange();
	})
	// 小圆圈的排他
	function circleChange() {
		for(var i = 0;i < ol.children.length; i++){
			ol.children[i].className = "";
		}
		ol.children[circle].className = 'current';
	}
	// 自动播放轮播图
	var timer = setInterval(function(){
		// 手动调用点击事件
		arrow_r.click();
	},2000)
})