const fetchPost = (method,url,cb,val) =>{
const xhr = new XMLHttpRequest();
xhr.onreadystatechange = function (){
  console.log(xhr.readyState,xhr.status);
  if (xhr.readyState === 4 && xhr.status === 200) {
    cb(null,xhr.responseText);
  }else if(xhr.status ===302){
    window.location.href=xhr.headers.location;
  }

  console.log(xhr.getResponseHeader('location'));
}
xhr.open(method,url,true);
xhr.send(val);
}
