let name = "Arvind";
let email = "arvind@gmail.com";
let msg = `hello, ${name} and how ar you d.`;
// let are="ar";
// name="hello";
// for (let char of name) {
//     char="r"
//   console.log(char);
// }
// console.log(name)

let msgSent = msg.split(" ");
// let msgSent=msg.split(" ");

// console.log(msgSent);

// console.log(msg.length);

// let newName="R" + name.slice(1);

// name="dliug"
// console.log(newName)
// console.log(name)

// let first5=msg.slice(0,5)//0,1,2,3
// console.log(first5)

// let slitmsg=msg.split(" ");
// console.log(slitmsg.slice(0,5));

// console.log(name.split(""));

// console.log(msg.includes("who"));

// let newStr=msg.substring(0,3);
// console.log(newStr);

// console.log(name.indexOf("d"));
// console.log(msg.lastIndexOf("d"));

// console.log(name.concat("hello"));
// console.log(name + "hello");
// console.log(`${name} hello`);

const findDublicat = (str, word) => {
  //"jhdlufgwe"

  let countDublicat = 0;

  let newStr = str.split(" ");
  if (newStr.length > 1) {
    for (let item of newStr) {
      if (item === word) {
        countDublicat++;
      }
    }
  } else {
    for (let item of str) {
      if (item === word) {
        countDublicat++;
      }
    }
  }
  return countDublicat;
};

// console.log(findDublicat("hello how are you how","how"));

// console.log(findDublicat("hello","how"));

// console.log("hello \nhow are you");
// console.log("hello\thow are you");

let regEx = /^[A-Z][a-z]+$/;
// console.log(regEx.test(name));

let numberRex = /^[1-9]+$/;
let phone="93283928589";
// console.log(numberRex.test(phone));


let emailRegEx=/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
// email="fhrluighre@jeri.dd"
// console.log(emailRegEx.test(email));

let passwordRegEx=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

// console.log(passwordRegEx.test("Arfefew@123"));


// console.log(name.match(regEx));
// console.log(name.match(/^[1-9]$/))

// console.log("qE34673dhwifwgfew@".match(passwordRegEx));