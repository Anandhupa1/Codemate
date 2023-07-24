// let baseUrl = "https://codematebackendserver.onrender.com"
let baseUrl = "https://codematebackendserver.onrender.com"

let cardContainer = document.getElementById("cardContainer");

// document.getElementById("form").addEventListener("submit",(e)=>{
//     e.preventDefault()
// })
// let arr =[1,2];
// insertCards(arr)

async function fetchAndUpdate(){

let res = await fetch(`${baseUrl}/users?role=tutor`);
let data  = await res.json();

insertCards(data)

}
 fetchAndUpdate()



function insertCards(arr){
cardContainer.innerHTML=null;
arr.forEach(item => {

let newDiv = document.createElement("div");
newDiv.innerHTML=`

<div class="card-box">
  <div  class="profile-avatar" >
    <img style="width: 100%;height: 100%;border-radius: 50%;"  src=${item.profilePic} alt=${item.name}>
  </div>
  <div class="profile-details">
    <h2 class="profile-name">${item.name} </h2>
    <p class="profile-subject">subject : ${item.subject||"all"}</p>
    <p class="profile-date-time">${item.description || "Professional tutor with 5 years exprience and positive attitude"}</p>
    <h4 class="profile-price">₹ 999/-</h4>
    <button onClick='setTutorId(${item.id})' class="book-now-button" >Book Now</button>
  </div>
</div>
`
cardContainer.append(newDiv);

});
}

function setTutorId(a){
   sessionStorage.setItem("tutorId",a);
   showPopup()
}


function bookAppointMent(){
    if(sessionStorage.getItem("logined")){
    let tutorId = sessionStorage.getItem("tutorId");
    let date = document.getElementById("mdate").value;
    let day =findDay(date)
    let timeSlot =document.getElementById("mtime").value;
    let meetingType = document.getElementById("mt").value;

   let obj = {insructorId:tutorId,date,day,timeSlot,meetingType,}

//    alert(JSON.stringify(obj,null,2))
postAppointment(obj)
    }else{
      checkLoginStatus()
    }
}

function findDay(str){
    const date = new Date(str);
const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const dayOfWeek = daysOfWeek[date.getDay()];
return dayOfWeek;
}


async function postAppointment(obj){
 
    try {
        const response = await fetch(`${baseUrl}/bookings/book-slot/${obj.insructorId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json', 
            'authToken' : sessionStorage.getItem("authToken"),
          },
          body: JSON.stringify(obj),
        });
    
        if (response.ok!==true) {
            const responseData = await response.json();
           
               alert(JSON.stringify(responseData))
            // swal.fire({
            //     icon:"error",
            //     text : responseData.message
            // })
         
        }else  {
            
            
            const responseData = await response.json();
            // console.log(responseData)
              // alert(JSON.stringify(responseData,null,2))
            
            swal.fire({
                icon:"success",
                text : responseData.message
            })
    
    }
    
       
      } catch (error) {
        console.error('Error making POST request:', error);
      }
}




//preexisted javascript________________________________________________________________________________________

   
let hamburgerbtn = document.querySelector(".hamburger");
let nav_list = document.querySelector(".nav-list");
hamburgerbtn.addEventListener("click", () => {
  hamburgerbtn.classList.toggle("active");
  nav_list.classList.toggle("active");
});




function showPopup(id) {
var popup = document.getElementById('popup-form');
popup.style.display = 'block';
// You can add additional code here if needed, e.g., to process the selected profile based on the given id.
}

function closeForm() {
var popup = document.getElementById('popup-form');
popup.style.display = 'none';
}



//utility functions
function checkLoginStatus(){
  if(!sessionStorage.getItem("logined")){
   
    swal.fire({
      icon:"warning",
      text : "please login to book an appointment ",
      confirmButtonText : "continue "
  
  
    }).then((result)=>{
     if(result.isConfirmed){  window.location.href="https://tutor-track.vercel.app/pages/login.html";}
    })
  }
  }