# JS继承

## 1. 原型链继承

构造函数、原型和实例之间的关系：每个构造函数都有一个原型对象，原型对象都包含一个指向构造函数的指针，而实例都包含一个原型对象的指针。

继承的本质就是复制，即重写原型对象，代之以一个新类型的实例。

```js
function Parent () {
  this.names = ['kevin', 'daisy'];
}

function Child () {}

// 核心代码，创建 Parent 的实例，并将该实例赋值给 Child.prototype
Child.prototype = new Parent();

---

var child1 = new Child();

child1.names.push('yayu');

console.log(child1.names); // ["kevin", "daisy", "yayu"]

var child2 = new Child();

console.log(child2.names); // ["kevin", "daisy", "yayu"]
```

缺点

1. 引用类型的属性被所有实例共享，多个实例对引用类型的操作会被篡改
2. 在创建Child的实例时，不能向Parent传参
3. 子类型原型上的 constructor 属性被重写了，执行Child.prototype = new Parent()后原型被覆盖，Child.prototype 上丢失了 constructor 属性， Child.prototype 指向了 Parent.prototype，而 Parent.prototype.constructor 指向了 Parent，所以 Child.prototype.constructor 指向了 Parent。

## 2.借用构造函数继承（经典继承）

使用父类的构造函数来增强子类实例，等同于复制父类的实例给子类（不使用原型）

```js
function Parent () {
  this.names = ['kevin', 'daisy'];
}

function Child () {
  // 核心代码，创建子类实例时调用 Parent 构造函数，Child 每个实例都会将Parent 中的属性复制一份
  Parent.call(this);
}

---

var child1 = new Child();

child1.names.push('yayu');

console.log(child1.names); // ["kevin", "daisy", "yayu"]

var child2 = new Child();

console.log(child2.names); // ["kevin", "daisy"]
```

优点

1. 避免了引用类型的属性被所有实例共享
2. 可以在 Child 中向 Parent 传参

```js
function Parent (name) {
  this.name = name;
}

function Child (name) {
  Parent.call(this, name);
}

---

var child1 = new Child('kevin');

console.log(child1.name); // kevin

var child2 = new Child('daisy');

console.log(child2.name); // daisy
```

缺点

1. 方法都在构造函数中定义，每次创建实例都会创建一遍方法，无法复用，且影响性能
2. 只能继承父类的实例属性和方法，不能继承原型属性和方法

## 3. 组合继承

组合上述两种方法就是组合继承。用原型链实现对原型属性和方法的继承，用借用构造函数技术来实现实例属性的继承。

```js
function Parent (name) {
  this.name = name;
  this.colors = ['red', 'blue', 'green'];
}

Parent.prototype.getName = function () {
  console.log(this.name)
}

function Child (name, age) {
  Parent.call(this, name);
  this.age = age;
}

Child.prototype = new Parent();
Child.prototype.constructor = Child;

---

var child1 = new Child('kevin', '18');

child1.colors.push('black');

console.log(child1.name); // kevin
console.log(child1.age); // 18
console.log(child1.colors); // ["red", "blue", "green", "black"]

var child2 = new Child('daisy', '20');

console.log(child2.name); // daisy
console.log(child2.age); // 20
console.log(child2.colors); // ["red", "blue", "green"]
```

优点

融合原型链继承和构造函数的优点，是js中最常见的继承模式

缺点

会调用两次父构造函数

## 4.原型式继承

利用一个空对象作为中介，将某个对象直接赋值给空对象构造函数的原型。

```js
function createObj(o) {
    function F(){}
    F.prototype = o;
    return new F();
}
```

缺点

1. 包含引用类型的属性始终都会共享相应的值，这点跟原型链继承一样
2. 无法传递参数

## 5. 寄生式继承

创建一个仅用于封装继承工程的函数，该函数在内部以某种形式来做增强对象，最后返回对象

```js
function createObj (o) {
    var clone = Object.create(o);
    clone.sayName = function () {
        console.log('hi');
    }
    return clone;
}
```

缺点（同原型式继承）

1. 包含引用类型的属性始终都会共享相应的值，这点跟原型链继承一样
2. 无法传递参数

## 6. 寄生组合式继承

结合借用构造函数传递参数和寄生模式实现继承

```js
function Parent (name) {
    this.name = name;
    this.colors = ['red', 'blue', 'green'];
}

Parent.prototype.getName = function () {
    console.log(this.name)
}

function Child (name, age) {
    Parent.call(this, name);
    this.age = age;
}

// 关键的三步
var F = function () {};

F.prototype = Parent.prototype;

Child.prototype = new F();

---

var child1 = new Child('kevin', '18');

console.log(child1);
```

## 参考文献

- JavaScript深入之继承的多种方式和优缺点：[https://github.com/mqyqingfeng/Blog/issues/16](https://github.com/mqyqingfeng/Blog/issues/16)
- JavaScript常用八种继承方案：[https://juejin.im/post/5bcb2e295188255c55472db0](https://juejin.im/post/5bcb2e295188255c55472db0)
