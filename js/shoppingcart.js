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
		if($(quantity).val()==0) $()
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
	console.log(soluong);
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



