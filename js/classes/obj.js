// const user={};
// const user =Object({

// });

// const user = Object.create({});
const user = { name: "arvind", email: "arvind@gmail.com" };
const user2 = { name: 212763676, address: "jgygeuy" };
// console.log(user)
user.age = 23;
const newUser = { ...user, ...user2 };
// console.log(newUser);
// console.log(Object.keys(user).length);
// console.log(Object.values(user));
console.log(Object.entries(user));
// console.log(user)

// delete user.name;
// console.log(user.hasOwnProperty("name"));
// console.log(user)

// console.log(user.name);
// user.name="Raj";
// console.log(user["name"]);
// console.log(user["age"]);

// for (let key in user) {
//   console.log(key);
//   //   console.log(user[key]);
// }
