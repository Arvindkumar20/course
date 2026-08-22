let btn = document.getElementById("btn");
let para = document.getElementById("para");
let copy = document.getElementById("copy");

btn.addEventListener("click", () => {
  navigator.clipboard.writeText(para.innerText);
  copy.style.color = "green";
  copy.innerText = "Copied successfully";
  setTimeout(() => {
    copy.innerText = "";
  }, 3000);
});
