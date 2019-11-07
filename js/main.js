
/**GET/SET DATA FROM LOCAL STORAGE**/
const getDataFromLocal = (data,key) =>{ 

  data = JSON.parse(localStorage.getItem(key));
  return data==null ? 0 : data; };


const setDataToLocal = (data,key) => localStorage.setItem(key,JSON.stringify(data));


/**END OF GET/SET DATA FROM LOCAL STORAGE**/


 

function isLogged(){
  var login = document.getElementById("login");
  var accounts = getDataFromLocal(accounts,'user');
  var user = accounts.find(users => users.status==1);
    if(typeof user==`undefined`)  { 
      login.innerHTML = 'TÀI KHOẢN';
      login.setAttribute('href','LoginForm.html');
      return 0;
    }
    else {
      login.innerHTML=user.name;
      login.setAttribute("onclick","logout()");
    }
    return 1;
  }

window.addEventListener("load",isLogged);


function validate(ob){
    var id= ob.id;
     if (id=="regpwd"){
      if(ob.value.length < 6){
       $(ob).parent().children("#warning").text("Độ dài mật khẩu phải lớn hơn 6");   
        $("#register").prop("disabled",true);   
     }
     else { 
            $("#register").prop("disabled",false);
            $(ob).parent().children("#warning").text("");   
          }
}
    if(id=="repwd"){
      if(ob.value != $("#regpwd").val()){
          $(ob).parent().children("#warning").text("Mật khẩu không trùng khớp"); 
          $("#register").prop("disabled",true);     
      }
      else{
        $("#register").prop("disabled",false);
       $(ob).parent().children("#warning").text("");  
     }
    }
  
    if(id=="regmail"){
       var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(!re.test(ob.value)){
          $(ob).parent().children("#warning").text("Email không hợp lệ");
          $("#register").prop("disabled",true);   
        }
        else{    $("#register").prop("disabled",false);
          $(ob).parent().children("#warning").text("");
     
      }
    }
}



function isValidate(name,user,email,pwd){
    var count=0;
    if(name==""){
       $("#regname").parent().children("#warning").text("Không được bỏ trống");    
        count++;
     }else
            $("#regname").parent().children("#warning").text("");

    if(user==""){
       $("#reguser").parent().children("#warning").text("Không được bỏ trống");   
        count++;
      }
     
     else
            $("#reguser").parent().children("#warning").text("");   

    if(email==""){
        $("#regmail").parent().children("#warning").text("Không được bỏ trống");   
      count++;
     }
     else
            $("#regmail").parent().children("#warning").text("");   

    if(pwd==""){
       $("#regpwd").parent().children("#warning").text("Không được bỏ trống");   
      count++;
     }
     else
            $("#regpwd").parent().children("#warning").text("");   

  return count;    
}


function register(){
  var name = document.getElementById("regname").value;
  var user = document.getElementById("reguser").value;
  var email = document.getElementById("regmail").value;
  var pwd = document.getElementById("regpwd").value;
  if(!isValidate(name,user,email,pwd)){
    var newaccount = {
      username:user,
      name:name,
      email:email,
      pwd:pwd,
      status:0,
    }
    var arr = getDataFromLocal(arr,"user");
      if(JSON.parse(localStorage.getItem("user"))==null){
        accounts[0] = newaccount;
        localStorage.setItem("user",JSON.stringify(accounts));
          alert("ĐĂNG KÝ THÀNH CÔNG");
          window.location ="LoginForm.html";
      }
      else{
        var accounts =   getDataFromLocal(accounts,"user");
          for(let users of accounts){
            if(users.username!=newaccount.username && users.email !=newaccount.email){
                  accounts.push(newaccount);
                  setDataToLocal(accounts,"user");
                  swal("Đăng ký thành công!!", "Mời Bạn Đăng Nhập", "success").then(()=> window.location ="LoginForm.html");
                  break;
                  }
                else
            if(users.username==newaccount.username){
                  $("#reguser").parent().children("#warning").text("Tài khoản đã được đăng ký."); 
            }
            else $("#reguser").parent().children("#warning").text("");
            if(users.email==newaccount.email){
                  $("#regmail").parent().children("#warning").text("Email đã được đăng ký"); 
            }
                else  $("#regmail").parent().children("#warning").text("");               
          }
      }  
}

}




function isExist(accounts,user,pwd){
   for(let users of accounts){
          if(users.username == user && users.pwd == pwd){
            users.status=1;
            setDataToLocal(accounts,"user");
            return 1;
      }
     }
     return 0;
}

function login(){

  var user = document.getElementById("user").value;
  var pwd = document.getElementById("pwd").value;
  var accounts =getDataFromLocal(accounts,"user");
    if(!accounts){
        alert("Dữ liệu không tồn tại!");
    }
  else if(isExist(accounts,user,pwd)) {
         swal("Đăng nhập thành công!!", "Chào mừng bạn đến với Sagobo Books", "success").then(()=> window.location ="Index.html");
  } 
    else   swal("Đăng nhập thất bại!!", "Sai tài khoản hoặc mật khẩu", "error");

}
     

function logout(){
  var isLogout = confirm("Bạn có muốn thoát?");
  if(isLogout) {
    var accounts = getDataFromLocal(accounts,"user");
    for(let key of accounts)
      if(key.status==1) key.status=0; 
    
      setDataToLocal(accounts,"user");
      window.location ="index.html";
  }
}


//AUTOCOMPLETE

function autocomplete(inp, arr) {

  var currentFocus;

  inp.addEventListener("input", function(e) {
      var a, b, i, val = this.value;
      closeAllLists();
      if (!val) { return false;}
      currentFocus = -1;
      a = document.createElement("DIV");
      a.setAttribute("id", this.id + "autocomplete-list");
      a.setAttribute("class", "autocomplete-items");
      /*append the DIV element as a child of the autocomplete container:*/
      this.parentNode.appendChild(a);
      /*for each item in the array...*/
      for (i = 0; i < arr.length; i++) {
        /*check if the item starts with the same letters as the text field value:*/
        if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
          /*create a DIV element for each matching element:*/
          b = document.createElement("DIV");
          /*make the matching letters bold:*/
          b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
          b.innerHTML += arr[i].substr(val.length);
          /*insert a input field that will hold the current array item's value:*/
          b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
          b.innerHTML += "<a href='Detail.html?"+arr[i]+"'></a>"
          /*execute a function when someone clicks on the item value (DIV element):*/
          b.addEventListener("click", function(e) {
              /*insert the value for the autocomplete text field:*/
              window.location = "Detail.html?"+this.getElementsByTagName("input")[0].value.split(' ').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' ');

; // TIM KIEM KIEU 1
              /*close the list of autocompleted values,
              (or any other open lists of autocompleted values:*/
              closeAllLists();
          });
          a.appendChild(b);
        }
      }
  });
  /*execute a function presses a key on the keyboard:*/
  inp.addEventListener("keydown", function(e) {
      var x = document.getElementById(this.id + "autocomplete-list");
      if (x) x = x.getElementsByTagName("div");
      if (e.keyCode == 40) {
        /*If the arrow DOWN key is pressed,
        increase the currentFocus variable:*/
        currentFocus++;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 38) { //up
        /*If the arrow UP key is pressed,
        decrease the currentFocus variable:*/
        currentFocus--;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 13) {
        /*If the ENTER key is pressed, prevent the form from being submitted,*/
        e.preventDefault();
        if (currentFocus > -1) {
          /*and simulate a click on the "active" item:*/
          if (x) x[currentFocus].click();
        }
      }
  });
  function addActive(x) {
    /*a function to classify an item as "active":*/
    if (!x) return false;
    /*start by removing the "active" class on all items:*/
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = (x.length - 1);
    /*add class "autocomplete-active":*/
    x[currentFocus].classList.add("autocomplete-active");
  }
  function removeActive(x) {
    /*a function to remove the "active" class from all autocomplete items:*/
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }
  function closeAllLists(elmnt) {
    /*close all autocomplete lists in the document,
    except the one passed as an argument:*/
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }
  /*execute a function when someone clicks in the document:*/
  document.addEventListener("click", function (e) {
      closeAllLists(e.target);
  });
}

/*An array containing all the country names in the world:*/
var countries = getDataFromLocal(countries,"sanpham")//TIM KIEM KIEU 2
countries = countries.map(country => country.tensach);
function search(){
  var content ="Detail.html?"+document.getElementById("suggest").valuestr.split(' ').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' ');

;
  window.location =content;
}
//KET THUC TIM KIEM KIEU 2
//ENDOFAUTOCOMPLETE

document.addEventListener("DOMContentLoaded", function(){

    $(".bestseller,.trendingproducts,.newest").hide();
      $(".trendingproducts").fadeIn(300);
      $(".trendingproducts").css("display","block");
});

function change(num,value){
      $(".bestseller,.trendingproducts,.newest").hide();
    if(value.id=="moiphathanh"){
      $(".bestseller,.trendingproducts,.newest").fadeOut();
      $(".newest").fadeIn(3000);
      $(".newest").css("display","block");
    }
    if(value.id=="banchay"){
      $(".bestseller,.trendingproducts,.newest").fadeOut();
      $(".bestseller").fadeIn(3000);
    $(".bestseller").css("display","block");
      
    }
     if(value.id=="noibat"){
      $(".bestseller,.trendingproducts,.newest").fadeOut();
      $(".trendingproducts").fadeIn(3000);
      $(".trendingproducts").css("display","block");
    }
      var item = document.getElementsByClassName("items");
    
    for (let i=0;i<item.length;i++){

       item[i].className = item[i].className.replace(" active", "");
    }
    item[num].className += " active";
}
function slicks(){
$('.kynang,.vanhoc,.tieuthuyet,.thieunhi').slick({
    slidesToShow: 5,
    slidesToScroll: 5,
    dots: true,
    infinite: true,

});
$('.trendingproducts,.bestseller,.newest').slick({
    slidesToShow: 5,
    slidesToScroll: 5,
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2000,
});
}
window.addEventListener("load",slicks);


function rsGia(){
  var Books = getDataFromLocal(Books,"sanpham");
  Books.filter(book=>book.soluong=0);
  setDataToLocal(Books,"sanpham");
  console.log("DONE!!!!!");
}

function data(key){

  var content="";
  var Books = getDataFromLocal(Books,"sanpham");
  if(key=="Nổi Bật") var Books = Books.filter(book=>book.noibat==1);
  if( key=="Mới Phát Hành") var Books = Books.filter(book=>book.moiphathanh==1);
  if(key =="Bán Chạy") var Books = Books.filter(book=>book.banchay==1);
  else
  var Books = Books.filter(book => book.theloai==key);

  var number=1;
  while(number<=7){
  var i = Math.floor(Math.random() * Books.length)+1;  

  content+= `<div class="khung">

        <a href="Detail.html?`+Books[i].tensach+`"><img src="img/`+Books[i].tensach+`.jpg"></a>
        <div class="chitiet">
            <a href="Detail.html?`+Books[i].tensach+`">`+Books[i].tensach+`</a>
        </div>
        <div class="tacgia">
          `+Books[i].tacgia+`
        </div>
        <div class="gia">
            `+parseFloat(Books[i].gia).toFixed(3)+`đ
        </div>
         <div class="add">
           <button class="addtocart" onclick="addToCart('`+Books[i].tensach+`')">Thêm vào giỏ</button>
         </div>
        </div>`;
  number++;
}
  return content;
}
window.addEventListener("load",document.getElementById("soluongsanpham").innerHTML = getInCart());


function addToCart(tenSach){
  var Books = getDataFromLocal(Books,"sanpham");
  for(let value of Books){
    if(value.tensach==tenSach){ value.soluong+=1;
      alert("Đã thêm vào giỏ hàng");
      setDataToLocal(Books,"sanpham");
      break;
    }

  }
 document.getElementById("soluongsanpham").innerHTML = getInCart();
}



function createDB(){

var Books = getDataFromLocal(Books,"sanpham");
var kynang = Books.filter(book => book.theloai=="Kỹ Năng");
setDataToLocal(kynang,"Kỹ Năng");
var vanhoc = Books.filter(book => book.theloai=="Văn Học");
setDataToLocal(vanhoc,"Văn Học");
var thieunhi = Books.filter(book => book.theloai=="Thiếu Nhi");
setDataToLocal(thieunhi,"Thiếu Nhi");
var tieuthuyet = Books.filter(book => book.theloai=="Tiểu Thuyết");
setDataToLocal(tieuthuyet,"Tiểu Thuyết");
  console.log("DB CREATED!!!!!!");
}




function getNoiBat(){
  var Books = getDataFromLocal(Books,"sanpham");
  number=1;
while(number<=7){
  var i = Math.floor(Math.random() * Books.length)+1;  
  Books[i].noibat=1;
number++}


  var noibat = Books.filter(book => book.noibat==1);
  setDataToLocal(noibat,"Nổi Bật");
  console.log('set Noi Bat DONE!!!!');
}


function getMoiPhatHanh(){
  var Books = getDataFromLocal(Books,"sanpham");
  number=1;
while(number<=7){
  var i = Math.floor(Math.random() * Books.length)+1;  
  Books[i].moiphathanh=1;
number++}


  var  moiphathanh = Books.filter(book => book.moiphathanh==1);
  setDataToLocal(moiphathanh,"Mới Phát Hành");
  console.log('set MPH DONE!!!!');
}



function getBanChay(){
  var Books = getDataFromLocal(Books,"sanpham");
  number=1;
while(number<=7){
  var i = Math.floor(Math.random() * Books.length)+1;  
  Books[i].banchay=1;
number++}


  var  banchay = Books.filter(book => book.banchay==1);
  setDataToLocal(banchay,"Bán Chạy");
  console.log('set Ban Chay DONE!!!!');
}



