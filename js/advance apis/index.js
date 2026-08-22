let address = document.getElementById("address");
let success = document.getElementById("success");
let copyAddress = document.getElementById("copy-address");
let openAddress = document.getElementById("open-address");

copyAddress.addEventListener("click", async () => {
  navigator.clipboard.writeText(address.innerText);
//   console.log(navigator.clipboard.readText())
  success.innerText = `address copied succefully ${await navigator.clipboard.readText()}! `;
  setTimeout(() => {
    success.innerText = "";
  }, 3000);
});

// openAddress.addEventListener("click", () => {
//   window.href = ``;
// });

// {a,b,c}=[address,success,copyAddress,v]
// {name,email}=user;/

async function loadAdrress() {
  let { lat, lon } = await getCoords();

  openAddress.href = `https://www.google.com/maps?q=${lat},${lon}`;

  openAddress.target = "_blank";

  let localAddress = await getCurrentLocation(lat, lon);
  console.log(localAddress);
  address.innerText = localAddress.display_name;
}

//coords
function getCoords() {
  return new Promise((resolve, reject) => {
    //  resolve("hello")
    // reject("err")

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        resolve({ lat, lon });
      },
      (error) => {
        reject(error);
      },
    );
  });
}

//location
async function getCurrentLocation(lat, lon) {
  let res = await fetch(
    `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`,
  );
  let data = await res.json();
  return data;
}

loadAdrress();
// success msg
