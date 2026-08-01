// arithmetic

// +
// -
// *
// /
// %=> 5%4=1 rmainder
// ** 5**5 , 4**10

const calculator = (...args) => {
  //   const add = num1 + num2;
  //   const sub = num1 - num2;
  //   const mult = num1 * num2;
  //   const div = num1 / num2;
  //   const modu = num1 % num2;
  //   let result = operator === "+" ? add : null;
  //   result = operator === "-" ? sub : null;
  //   result = operator === "*" ? mult : null;
  //   result = operator === "/" ? div : null;
  //   result = operator === "%" ? modu : null;
  //   return { add, sub, mult, div, modu };
};
// console.log(calculator(7, 3, 2, 3, 4, 5, 67, 8)); // 2%3=2

// assignment

// =
// +=
// -=
// *=
// /=
// %=
// let a=5
// let b =6;
// let c=a+=b;
// console.log(c)
// // a=11
// console.log(a +=b)

// let a=5;
//  a +=5;//a=a+a

//  let b=3;
//  b-=a //b=b-a
//  console.log(a,b)
//  b%=a //b=b%a
//  console.log(b);

let RamAge = 25;
let Sage = 10;
let age = 12;
//  age=RamAge-Sage

// age+=RamAge+Sage;

// comparison
//==
//===
//>
//>=
// <,
// <=
//!=> a!=b

// let a = 5;
// let b = "5";

// console.log(a!==b);
// let userList=[];
// userList>0;
// userList<0;

// userList>10

// logical
// && //
// ||
// !
let isLogin = true;

if (!isLogin) {
  console.log("user not loggedin");
}

// console.log(a != 5); //

// bitwise

// ternary

// a != 6 ? console.log("a not is = 6") : console.log("a is equal 6");

// condition ? "true result" : "false result";
// &&

// a === 5 && console.log(a);

// console.log(a===b??null)
// a="";
// let c=a||"a"
// let realNum=""

// let num=realNum||273284845857

// console.log(c)

// function greate(name="fhegr"){
//    name && console.log("hello ," ,name);
// }

// let name=""||"Arvind";

// console.log(greate(name));

// nulis ??
// typeof operator
const user = {
  name: "Arvind",
  email: "3jk3hr;h4@gmail",
  phone: 346848367,
  password: "ufiwiufwhfiiw4",
  account: "ieh23u;/hfew/",
};

// typeof Error

// ReferenceError
//Dublicate 11000
// SyntaxError

// console.log(typeof user.name);
// console.log(typeof user.phone);
delete user.password;
delete user.account;

// console.log(user);

// delete
// optional chaining
// console.log(user?.salary);
const isSalary = user?.salary ? true : false;
// console.log(isSalary);

// rest {...} //collection
// console.log({...user,address:"fhregr/hu"})
// spread operator  {...} //
const { name, email, password } = user;
// console.log(name,email,password)

// in

// console.log("name" in user)
// console.log("email" in user)
// console.log("password" in user)
let a = 6;
let b = "5";
const result = (a === 5) && (b ==5);
// console.log("with and : ",result);

const orResult=(a === "6") || (b ===5)
// console.log("with or : ",orResult);

const notOp=b!==5;

console.log(notOp)


