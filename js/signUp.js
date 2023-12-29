let userName=document.querySelector("#un");
let userEmail=document.querySelector("#ue");
let userPassword=document.querySelector("#up");
let signUp=document.querySelector("#btnSignUp");
let errorName=document.querySelector("#errorName");
let errorEmail=document.querySelector("#errorEmail");
let errorPassword=document.querySelector("#errorPassword");
let masg=document.querySelector(".massage");
let existing=document.querySelector(".existing")


let allUsers=[];
if(localStorage.getItem("users")!=null){
    // JSON.parse bt7wl l to array
    allUsers =JSON.parse(localStorage.getItem("users"));
}


function setToLocalStorage(){
    localStorage.setItem("users",JSON.stringify(allUsers));
}

signUp.addEventListener('click',function(){
    document.querySelector(".cover").style.height="500px";
    document.querySelector(".santa").style.marginTop="30px";
})


//any function has single resposibility
signUp.addEventListener("click", function () {

    // If validation passed and user doesn't exist, proceed with sign-up
    if (validation()===true && isExist()===false) {
        // Create a user object with the input values
        let user = {
            name: userName.value,
            email: userEmail.value,
            password: userPassword.value,
        };

        // Add the new user to the array of all users
        allUsers.push(user);

        // Save the updated user data to localStorage
        setToLocalStorage();

        // Display a success message with green color
        displayMessage('Success', 'green');

        // Clear the form inputs
        clearForm();

      // Redirect to the home.html page after a short delay
      setTimeout(function () {
        location.href ='./login.html';
        }, 1000); // 2000 milliseconds (2 seconds) delay, adjust as needed
           
        // Indicate that the sign-up was successful
        return true;
    } else {
        // If validation or user existence check failed, display an error message with red color
        displayMessage('Fill the inputs first.', 'red');
        // Indicate that the sign-up was not successful
        return false;

    }
});




function displayMessage(message, color) {
    masg.innerHTML = message;
    masg.style.color = color;
    masg.style.textAlign = "center";
    masg.style.fontSize = "14px";
    masg.style.fontWeight="bold";
}


function isExist() {
    for (let i = 0; i < allUsers.length; i++) {
        if (
            allUsers[i].name.toLowerCase() === userName.value.toLowerCase() &&
            allUsers[i].email.toLowerCase() === userEmail.value.toLowerCase()
        ) {
            // If the user already exists, update UI
            existing.classList.remove("d-none","d-block");
            existing.style.color='red';
            existing.style.fontSize='14px';
            existing.style.fontWeight='bold';
            existing.style.textAlign='center';
            masg.classList.add("d-block","d-none");
            
            // Add the "is-invalid" class to indicate an error in the input fields
            userEmail.classList.add("is-invalid");
            userName.classList.add("is-invalid");


            // Return true to indicate that the user already exists
            return true;
        }
    }

    // If no matching user is found, remove the "is-invalid" class if it was previously added
    userEmail.classList.remove("is-invalid");
    userName.classList.remove("is-invalid");
    existing.classList.add("d-block","d-none")
    masg.classList.remove("d-none","d-block");
   
    // Return false to indicate that the user doesn't exist
    return false;
}





function clearForm() {
    userName.value = '';
    userEmail.value = '';
    userPassword.value = '';
}

// checking length of name
function checkName() {
    let n = userName.value;
    let errorMssg;

    if (n.length >= 3 && n.length <= 30) {
        // Username must be at least 3 characters and at most 30 characters
        userName.classList.add("is-valid");
        userName.classList.remove("is-invalid");
        errorMssg = 'Username is correct.';
        errorName.innerHTML = errorMssg;
        errorName.style.color="green";
        errorName.style.fontSize="12px";
        return true;

    } else {
        userName.classList.add("is-invalid");
        userName.classList.remove("is-valid");
        errorMssg = 'Name length should be between 3 and 30 characters'; // Error message for invalid username length
        errorName.innerHTML = errorMssg;
        errorName.style.color="red";
        errorName.style.fontSize="12px";
        return false;
    }
    
}


// checking email format
function checkEmail() {
    let pattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    let e = userEmail.value;
    let errorMssg;

    if (e.match(pattern) && e !== '') {
        userEmail.classList.add("is-valid");
        userEmail.classList.remove("is-invalid");
        errorMssg = 'This is a correct password.'; // No error message for valid email
        errorEmail.innerHTML = errorMssg;
        errorEmail.style.color="green";
        errorEmail.style.fontSize="12px";
        return true;
    } else {
        userEmail.classList.add("is-invalid");
        userEmail.classList.remove("is-valid");
        errorMssg = 'Please enter a valid email address'; // Error message for invalid email
        errorEmail.innerHTML = errorMssg;
        errorEmail.style.color="red";
        errorEmail.style.fontSize="12px";
        return false;
    }
}

// checking password character pattern
function checkPassword() {
    let pattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{8,}$/;
    let p = userPassword.value;
    let errorMssg;

    if (p.match(pattern) && p !== '') {
        userPassword.classList.add("is-valid");
        userPassword.classList.remove("is-invalid");
        errorMssg = 'This is a correct password.';
        errorPassword.innerHTML = errorMssg;
        errorPassword.style.color="green";
        errorPassword.style.fontSize="12px";
        return true; // Password is valid
    } else {
        userPassword.classList.add("is-invalid");
        userPassword.classList.remove("is-valid");
        errorMssg ="Password must contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character, and must be between 8 and 15 characters long.";
        errorPassword.innerHTML = errorMssg;
        errorPassword.style.color="red";
        errorPassword.style.fontSize="12px";
        return false; // Password is invalid
    }
}



// function for form varification
function validation() {
    const isNameValid = checkName();
    const isEmailValid = checkEmail();
    const isPasswordValid = checkPassword();

    if (isNameValid && isEmailValid && isPasswordValid) {
        return true;
    } else {
        return false;
    }
}
