let btn = document.getElementById("btn");
let name = document.getElementById("name");
let email = document.getElementById("email");
let passwordInput = document.getElementById("password");
let showData = document.getElementById("showData");
let useItem = document.getElementById("user-item");

btn.addEventListener("click", handleFormSubmissin);

// function handleFormSubmissin(e) {

//   e.preventDefault();

//   let user = {
//     name: name.value,
//     email: email.value,
//     password: passwordInput.value,
//   };

//   if (name.value !== "" && email.value !== "" && passwordInput !== "") {
//     sessionStorage.setItem("userData", JSON.stringify(user));
//   } else {
//     alert("all fields are required");
//   }

//   let userData=sessionStorage.getItem("userData");
//   console.log(userData);

// }

//  let userData=JSON.parse(sessionStorage.getItem("userData"));
//   console.log(userData);

function handleFormSubmissin(e) {
  e.preventDefault();
  let user = {
    name: name.value,
    email: email.value,
    password: passwordInput.value,
  };

  if (name.value !== "" && email.value !== "" && passwordInput !== "") {
    cookieStore.set({
      name: "userData",
      value: JSON.stringify(user),
      expires: Date.now() + 24 * 60 * 60 * 1000,
      // secure:true
    });
  } else {
    alert("all fields are required");
  }
}
(async () => {
  let userData = await cookieStore.getAll();
  // let userData = await cookieStore.delete();
  // await cookieStore.delete({ name: "userData" });
  console.log(userData);
})();
