
if(sessionStorage.getItem("logined")=="true"){window.location.href=`https://tutor-track.vercel.app`}



let baseUrl = "https://codematebackendserver.onrender.com"
let submitBtn = document.getElementById("submitBtn");
let email = document.getElementById("email");
let password = document.getElementById("password")
submitBtn.addEventListener("click",(e)=>{
   let obj = {
    email : email.value,
    password:password.value
   }

//___________________________________________________________________________________________________
async function fetchData(){
if(obj.email=="admin@gmail.com" && obj.password=="admin"){
  
  window.location.href="https://codemate-admindashboard.netlify.app"}
else{
 let res = await fetch(`${baseUrl}/user/login`, {
  method: 'POST',
  body: JSON.stringify(obj),
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  },
})
let data = await res.json();
if(!res.ok){
  
  alert1(data)
}
else {
  
  swal.fire({
    title : data.msg,
    icon:"success",
    confirmationButtonText:"continue"
  }).then((result)=>{
    if(result.isConfirmed){window.location.href=`https://tutor-track.vercel.app?t=${data.authToken}`}
  })
}

}

}fetchData()


//__________________________________________________________________________________________________
})


function alert1(msg="something went wrong"){
  swal.fire({
    title : "oops!!",
    text : msg,
    icon : "warning",
  });
}

    