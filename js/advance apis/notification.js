async function handleNotification() {
  const permission = await Notification.requestPermission();

  if (permission !== "granted") return;

  const registration = await navigator.serviceWorker.register("sw.js");

  registration.showNotification("New Message", {
    body: "Hello, you have a new message!",
    icon: "/icon-192.png",
    badge: "/badge-72.png",
    vibrate: [200, 100, 200],
  });
}

handleNotification();