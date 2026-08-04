let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
// for(let i=0;i<arr.length;i++){
//     console.log(arr[i]*2);
// }
// let i=11;
// while(i<arr.length){
//     console.log(arr[i]);
//     i++;
// }

// let i=11;
// do{
//    console.log(arr[i]);
//    i++;
// }while(i<arr.length);

// for(let n of arr){
//     console.log(n);
// }

// for(let n in arr){
//     if(arr[n]>3){
// console.log(n+ " adult")
//     }
// }

// arr.forEach((n,index)=>{
//     console.log(n);
// })

// arr.map((n,index)=>{
//     console.log(n);
// });

// let users = [
//   { name: "arvind", email: "ewfkfge", age: 23 },
//   { name: "arvind", email: "agsdfgu", age: 56 },
//   { name: "fglyew", email: "ergrl@gmail.com", age: 24 },
//   { name: "fglyew", email: "ergrl@gmail.com", age: 25 },
//   { name: "fglyew", email: "ergrl@gmail.com", age: 20 },
// ];

// let newArr = arr.filter((n) => {
//   console.log(n);
// });
// console.log(newArr);
let name = "arvind";
let email = "ergrl@gmail.com";
let age = 24;

// let adults = users.filter((user) => {
//   return user.name === name || user.email === email || user.age === age;
// });

// console.log(adults);

// const newUser=users.slice(users.length-3,users.length);
// const newUser=users.splice(0,3,{name:"newUser",email:"ferlguhlr",age:45});
// console.log(newUser);
// console.log(users);
// console.log(a);
// let a=8;
// users.push({name:"newUser",email:"hruigfler",age:45});
// users.pop();

// users.shift()// remove from first position
// users.unshift({name:"fisrt user",email:"ferhg",age:343454});//add at first position
// console.log(users);

// console.log(users.length)
// const products = [
//   {
//     name: " Laptop",
//     price: 50000,
//     qty: 1,
//     category: "device",
//   },
//   {
//     name: "phone",
//     price: 20000,
//     qty: 1,
//     category: "auto mobile",
//   },
//   {
//     name: "phone",
//     price: 20000,
//     qty: 1,
//     category: "electric",
//   },
//   {
//     name: "charger",
//     price: 2000,
//     qty: 1,
//     category: "auto mobile",
//   },
// ];

// const total=products.reduce((acc,cur)=>{//acc=0,
// return acc+cur.price;//0+50000,50000+20000,70000+2000
// },1000);

// console.log(total);

// const groupBy = products.reduce((acc, cur) => {
//   const key = cur.name;
//   acc[key] = acc[key] || [];//phone:{}
//   acc[key].push(cur);//phone:[cur]
//   return acc;
// }, {});

// console.log(groupBy);

// const numbers = [1, 2, 3, 4, 5, 6, 7];
// const total=numbers.reduce((acc,cur)=>{
// console.log(acc)

//   return acc+cur;
// },0);

// console.log(total);
// console.log(total);

// const numbers = [1, 2, 3, 4, 5, 6];

// const newNumbers = numbers.reduce((acc, num) => {

//   const key = num % 2 === 0 ? "even" : "odd";//even:[],odd:[]

//   acc[key] = acc[key] || [];

//   acc[key].push(num);

//   return acc;
// }, {});

// console.log(newNumbers);

// const isLaptop = products.some(
//   (product) => product.name.trim().toLocaleLowerCase() === "laptop",
// );

// console.log(isLaptop);
// const isElectric = products.some((product) => {
//   return product.category.trim().toLocaleLowerCase() === "electric";
// });
// console.log(isElectric);

// const isElectric=products.every((product)=>{
//   return product.qty === 1;
// });
// console.log(isElectric);

// console.log(products.reverse());

// const isPresent=numbers.includes(1);
//   console.log(isPresent);

let searchValue = 2000;

// const result = products.filter((product) => {
//   return (
//     product?.name.trim().toLocaleLowerCase().includes(searchValue) ||
//     product.price === searchValue ||
//     product.category.includes(searchValue)
//   );
// });

// console.log(result);

// const products = [
//   { id: 1, name: "Phone", category: "Electronics", price: 25000, stock: 10 },
//   { id: 2, name: "Laptop", category: "Electronics", price: 70000, stock: 5 },
//   { id: 3, name: "Shirt", category: "Clothing", price: 1500, stock: 20 },
//   { id: 4, name: "Shoes", category: "Clothing", price: 3000, stock: 8 },
//   { id: 5, name: "Watch", category: "Accessories", price: 5000, stock: 15 },
// ];

const numbers = [2, 5, 8, 10, 13, 17, 20];

const users = [
  { name: "Aman", age: 22, active: true },
  { name: "Riya", age: 17, active: false },
  { name: "Karan", age: 25, active: true },
  { name: "Neha", age: 30, active: false },
];

// const even = numbers.filter((num) => num % 2 === 0);
// const odd = numbers.filter((num) => num % 2 != 0);
// console.log(even);
// console.log(odd);

// const nums = numbers.reduce((acc, num) => {
//   let key = num % 2 === 0 ? "even" : "odd";
//   acc[key] = acc[key] || [];
//   acc[key].push(num);
//   return acc;
// }, {}); //{even:[],odd:[]}

// console.log(nums);

// Get products with price greater than ₹5000.
// const greateThan5k = products.filter((product) => {
// return  product.price > 5000;
// });
// console.log(greateThan5k);

// const greateThan5k = products.reduce((acc, cur) => {
//   cur.price > 5000 ? acc.push(cur) : null;
//   return acc;
// }, []);
// console.log(greateThan5k);
// Get all active users
// const activeUsers = users.filter((user) => user.active);
// console.log(activeUsers)

// const activeUsers = users.reduce((acc, user) => {

//   user.active ? acc.push(user) : null;
//   return acc;

// }, []);
// console.log(activeUsers);

// Add 18% GST to every product price.

// const newProducts = products.map((product) => {
//   product.price = product.price * 1.18;//
//   return product;
// });
// console.log(newProducts);

// Q10. Create a new array like:
// [
//   { name: "Phone", inStock: true },
//   ...
// ]
// new=[];
// const newProducts = products.map((product) => {
//   return { name: product.name, inStock: product.stock };
// });

// console.log(newProducts);

// const products = [
//   { id: 1, name: "Laptop", category: "Electronics", price: 1000 },
//   { id: 2, name: "T-Shirt", category: "Apparel", price: 25 },
//   { id: 3, name: "Headphones", category: "Electronics", price: 150 },
//   { id: 4, name: "Coffee Maker", category: "Home", price: 80 },
//   { id: 5, name: "Keyboard", category: "Electronics", price: 90 },
// ];

// const newsProducts = products.map((product) => {
// product.price= product.price * 0.9;
//   return product;
// });
// console.log(newsProducts);
// const total = products.reduce((acc, product) => {
//   return acc + product.price;
// }, 0);
// console.log(total);

// git init;
// git add .;
// git commit -m "message";
// git hub url past here.
// git push origin main ///master

// now only update repositry
// git add .
// git commit -m "updated"
// git push origin main ya master

// const arr=[1,2,3,4,5,6];
// console.log(arr);
// const newArray=arr.slice(0,arr.length);
// console.log(newArray);

// const newArray = arr.splice(0, 0, 1, 2, 3, 4, 5);
// console.log(newArray);
// console.log(arr);

// arr.forEach((e, i) => {
//   if (i === 4) {
//     console.log(arr[i] * 4);
//   }
//   console.log(e * 2);
// });



// for(let ele of arr){

// }





