// class Student {
//   great() {
//     console.log("hello", this.name);
//   }
//   intro() {
//     console.log("i am a student of ", this.course);
//   }
// }

// let s1 = new Student(); //s1 object Student class
// // console.log(typeof s1);
// s1.name = "Arvind";
// s1.course = "MCA";
// s1.great();
// s1.intro();

// let s2 = new Student();
// s2.name = "Raj";
// s2.course = "M-Tech";
// s2.great();
// s2.intro();
let i = 0;

class Student {
  constructor(name, course, roleNo) {
    this.name = name;
    this.course = course || "MCA";
    this.roleNo = roleNo || 1;
    i++;
  }

  great() {
    console.log("hello, My name is ", this.name);
    console.log(i);
  }
  displayStudent() {
    console.log(
      "My name is ",
      this.name,
      "I am students of ",
      this.course,
      "And my role no is ",
      this.roleNo,
    );
  }
}

const s1 = new Student("arvind");

// console.log(s1.i);
// s1.great();
// s1.displayStudent();
// const s2 = new Student("arvind");
// s2.great();
// s1.displayStudent();
// s1.assign=()=>{
//     console.log("object")
// }
// s1.assign();
// s1.displayStudent();

// class Bank {
//   constructor(name, balance) {
//     this.account = name + Date.now();
//     this.name = name;
//     this.balance = balance;
//   }
//   resiterUser() {
//     console.log("user Register successfully", this.name);
//   }
//   displayCustomerDetails() {
//     console.log(this.name, this.balance, "and", this.account);
//   }
//   showBalance() {
//     console.log(this.name, this.balance, "balance in your account");
//   }
//   deposit(amount) {
//     this.balance += amount;
//   }
//   credit(amount) {
//     this.balance -= amount;
//   }
//   changeName(name) {
//     this.name = name;
//   }
// }

// const constomer1 = new Bank("arvind", 5000);
// const constomer2 = new Bank("Raj", 3000);

// constomer1.deposit(4000);
// constomer1.credit(6000);
// constomer1.displayCustomerDetails();

// constomer1.changeName("Mohan");
// constomer1.displayCustomerDetails();

// constomer2.deposit(4000);
// constomer2.credit(6000);
// constomer2.displayCustomerDetails();

// constomer2.changeName("Arhan");
// constomer2.displayCustomerDetails();

// class Vehicles {
//   constructor(name, type, fuelType, model, engine) {
//     this.name = name;
//     this.type = type;
//     this.fuelType = fuelType;
//     this.model = model;
//     this.engine = engine;
//   }

//   checkEngine() {
//     console.log("This vehicle engine is : ", this.engine);
//   }

//   VehicleType() {
//     console.log("This vehicle engine is : ", this.type);
//   }
//   VehicleFuelType() {
//     console.log("This vehicle engine is : ", this.fuelType);
//   }
//   showVehiclesDetails() {
//     console.log("This vehicle is : ", this.name, this.type, this.fuelType);
//   }
// }

// class Cars extends Vehicles {
//   carDetails() {
//     if (this.fuelType === "electric") {
//       this.name = "Tesla";
//     }
//   }

//   createDl() {
//     console.log("This is Four wheele vehicle and you have need 4 wheeler dl");
//   }

//   shettingCapacity() {}
// }

// class Bike extends Vehicles {
//   shiwDEtails() {
//     console.log("this is bike ", this.name);
//   }
// }

// const car1 = new Cars("Car", "4 Wheeler", "electric", "2026 N", "Tarbo 1");
// const bike = new Bike("Yamaha", "2 Wheeler", "electric", "2026 N", "Tarbo 1");
// bike.createDl();
// bike.showVehiclesDetails();

// inheritance;
class Animal {
  constructor(name, sound, food) {
    this.name = name;
    this.sound = sound;
    this.food = food;
  }
  makeSound() {
    console.log(this.name + "making sound like " + this.sound);
  }

  eatFood() {
    console.log(this.name + "eat food " + this.food);
  }
  hasLegs() {
    console.log("every animal have 4 legs");
  }
  displayAnimalDetails() {
    console.log(
      this.name + "making sound like " + this.sound,
      this.name + "eat food " + this.food,
    );
  }
}

class Dog extends Animal {
  // constructor(name, sound, food, pet) {
  //   super(name, sound, food);
  //   this.pet = pet;
  // }

  bodyTemp() {
    console.log("dog body temprature hiegh");
  }
  ispet() {
    console.log(pet);
  }
}

let dog = new Dog("Tommy", "bark", "meet");
let cat = new Animal("Cat", "miun", "meet");
// cat.displayAnimalDetails();

// encapsulation;
class Bank {
  #balance = 0;
  #password;

  count = 0;
  constructor(name, initialBalance, initialpassword) {
    this.name = name;
    this.#balance = initialBalance;
    this.#password = initialpassword;
  }

  showCustomerData() {
    console.log(this.name, this.#balance, this.#password);
  }
}

const c1 = new Bank("arvind", 4000, "oe78wtlfgd");
// c1.password = "raj";
c1.showCustomerData();

// abstraction;

class Bank2 extends Bank {
  #balance = 0;
  #password;

  count = 0;
  constructor(name, initialBalance, initialpassword) {
    super(name, initialBalance, initialpassword);
    this.name = name;
    this.#balance = initialBalance;
    this.#password = initialpassword;
  }
#openAccount(){
console.log("account opened")
}

#depositeAmount(){
  this.#balance=initialBalance;
}


  showCustomerData() {
    
  }
}
// polymarphism;
