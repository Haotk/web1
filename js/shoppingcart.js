
function loadCart(){
	var Books = getDataFromLocal(Books,"sanpham");
	var cart = Books.filter(book => book.soluong>0);
	var content="";
	for(let Book of cart){
		content+=`<div class="sanpham"><div class="chitietsanpham"><div class="hinhanh"><img  src="img/`+Book.tensach+`.jpg" style="width:175px;height:175px;"></div><div class=tensanpham><p class="sach"><a href="Detail.html?`+Book.tensach+`" class="sach">`+Book.tensach+`</a></p><p class="tacgia">Tác giả: `+Book.tacgia+`</p><p class="giatien">`+parseFloat(Book.gia).toFixed(3)+`</p></div><div class="soluong"><button onclick="updateQuan(this)">-</button><input type="tel" value="`+Book.soluong+`" onchange="check(this)" max="30" ><button onclick="updateQuan(this)" onchange="check(this)">+</button><div class="xoa"><i class="fa fa-trash-o" style="font-size: 20px;color:#0092f2;" onclick="remove(this)"></i></div></div></div></div>`;
	}
	$(".cot1").html(content);
	cal();
}
function coupon(){
	var code = document.getElementById("coupon").value.toLowerCase();
	var x = (parseFloat(document.getElementById("tamtinh").innerHTML)+15).toFixed(3);
	console.log(code);
	if(code=="sagobofes"){
		if(x==parseFloat(document.getElementById("tonggia").innerHTML)){
		alert("Nhập mã thành công bạn được giảm 15%");
		    $("#tonggia").fadeOut(300);
		document.getElementById("tonggia").innerHTML = (parseFloat(document.getElementById("tonggia").innerHTML).toFixed(3)*85/100).toFixed(3);
		
		    $("#tonggia").fadeIn(300);
	}
	else alert("Bạn đã sử dụng mã này");
}
	else alert("Mã giảm giá không hợp lệ");
}
function updateQuan(x){
		var parent = $(x).parent();
		var quantity = parent.children("input");
		if(x.textContent=="+"){
		 $(quantity).val(parseInt($(quantity).val())+1);
			cal();
		}
		if($(quantity).val()>50){

			alert("Giới hạn 50 sản phẩm");
			$(quantity).val(50);
		}	
		 if($(quantity).val()>0 && x.textContent=="-"){ 
		 	$(quantity).val(parseInt($(quantity).val())-1)
			cal();
			
		}
		if($(quantity).val()==0) remove
	}
function sticky_relocate() {
  var window_top = $(window).scrollTop();
  var div_top = $('.cot1').height();
  if (window_top > div_top-500) {
    $('.thanhtoan').css("position","relative").css("top",div_top-500);
      } else {
    $('.thanhtoan').css("position","fixed").css("top","");
  }
}

$(function() {
  $(window).scroll(sticky_relocate);
  sticky_relocate();
});
function countCheckOut(){
	var soluong =  $(".sanpham").length;
	$("#soluongsanpham").fadeOut(150);
	document.getElementById("soluongsanpham").innerHTML = parseInt(soluong);
	$("#soluongsanpham").fadeIn(150);
}

function remove(x){
	$(x).parent().parent().parent().parent().remove();
	cal();
	sticky_relocate();
	countCheckOut();
}
function check(x){
	var parent = $(x).parent();
	var value = parent.children("input");
	if($(value).val()<0)
		$(value).val(1);
	if($(value).val()>50){ alert("Giới hạn 50 sản phẩm");
		$(value).val(50);
	}
	cal();
}

function cal(){
	var tamtinh = 0;
	var quantity =1;
	$('.sanpham').each(function(){
		quantity = parseFloat($(this).children(".chitietsanpham").children(".soluong").children("input").val());
		tamtinh+=parseFloat($(this).children(".chitietsanpham").children(".tensanpham").children(".giatien").text())*quantity;
	});
	var tongtien = (tamtinh + 15.000);
	$("#tamtinh").fadeOut(300);
    $("#tonggia").fadeOut(300);
	document.getElementById("tamtinh").innerHTML = tamtinh.toFixed(3);
	document.getElementById("tonggia").innerHTML = tongtien.toFixed(3);
	
    $("#tonggia").fadeIn(300);
    $("#tamtinh").fadeIn(300);
}



function thanhtoan(){
	var isUser = isLogged();
		if(isUser) {
			var user = getDataFromLocal(user,"user");
			user = user.filter(user=>user.status==1);

		}
		else swal("CHƯA ĐĂNG NHẬP / ĐĂNG KÝ","MỜI BẠN ĐĂNG NHẬP / ĐĂNG KÝ","warning").then(()=> window.location="LoginForm.html");
			
	
}