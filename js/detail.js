function findBook(Books,ten){
	for(let value of Books){
		if(value.tensach==ten) return value;
	}
	return 0;
}
function getInCart(){
	var Books = getDataFromLocal(Books,"sanpham");
	var sum=0;
	for(let book of Books){
		sum+=book.soluong;
	}

	return sum;
}

function getBook(){
	document.getElementById("soluongsanpham").innerHTML = getInCart();
	var tenSach = decodeURI(window.location.href).toString().split('?')[1];
	var Books = getDataFromLocal(Books,"sanpham");
	var Book = findBook(Books,tenSach);
	if(Book==0) console.log("Khoong");
	else{
		$(".chitietsanpham").html(`<div class="anhsach"><img src="img/`+Book.tensach+`.jpg"></div><div class="detail"><div class="tensach"><p>`+Book.tensach+`</p></div><div class="stars"><div class="sao"><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i></div><div class="luotdanhgia"><p>(có 1 lượt đánh giá)</p></div></div><hr><div class="gia"><h1>`+parseFloat(Book.gia).toFixed(3)+`đ</h1></div><div class="chonsoluong"><div class="soluong"><button onclick="updateQuan(this)">-</button><input type="tel" value="1" onchange="check(this)" max="30" ><button onclick="updateQuan(this)" onchange="check(this)">+</button></div><div class="chonmua"><button class="chon" onclick="addBook()"><span>CHỌN MUA</span></button></div><div class="yeuthich"><p><i class="fa fa-heart"></i> Yêu thích</p></div><hr></div><div class="thongtin"><div class="thongtinsanpham"><p>Thông Tin Chi Tiết : </p></div><div class="thongtinchitiet"><p>Tác giả : `+Book.tacgia+`</p><p>Nhà xuất bản : 	`+Book.nhaxuatban+`</p><p>Ngày xuất bản : `+Book.ngayxuatban+` </p><p>Dịch giả : `+Book.dichgia+` </p><p>Số trang  : `+Book.sotrang+` </p></div></div></div></div><div class="motasanpham"><hr><div class="motasp"><div class="mota"><h3>GIỚI THIỆU SÁCH:</h3></div><div class="motachitiet"><p>`+Book.gioithieusach+`</p></div></div><div class="danhgiasanpham">
	<div class="danhgiasp">
    <div class="danhgiachung">
		<div class="danhgia">
			<h3>ĐÁNH GIÁ SẢN PHẨM</h3>
		</div>
    <div class="nhanxet">
        <p>Nhận xét của bạn</p>
        <textarea></textarea>
    </div>
        <div class="caichudanhgia">
          <label>Đánh giá</label>
        </div>
		    <div class="danhgiachitiet">
          <div id="rating" class="rating">
            <input type="radio" id="star5" name="rating" value="5" />
            <label class = "full" for="star5" title="Awesome - 5 stars"></label>
 
            <input type="radio" id="star4" name="rating" value="4" />
            <label class = "full" for="star4" title="Pretty good - 4 stars"></label>
 
            <input type="radio" id="star3" name="rating" value="3" />
            <label class = "full" for="star3" title="Meh - 3 stars"></label>
 
            <input type="radio" id="star2" name="rating" value="2" />
            <label class = "full" for="star2" title="Kinda bad - 2 stars"></label>
 
            <input type="radio" id="star1" name="rating" value="1" />
            <label class = "full" for="star1" title="Sucks big time - 1 star"></label>
          </div>
		    </div>
        <div class="nutdanhgia">
          <button>Gửi nhận xét</button>
        </div>
    </div>
  <div class="hienthidanhgia">
      <p>CHƯA CÓ ĐÁNH GIÁ</p>
  </div>
	</div>	
		
</div>
			`);
	}
}

window.addEventListener("load",getBook);

function addBook(){
	var tenSach = decodeURI(window.location.href).toString().split('?')[1];
	
	var soluonghientai = parseInt(document.getElementById('soluongsanpham').innerText);
	var soluongchonmua = parseInt($(".soluong").children("input").val());
	$("#soluongsanpham").fadeOut(150);
	document.getElementById("soluongsanpham").innerHTML = soluonghientai+soluongchonmua;
	$("#soluongsanpham").fadeIn(150);
	var Books = getDataFromLocal(Books,"sanpham");
	for(let value of Books){
	
		if(value.tensach==tenSach){ value.soluong = value.soluong+soluongchonmua;	
			break;
		}
	}
	setDataToLocal(Books,"sanpham");
}

/**
	var newBook = {
	tensach: "12 Cách Yêu",
	tacgia:"Hamlet Trương",
	gia:90,
	nhaxuatban:"Nhà Xuất Bản Tổng Hợp",
	ngayxuatban:"06-2016",
	dichgia:"Không",
	sotrang:292,
	gioithieusach:"Lần đầu tiên 12 chòm sao được cụ thể hóa thành những nhân vật có số phận, có tính cách đặc trưng trong những câu chuyện tình lãng mạn đến bất ngờ.Một quý phi Thần Nông mưu trí đã vượt qua những sóng gió hậu cung để lên ngôi hoàng hậu, một Song Tử luôn phải đắn đo giữa hai chàng trai mình đều yêu, một Bảo Bình đứng trước Bàn tay khỉ với 3 điều ước oan nghiệt, một nàng tiên Bạch Dương dùng sinh mạng hy sinh cho tình yêu của mình trên đảo Đào Hoa, một Cư Giải chân chất ở xứ dừa Bến Tre, một Thiên Bình thức trắng trong đêm đầy nước mắt, một Sư Tử điềm tĩnh trong những buổi trà chiều, một ca sĩ Kim Ngưu đầy nghị lực, một cô vợ Xử Nữ lém lỉnh, một Song Ngư mơ mộng khó hiểu và chuyện gì sẽ đến khi Ma Kết xuyên không? 12 chòm sao với những tính cách riêng biệt sẽ xử lý tình huống như thế nào?",
	soluong:0,
}
Books.push(newBook);**/






