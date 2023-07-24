
checkLoginStatus()
let mainUrl = "https://codematebackendserver.onrender.com";
let userData = JSON.parse(sessionStorage.getItem("userData"));
let role = userData.role;

if(role=="student"){
   document.getElementById("dashBoardName").innerText="Student's Dashboard";
}
else {
    document.getElementById("dashBoardName").innerText="Tutor's Dashboard";
}
updateTableHeaderOnRole()
//-------------------------------------------------------------------------------------------------------------

fetchData()
async function fetchData(){
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('authToken', sessionStorage.getItem("authToken"));
    const response = await fetch(`${mainUrl}/bookings?role=${role}`, {
        method: 'GET', // Change to 'POST', 'PUT', 'DELETE', etc. for other types of requests
        headers: headers,
      });
    const data = await response.json();
    if(response.ok){
        //-----------got data 
         updateTable(data)
        //--------------------------
    }
    else{
        swal.fire({
            icon:"error",
            text : "something went wrong"
        })
    }
}



function updateTable(arr){
let tbody = document.getElementById("tbody1");
 tbody.innerHTML=null;
 

 arr.forEach((item,i) => {
    let tr = document.createElement("tr");
    if(item.meetingStatus=="accepted"){ tr.classList.add("accepted")}
    if(item.meetingStatus=="pending"){ tr.classList.add("pending")}
    if(item.meetingStatus=="rejected"){ tr.classList.add("rejected")}
    if(role=="student"){//___________________________________________________________student
    tr.innerHTML=`
    <th>${i+1}</th>
    <th>${item.id}</th>
    <th>${item.instructorID}</th>
    <th>${item.date},${item.day}</th>
    <th>${item.timeSlot}</th>
    <th>${item.meetingStatus}</th>
    <th>  <button onClick="deleteBooking(${item.id})" class="beautiful-button ">Delete</button></th>
    `
    }else if(role=="tutor"){//__________________________________________________________tutor
    //     tr.innerHTML=`
    //     <th>${i}</th>
    // <th>${item.id}</th>
    // <th>${item.studentID}</th>
    // <th>${item.date},${item.day}</th>
    // <th>${item.timeSlot}</th>
    // <th>${item.meetingStatus}</th>
    //     <th>
    //       <select  onChange='selectTagChanged("${item.meetingStatus}")'  name="" id="appointmentStatus" class="beautiful-select">
    //         <option value="accept">Accept</option>
    //         <option value="reject">Reject</option>
    //       </select>
    //     </th>
    //     <th>  <button  onClick='updateStatus("${item.id}")' class="beautiful-button">update</button></th>
    //     `
    let th0 = document.createElement("th");
    th0.innerText = i+1;
    tr.append(th0)
    let th1 = document.createElement("th");
    th1.innerText = item.id;
    tr.append(th1)
    let th2 = document.createElement("th");
    th2.innerText = item.studentID;
    tr.append(th2)
    let th3 = document.createElement("th");
    th3.innerText = item.day;
    tr.append(th3)
    let th4 = document.createElement("th");
    th4.innerText = item.timeSlot;
    tr.append(th4)
     let th7 = document.createElement("th");
    th7.innerHTML=`<button  class="beautiful-button">${item.meetingStatus}</button>`
    tr.append(th7)
 
    let th6 = document.createElement("th");
      //_____________________________________
        let select = document.createElement("select");
        select.setAttribute("id","appointmentStatus");
        select.classList.add("beautiful-select");
        select.innerHTML=`<option value="" disabled selected>Select an option</option> <option value="accepted">Accept</option>
                 <option value="rejected">Reject</option>`
        select.addEventListener("change",(e)=>{
            // alert(e.target.value)
            if(e.target.value!==item.meetingStatus){
            updateStatus(item.id,e.target.value)
            }
        })
        th6.append(select)
      //_____________________________________
    tr.append(th6)
    

    }
    tbody.append(tr)
 });
}













//utility functions ----------------------------------------------------------------------------------------------------


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
function updateTableHeaderOnRole(){
    
    let tableHeader = document.getElementById("tHead");
    if(role=="student"){
     let tr = document.createElement("tr");
     tr.innerHTML= `
     <th>S.No</th>
     <th>Meeting ID</th>
     <th>Instructor ID</th>
     <th>Start Time</th>
     <th>End Time</th>
     <th>status</th>
     <th>Delete</th>
  `
  tableHeader.append(tr)
    }else if(role=="tutor")  {
        let tr = document.createElement("tr");
     tr.innerHTML= `
     <th>S.No</th>
     <th>Meeting ID</th>
     <th>Student ID</th>
     <th>Date</th>
     <th>Time</th>
     <th>status</th>
     <th>change status</th>
    
  `
  tableHeader.append(tr)
    }
}





const boxes = document.querySelectorAll(".box");
const cont = document.getElementById("cont");
boxes.forEach(box => {
    box.addEventListener("click", () => {
        boxes.forEach((box) => { box.style.backgroundColor = "#5184eb"; box.style.color = "white" })

        box.style.backgroundColor = "white"
        box.style.color = "black";
    })
});

async function updateStatus(id,status){
    
    
  
   let obj ={meetingStatus:status}
   
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('authToken', sessionStorage.getItem("authToken"));
    const response = await fetch(`${mainUrl}/bookings/update/${id}`, {
        method: 'PATCH', // Change to 'POST', 'PUT', 'DELETE', etc. for other types of requests
        headers: headers,
        body : JSON.stringify(obj)
      });
    const data = await response.json();
    
    if(response.ok){
        swal.fire({
            icon:"success",
            text  :`status updated to ${data.updatedBooking.meetingStatus} for booking with id ${data.updatedBooking.id}`
        }).then((result)=>{
            if(result.isConfirmed){
                fetchData()
            }
        })
    }
    else {swal.fire({icon:"error",text:"something went wrong"})}
}


//student should be able to delete booking
async function deleteBooking(id){

   
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('authToken', sessionStorage.getItem("authToken"));
        const response = await fetch(`${mainUrl}/bookings/delete/${id}`, {
            method: 'DELETE', // Change to 'POST', 'PUT', 'DELETE', etc. for other types of requests
            headers: headers,
          });
        const data = await response.json();
        if(response.ok){
            // alert("deleted successfully")
            swal.fire({
                icon : "success",
                text : "deleted successfully",
            })
            //-----------got data 
             fetchData();
            //--------------------------
        }
        else{
            swal.fire({
                icon:"error",
                text : "something went wrong"
            })
        }
    
    
    
   }

