class RBI {
  #account;
  constructor(name, balance, phone, incommingAccount) {
    this.name = name;
    this.balance = balance;
    this.phone = phone;
    this.#account = incommingAccount;
  }

  displayCustomerDetails() {
    return (this.name, this.balance, this.phone, this.#account);
  }

  showBalance() {
    console.log(this.name, " : ", this.balance);
  }
}

class Hdfc extends RBI {
  constructor(name, balance, phone, incommingAccount, branchName, address) {
    super(name, balance, phone, incommingAccount);
    this.name = name;
    this.balance = balance;
    this.phone = phone;
    this.account = incommingAccount;
    this.branchName = branchName;
    this.address = address;
  }

  displayCustomerDetails() {
    return (
      this.name,
      this.balance,
      this.phone,
      this.account,
      this.branchName,
      this.address
    );
  }

  deposit(amount) {
    this.balance += amount;
  }
  credit(amount) {
    this.balance -= amount;
  }

  transferAmount(name, amount) {
    if (amount > this.balance) {
      console.log("low balance in your account");
      return;
    }
    this.balance -= amount;
    name.balance += amount;
  }
}

// const customer1 = new Hdfc("arvind", 2000, 8960905167, 32463275);
// const customer2 = new Hdfc("Raj", 3000, 8960905166, 32463276);
// customer1.transferAmount(customer2, 3000);
// customer1.showBalance();
// customer2.showBalance();

// practice question one

// Person naam ka parent class banao jisme:

// name aur age properties hon.
// introduce() method ho jo name aur age print kare.

// Uske baad Student naam ki child class banao jo Person ko inherit kare.

// Student me:

// course property add karo.
// study() method banao jo "Student is studying..." print kare.

// Task: Student ka object bana kar introduce() aur study() dono call karo.

class Person {
  constructor(name, age, job) {
    this.name = name;
    this.age = age;
    this.job = job;
  }

  introduce() {
    console.log(this.name, this.age);
  }

  profession() {
    console.log(this.name, " : ", this.job);
  }
}

class Student extends Person {
  constructor(name, age, course) {
    super(name, age, "student");
    // this.name = name;
    // this.age = age;
    this.course = course;
  }

  displayCourse() {
    console.log(this.course);
  }
}

class Plumber extends Person {
  constructor(name, age, fee) {
    super(name, age, "plumber");
    // this.name = name;
    // this.age = age;
    this.fee = fee;
  }

  displayFee() {
    console.log(this.fee);
  }
}

// const student = new Student("arvind", 23, "MCA");
// const plumber = new Plumber("arvind", 23, 2000);
// student.profession();
// student.introduce();
// student.displayCourse();
// plumber.profession();
// plumber.introduce();
// plumber.displayFee();

// Practice Question 2 — Method Overriding

// Vehicle naam ka parent class banao jisme:

// brand property ho.
// start() method ho jo "Vehicle is starting" print kare.

// Uske baad:

// Car class banao jo Vehicle ko inherit kare.
// Bike class banao jo Vehicle ko inherit kare.

// Dono child classes me start() method ko override karo:

// Car → "Car is starting with key"
// Bike → "Bike is starting with self-start"

// Task: Car aur Bike ke objects bana kar start() call karo aur observe karo ki overriding kaise kaam karti hai.

class Vehicle {
  start() {
    console.log("vehicle started...");
  }
}
class Car extends Vehicle {
  constructor(name, type, speed) {
    super(name);

    this.name = name;
    this.type = type;
    this.speed = speed;
  }

  start() {
    console.log(this.name, "started with key");
  }
}
class Bike extends Vehicle {
  constructor(name, type, speed) {
    super(name);
    this.name = name;
    this.type = type;
    this.speed = speed;
  }
  start() {
    console.log(this.name, "started with self");
  } //polymarphism
}

// const car = new Car("BWM", "desil", 300);
// const bike = new Bike("Hunk", "Petrol", 250);
// bike.start();
// car.start();

// Practice Question 3 — Multilevel Inheritance

// JavaScript me multilevel inheritance implement karo:

// Person class banao:
// name property
// showName() method
// Employee class banao jo Person ko inherit kare:
// salary property
// showSalary() method
// Manager class banao jo Employee ko inherit kare:
// department property
// showDepartment() method

// Task:
// Manager ka object create karo aur ek hi object se:

class Employee extends Person {
  constructor(name, age, job) {
    super(name, age, job);
    this.name = name;
    this.age = age;
    this.job = job;
  }
  displayEmp() {
    console.log("This is called in employee : ", this.name, this.age, this.job);
  }
}

class Manager extends Employee {
  constructor(name, age, job, salary) {
    super(name, age, job);
    this.name = name;
    this.age = age;
    this.job = job;
    this.salary = salary;
  }

  displayManager() {
    console.log(
      "This is called in manager : ",
      this.name,
      this.age,
      this.job,
      this.salary,
    );
  }
}

// const manager = new Manager("Arvind", 23, "manager",30000);
// manager.profession();
// manager.displayManager();

const users = [];

class Auth {
  constructor(name, email, password) {
    this.name = name;
    this.email = email;
    this.password = password;
  }
  resiterUser() {
    users.push({
      id: users.length + 1,
      name: this.name,
      email: this.email,
      password: this.password,
    });
  }
  login(email, password) {
    return users.filter(
      (user) => user.email === email && user.password === password,
    );
  }
  logout(id) {
    return users.filter((user) => user.id !== id);
  }
}

const user1 = new Auth("arvind", "arvind@gmail.com", "Arvind@12345");
const user2 = new Auth("raj", "raj@gmail.com", "raj@12345");
user1.resiterUser();
user2.resiterUser();
let user = user1.login("arvind@gmail.com", "Arvind@12345")[0];
let newUsers = user2.logout(2);
console.log(newUsers);
// console.log(user);
