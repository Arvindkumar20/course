let closeSidebar = document.getElementById("closeSidebar");
let openSidebar = document.getElementById("openSidebar");
let hideElements = document.getElementsByClassName("hide");
let profile = document.getElementById("profile");
let aside = document.getElementById("aside");
let navigate = document.getElementById("navigate");

navigate.addEventListener("click", () => {
  console.log("object");
  window.location = "./login.html";
});
let isAnchor = true;

closeSidebar.addEventListener("click", () => {
  isAnchor = false;
  Array.from(hideElements).map((e) => (e.style.display = "none"));
  profile.style.display = "block";
  aside.style.width = "50px";
});

openSidebar.addEventListener("click", () => {
  if (isAnchor) {
    openSidebar.href = "https://www.google.com";
  } else {
    Array.from(hideElements).map((e) => (e.style.display = "flex"));
    profile.style.display = "none";
    aside.style.width = "250px";
    isAnchor = true;
  }
});
