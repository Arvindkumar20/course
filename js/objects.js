// let user = {
//   name: "arvind",
//   email: "uifherg",
//   address: {
//     pin: 3843434,
//     city: "3rt43;iy",
//   },
// };

// console.log(user.name)
// console.log(user["email"]);

// let user=Object.create({
//     name:"arvind",
//     email:"jfelyflg"
// });

// console.log(user)
//  console.log(user["email"]);

// Object.freeze(user);
// user.address.city="Lucknow";
// user.address.dist="BKT";

// Object.seal(user);

// user.phone=23844546;
// user.name=23844546;
// console.log(user);

// delete user.address.pin;
// console.log(user);

// const keys = Object.keys(user);

// const values = Object.values(user);

// const entries = Object.entries(user);

// console.log(entries);

// const product = {
//   name: "laptop",
//   category: "electric",
//   price: 40000,
//   qty: 1,
//   calculateGST: function () {
//     this.price = this.price * 1.18;
//     return this.price * this.qty;
//   },
// };

// console.log(product.calculateGST())

// const fun = [
//   function () {
//     console.log("1");
//   },
//   function () {
//     console.log("2");
//   },
//   function () {
//     console.log("3");
//   },
// ];

// console.log(fun[0]());

// for (let key in user){
//   // console.log(key);
//   console.log(`${key} : ${user[key]}`);

// }

// for(let value of user){
//     console.log(value);
// }

// 1. E-commerce product inventory

// Ek product object diya hai. Stock update karo aur total inventory value calculate karo.

const product = {
  id: 101,
  name: "Wireless Mouse",
  price: 799,
  stock: 25,
};

// Tasks:

// Stock me 10 items add karo.

// 3 items sell karo.

// inventoryValue print karo (price × stock).
// product.stock += 10;
// product.stock -= 3;
// product.total = product.price * product.stock;

// console.log(product);

// 2. Employee salary management

// Ek employee object diya hai.

const employee = {
  name: "Rahul",
  department: "Engineering",
  salary: 60000,
  bonus: 5000,
};

// Tasks:
// Total salary calculate karo.
// Salary me 10% increment do.
// Final salary print karo.

// employee.totalSalary=employee.salary+employee.bonus;
// employee.salary+=employee.salary*10/100;

// employee.totalSalary=employee.salary+employee.bonus;
// console.log(employee);

// 3. Online order summary (nested object)

// Ek order object diya hai.

// const order = {
//   orderId: "ORD001",
//   customer: {
//     name: "Aman",
//     city: "Lucknow",
//   },
//   items: [
//     { name: "Keyboard", price: 1200, qty: 2 },
//     { name: "Headphones", price: 1800, qty: 1 },
//   ],
// };

// Tasks:
// Customer ka name aur city print karo.
// Order total calculate karo.
// 18% GST add karke final amount print karo.

// order.total = order.items.reduce((acc, item) => acc + item.price, 0);
// order.basePrice=order.total;
// order.total = order.total * 1.18;

// console.log(order);

// 4. User profile completion checker

// Ek user profile object diya hai.

const user = {
  name: "Neha",
  email: "neha@example.com",
  phone: "",
  address: {
    city: "Delhi",
    pincode: "",
  },
  employee: {
    role: "",
    salary: 3756,
    company: {
      name: "",
    },
  },
};

// Tasks:
// Check karo kaun-kaun fields empty hain.
// Empty fields ki list return karo.
// Profile completion percentage calculate karo.
// Expected output:
// let empty = [];
// let count = [];
// for (let key in user) {
//   count.push(key);
//   if (user[key] === "") {
//     empty.push(key);
//     // console.log(key)
//   }
//   for (let ineerKey in user[key]) {
//     // count.push(ineerKey);
//     console.log(ineerKey);

//     if (user[key][ineerKey] === "") {
//       empty.push(ineerKey);
//     }
//     for (let nestedKey in user[key][ineerKey]) {
//       count.push(nestedKey);

//       if (user[key][ineerKey][nestedKey] === "") {
//         empty.push(nestedKey);
//       }
//     }
//   }
// }

// let keys = Object.keys(user);
// let nextKeys=Object.keys(user[keys])
// console.log(keys);

// const user = {
//   name: "Neha",
//   email: "neha@example.com",
//   phone: "",
//   address: {
//     city: "Delhi",
//     pincode: "",
//   },
// };

let totalFields = 0;
// let filledFields = 0;
// let missingFields = [];

// function checkProfile(obj, parent = "") {
//   for (let key in obj) {
//     const value = obj[key];
//     const fieldName = parent ? `${parent}.${key}` : key;

//     if (typeof value === "object" && value !== null && !Array.isArray(value)) {
//       checkProfile(value, fieldName);
//     } else {
//       totalFields++;

//       if (value === "" || value === null || value === undefined) {
//         missingFields.push(fieldName);
//       } else {
//         filledFields++;
//       }
//     }
//   }
// }

function checkProfile(obj) {
  for (let key in obj) {
    if (typeof key != "object") {
      totalFields++;
    } else {
      for (let innerKey in obj[key]) {
        if (typeof innerKey != "object") {
          totalFields++;
        } else {
          for (let nestedKey in obj[key][nesinnerKeytedKey]) {
            if (typeof nestedKey != "object") {
              totalFields++;
            }
          }
        }
      }
    }
  }
}

checkProfile(user);
console.log(totalFields);
// const completion = (filledFields / totalFields) * 100;

// console.log("Missing:", missingFields.join(", "));
// console.log("Completion:", completion + "%");
