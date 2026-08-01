// if
// if else
// else if //else if lader
// switch
// ternary operator

// const user = {} ?? "";

// let n1 = undefined;
// let m; //undefined
// n1 = {};

// let user = {} || null;
// name = use.name || "";

// console.log(user);
// user = {};
// console.log(typeof m);
// console.log(m);
// console.log(typeof n1);

let marks = 101;

// if (marks > 50) {
//   console.log("pass");
// } else {
//   console.log("fail");
// }

// if (marks < 33) {
//   console.log("fail");
// } else if (marks < 50 && marks >= 33) {
//   console.log("grade d");
// } else if (marks < 65 && marks >= 50) {
//   console.log("grade c");
// } else if (marks < 75 && marks >= 65) {
//   console.log("grade b");
// } else if (marks > 100) {
//   console.log("invalid marks");
// } else {
//   console.log("grade a");
// }

// let days = 3;
// switch (days) {
//   case 1:
//     console.log("monday");
//     break;
//   case 2:
//     console.log("tuesday");
//     break;
//   default:
//     console.log("please enter valid day");
// }

// switch (true) {
//   case marks < 33 && marks >= 10:
//     console.log("fail");
//     break;
//   default:
//     console.log("object");
// }

// marks > 33 && marks < 50
//   ? console.log("pass")
//   : marks >= 50 && marks < 70
//     ? console.log("grade c")
//     : marks >= 70 && marks < 80
//       ? console.log("grade b")
//       : marks >= 80 && marks <= 100
//         ? console.log("grade a")
//         : marks < 33 && marks > 0
//           ? console.log("fail")
//           : console.log("ivalid marks");

const calculator = (num1, num2, operator) => {
  switch (operator) {
    case "+":
      console.log(num1 + num2);
      break;
    case "-":
      console.log(num1 - num2);
      break;
    case "/":
      console.log(num1 / num2);
      break;
    case "%":
      console.log(num1 % num2);
      break;
    case "**":
      console.log(num1 ** num2);
      break;
    default:
      console.log("please enter valid operator");
  }
};

// calculator(5,2,"/");

const date = new Date();

// console.log(date.toLocaleDateString());
// console.log(date.getDay());
// console.log(date.getMonth());
// console.log(date.getFullYear());

// console.log(date.getHours());
// console.log(date.getMinutes());
// console.log(date.getSeconds());

let hours = 10;

let minutes = date.getMinutes();

const seconds = date.getSeconds();

let zone = hours > 12 ? "AM" : "PM";

hours = hours > 12 ? hours - 12 : hours;
// console.log(date.toDateString());
// console.log(date.toLocaleTimeString());
// console.log(date.toTimeString());
// console.log(hours + ":" + minutes + " " + zone);
// let time=date.toLocaleTimeString();
// let time=date.toUTCString();


// console.log(time)

// 0
// 1
// 2

// jan=0


