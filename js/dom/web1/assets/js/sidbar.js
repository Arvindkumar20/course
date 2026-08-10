let closeSidebar = document.getElementById("closeSidebar");
let openSidebar = document.getElementById("openSidebar");
let hideElements = document.getElementsByClassName("hide");
let profile = document.getElementById("profile");
let aside = document.getElementById("aside");
let navigate = document.getElementById("navigate");
let isAnchor = true;
let loader = document.getElementById("loader");
let isLoding = true;

if (isLoding) {
  loader.style.display = "grid";
  setTimeout(() => {
    loader.style.display = "none";
    isLoding = false;
  }, 2000);
}

// function resposinveScreen() {
//   let screenWidth = window.innerWidth;

//   if (isMobileWidth >= screenWidth) {
//     isAnchor = false;
//     Array.from(hideElements).map((e) => (e.style.display = "none"));
//     profile.style.display = "block";
//     aside.style.width = "50px";
//   } else {
//     if (isAnchor) {
//       openSidebar.href = "https://www.google.com";
//     } else {
//       Array.from(hideElements).map((e) => (e.style.display = "flex"));
//       profile.style.display = "none";
//       aside.style.width = "250px";
//       isAnchor = true;
//     }
//   }
// }

function resposinveScreen() {
  window.innerWidth <= 600 ? closeSidebarFn() : openSideBarFn();
  // if(window.innerWidth<=600){
  //   closeSidebarFn()
  // }else{
  //   openSideBarFn()
  // }
}

window.addEventListener("resize", resposinveScreen);

navigate.addEventListener("click", () => {
  console.log("object");
  window.location = "./login.html";
});

// closeSidebar.addEventListener("click", () => {
// isAnchor = false;
// Array.from(hideElements).map((e) => (e.style.display = "none"));
// profile.style.display = "block";
// aside.style.width = "50px";
// });

// openSidebar.addEventListener("click", () => {
// if (isAnchor) {
//   openSidebar.href = "https://www.google.com";
// } else {
//   Array.from(hideElements).map((e) => (e.style.display = "flex"));
//   profile.style.display = "none";
//   aside.style.width = "250px";
//   isAnchor = true;
// }

// });

openSidebar.addEventListener("click", openSideBarFn);
closeSidebar.addEventListener("click", closeSidebarFn);

function openSideBarFn() {
  if (isAnchor) {
    openSidebar.href = "https://www.google.com";
  } else {
    Array.from(hideElements).map((e) => (e.style.display = "flex"));
    profile.style.display = "none";
    aside.style.width = "250px";
    isAnchor = true;
  }
}

function closeSidebarFn() {
  isAnchor = false;
  Array.from(hideElements).map((e) => (e.style.display = "none"));
  profile.style.display = "block";
  aside.style.width = "50px";
}

// window methods
window.addEventListener("scroll", () => {
  if (window.scrollY > 600) {
    let images = document.getElementsByTagName("img");
    Array.from(images).map(
      (img) =>
        (img.classList = " block"),
    );
  }

  // else {
  //   let images = document.getElementsByTagName("img");
  //   Array.from(images).map((img) => (img.classList = "w-full"));
  //     console.log(window.scrollY);
  // }
});

// console.log(window.location);
  console.log(window.location.hash)

if(window.location.hash=="#contact"){
  console.log(window.location.hash)
  let images = document.getElementsByTagName("img");
    Array.from(images).map(
      (img) =>
        (img.classList = "hidden transion-all duration-600 ease-in animate-pulse"),
    );
}



