window.allUsers = JSON.parse(localStorage.getItem("users")) || [];
console.log(allUsers);
let userName=document.querySelector(".userName")
storedUserName= localStorage.getItem("userName");
userName.innerHTML=storedUserName;

document.querySelector("#btn-logout").addEventListener('click',function(){
    localStorage.removeItem("userName")
})
