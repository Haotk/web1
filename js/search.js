  var keyword = decodeURI(window.location.href).toString().split('?')[1];
function showMore(value){
	var x = value;
	var y =$(x).children()[0];
	$(y).toggleClass('fa-caret-right');
}


$(function() {
  $(window).scroll(sticky_relocate);
  sticky_relocate();
});

function sticky_relocate() {
  var window_top = $(window).scrollTop();
  var div_top = $('.div12').height();
  if (window_top > div_top-500) {
    $('.locsanpham').css("position","relative").css("top",div_top-500);
      } else {
    $('.locsanpham').css("position","fixed").css("top","");
  }
}
  function normalize(str) {
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
    str = str.replace(/Đ/g, "D");
    return str;
  }

function getCurrentPage(currentPage){
  return  currentPage > 1 ? currentPage : 1;
}
function getBookByType(type){
  var Books = getDataFromLocal(Books,"sanpham");
  return  Books;
}


function loadBooks(Books,currentPage,totalBook){
  var content="";
  for(let i=(currentPage-1)*12;i<totalBook;i++){
      content+= `<div class="khung" ><img src="img/`+Books[i].tensach+`.jpg" alt="sach1" width="200" height="200" onclick="window.location='Detail.html?`+Books[i].tensach+`'"><div class="chitiettrongkhung"  onclick="window.location='Detail.html?`+Books[i].tensach+`'"><div class="tieude"  onclick="window.location='Detail.html?`+Books[i].tensach+`'">`+Books[i].tensach+`</div><div class="tacgia">`+Books[i].tacgia+`</div><div class="gia">`+parseFloat(Books[i].gia).toFixed(3)+` VNĐ</div></div>
              
              <div class="text" width="25" height="25" href="#" ><img src="img/iconshoppingcart.png" width="25" height="25" onclick="addToCart('`+Books[i].tensach+`')"></div>
              <div class="text2" width="25" height="25" href="#" onclick="window.location.href ='Detail.html?`+Books[i].tensach+`' "><img src="img/Seemore.png" width="25" height="25"></div>
            </div>
`;
  }
  return content;
}
function loadPages(totalPage,currentPage){
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
  var paginate=`<b href="#" onclick="loadBookByType(`+1+`)">&laquo;</b>
      <b href="#" onclick="loadBookByType(`+(currentPage-1)+`)">&lt;</b>`;
  for(let i=1;i<=totalPage;i++){
    paginate+=`<b href="#" id="page`+i+`" onclick="loadBookByType(`+i+`)">`+i+`</b>`;
  }
  paginate+=`       <b href="#" onclick="loadBookByType(`+(currentPage+1)+`)">&gt;</b>
      <b href="#" onclick="loadBookByType(`+totalPage+`)">&raquo;</b>`;
    return paginate;
}
function loadBooks(Books,currentPage,totalBook){
  var content="";
  for(let i=(currentPage-1)*12;i<totalBook;i++){
      content+= `<div class="khung" ><img src="img/`+Books[i].tensach+`.jpg" alt="sach1" width="200" height="200" onclick="window.location='Detail.html?`+Books[i].tensach+`'"><div class="chitiettrongkhung"  onclick="window.location='Detail.html?`+Books[i].tensach+`'"><div class="tieude"  onclick="window.location='Detail.html?`+Books[i].tensach+`'">`+Books[i].tensach+`</div><div class="tacgia">`+Books[i].tacgia+`</div><div class="gia">`+parseFloat(Books[i].gia).toFixed(3)+` VNĐ</div></div>
              
              <div class="text" width="25" height="25" href="#" ><img src="img/iconshoppingcart.png" width="25" height="25" onclick="addToCart('`+Books[i].tensach+`')"></div>
              <div class="text2" width="25" height="25" href="#" onclick="window.location.href ='Detail.html?`+Books[i].tensach+`' "><img src="img/Seemore.png" width="25" height="25"></div>
            </div>
`;
  }
  return content;
}
function loadBookByType(currentPage){
  var currentPage =  getCurrentPage(currentPage);
  var pages = $(".phantrang").children();
  var Books = getDataFromLocal(Books,"search");
  var totalBook = (currentPage)*12; 
  var totalPage = Math.ceil(Books.length/12);
  totalBook > Books.length ? totalBook = Books.length : totalBook=totalBook;  
    currentPage >= totalPage ? currentPage = totalPage : currentPage = currentPage;
  var content=loadBooks(Books,currentPage,totalBook);
  var Pages = loadPages(totalPage,currentPage);
  $(".div121").html(content);
  $(".phantrang").html(Pages);
  for(let i=0;i<pages.length;i++){
       pages[i].classList.remove("trangchinh");
  }
    document.getElementById(`page`+currentPage+``).classList.add("trangchinh"); 
}




function loadDataFromRadio(currentPage,current){
 
    if ($(current).is(".checked")) {
        $(current).prop("checked",false).removeClass("checked");
    } else {
        $("input:radio[name='"+$(current).prop("name")+"'].checked").removeClass("checked");
        $(current).addClass("checked");
    }


  var keys = $("[type=radio]:checked");
  var kw="";
  for(let key of keys){
     kw +=key.value + '|';
  }
  kw = kw.split('|');
  kw.pop();
  var Book;
  var Books=[];
  for(let key of kw){
      Book = getDataFromLocal(Book,key);
      Books=Books.concat(Book);
  }
  console.log(Books);
   kw = kw.join();
   keyword= kw;
  var pages = $(".phantrang").children();
  $(".timkiem").html(`<p>Tìm kiếm với từ khóa: `+kw+` (có `+Books.length+` kết quả)</p>`);
  setDataToLocal(Books,"search");
  var totalBook = (currentPage)*12;
  var totalPage = Math.ceil(Books.length/12);
  totalBook > Books.length ? totalBook = Books.length : totalBook=totalBook;  
  var content=loadBooks(Books,currentPage,totalBook);
  var Pages = loadPages(totalPage,currentPage);
  $(".div121").html(content);
  $(".phantrang").html(Pages);
  for(let i=0;i<pages.length;i++){
       pages[i].classList.remove("trangchinh");
  }
    document.getElementById(`page`+currentPage+``).classList.add("trangchinh"); 

    setDataToLocal(Books,"search");

}



function findBook(){
    var content="";
    var result;
    if(normalize(keyword.toLowerCase())==normalize("Văn Học").toLowerCase()) {
      var Books = getDataFromLocal(Books,"Văn Học");
        result=Books;
              $(".timkiem").html(`<p>Tìm kiếm với từ khóa: `+keyword+` (có `+result.length+` kết quả)</p>`);
      return result;
      }
      if(normalize(keyword.toLowerCase())==normalize("Thiếu Nhi").toLowerCase()){
      var Books = getDataFromLocal(Books,"Thiếu Nhi");
        result=Books;
              $(".timkiem").html(`<p>Tìm kiếm với từ khóa: `+keyword+` (có `+result.length+` kết quả)</p>`);
      return result;
      }
      if(normalize(keyword.toLowerCase())==normalize("Tiểu Thuyết").toLowerCase()) {
      var Books = getDataFromLocal(Books,"Tiểu Thuyết");
        result=Books;
              $(".timkiem").html(`<p>Tìm kiếm với từ khóa: `+keyword+` (có `+result.length+` kết quả)</p>`);
      return result;
      }
      if(normalize(keyword.toLowerCase())==normalize("Kỹ Năng").toLowerCase()) {
      var Books = getDataFromLocal(Books,"Kỹ Năng");
        result=Books;
              $(".timkiem").html(`<p>Tìm kiếm với từ khóa: `+keyword+` (có `+result.length+` kết quả)</p>`);
      return result;
      }
      

  else{
  var Books = getDataFromLocal(Books,"sanpham");
      result = Books.filter(book => normalize(book.tensach.toLowerCase())==normalize(keyword.toLowerCase()));
}
  if(keyword==""){
      $(".timkiem").html(`<p>Tìm kiếm với từ khóa: `+keyword+` (có `+result.length+` kết quả)</p>`);
      return result;
  }
   if(result.length){
    $(".timkiem").html(`<p>Tìm kiếm với từ khóa: `+keyword+` (có `+result.length+` kết quả)</p>`);
    return result;
}
else {
   result = Books.filter(book => normalize(book.tensach.toLowerCase()).includes(normalize(keyword.toLowerCase())));
    $(".timkiem").html(`<p>Tìm kiếm với từ khóa: `+keyword+` (có `+result.length+` kết quả)</p>`);
    return result;    
  }
}


function getBookFromLocal(value){
  var currentPage =  getCurrentPage(value);
  var totalBook = (currentPage)*12; 
  var Books=findBook();
  var totalPage = Math.ceil(Books.length/12);
  var pages = $(".phantrang").children();
  totalBook > Books.length ? totalBook = Books.length : totalBook=totalBook;  
  currentPage >= totalPage ? currentPage = totalPage : currentPage = currentPage;
  var content=loadBooks(Books,currentPage,totalBook);
  var Pages = loadPages(totalPage);
    $(".div121").html(content);
  $(".phantrang").html(Pages);
  for(let i=0;i<pages.length;i++){
       pages[i].classList.remove("trangchinh");
  }
    document.getElementById(`page`+currentPage+``).classList.add("trangchinh"); 
    setDataToLocal(Books,"search");
}

window.addEventListener("load",getBookFromLocal);


function sort(min,max){
  if(min > max) {swal("Sai giá trị","chu ben duoi","error"); 
  return;
}

  var Books = getDataFromLocal(Books,"search");
  if(Books==0){
    var Books = getDataFromLocal(Books,"sanpham");
    setDataToLocal(Books,"search");
  }

  var temp = Books;
  Books=Books.filter(a=>min<=parseFloat(a.gia)&&parseFloat(a.gia)<=max);
  if(Books.length==0){
    $(".div121").html('<p style="margin-left:40%;margin-top:5%">(Không có sản phẩm thỏa yêu cầu)</p>');
    $(".phantrang").html("");
  }
  else{
  setDataToLocal(Books,"search");
  $(".div121").fadeOut(300);
  loadBookByType(1);
  $(".div121").fadeIn(300);
  setDataToLocal(temp,"search");

}   if(max==100000000)
      
     $(".timkiem").html(`<p>Tìm kiếm với từ khóa: `+keyword+` có giá từ `+min+`   trở lên (có `+Books.length+` kết quả)</p>`);
     else
     $(".timkiem").html(`<p>Tìm kiếm với từ khóa: `+keyword+` có giá (`+min+`,`+max+`) (có `+Books.length+` kết quả)</p>`);
}

function filterFromTo(){
  var min = parseInt(document.getElementById("minvalue").value);
  var max = parseInt(document.getElementById("maxvalue").value);
  if(isNaN(min)&&isNaN(max)) {
     swal("XẢY RA LỖI","Giá trị không hợp lệ","warning");
    return;
  }
  if(isNaN(min)){sort(0,max); return;}
  if(isNaN(max)) {sort(min,100000000);
  return;
}
  sort(min,max);
return;
}

function filterPrice(){
  $(".Price").toggle();

}

function filterName(){
  $(".Name").toggle();

}
function increasing(value){
  var Books = getDataFromLocal(Books,"search");
  if(value=="Price"){
    focus(1);
  Books=Books.sort((a,b)=>a.gia-b.gia);
  setDataToLocal(Books,"search");
}
  if(value=="Name")
  {
    focus(2);
  Books=Books.sort((a,b)=>b.tensach<a.tensach ? 1 : -1);
  setDataToLocal(Books,"sanpham");
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

  var Books = getDataFromLocal(Books,"search");
  if(value=="Price"){
  focus(0);
  Books=Books.sort((a,b)=>b.gia-a.gia);
  setDataToLocal(Books,"search");
}
  if(value=="Name")
  {
    focus(3);
  Books=Books.sort((a,b)=>b.tensach<a.tensach ? -1 : 1);
  setDataToLocal(Books,"search");
}
  $(".div121").fadeOut(300);
  loadBookByType(1);
  $(".div121").fadeIn(300);

}
