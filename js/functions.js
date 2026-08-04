// functions
// hello();

// console.log(n);
// var n=0;

// function decretion

// function hello() {
//   console.log("hello");
// }

// function expression
// hello();

// great();
// const great=function(){
//     console.log("object")
// }

// const hello = () => {
//   console.log("hello");
// };

function great(name) {
  console.log(`hello, ${name}`);
}

function greatWithReturn(name) {
  return `hello, ${name}`;
}

function add(a, b) {
  console.log(a + b);
}

function addWithReturn(a, b) {
  return a + b;
}

// great("as");

// const msg = greatWithReturn("arvind");
// console.log(msg)
// add(3,4)
// sum/fistnum
// const sum = addWithReturn(3, 4);
// console.log(sum / 3);

// console.log(sum)

// factorial
function sum(num) {
  if (num === 1) {
    return num;
  }
  return num + sum(num - 1); //3+2+1
}

///3+2+1
// sum(3);
// 3+2+1;

// const result=sum(5);
// console.log(result);

// function mixDataType(dataType) {
// if(typeof dataType==="object"){
//     console.log("object");
// }
// if(typeof dataType==="number"){
//     console.log("this is number");
// }
// }

// mixDataType([123,34]);

const products = [
  {
    product: "Laptop",
    price: 50000,
  },
  {
    product: "Laptop",
    price: 50000,
  },
];

// console.log(products);

const calculateTotal = (arr) => {
  // console.log(arr);
  return arr.reduce((acc, product) => acc + product.price, 0);
};
const applyDiscount = (value, tax) => {
  return value + tax / 2;
};
const calculateGst = (total) => total * 1.18;
const onlyTax = (total) => total * 1.18 - total;

const calculateTotalandFindPrcent = (products) => {
  // console.log(products);
  const total = calculateTotal(products);
  const withGst = calculateGst(total);
  const tax = onlyTax(total);
  const baseWithDiscount = applyDiscount(total, tax);
  console.log(baseWithDiscount);
};

// calculateTotalandFindPrcent(products);

// console.log(calculateGst(100000));
// console.log(onlyTax(100000));

// setTimeout(()=>{
// console.log("object")
// },2000);
// function hello() {
//   console.log("hello");
// }
// const timeing=1000;
// setInterval(hello, timeing);

const totalValue = (arr) => arr.reduce((acc, num) => acc + num, 0);

const minusOneByTwo = (value) => value - value / 2;




// const calaculate = (arr, value, minusOneByTwo) => {
//   const r1 = value(arr);
//   const r2 = minusOneByTwo(value(arr));
//   return (r1, r2);
// };
// console.log(calaculate([1,2,3],totalValue,minusOneByTwo))
// console.log(calaculate([1, 2, 3, 4, 5], totalValue, minusOneByTwo));

// const calaculate = ((arr) => arr.reduce((acc, num) => acc + num, 0));

// const result=calaculate([1, 2, 3, 4, 5, 6]);

// console.log(result);


// immidiate invoked function 
// IIFI
// let isBalance=0;
// (()=>{
//   let password="ifhlerig";
//   let accocunt="ry34;hudeilru";
// isBalance=2000;
// })();

// (()=>{})();

// console.log(isBalance);










