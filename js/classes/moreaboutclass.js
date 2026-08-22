class Car {
  static start() {
    console.log("car started...");
  }
  static HandleGairs() {
    this.start();
    console.log("you can handle gairs");
  }

  drive() {
    Car.HandleGairs();
  }
}

// const car = new Car();
// Car.HandleGairs();
// car.drive();

// getter and setter

class CreateModels {
  constructor(name, color, model) {
    this.name = name;
    this.color = color;
    this.model = model;
  }

   set model(model) {
    this.model = model;
  }
  get model() {
    return (this.name, this.color, this.model);
  }
 
}

const car = new CreateModels("BMW", "Silver", "2026");
// car.model="2027"
// console.log(car.model);


class Rectangle {
constructor(width, height) {
this.width = width;
this.height = height;
}

get area() { // getter - accessed like a property, not a method call
return this.width * this.height;
}

set width(value) { // setter - runs validation when width is assigned
if (value <= 0) {
throw new Error("Width must be positive");
}
this._width = value;
}
get width() {
return this._width;
}

}
let rect = new Rectangle(5, 10);
console.log(rect.area); // 50 -> no parentheses needed, looks like a property!
rect.width = 20; // uses the setter, runs validation
console.log(rect.area); // 200
// rect.width = -5; // throws Error: Width must be positive