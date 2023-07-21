const baseUrl = "http://localhost:4001"
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
       
         sessionStorage.setItem("logined",true);
         sessionStorage.setItem("userData",JSON.stringify(data));
    }
   }getUser()


}
// sessionStorage.setItem("authToken",token)