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
	}
function remove(x){

	$(x).parent().parent().parent().parent().remove();
	cal();
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



