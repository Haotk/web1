function checkAdmin(){
	var isAdmin = getDataFromLocal(isAdmin,"admin");
	if(!isAdmin){
		swal("THẤT BẠI","KHÔNG PHẢI LÀ ADMIN","error").then(()=>window.location = "index.html");
	}
}
function logoutAdmin(){
	var logoutAdmin = setDataToLocal(false,"admin");
}

function save(value){

		swal("Bạn có muốn thay đổi sản phẩm?", {
  buttons: {
  	yes: "Đồng Ý",
    cancel: "Không",
  },
  icon:"warning",
},)
.then((value) => {
  switch (value) {
    case "yes":
    	var Books = getDataFromLocal(Books,"sanpham");
    	var value = document.getElementsByClassName(`Book`)[0].outerText;	
		var inchitiet = document.getElementsByClassName(`inct`);
		var tentacgia=inchitiet[0].value;
		var nhaxuatban=inchitiet[4].value;
 		var mota = document.getElementById(`mota`).value; //laymotasach
 		for(let book of Books)
	 		if(book.tensach==value){
	 			book.tacgia = tentacgia;
 				book.nhaxuatban = nhaxuatban;
				book.mota = mota;
		
 	}

 setDataToLocal(Books,"sanpham");
 		swal(`THÀNH CÔNG`,`Lưu lại thành công`,`success`).then(()=>$(`.popup`).toggle())
    	break;
  }

});


}
function edit(value){
	var Books = getDataFromLocal(Books,"sanpham");
	var product;//san pham can them trong popup 
	for (let book of Books) if (book.tensach==value) product=book;
		var popup =$(".popup");
		var img = popup.children().children()[1];
		var maincontent = popup.children().children()[2];
		var book = maincontent.children[0];
		var price = maincontent.children[1];
		var info=maincontent.children[2];
		var infoproduct =info.children[1];
		var tacgia= infoproduct.children[0];
		var ngayxuatban=infoproduct.children[1];
		var dichgia=infoproduct.children[2];
		var sotrang=infoproduct.children[3];
		var nhaxuatban=infoproduct.children[4];
		var mota=maincontent.children[3];
		var nhapmota=mota.children[1];
		book.innerText = product.tensach;
		$(img).html(` <img src="../img/`+product.tensach+`.jpg">`);
		$(price).html(`<h1>`+parseFloat(product.gia).toFixed(3)+`đ</h1>`)
		$(tacgia).html(`<p>Tác giả :<input class="inct" type="text" value="`+product.tacgia+`"></p>`);
		$(ngayxuatban).html(` <p>Ngày xuất bản :<input class="inct" type="text" value="`+product.ngayxuatban+`" disabled></p>`);
		$(dichgia).html(`<p>Dịch giả :<input class="inct" type="text" value="`+product.dichgia+`" disabled></p>`);
		$(sotrang).html(`<p>Số trang :<input class="inct"type="text" value="`+product.sotrang+`" disabled></p>`);
		$(nhaxuatban).html(`<p>Nhà xuất bản :<input class="inct" type="text" value="`+product.nhaxuatban+`"></p>`);
		$(nhapmota).html(`<textarea id="mota">`+product.gioithieusach+`</textarea>`);
        
	$(".popup").toggle();
	var btnClose = document.getElementsByClassName("close")[0];
	btnClose.onclick = function() {
  popup.style.display = "none";
}

	var popup = document.getElementById(`popup`);
window.onclick = function(event) {
  if (event.target == popup) {
    popup.style.display = "none";
  }
}
}
function validateAdmin(){

	var x=document.getElementById("usn");
	var y=document.getElementById("psw");
	  if(x.value=="admin"&&y.value=="admin"){
	  	setDataToLocal(true,"admin");
  		swal("ĐĂNG NHẬP THÀNH CÔNG","CHÀO BẠN","success").then(()=> window.location ='admin.html');
  	}
  	else swal("ĐĂNG NHẬP THẤT BẠI","SAI THÔNG TIN ĐĂNG NHẬP","error");

	}
function getContent(currentPage,value,totalBook){
	var Books = getDataFromLocal(Books,"sanpham");
	var content=`<div class="addproduct">
		<button class="addProduct">THÊM SẢN PHẨM MỚI</button>


	</div>
	`;
	for(let i=(currentPage-1)*value;i<totalBook;i++){
		content +=`<div class="frame">
					<div class="pic-frame">
						<img src="../img/`+Books[i].tensach+`.jpg" onclick="window.location='../Detail.html?`+Books[i].tensach+`'" style="cursor:pointer">
					</div>
					<div class="cont-frame">
						<h2 onclick="window.location='../Detail.html?`+Books[i].tensach+`'" style="cursor:pointer">`+Books[i].tensach+`</h2>
						<h3>`+parseFloat(Books[i].gia).toFixed(3)+`đ</h3>
					</div>
					<div class="edit-frame">
						
              <button class="btnEdit" onclick="edit('`+Books[i].tensach+`')">Sửa</button>
              <button class="btnDelete" onclick="deleteProducts(this)"><i class="fa fa-trash" aria-hidden="true"></i>Xóa</button>
            
					</div>
				</div>`
	}
	return content;
}
function deleteProducts(value){
	swal("Bạn có xoá sản phẩm?", {
  buttons: {
  	yes: "Đồng Ý",
    cancel: "Không",
      },
   icon:"warning",
})
.then((value) => {
  switch (value) {
    case "yes":
      swal("XÓA THÀNH CÔNG", "", "success").then(function(){
      		var Products = $(value).parent().parent();
	$(Products).css("display","none");
      });
      break;
  }

});

}
function loadPages(totalPage,currentPage,value){

	var paginate=``;
	for(let i=1;i<=totalPage;i++){
		paginate+=`<b href="#" id="page`+i+`" onclick="getData(`+i+`,`+value+`)">`+i+`</b>`;
	}
 		return paginate;
}

function getCurrentPage(currentPage){
	return  currentPage > 1 ? currentPage : 1;
}


function getData(currentPage,value){
		document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
	currentPage = getCurrentPage(currentPage);
	var Books = getDataFromLocal(Books,"sanpham");
	var totalBook = (currentPage)*value;	
	var pages = $(".phantrang").children();
	var totalPage = Math.ceil(Books.length/value);
	totalBook > Books.length ? totalBook = Books.length : totalBook=totalBook;
	var content = getContent(currentPage,value,totalBook);
	var Pages = loadPages(totalPage,currentPage,value);  
	$('#products').html(content);
	$(".phantrang").html(Pages);
		for(let i=0;i<pages.length;i++){
		   pages[i].classList.remove("trangchinh");
	}
		document.getElementById(`page`+currentPage+``).classList.add("trangchinh");	
}

