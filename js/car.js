$(function(){
	// 1.全选 全不选
	$(".checkall").change(function(){
		$(".j-checkbox, .checkall").prop("checked",$(this).prop("checked"));
		$(this).prop("checked") ? $(".cart-item").addClass("check-cart-item") : $(".cart-item").removeClass("check-cart-item");
		getSum();
	});
	// 2.小复选框控制全选按钮
	$(".j-checkbox").change(function(){
		// :checked 判断复选框选了几个
		// console.log($(".j-checkbox:checked").length);
		$(this).prop("checked") ? $(this).parents(".cart-item").addClass("check-cart-item") : $(this).parents(".cart-item").removeClass("check-cart-item");
		if($(".j-checkbox:checked").length == $(".j-checkbox").length) {
			$(".checkall").prop("checked",true);
		} else {
			$(".checkall").prop("checked",false);
		}
		getSum();
	});
	// 3.增减商品数量 声明一个变量,当我们点击 + 时，让这个变量++，然后赋值给文本框
	$(".increment").click(function(){
		var n = $(this).siblings(".itxt").val();
		n++;
		$(this).siblings(".itxt").val(n);
		// 4.小计模块 获取p-price的值，substr(始,终)截取字符串得到价格 与数量相乘后赋值给p-sum
		var y = $(this).parents(".p-num").siblings(".p-price").text().substr(1);
		// console.log(y);
		// 计算结果保留两位小数.toFixed(2);
		var price = (n * y).toFixed(2);
		$(this).parents(".p-num").siblings(".p-sum").text("￥"+ price);
		getSum();
	})
	
	$(".decrement").click(function(){
		var y = $(this).siblings(".itxt").val();
		y <= 1 ? y = 1 : y--;
		$(this).siblings(".itxt").val(y);
		var n = $(this).parents(".p-num").siblings(".p-price").text().substr(1);
		$(this).parents(".p-num").siblings(".p-sum").text("￥"+ (n * y).toFixed(2));
		getSum();
	})
	// 不容许低于1的值 修改文本框的商品小计
	$(".itxt").change(function(){
		$(this).val() < 1 ? $(this).val(1) : true;
		// 先得到文本框里面的值，再乘以单价
		var price = ($(this).val() * $(this).parents(".p-num").siblings(".p-price").text().substr(1)).toFixed(2);
		$(this).parents(".p-num").siblings(".p-sum").text("￥"+ price);
		getSum();
	})
	// 5.总计模块
	getSum();
	function getSum(){
		var count = 0; // 总件数
		var money = 0; // 总价钱
		$(".itxt").each(function(i,ele) {
			// f.判断复选框是否选择
			$(ele).parents(".p-num").siblings(".p-checkbox").find(".j-checkbox").prop("checked") ? count += parseInt($(ele).val()) : false;
		});
		$(".amount-sum em").text(count);
		$(".p-sum").each(function(i,ele){
			$(ele).siblings(".p-checkbox").find(".j-checkbox").prop("checked") ? money += parseFloat($(ele).text().substr(1)) : false;
		});
		$(".price-sum").text("￥"+ money.toFixed(2));
	}
	// 6.删除模块
	// 删除按钮
	$(".p-action a").click(function(){
		$(this).parents(".cart-item").remove();
		getSum();
	})
	// 删除选中的商品
	$(".remove-batch").click(function(){
		// 判断复选框是否选中
		$(".j-checkbox:checked").parents(".cart-item").remove();
		getSum();
	})
	// 清空购物车
	$(".clear-all").click(function(){
		$(".cart-item").remove();
		getSum();
	})
})