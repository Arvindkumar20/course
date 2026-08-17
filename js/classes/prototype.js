function Bank(name, balance) {
  this.name = name;
  this.balance = balance;
}

Bank.prototype.resiterUser = function () {
  console.log("user Register successfully", this.name);
};

const customer1 = new Bank("Arvind", 4000);
console.log(customer1.resiterUser());


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
