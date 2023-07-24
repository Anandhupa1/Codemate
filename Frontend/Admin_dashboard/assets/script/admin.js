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
  window.location.href = "https://tutor-track.vercel.app/"
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
    fetch("https://codematebackendserver.onrender.com/users?role=student")
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
    fetch("https://codematebackendserver.onrender.com/users?role=tutor")
        .then((res)=>res.json())
        .then(res=>{
            // console.log(res)
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

fetch('https://codematebackendserver.onrender.com/users?role=student')
        .then(res => res.json())
        .then(data => {
            // console.log(data.length)   
          const totalS = document.querySelector("#totalS")
          totalS.innerHTML = data.length
      })
        .catch((err)=>{
          console.log(err)
        })

// -----------------------TOTAL TUTOR--------------------------------

fetch('https://codematebackendserver.onrender.com/users?role=tutor')
        .then(res => res.json())
        .then(data => {
            // console.log(data.length)   
          const totalU = document.querySelector("#totalT")
          totalU.innerHTML = data.length
      })
        .catch((err)=>{
          console.log(err)
        })

// -----------------TOTAL EARNINGS--------------------------

// fetch('https://pink-eagle-coat.cyclic.app/paiduser/total-earning')
//         .then(res => res.json())
//         .then(data => {
//           let total = data.data[0].total
//           // console.log(total)   
//           const totalE = document.querySelector("#totalE")
//           totalE.innerHTML = `₹ ${total}`
//       })
//         .catch((err)=>{
//           console.log(err)
//         })


//-----------------------DASHBOARD PAGE [Recent Tutors]---------------------------


function fetchedUser(){
  fetch("https://codematebackendserver.onrender.com/users?role=tutor")
      .then((res)=>res.json())
      .then(res=>{
          console.log(res)
          displayData(res)
      })

      .catch((err)=>{
          return err
      })
  }
  fetchedUser()

function displayData(data){
const tbody = document.querySelector(".recentOrders tbody")
tbody.innerHTML = null;

data.forEach((el)=>{

  let row = document.createElement("tr");
  let name = document.createElement("td");
  let subject = document.createElement("td");
  let fees = document.createElement("td");
  let location = document.createElement("td");
  // let statusInside = document.createElement("span");

  name.textContent = el.name;
  subject.textContent = el.price;
  fees.textContent = el.plan;
  location.textContent = el.location;
  // statusInside.setAttribute("class", "status delivered")
  // status.appendChild(statusInside);
  row.append(name,subject,fees,location)
  tbody.append(row)
})
}

//------------------------Recent Students--------------------------


function fetchUsers() {
  fetch("https://codematebackendserver.onrender.com/users?role=student")
    .then(res => res.json())
    .then(data => {
      const Sbody = document.querySelector(".recentCustomers tbody")

      data.forEach(user => {
        const userRow = document.createElement("tr");

        const userImageCell = document.createElement("td");
        userImageCell.style.width = "60px";
        // userImageCell.width = "60px";
        const userImage = document.createElement("div");
        userImage.className = "imgBx";
        // userImage.className = "imgBx";
        const profilePic = document.createElement("img");
        profilePic.src = user.profilePic; // Replace "profilePic" with the actual property name in the user object
        profilePic.alt = "User's profilePic";
        userImage.appendChild(profilePic);
        userImageCell.appendChild(userImage);

        const userDetailsCell = document.createElement("td");
        const userDetails = document.createElement("h4");
        userDetails.innerHTML = `${user.name}<br><span>${user.location}</span>`; // Replace "name" and "location" with the actual property names in the user object
        userDetailsCell.appendChild(userDetails);

        userRow.appendChild(userImageCell);
        userRow.appendChild(userDetailsCell);

        Sbody.appendChild(userRow);
      });
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
}

fetchUsers();

// ------------------Admin------------------------

const getAdmin = document.querySelector("#getAll");


getAdmin.addEventListener("click", async (e)=>{
  e.preventDefault()
  addBox.innerHTML = ""
  addBox.id = ""
  addBox.classList.remove("details")
  addBox.setAttribute('id', 'getpro');
  addBox.style.display = 'grid';
  addBox.style.gridTemplateColumns = 'repeat(3, 1fr)';

  try {
    const response = await fetch('assets/script/adminData.json');
    const usersData = await response.json();

    usersData.forEach(user => {
      const getbox = document.createElement("div");
      const image = document.createElement("img");
      image.style.borderRadius = '50%';
      const name = document.createElement("h2");
      const email = document.createElement("p");

      image.src = user.img;
      name.textContent = user.name;
      email.textContent = user.email;

      getbox.append(image, name, email);
      addBox.appendChild(getbox);

    });

  } catch (error) {
    console.error('Error fetching data:', error);
  }

})


// -------------------------Appoint new tutor--------------------------

const addNewTutor = document.querySelector("#addnew");

addNewTutor.addEventListener("click", (e)=>{
  e.preventDefault()
  addBox.innerHTML = ""
  addBox.id = ""
  addBox.classList.remove("details")
  addBox.classList.add('tutor-form-container')
    
  createTutorForm();
})

function createTutorForm() {
  const formContainer = document.createElement('div');

  const tutorForm = document.createElement('form');
  tutorForm.id = 'tutorForm';

  const formFields = [
    { label: 'Name:', type: 'text', id: 'name'},
    { label: 'Email:', type: 'email', id: 'email' },
    { label: 'Password:', type: 'password', id: 'password' },
    { label: 'Confirm Password:', type: 'text', id: 'cPassword' },
    { label: 'Profile Picture:', type: 'text', id: 'profilePic' },
    { label: 'Role:', type: 'text', id: 'role', value: 'tutor' },
    { label: 'Location:', type: 'text', id: 'location'},
    { label: 'Description:', type: 'textarea', id: 'description' },
    { label: 'Subject:', type: 'text', id: 'subject' },
    { label: 'Fees:', type: 'number', id: 'fees'}
  ];

  formFields.forEach(field => {
    const label = document.createElement('label');
    label.textContent = field.label;
    const input = document.createElement(field.type === 'textarea' ? 'textarea' : 'input');
    input.type = field.type;
    input.id = field.id;
    if (field.required) {
      input.required = true;
    }
    if (field.type === 'checkbox') {
      input.style.display = 'inline';
    }
    if (field.value) {
      input.value = field.value;
    }

    tutorForm.appendChild(label);
    tutorForm.appendChild(input);
    tutorForm.appendChild(document.createElement('br'));
  });

  const addButton = document.createElement('button');
  addButton.type = 'submit';
  addButton.textContent = 'Add New Tutor';

  tutorForm.appendChild(addButton);
  formContainer.appendChild(tutorForm);
  addBox.appendChild(formContainer);

  tutorForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const formElements = event.target.elements;

    const tutorData = {
      name: formElements.name.value,
      email: formElements.email.value,
      password: formElements.password.value,
      cPassword: formElements.cPassword.value,
      profilePic: formElements.profilePic.value,
      role: formElements.role.value,
      location: formElements.location.value,
      description: formElements.description.value,
      subject: formElements.subject.value,
      fees: formElements.fees.value
    };

    // Validate all fields are filled
    for (const key in tutorData) {
      if (tutorData[key] === '') {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Please fill all the input fields!',
        });
        return;
      }
    }

    // Make the POST request
    fetch('https://codematebackendserver.onrender.com/user/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(tutorData)
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'New tutor added',
      }).then(() => {
        window.location.reload(); 
      });
    })
    .catch(error => {
      console.error('Error adding tutor:', error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'An error occurred while adding the tutor!',
      });
    });
  });
}
