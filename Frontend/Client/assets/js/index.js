const baseUrl = "https://codematebackendserver.onrender.com"
const currentURL = window.location.href;
const queryString = currentURL.split('?')[1];
const params = new URLSearchParams(queryString);

const token = params.get('t'); 

if(token && !sessionStorage.getItem("logined") ){
  sessionStorage.setItem("authToken",token)

  async function getUser(){
    
    const response = await fetch(`${baseUrl}/user/profile`, {
        method: 'GET', // Replace with the HTTP method you want (GET, POST, PUT, DELETE, etc.)
        headers: {
            'authToken': token, // Replace with your actual access token
            'Content-Type': 'application/json' // Corrected content type for JSON data
          }
      });
    if(!response.ok){alert("res.ok!==true")}
    else {
        let data = await response.json();
        
         sessionStorage.setItem("logined","true");
         sessionStorage.setItem("userData",JSON.stringify(data));
         
        //  alert(JSON.stringify(data,null,2))
        updateUserInfo()
    }
   }getUser()


}
// sessionStorage.setItem("authToken",token)


// update user info in navbar;
function updateUserInfo(){
let userDiv = document.getElementById("userInfoDiv");
if(sessionStorage.getItem("logined")=="true"){
  let userData =JSON.parse(sessionStorage.getItem("userData"));
    userDiv.innerHTML=`
    <a href="./pages/login.html"><button class="signup">${userData.name}<i class="fa-solid fa-caret-down"></i></button></a>
                    <div class="dropdown-content">
                      <a href="./pages/profile.html">
                        <img src=${userData.profilePic} alt="User Profile">
                        <span>Profile</span>
                      </a>
                      <a  href="./pages/dashboard.html"><i class="fa-solid fa-right-from-bracket"></i> &nbsp; &nbsp; dashboard</a>
                      <a onClick="logout()"><i class="fa-solid fa-right-from-bracket"></i> &nbsp; &nbsp; Logout</a>
                    </div>`
}else{
 userDiv.innerHTML=`
 <a href="./pages/login.html"><button class="signup">Login</button></a>`
}

}updateUserInfo()


function logout(){
  sessionStorage.clear();
  swal .fire({
    icon : "success",
    text : "logged out successfully"
  })
  window.location.href="https://tutor-track.vercel.app"
}