//  navigator.geolocation.getCurrentPosition(
//   (position) => {
//     console.log(position.coords.longitude);
//     console.log(position.coords.latitude);
//   },
//   function (error) {
//     console.log(error);
//   },
// );
// navigator.clipboard.writeText("Hello World");
// async function showNotification() {

//     const permission =
//         await Notification.requestPermission();

//     if (permission === "granted") {

//         new Notification("Hello!", {
//             body: "This is a browser notification."
//         });

//     }

// }
// showNotification();
// console.log(location);

// const text=navigator.clipboard.writetext("hello how are you");
// console.log(text);
const pos = document.getElementById("position");
navigator.geolocation.getCurrentPosition(getLocation, handleError); //browser

async function getLocation(position) {
  const curentLocation = await getCurrentLocation(
    position.coords.latitude,
    position.coords.longitude,
  );

  pos.innerHTML = `<h2>latitude : ${position.coords.latitude}</h2>
  <h2>longitude : ${position.coords.longitude}</h2>
  <a
              href="https://www.google.com/maps?q=${position.coords.latitude},${position.coords.longitude}"
              target="_blank"
            >
              Open in Google Maps
            </a>
            
            <h1> Address : ${curentLocation.display_name}</h1>
            
            `;
}

function handleError(error) {
  console.log(error);
}

// getCurrentLocation(latitude,longitude);

async function getCurrentLocation(latitude, longitude) {
  const response = await fetch(
    `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`,
  );

  const data = await response.json();
  //   console.log(data);
  return data;
}
