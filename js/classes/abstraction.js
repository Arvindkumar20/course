class Bank {
  constructor(name, amount) {
    this.name = name;
    this.balance = amount;
  }

  #checkBalance(amount) {
    if (amount > this.balance) {
      console.log("low balance");
      return false;
    } else {
      this.balance -= amount;
      return true;
    }
  }

  deposit(amount) {
    this.balance += amount;
  }
  credit(amount) {
    this.#checkBalance(amount);
  }

  checkBalance() {
    console.log(this.balance);
  }
}

// const customer1 = new Bank("Arvind", 4000);
// customer1.checkBalance();
// customer1.deposit(7000);
// customer1.credit(5000);
// customer1.checkBalance();

class MakeDrink {
  constructor(name, qty, type) {
    this.name = name;
    this.qty = qty;
    this.type = type;
  }

  #boilWater() {
    console.log("wtare boiling....");
  }

  #mixBeans() {
    console.log("beans mixing...");
  }
  #mixMilk() {
    console.log("milk mixing...");
  }
  #sugarMix() {
    console.log("sugar mixing...");
  }
  serveDrink() {
    if (this.type === "hot") {
      this.#boilWater();
      this.#mixBeans();
      this.#mixMilk();
      this.#mixMilk();
      this.#sugarMix();
      console.log("your ", this.qty, this.name, " is ready");
    } else {
      console.log("your ", this.qty, this.name, " is ready");
    }
  }
}

const coffee = new MakeDrink("coffee", 1, "hot");

coffee.serveDrink();
// coffee.#sugerMix();//not accessible

