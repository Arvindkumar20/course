class Animal {
  displayDetails(name) {
    console.log(name);
  }

  makeSound(name, sound) {
    console.log(name, " is ", sound + "ing");
  }
}

class Dog extends Animal {
  takeDetails(name, sound) {
    console.log(name, sound);
  }

  makeSound(sound) {
    console.log(sound);
  }
  displayDetails(name, sound) {
    console.log(name, sound);
  }
}

// const dog = new Dog();
// dog.takeDetails("Libradore", "bark");
// dog.makeSound("Libradore", "bark");
// dog.displayDetails("Libradore","barking");


