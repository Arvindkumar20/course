let userName = document.getElementById("name");
let email = document.getElementById("email");
let password = document.getElementById("password");
let btn = document.getElementById("btn");
let userListElement = document.getElementById("user-item");

// userName.addEventListener("input",(e)=>{
//     console.log(e.target.value);
// });

btn.addEventListener("click", (e) => {
  e.preventDefault();
  let user = {
    name: userName.value,
    email: email.value,
    password: password.value,
  };

    let liTag = document.createElement("li");
    liTag.innerHTML = `<h2>${userName.value}</h2><h3>${email.value}</h3> <h4>${password.value}</h4>`;
    console.log(liTag);
    userListElement.appendChild(liTag);

//   try {
//     let res = axios.post("http://localhost:5000/api/v1/login", { user },{
//         headers:{
//             authrization:"Bearer "
//         }
//     });
//     console.log(res);
//   } catch (error) {
//     console.log(error);
//   }
});
