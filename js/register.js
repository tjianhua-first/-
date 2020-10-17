window.onload = function(){
	var regtel = /^1[3|4|5|7|8]\d{9}$/; // 手机号码验证
	var tel = document.querySelector('#tel');
	regexp(tel,regtel);
	function regexp(ele,reg) {
		ele.addEventListener('blur',function(){
			if(reg.test(this.value)) {
				this.nextElementSibling.className = 'success';
				this.nextElementSibling.innerHTML = '<i class="success_icon"></i> 登陆密码输入正确';
			}else {
				this.nextElementSibling.className = 'error';
				this.nextElementSibling.innerHTML = '<i class="error_icon"></i> 输入错误，请重新输入';
			}
		})
	}
}