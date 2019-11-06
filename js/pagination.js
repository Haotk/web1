
function getKey(){
	return decodeURI(window.location.href).toString().split('?')[1];
}

function getCurrentPage(currentPage){
	return  currentPage > 1 ? currentPage : 1;
}
function getBookByType(type){
	var Books = getDataFromLocal(Books,"sanpham");
	return	Books = Books.filter(book=>book.theloai==type);
}

function loadBooks(Books,currentPage,totalBook){
	var content="";
	for(let i=(currentPage-1)*12;i<totalBook;i++){
			content+= `<div class="khung"><img src="img/`+Books[i].tensach+`.jpg" alt="sach1" width="200" height="200"><div class="chitiettrongkhung"><div class="tieude">`+Books[i].tensach+`</div><div class="tacgia">`+Books[i].tacgia+`</div><div class="gia">`+parseFloat(Books[i].gia).toFixed(3)+` VNĐ</div></div><div class="overlay" onclick="window.location='Detail.html?`+Books[i].tensach+`'">
							
							<div class="text" width="25" height="25" href="#" ><img src="img/iconshoppingcart.png" width="25" height="25" onclick="addToCart('`+Books[i].tensach+`')"></div>
							<div class="text2" width="25" height="25" href="#" onclick="window.location.href ='Detail.html?`+Books[i].tensach+`' "><img src="img/Seemore.png" width="25" height="25"></div>
						</div></div>
`;
	}
	return content;
}
function loadBookByType(currentPage){
	var key= getKey();
	$(".div12").children()[0].innerText = "Sách "+key;
	var currentPage =  getCurrentPage(currentPage);
	var pages = $(".phantrang").children();
	var Books = getDataFromLocal(Books,key);
	var totalBook = (currentPage)*12;	
	var totalPage = Math.ceil(Books.length/12);
	currentPage = currentPage > totalPage ? currentPage=totalPage : currentPage;
	totalBook > Books.length ? totalBook = Books.length : totalBook=totalBook;  
	var content=loadBooks(Books,currentPage,totalBook);
	var Pages = loadPages(totalPage,currentPage);
	$(".div121").html(content);
	$(".phantrang").html(Pages);
	for(let i=0;i<pages.length;i++){
		   pages[i].classList.remove("trangchinh");
	}
		document.getElementById(`page`+currentPage+``).classList.add("trangchinh");	
}



function loadPages(totalPage,currentPage){

	var paginate=`<b href="#" onclick="loadBookByType(`+1+`)">&laquo;</b>
 			<b href="#" onclick="loadBookByType(`+(currentPage+1)+`)">&lt;</b>`;
	for(let i=1;i<=totalPage;i++){
		paginate+=`<b href="#" id="page`+i+`" onclick="loadBookByType(`+i+`)">`+i+`</b>`;
	}
	paginate+=` 			<b href="#" onclick="loadBookByType(`+(currentPage+1)+`)">&gt;</b>
 			<b href="#" onclick="loadBookByType(`+totalPage+`)">&raquo;</b>`;
 		return paginate;
}
function loadDataFromLocal(value){
	var key= getKey();
	$(".div12").children()[0].innerText = "Sách "+key;
	var currentPage =  getCurrentPage(value);
	var pages = $(".phantrang").children();
	var Books = getBookByType(key);
	var totalBook = (currentPage)*12;	
	var totalPage = Math.ceil(Books.length/12);
	totalBook > Books.length ? totalBook = Books.length : totalBook=totalBook;  
	var content=loadBooks(Books,currentPage,totalBook);
	var Pages = loadPages(totalPage);
	$(".div121").html(content);
	$(".phantrang").html(Pages);
	for(let i=0;i<pages.length;i++){
		   pages[i].classList.remove("trangchinh");
	}
		document.getElementById(`page`+currentPage+``).classList.add("trangchinh");	
		setDataToLocal(Books,"Văn Học");
}

function loadData(currentPage){
	var key = decodeURI(window.location.href).toString().split('?')[1];
	console.log(key);
	$(".div12").children()[0].innerText = "Sách "+key;
	var pages = $(".phantrang").children();
	var Books = getDataFromLocal(Books,"sanpham");
	Books = Books.filter(book=>book.theloai==key);
	setDataToLocal(Books,key);
	var totalBook = (currentPage)*12;
	var totalPage = Math.ceil(Books.length/12);
	var content ="";

	$(".div121").html(content);
	$(".phantrang").html(paginate);
	for(let i=0;i<pages.length;i++){
		   pages[i].classList.remove("trangchinh");
	}
		document.getElementById(`page`+currentPage+``).classList.add("trangchinh");	


}

window.addEventListener("load",loadDataFromLocal);


$(function() {
  $(window).scroll(sticky_relocate);
  sticky_relocate();
});

function sort(min,max){
	if(min > max) {alert("Sai giá trị"); 
	return;
}
var key = decodeURI(window.location.href).toString().split('?')[1];
	var Books = getDataFromLocal(Books,key);
	var temp = Books;
	Books=Books.filter(a=>min<=parseFloat(a.gia)&&parseFloat(a.gia)<=max);
	setDataToLocal(Books,key);
	$(".div121").fadeOut(300);
	loadBookByType(1);
	$(".div121").fadeIn(300);
	setDataToLocal(temp,key);

}

function filterFromTo(){
	var min = parseInt(document.getElementById("min").value);
	var max = parseInt(document.getElementById("max").value);
	if(isNaN(min)&&isNaN(max)) {
		alert("Giá trị không hợp lệ")
		return;
	}
	if(isNaN(min)){sort(0,max); return;}
	if(isNaN(max)) {sort(min,100000000);
	return;
}
	sort(min,max);
return;
}
function sticky_relocate() {
  var window_top = $(window).scrollTop();
  var div_top = $('.div12').height();
  if (window_top > div_top-500) {
    $('.div11').css("position","relative").css("top",div_top-500);
      } else {
    $('.div11').css("position","fixed").css("top","");
  }
}

function filterPrice(){
	$(".Price").toggle();;

}

function filterName(){
	$(".Name").toggle();;

}
function increasing(value){
	
	var key = decodeURI(window.location.href).toString().split('?')[1];
	var Books = getDataFromLocal(Books,key);
	if(value=="Price"){
		focus(1);
	Books=Books.sort((a,b)=>a.gia-b.gia);
	setDataToLocal(Books,key);
}
	if(value=="Name")
	{
		focus(2);
	Books=Books.sort((a,b)=>b.tensach<a.tensach ? 1 : -1);
	setDataToLocal(Books,key);
}
	$(".div121").fadeOut(300);
	loadBookByType(1);
	$(".div121").fadeIn(300);

}
function focus(num){
	 var item = document.getElementsByClassName("filter");
    for (let i=0;i<item.length;i++){

       item[i].className = item[i].className.replace(" active", "");
    }
    item[num].className += " active";
}
function decreasing(value){
	var key = decodeURI(window.location.href).toString().split('?')[1];
	var Books = getDataFromLocal(Books,key);
	if(value=="Price"){
	focus(0);
	Books=Books.sort((a,b)=>b.gia-a.gia);
	setDataToLocal(Books,key);
}
	if(value=="Name")
	{
		focus(3);
	Books=Books.sort((a,b)=>b.tensach<a.tensach ? -1 : 1);
	setDataToLocal(Books,key);
}
	$(".div121").fadeOut(300);
	loadBookByType(1);
	$(".div121").fadeIn(300);

}
