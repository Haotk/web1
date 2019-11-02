
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
                  alert("ĐĂNG KÝ THÀNH CÔNG");
                  window.location ="LoginForm.html";
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
        alert("Đăng nhập thành công");
        window.location = "Index.html";
  } 
    else alert("Sai thông tin đăng nhập");
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
          b.innerHTML += "<a href='"+arr[i]+"'></a>"
          /*execute a function when someone clicks on the item value (DIV element):*/
          b.addEventListener("click", function(e) {
              /*insert the value for the autocomplete text field:*/
              window.location = this.getElementsByTagName("input")[0].value+".html"; // TIM KIEM KIEU 1
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
var countries = ["Những kẻ thất tình","Afghanistan","Albania","Algeria","Andorra","Angola","Anguilla","Antigua & Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia & Herzegovina","Botswana","Brazil","British Virgin Islands","Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Canada","Cape Verde","Cayman Islands","Central Arfrican Republic","Chad","Chile","China","Colombia","Congo","Cook Islands","Costa Rica","Cote D Ivoire","Croatia","Cuba","Curacao","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Eritrea","Estonia","Ethiopia","Falkland Islands","Faroe Islands","Fiji","Finland","France","French Polynesia","French West Indies","Gabon","Gambia","Georgia","Germany","Ghana","Gibraltar","Greece","Greenland","Grenada","Guam","Guatemala","Guernsey","Guinea","Guinea Bissau","Guyana","Haiti","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kiribati","Kosovo","Kuwait","Kyrgyzstan","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macau","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Marshall Islands","Mauritania","Mauritius","Mexico","Micronesia","Moldova","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Myanmar","Namibia","Nauro","Nepal","Netherlands","Netherlands Antilles","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","North Korea","Norway","Oman","Pakistan","Palau","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Puerto Rico","Qatar","Reunion","Romania","Russia","Rwanda","Saint Pierre & Miquelon","Samoa","San Marino","Sao Tome and Principe","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","Solomon Islands","Somalia","South Africa","South Korea","South Sudan","Spain","Sri Lanka","St Kitts & Nevis","St Lucia","St Vincent","Sudan","Suriname","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor L'Este","Togo","Tonga","Trinidad & Tobago","Tunisia","Turkey","Turkmenistan","Turks & Caicos","Tuvalu","Uganda","Ukraine","United Arab Emirates","United Kingdom","United States of America","Uruguay","Uzbekistan","Vanuatu","Vatican City","Venezuela","Vietnam","Virgin Islands (US)","Yemen","Zambia","Zimbabwe"];
//TIM KIEM KIEU 2
function search(){
	window.location =document.getElementById("suggest").value;
}
//KET THUC TIM KIEM KIEU 2
//ENDOFAUTOCOMPLETE


function change(num){
  var item = document.getElementsByClassName("items");
    for (let i=0;i<item.length;i++){

       item[i].className = item[i].className.replace(" active", "");
    }
    item[num].className += " active";
}
function slicks(){
$('.trendingproducts').slick({
    slidesToShow: 5,
    slidesToScroll: 5,
    dots: true,
    infinite: true,
    cssEase: 'linear'
});
}
window.addEventListener("load",slicks);