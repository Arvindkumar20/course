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

// fetch("https://jsonplaceholder.typicode.com/posts")
//   .then((response) => response.json())
//   .then((json) => {
//     const page = 1; // current page
//     const itemsPerPage = 10;
//     const itemList = pagination(page, json, itemsPerPage);
//     console.log(`Page ${page + 1}:`, itemList);
//     console.log(`Total items: ${json.length}`);
//     console.log(`Total pages: ${Math.ceil(json.length / itemsPerPage)}`);
//   });

//   .catch((err) => console.log(err.message))
//   .finally(() => console.log("end api calling...")); // This will log after API completes
// console.log(users);
// const promise = new Promise((resolve, reject) => {
//   fetch("https://jsonplaceholder.typicode.com/posts")
//     .then((response) => resolve(response))
//     .catch((error) => reject(error));
// });

// promise
//   .then((data) => data.json())
//   .then((data) => console.log(data))
//   .catch((err) => console.log(err));

// const loadUsers = async () => {
//   const response = await fetch("https://jsonplaceholder.typicode.com/posts");
//   const result =await response.json();
//   console.log(result);
// };
let errorMsg = "";
const loadUsers = async () => {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();
    if (result.length <= 0) {
      throw new Error("users not found");
    }
    console.log(result);
  } catch (error) {
    errorMsg = error.message;
    console.log(error);
  } finally {
    console.log("completed");
  }
};

loadUsers();

console.log(errorMsg);

//get,post,patch,put,delete

// document.getElementById('loginForm').addEventListener('submit', async function(e) {
//     e.preventDefault();

//     const account = document.getElementById('account').value;
//     const password = document.getElementById('password').value;
//     const errorMessage = document.getElementById('errorMessage');

//     try {
//         // Clear any previous error message
//         errorMessage.textContent = '';

//         const response = await fetch('http://chinamdvr.com:8088/StandardApiAction_login.action', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/x-www-form-urlencoded',
//             },
//             body: `account=${encodeURIComponent(account)}&password=${encodeURIComponent(password)}`
//         });

//         const data = await response.json();
//         console.log('Login response:', data);

//         if (data.result === 0 && data.jsession) {
//             // Store the jsession
//             localStorage.setItem('jsession', data.jsession);

//             // Redirect to vehicle page
//             window.location.href = 'vehicle.html';
//         } else {
//             errorMessage.style.display = 'block'; // Ensure visibility
//             errorMessage.textContent = 'Login failed. Please check your credentials.';
//         }
//     } catch (error) {
//         console.error('Login error:', error);
//         errorMessage.style.display = 'block'; // Ensure visibility
//         errorMessage.textContent = 'An error occurred during login. Please try again.';
//     }
// });

// try {

// } catch (error) {

// }

// throw new Error()
