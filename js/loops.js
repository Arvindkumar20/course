// for
// const printNumbers = (start, nums) => {
//   for (let i = start; i <= nums; i++) {
//     console.log(i);
//   }
// };

// const prinTable = (num) => {
//   for (let i = num; i <= num * 10; i+=num) {//num=2,
//     console.log(i);
//   }
// };
// prinTable(2);
// prinTable(5);

// printNumbers(1,5);
// printNumbers(2,20);

// let nums = [1, 2, 3, 4, 5, 6, 7, 4, 3, 2, 1];
// // nums[0];
// let even = [];
// let odd = [];

// for (let i = 0; i < nums.length; i++) {
//   if (nums[i] % 2 === 0) {
//     even.push(nums[i]);
//   } else {
//     odd.push(nums[i]);
//   }
// }
// let dublicate = [];
// for (let i = 0; i < nums.length; i++) {
//     //i=0
//   for (let j = i + 1; j < nums.length; j++) {//j=i+1 j=3
//     if (nums[i] === nums[j]) {
//       dublicate.push(nums[i]);
//     }
//   }
// }

// console.log(dublicate);

// console.log(even);
// console.log(odd);

// while

// let i = 0;

const printNumbers = () => {
  while (i <= 10) {
    console.log(i);
    i++;
  }
};

const printTable = (num) => {
  //   let tableLength = num * 10;
  //   let inialNumber = num;
  //   while (num <= tableLength) {
  //     console.log(num);
  //     num += inialNumber;
  //   }

  //   let i = 1;
  while (i <= 10) {
    console.log(i * num);
    i++;
  }
};

// printTable(5);

const printNumber = (array) => {
  let i = 0;
  while (i < array.length) {
    console.log(array[i]);
    i++;
  }
};

// printNumber([1,2,3,4,5,6]);
// console.log("second array")
// printNumber([7,8,9,0]);

const evenOdd = (array) => {
  let even = [];
  let odd = [];

  let i = 0;
  while (i < array.length) {
    if (array[i] % 2 === 0) {
      even.push(array[i]);
    } else {
      odd.push(array[i]);
    }
    i++;
  }
  console.log(odd);
  console.log(even);
};

// evenOdd([1, 2, 3, 4, 5, 6, 7, 8, 9, 0]);
// do while
// let j = 0;

// do {
//   console.log(j);
//   j++;
// } while (j < 0);

// for of
let n1 = 5;
// for (let num of [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]) {
//   console.log(num * n1);
// }

// console.log("complete first loop")

// for in
// let user = {
//   name: "arvind",
//   email: "djnef",
// };
// for(let key in user){
//     console.log(user[key]);
// }

// foreach

// [1, 2, 3, 4, 5].forEach((e,i) => {
//   console.log(e);

// });

// console.log("object");

// let newArr=[1, 2, 3, 4, 5].forEach((e,i) => {
// //   console.log(i);
//   return e;
// });

// console.log(newArr);
let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
// arr.map((element,index)=>{
//     console.log(element);
// })

// let num=6;
// let table=arr.map((element,index)=>{

//     return element*num;
// })
// console.log(table);

let name = "hello how are you";

let words = 1;
// for (let char of name) {
//   if(char===" "){
//     continue;
//   }
// else{
//     words++;
// }
// }

for (let char of name.trim()) {
  if (char === "  ") {
    continue;
  }
  if (char === " ") {
    words++;
  }
}
console.log(words);
