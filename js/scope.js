// const name = "hiue"; //global
// {
//   let msg = ""; //block level
// }

// function h() {
//   let hello = "khfiuerg"; //function level
// }

// const msg = () => {
//   let msg = "felfyler";
//   console.log(msg);
// };

// const calaculate = (num) => {
// let sum=  num + 5;
// return sum;
// };

// console.log(calculator);

// const calculator = (num) => {
//   let sum = 0;
//   let name = "arvind"; //important
//   sum += num; //4
//   return sum; //4+4
// };

// function hello() {
//   console.log("object");
// }

// console.log(calculator(4));
// console.log(calculator().name)

// console.log(name);

// var name="name";

// closer

// const hello = (name) => {

//   const inner = () => {
//     // let name = "raj";
//     return `hello, ${name}`;
//   };
//   return inner();
// };

// let outerFunResult = hello("arvind");

// console.log(outerFunResult);

// const useState = () => {
//   let name;
//   const setName = (val) => {
//     name = val;
//   };

//   return {name, setName};
// };

// // console.log(useState())
// const [name, setName] = useState();

// setName("arvind");
// console.log(name);

// const useState = () => {
//   let state;

//   const setState = (val) => {
//     state = val;
//   };

//   const getState = () => state;

//   return { getState, setState };
// };

// const { getState, setState } = useState();

// setState("arvind");

// console.log(getState()); // arvind

// event loop

// console.log("fist");

// setInterval(() => {
//   console.log("object");
// }, 10000);

// console.log("second");

// call stack
// microtask
// macrotask
// api
// call back queue

// excution context //memory ,phase excution

// call back hell

// apis

// promise >
// promise chain
// async await
// fetch || axios
// try {
// } catch (error) {
// } /// error handling throw, try-catch
// file handling
// moduleing  import and export

// oops

// let name="gfle"??null;
// users?.name

// let name = "dhwegf";
// console.log(name);

// const calculateTotal = (arr) => arr.reduce((acc, num) => acc + num, 0);
// const div = (val) => (val += val / 2);

// const calculate = (arr) => {
//   const fisrtResult = calculateTotal(arr); //tottal+total/2
//   const final = div(fisrtResult);
//   console.log(final);
// };

// calculate([1, 2, 3, 4, 5, 6]);

// setInterval
// setTimeout
// date

// setTimeout(()=>{
// console.log("object");
// },1000);

// setInterval(()=>{
//     console.log("call dashboard");
// },1000);

// throttlinh //setInternal
// debouncing //sdfsfhsufhfhdfdhfdhdfhdf/ha/
// vertulization //windowing

// currentPage=1
// itemsPerPage=10
// itemList=0 to 10

// currentPage=2
// itemsPerPage=10
// itemList=11 to 20

const pagination = (page, items, itemsPerPage = 10) => {
  const start = page * itemsPerPage;
  const end = start + itemsPerPage;
  return items.slice(start, end);
};

console.log("start api calling...");

fetch("https://jsonplaceholder.typicode.com/posts")
  .then((response) => response.json())
  .then((json) => {
    const page = 1; // current page
    const itemsPerPage = 10;
    const itemList = pagination(page, json, itemsPerPage);
    console.log(`Page ${page + 1}:`, itemList);
    console.log(`Total items: ${json.length}`);
    console.log(`Total pages: ${Math.ceil(json.length / itemsPerPage)}`);
    
  });

//   .catch((err) => console.log(err.message))
//   .finally(() => console.log("end api calling...")); // This will log after API completes
// console.log(users);
