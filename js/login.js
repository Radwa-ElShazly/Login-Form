let email=document.querySelector("#email");
let password=document.querySelector("#password");
let message=document.querySelector(".text");
let btnLogin=document.querySelector("#btnLogin");

// Now,'allUsers' contains the data from the signUp file
window.allUsers = JSON.parse(localStorage.getItem("users")) || [];
console.log(allUsers);

 
btnLogin.addEventListener("click" ,function(){

    if (email.value === "" || password.value === ""){
        errorMssg();

        return false;
    }else{
        confirmMess();        
        email.classList.remove("is-invalid");
        password.classList.remove("is-invalid");
        return true;
        // Store the user's name

    }
})

function errorMssg(){
    let mesg = 'Fill the inputs first.';
    // Assuming 'message' is an HTML element
    message.innerHTML = mesg;
    
    // Apply styles to the 'message' element
    message.style.color = 'red';
    message.style.fontSize = '14px';
    message.style.fontWeight = 'bold';
    message.style.textAlign = 'center';
    email.classList.add("is-invalid");
    password.classList.add("is-invalid");
}


function confirmMess(){
    for(let i=0;i<allUsers.length;i++){
      if(email.value===allUsers[i].email && password.value===allUsers[i].password){


        email.classList.add("is-valid");
        password.classList.add("is-valid");
        let mesg = 'Success';
        // Assuming 'message' is an HTML element
        message.innerHTML = mesg;
    
        // Apply styles to the 'message' element
        message.style.color = 'green';
        message.style.fontSize = '14px';
        message.style.fontWeight = 'bold';
        message.style.textAlign = 'center'; 

        // Redirect to the home.html page after a short delay
        setTimeout(function () {
         location.href = './home.html';
         }, 1000); // 2000 milliseconds (2 seconds) delay, adjust as needed

         let userName = allUsers[i].name;
         localStorage.setItem("userName", userName);

    }
      
    }
}

