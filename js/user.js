
function writeDataByDOM(id,value){
	document.getElementById(id).value=value;
}
function getUser(){
	var user = getDataFromLocal(user,"user");
	if(!isLogged()){
		window.location ="Index.html";
	}
	else {
		var account = user.filter(user => user.status==1);
		writeDataByDOM("fullname",account[0].name);
		writeDataByDOM("email",account[0].email);
		writeDataByDOM("phone","Chưa cập nhật");
		writeDataByDOM("address","Chưa cập nhật");				
	}
}
window.addEventListener("load",getUser);