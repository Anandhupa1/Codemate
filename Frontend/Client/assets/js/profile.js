// ----------Go back button------------

function showLoadingAlert() {
	Swal.fire({
	  title: 'Extracting User Data...',
	  allowOutsideClick: false,
	  allowEscapeKey: false,
	  onBeforeOpen: () => {
		Swal.showLoading();
	  },
	});
  }

  function populateUserData() {
	// try {
		showLoadingAlert(); 
  
	  const userID = sessionStorage.getItem('authToken');
	  const userObj = JSON.parse(sessionStorage.getItem("userData"));
	  console.log(userObj);
	//   const response = await fetch(`http://localhost:4001/user/${userID}`);
	//   const userData = await response.json();
  
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
  
	//   Swal.close(); 
	// } catch (error) {
	// console.error('Error fetching user data:', error);
	//   Swal.close(); 
	// }
  }
  
	document.addEventListener('DOMContentLoaded', populateUserData);
// window.addEventListener("onload", ()=>{
// 	populateUserData();
// })



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
	  const response = await fetch(`http://localhost:4001/user/update`, {
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
	  } else {
		// Show an error sweet alert if the request failed
		// swal('Error', 'Failed to update data. Please try again.', 'error');
	  }
	} catch (error) {
	  console.error('Error updating user data:', error);
	  // Show an error sweet alert if there was an error in the process
	//   swal('Error', 'An error occurred while updating data. Please try again.', 'error');
	}
  });
  