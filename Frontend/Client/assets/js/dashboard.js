
checkLoginStatus()
let mainUrl = "http://localhost:4001";
let userData = JSON.parse(sessionStorage.getItem("userData"));
let role = userData.role;
updateTableHeaderOnRole()
//-------------------------------------------------------------------------------------------------------------

fetchData()
async function fetchData(){
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('authToken', sessionStorage.getItem("authToken"));
    const response = await fetch(`${baseUrl}/bookings?role=tutor`, {
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
    tr.classList.add("pending")
    if(role=="student"){//___________________________________________________________student
    tr.innerHTML=`
    <th>S.No</th>
    <th>Name</th>
    <th>Email</th>
    <th>Start Time</th>
    <th>End Time</th>
    <th>pending</th>
    <th>
      <select name="" id="appointmentStatus" class="beautiful-select">
        <option value="accept">Accept</option>
        <option value="reject">Reject</option>
      </select>
    </th>
    <th>  <button class="beautiful-button">save</button></th>
    `
    }else if(role=="tutor"){//__________________________________________________________tutor
        tr.innerHTML=`
        <th>S.No</th>
        <th>Name</th>
        <th>Email</th>
        <th>Start Time</th>
        <th>End Time</th>
        <th>pending</th>
        <th>
          <select name="" id="appointmentStatus" class="beautiful-select">
            <option value="accept">Accept</option>
            <option value="reject">Reject</option>
          </select>
        </th>
        <th>  <button class="beautiful-button">save</button></th>
        `
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
    alert(role)
    let tableHeader = document.getElementById("tHead");
    if(role=="student"){
     let tr = document.createElement("tr");
     tr.innerHTML= `
     <th>S.No</th>
     <th>Name</th>
     <th>Email</th>
     <th>Start Time</th>
     <th>End Time</th>
     <th>status</th>
     <th>change status</th>
     <th>confirm</th>
  `
  tableHeader.append(tr)
    }else if(role=="tutor")  {
        let tr = document.createElement("tr");
     tr.innerHTML= `
     <th>S.No</th>
     <th>Name</th>
     <th>Email</th>
     <th>Start Time</th>
     <th>End Time</th>
     <th>status</th>
     <th>change status</th>
     <th>confirm</th>
  `
  tableHeader.append(tr)
    }
}