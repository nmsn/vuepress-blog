# JS继承
## ES5
### 1. 原型链继承

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

### 2.借用构造函数继承（经典继承）

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

### 3. 组合继承

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

### 4.原型式继承

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

### 5. 寄生式继承

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

### 6. 寄生组合式继承

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

## ES6

> ES5 的继承，实质是先创造子类的实例对象this，然后再将父类的方法添加到this上面（Parent.apply(this)）。ES6 的继承机制完全不同，实质是先将父类实例对象的属性和方法，加到this上面（所以必须先调用super方法），然后再用子类的构造函数修改this。

### 使用 ES5 模拟实现 ES6 的 class

ES6类的实现

```js
class Person {
  	constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    eat() {
        return  'eat'
    }
    static say() {
    	return 'say'
    }
}
```

通过 babel 转换成 es5 的语法

> babel 工具地址: https://es6console.com/

```js
("use strict");

var _createClass = (function() {
  function defineProperties(target, props) {
    // 遍历函数数组，分别声明其描述符 并添加到对应的对象上
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      
      // 设置该属性是否能够出现在对象的枚举属性中，默认 false
      descriptor.enumerable = descriptor.enumerable || false;
      
      // 设置该属性描述符能够被改变，同时该属性也能从对应的对象上被删除
      descriptor.configurable = true;
      
      // 如果属性中存在 value，value 设置为可以改变
      if ("value" in descriptor) descriptor.writable = true;
      
      // 写入对应的对象上
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  // 收集公有函数和静态方法，将方法添加到构造函数或者构造函数的原型中并返回构造函数
  return function(Constructor, protoProps, staticProps) {
    
    // 公有方法添加到 prototype 原型对象上
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    
    // 静态方法添加到构造函数上
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
})();

/**
 * 检查声明的class类是否通过new的方式调用，否则会报错
 * */
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

var Person = (function() {
  function Person(name, age) {
    _classCallCheck(this, Person);

    this.name = name;
    this.age = age;
  }

  _createClass(
    Person,
    [
      {
        key: "eat",
        value: function eat() {
          return "eat";
        },
      },
    ],
    [
      {
        key: "say",
        value: function say() {
          return "say";
        },
      },
    ],
  );

  return Person;
})();
```


ES6 继承的实现

```js
class A {
  constructor(name, age) {
     this.name = name;
     this.age = age;
  }
  eat() {
    return 'eat'
	}
}
class B extends A {
  constructor(name, age,sex){
    super(name,age);
    this.sex = sex;
  }
  say() {
  return 'say';
  }
}
```

转化后

> Object.getPrototypeOf() 方法可以用来从子类上获取父类

> 大多数浏览器的 ES5 实现之中，每一个对象都有__proto__属性，指向对应的构造函数的prototype属性。Class 作为构造函数的语法糖，同时有prototype属性和__proto__属性，因此同时存在两条继承链。
>- （1）子类的__proto__属性，表示构造函数的继承，总是指向父类。
>- （2）子类prototype属性的__proto__属性，表示方法的继承，总是指向父类的prototype属性。
>
> ```js
> class A {}
> 
> class B extends A {}
> 
> B.__proto__ === A // true
> B.prototype.__proto__ === A.prototype // true
> ```
> 
> 这样的结果是因为，类的继承是按照下面的模式实现的。
> 
> ```js
> class A {
> }
> 
> class B {
> }
>
> // B 的实例继承 A 的实例
> Object.setPrototypeOf(B.prototype, A.prototype);
>
> // B 继承 A 的静态属性
> Object.setPrototypeOf(B, A);
>
> const b = new B();
> ```
> 子类实例的__proto__属性的__proto__属性，指向父类实例的__proto__属性。也就是说，子类的原型的原型，是父类的原型。
> ```js
> var p1 = new Point(2, 3);
> var p2 = new ColorPoint(2, 3, 'red');
>
> p2.__proto__ === p1.__proto__ // false
> p2.__proto__.__proto__ === p1.__proto__ // true
> ```



```js
("use strict");

/**
 *
 *
*/
var _get = function get(_x, _x2, _x3) {
  var _again = true;
  _function: while (_again) {
    var object = _x,
      property = _x2,
      receiver = _x3;
    _again = false;
    if (object === null) object = Function.prototype;
    var desc = Object.getOwnPropertyDescriptor(object, property);
    if (desc === undefined) {
      var parent = Object.getPrototypeOf(object);
      if (parent === null) {
        return undefined;
      } else {
        _x = parent;
        _x2 = property;
        _x3 = receiver;
        _again = true;
        desc = parent = undefined;
        continue _function;
      }
    } else if ("value" in desc) {
      return desc.value;
    } else {
      var getter = desc.get;
      if (getter === undefined) {
        return undefined;
      }
      return getter.call(receiver);
    }
  }
};

// 同上
var _createClass = (function() {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  return function(Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
})();


/** */
function _inherits(subClass, superClass) {
  // 判断父创造函数是否存在
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError(
      "Super expression must either be null or a function, not " +
        typeof superClass,
    );
  }
  
  // 子类原型继承父类原型
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true,
    },
  });

// 子类原型继承父类构造函数
  if (superClass)
    Object.setPrototypeOf
      ? Object.setPrototypeOf(subClass, superClass)
      : (subClass.__proto__ = superClass);
}

// 同上
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

// 同上
var A = (function() {
  function A(name, age) {
    _classCallCheck(this, A);

    this.name = name;
    this.age = age;
  }

  _createClass(A, [
    {
      key: "eat",
      value: function eat() {
        return "eat";
      },
    },
  ]);

  return A;
})();

var B = (function(_A) {
  _inherits(B, _A);

  function B(name, age, sex) {
    _classCallCheck(this, B);

    _get(Object.getPrototypeOf(B.prototype), "constructor", this).call(
      this,
      name,
      age,
    );
    this.sex = sex;
  }

  _createClass(B, [
    {
      key: "say",
      value: function say() {
        return "say";
      },
    },
  ]);

  return B;
})(A);

```

Object.create 的 polyfill

```js
if (typeof Object.create !== "function") {
  Object.create = function(proto, propertiesObject) {
    if (typeof proto !== "object" && typeof proto !== "function") {
      throw new TypeError("Object prototype may only be an Object: " + proto);
    } else if (proto === null) {
      throw new Error(
        "This browser's implementation of Object.create is a shim and doesn't support 'null' as the first argument.",
      );
    }

    if (typeof propertiesObject !== "undefined")
      throw new Error(
        "This browser's implementation of Object.create is a shim and doesn't support a second argument.",
      );

    // 原型式继承
    function F() {}
    F.prototype = proto;

    return new F();
  };
}
```


### 参考文献

- JavaScript深入之继承的多种方式和优缺点：[https://github.com/mqyqingfeng/Blog/issues/16](https://github.com/mqyqingfeng/Blog/issues/16)
- JavaScript常用八种继承方案：[https://juejin.im/post/5bcb2e295188255c55472db0](https://juejin.im/post/5bcb2e295188255c55472db0)
- ES6 中的 class 在 ES5 中的实现：[https://www.cnblogs.com/slongs/p/11238574.html](https://www.cnblogs.com/slongs/p/11238574.html)
- Class 的继承：[https://es6.ruanyifeng.com/#docs/class-extends](https://es6.ruanyifeng.com/#docs/class-extends)
