//--------------------add hovered class to selected list item--------------
let list = document.querySelectorAll(".navigation li");

function activeLink() {
  list.forEach((item) => {
    item.classList.remove("hovered");
  });
  this.classList.add("hovered");
}

list.forEach((item) => item.addEventListener("mouseover", activeLink));

//-----------------------------Menu Toggle---------------------------------

let toggle = document.querySelector(".toggle");
let navigation = document.querySelector(".navigation");
let main = document.querySelector(".main");

toggle.onclick = function () {
  navigation.classList.toggle("active");
  main.classList.toggle("active");
};

//-----------------------------Menu Toggle---------------------------------

const signout = document.querySelector("#signout")

signout.addEventListener("click",()=>{
  window.location.href = "index.html"
})


// ----------------------------Get all students--------------------------------------

const getSButton = document.querySelector("#getStudents")
const addBox = document.querySelector(".details")

getSButton.addEventListener("click",(e)=>{
  e.preventDefault()
  addBox.innerHTML = ""
  addBox.id = ""
  addBox.classList.remove("details")
  addBox.setAttribute('id', 'getpro');

  function fetched(){
    fetch("http://localhost:4001/users?role=student")
        .then((res)=>res.json())
        .then(res=>{
            console.log(res)
            displayData(res)
        })

        .catch((err)=>{
            console.log(err)
        })
    }
    fetched()

    function displayData(data){

      addBox.innerHTML = null

      data.forEach(el=>{
        let getbox = document.createElement("div")
        let image = document.createElement("img")
        let UserID = document.createElement("h4")
        let name = document.createElement("h2")
        let email = document.createElement("p")
        let remove = document.createElement("button")
        let location = document.createElement("p")
      

        image.src = el.profilePic
        UserID.textContent = `ID: ${el.id}`
        name.textContent = `${el.name}`
        email.textContent = `Email  : ${el.email}`
        location.textContent = `Location : ${el.location}`
        remove.textContent = "Delete User"

        remove.addEventListener("click",()=>{
          const confirmed = confirm("Are you sure you want to delete this item?");
              if (confirmed) {
                deleteProduct(el._id)
                location.reload()
              } else {
                // do nothing
              }
        })
        getbox.append(image,UserID,name,email,remove)
        addBox.append(getbox)
      })
    }
  
})

// ----------------------------Get all users--------------------------------------
const getTButton = document.querySelector("#getTutors")

getTButton.addEventListener("click",(e)=>{
  e.preventDefault()
  addBox.innerHTML = ""
  addBox.id = ""
  addBox.classList.remove("details")
  addBox.setAttribute('id', 'getpro');

  function fetched(){
    fetch("http://localhost:4001/users?role=tutor")
        .then((res)=>res.json())
        .then(res=>{
            console.log(res)
            displayData(res)
        })

        .catch((err)=>{
            console.log(err)
        })
    }
    fetched()

    function displayData(data){

      addBox.innerHTML = null

      data.forEach(el=>{
        let getbox = document.createElement("div")
        let image = document.createElement("img")
        let UserID = document.createElement("h4")
        let name = document.createElement("h2")
        let email = document.createElement("p")
        let remove = document.createElement("button")
        let location = document.createElement("p")
      

        image.src = el.profilePic
        UserID.textContent = `ID: ${el.id}`
        name.textContent = `${el.name}`
        email.textContent = `Email  : ${el.email}`
        location.textContent = `Location : ${el.location}`
        remove.textContent = "Delete User"

        remove.addEventListener("click",()=>{
          const confirmed = confirm("Are you sure you want to delete this item?");
              if (confirmed) {
                deleteProduct(el._id)
                location.reload()
              } else {
                // do nothing
              }
        })
        getbox.append(image,UserID,name,email,remove)
        addBox.append(getbox)
      })
    }
  
})


// -----------------------TOTAL STUDENTS--------------------------------

fetch('http://localhost:4001/users?role=student')
        .then(res => res.json())
        .then(data => {
            console.log(data.length)   
          const totalU = document.querySelector("#totalS")
          totalU.innerHTML = data.length
      })
        .catch((err)=>{
          console.log(err)
        })

// -----------------------TOTAL TUTOR--------------------------------

fetch('http://localhost:4001/users?role=tutor')
        .then(res => res.json())
        .then(data => {
            console.log(data.length)   
          const totalU = document.querySelector("#totalT")
          totalU.innerHTML = data.length
      })
        .catch((err)=>{
          console.log(err)
        })

// -----------------------TOTAL ADMIN--------------------------------

fetch('http://localhost:4001/users?role=tutor')
        .then(res => res.json())
        .then(data => {
            console.log(data.length)   
          const totalU = document.querySelector("#totalT")
          totalU.innerHTML = data.length
      })
        .catch((err)=>{
          console.log(err)
        })



// -----------------TOTAL EARNINGS--------------------------

fetch('https://pink-eagle-coat.cyclic.app/paiduser/total-earning')
        .then(res => res.json())
        .then(data => {
          let total = data.data[0].total
          // console.log(total)   
          const totalE = document.querySelector("#totalE")
          totalE.innerHTML = `₹ ${total}`
      })
        .catch((err)=>{
          console.log(err)
        })


//-----------------------DASHBOARD PAGE [Premium Customers]---------------------------


function fetchedUser(){
  fetch("https://pink-eagle-coat.cyclic.app/paiduser/")
      .then((res)=>res.json())
      .then(res=>{
          // console.log(res.data)
          const totalPC = document.querySelector("#totalPC")
          totalPC.innerHTML = `${res.data.length}`
          displayData(res.data)
      })

      .catch((err)=>{
          return err
      })
  }
  fetchedUser()

function displayData(data){
const tbody = document.querySelector(".details tbody")
tbody.innerHTML = null;

data.forEach((el)=>{

  let row = document.createElement("tr");
  let name = document.createElement("td");
  let price = document.createElement("td");
  let status = document.createElement("td");
  let statusInside = document.createElement("span");

  name.textContent = el.username;
  price.textContent = el.price;
  statusInside.textContent = el.plan;
  statusInside.setAttribute("class", "status delivered")
  status.appendChild(statusInside);
  row.append(name,price,status)
  tbody.append(row)
})
}