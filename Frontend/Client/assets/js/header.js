function updateUserInfo(){
    let userDiv = document.getElementById("userInfoDiv");
    if(sessionStorage.getItem("logined")=="true"){
      let userData =JSON.parse(sessionStorage.getItem("userData"));
        userDiv.innerHTML=`
        <a href="./login.html"><button class="signup">${userData.name}<i class="fa-solid fa-caret-down"></i></button></a>
                        <div class="dropdown-content">
                          <a href="./profile.html">
                            <img src=${userData.profilePic} alt="User Profile">
                            <span>Profile</span>
                          </a>
                          <a href="./dashboard.html"><i class="fa-solid fa-right-from-bracket"></i> &nbsp; &nbsp; Dashboard</a>
                          <a onClick="logout()"><i class="fa-solid fa-right-from-bracket"></i> &nbsp; &nbsp; Logout</a>
                          
                        </div>`
    }else{
     userDiv.innerHTML=`
     <a href="./login.html"><button class="signup">Login</button></a>`
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