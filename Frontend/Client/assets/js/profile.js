// ----------Go back button------------
const getBack = document.getElementById("notification-tab");
getBack.addEventListener("click",()=>{
	window.location.href = "../index.html"
})


// ------------Loading alert---------------
const showLoading = function() {
	swal.fire({
	  title: "Loading User's data",
	  allowEscapeKey: false,
	  allowOutsideClick: false,
	  timer: 2000,
	  onOpen: () => {
		swal.showLoading();
	  }
	}).then(
	  () => {},
	  (dismiss) => {
		if (dismiss === 'timer') {
		  console.log('closed by timer!!!!');
		  swal({ 
			title: 'Finished!',
			type: 'success',
			timer: 2000,
			showConfirmButton: false
		  })
		}
	  }
	)
  };
 
//   window.addEventListener("onload", () =>{
// 	showLoading();
//   })

  function populateUserData() {
	// showLoading();
	  const userID = sessionStorage.getItem('authToken');
	  const userObj = JSON.parse(sessionStorage.getItem("userData"));
	//   console.log(userObj);

	  const profileImg = document.getElementById("profileImg");
	  profileImg.src = userObj.profilePic;

	  const profileName = document.getElementById("profileName");
	  profileName.textContent = userObj.name;
	  
	  // Populate input fields with user data
	  document.getElementById('name').value = userObj.name || '';
	  document.getElementById('email').value = userObj.email || '';
	  document.getElementById('role').value = userObj.role || '';
	  document.getElementById('location').value = userObj.location || '';
	  document.getElementById('fees').value = userObj.fees || '';
	  document.getElementById('description').value = userObj.description || '';
	  document.getElementById('profileUrl').value = userObj.profilePic || '';
  
	
  }
  
	document.addEventListener('DOMContentLoaded', populateUserData);


//----------------Update Data-----------------

let updateBtn = document.getElementById('updateButton');


updateBtn.addEventListener('click', async (e) => {
	e.preventDefault();
  
	// Get the updated data from input fields
	const updatedData = {
	  name: document.getElementById('name').value,
	  email: document.getElementById('email').value,
	  role: document.getElementById('role').value,
	  location: document.getElementById('location').value,
	  fees: document.getElementById('fees').value,
	  description: document.getElementById('description').value,
	  profileImage: document.getElementById('profileUrl').value,
	};
	console.log(updatedData)
	try {
	  const userID = sessionStorage.getItem('authToken'); // Get user ID from localStorage
	  const response = await fetch(`https://codematebackendserver.onrender.com/user/update`, {
		method: 'PATCH',
		headers: {
		  'Content-Type': 'application/json',
		  'authToken' : `${userID}`
		},
		body: JSON.stringify(updatedData),
	  });
  
	  // Check if the request was successful (status code 200)
	  if (response.ok) {
		// Show a sweet alert to notify the user that data has been updated
		let data = await response.json();
			swal.fire({
				icon: 'success',
        		title: 'Success!',
        		text: `${data.name}'s data updated`
			});
		
		sessionStorage.setItem('userData',JSON.stringify(data));
		populateUserData();
	  } 
	} catch (error) {
	  console.error('Error updating user data:', error);
	  Swal.fire({
		icon: 'error',
		title: 'Oops...',
		text: 'Some error occured while updating data',
	  });
	}
  });
  