function updateUserInfo(){
    let userDiv = document.getElementById("userInfoDiv");
    if(sessionStorage.getItem("logined")=="true"){
      let userData =JSON.parse(sessionStorage.getItem("userData"));
        userDiv.innerHTML=`
        <a href="./login.html"><button class="signup">${userData.name}<i class="fa-solid fa-caret-down"></i></button></a>
                        <div class="dropdown-content">
                          <a href="./pages/profile.html">
                            <img src=${userData.profilePic} alt="User Profile">
                            <span>Profile</span>
                          </a>
                          <a href="./pages/logout.html"><i class="fa-solid fa-right-from-bracket"></i> &nbsp; &nbsp; Logout</a>
                        </div>`
    }else{
     userDiv.innerHTML=`
     <a href="./login.html"><button class="signup">Login</button></a>`
    }
    
    }updateUserInfo()