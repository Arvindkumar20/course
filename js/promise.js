// let promise = new Promise((resolve, reject) => {
//   //pending,fulfill,reject

//   let success = false;

//   let students = [];

//   setTimeout(() => {
//     if (success) {
//       resolve({ mesg: "success response", isSolved: true });
//     } else {
//       reject({ mesg: "rejected", isSolved: false });
//     }
//   }, 2000);
// });

// console.log(promise);
// promise
//   .then((data) => data)
//   .then((data) => {
//     console.log(data);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// async function hello() {
//   try {
//     let result = await promise;
//     // console.log(result);
//     if (result.isSolved) {
//       console.log(result);
//     } else {
//       throw new Error("your request rejected");
//     }
//   } catch (error) {
//     console.log("Error : ", error);
//   }
// }

const isAuthenticate = (user) => {
  if (user.code == 404) {
    throw new Error("user not found");
  } else if (user.code == 401) {
    throw new Error("unautherized person");
  } else if (user.code == 403) {
    throw new Error("access denied");
  } else if (user.code == 429) {
    throw new Error("too many request requests please wait");
  } else {
    console.log("user Autherized");
  }
};

let user = {
  name: "ajhu",
  code: 404,
};
let user2 = {
  name: "auth",
  code: 401,
};

let user3 = {
  name: "auth",
  code: 403,
};
let user4 = {
  name: "auth",
  code: 429,
};

// try {
// //   console.log(user2);
//   let res = isAuthenticate(user4);
// //   console.log(res);
// } catch (error) {
//   console.log(error.message);
// }

const loadProducts = async () => {
  try {
    let res = await fetch("https://fakestoreapi.com/products");
    let data = await res.json();
    let statusCode = res.status;

    if (statusCode == 200) {
      //201 create ,200 ok , 400 bad request,422 uprocessable entity , 401 unautherized, 403 access denied, 404 page data not, 500 server,
      console.log(data);
    } else {
      throw new Error("API response not success");
    }
  } catch (error) {
    console.log(error.message);
  }
};
loadProducts();
