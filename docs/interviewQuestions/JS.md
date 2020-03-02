# JS

## 原型链

![prototype](../.vuepress/public/images/prototype.jpg)

## this绑定的4种形式

### 1. 默认绑定

- 独立函数调用，可以把默认绑定看作是无法应用其他规则时的默认规则，this指向全局对象
- 严格模式下，不能将全局对象用于默认绑定，this会绑定到undefined，只有函数运行在非严格模式下，默认绑定才能绑定到全局对象。
在严格模式下调用函数则不影响默认绑定。

```js
function foo() {
  // 运行在严格模式下，this会绑定到undefined
  "use strict";

  console.log(this.a);
}

var a = 2;

// 调用
foo(); // TypeError: Cannot read property 'a' of undefined

// --------------------------------------

function foo() {
  // 运行
  console.log(this.a);
}

var a = 2;

(function() {
  // 严格模式下调用函数则不影响默认绑定
  "use strict";

  foo(); // 2
})();
```

### 2. 隐式绑定

- 当函数引用有上下文对象时，隐式绑定规则会把函数种的this绑定到这个上下文对象。
对象属性引用链中只有上一层或者说最后一层在调用中起作用。
- 被隐式绑定的函数特定情况下会丢失绑定对象，应用默认绑定，把this绑定到全局对象或者undefined上。

```js
function foo() {
  console.log(this.a);
}

var obj = {
  a: 2,
  foo: foo,
};

obj.foo(); // 2

// 虽然bar是obj.foo的一个引用，但是实际上，它引用的是foo函数本身。
// bar()是一个不带任何修饰的函数调用，应用默认绑定。
function foo() {
  console.log(this.a);
}

var obj = {
  a: 2,
  foo: foo,
};

var bar = obj.foo; // 函数别名

var a = "oops, global"; // a是全局对象的属性

bar(); // "oops, global"
```

### 3. 显式绑定

- 通过call或者apply方法。第一个参数是一个对象，在底用函数时将这个对象绑定到this。因为直接指定this的绑定对象，称之为显式绑定。

```js
function foo() {
  console.log(this.a);
}

var obj = {
  a: 2,
};

foo.call(obj); // 2  调用foo时强制把foo的this绑定到obj上


// 显式绑定无法解决丢失绑定的问题
// 解决办法1.硬绑定

function foo() {
  console.log( this.a );
}

var obj = {
  a: 2
};

var bar = function() {
  foo.call( obj );
};

bar(); // 2
setTimeout( bar, 100 ); // 2

// 硬绑定的bar不可能再修改它的this
bar.call( window ); // 2

// 解决办法2.API调用的“上下文”

function foo(el) {
  console.log( el, this.id );
}

var obj = {
    id: "awesome"
}

var myArray = [1, 2, 3]
// 调用foo(..)时把this绑定到obj
myArray.forEach( foo, obj );
// 1 awesome 2 awesome 3 awesome
```

### 4. new绑定

- 在js中，构造函数只是使用new操作符时被调用的普通函数，他们不属于某个类，也不会实例化一个类。
- 包括内置对象函数（比如Number）在内的所有函数都可以用new来调用，这种函数调用被称为构造函数调用。
- 实际上并不存在所谓的“构造函数”,只是对于函数的“构造调用”。

#### new实现

使用new来调用函数，或者说发生构造函数调用时，会自动执行下面的操作。

1. 创建（或者说构造）一个新对象。
2. 这个新对象会被执行[[Prototype]]连接。
3. 这个新对象会绑定到函数调用的this。
4. 如果函数没有返回其他对象，那么new表达式中的函数调用会自动返回这个新对象。

```js
function create() {
  // 创建一个空的对象
  var obj = new Object(),
    // 获得构造函数，arguments中去除第一个参数，即构造函数
    Constructor = [].shift.call(arguments);
  // 链接到原型，obj 可以访问到构造函数原型中的属性
  obj.__proto__ = Constructor.prototype;
  // 绑定 this 实现继承，obj 可以访问到构造函数中的属性
  var ret = Constructor.apply(obj, arguments);
  // 优先返回构造函数返回的对象
  return ret instanceof Object ? ret : obj;
}

function Person (name, age) {
    this.name = name;
    this.age = age;

    // 如果构造函数有返回值且为对象，则返回该对象 ret
    // return {
    //     name: name,
    //     age: '25'
    // }

    // 如果构造函数有返回值不是对象，则返回 obj
    // return 'Tom is a 18 boy';
}

// 用来替代 new Person('Tom', '18')
var person = create(Person, 'Tom', '18');
```

## 执行上线文和作用域链

JavaScript代码的整个执行过程，分为两个阶段，代码编译阶段与代码执行阶段。编译阶段由编译器完成，将代码翻译成可执行代码，这个阶段**作用域**规则会确定。执行阶段由引擎完成，主要任务是执行可执行代码，**执行上下文**在这个阶段创建。

### 执行上下文

函数每调用一次，都会产生一个新的执行上下文环境。因为不同的调用可能就有不同的参数。

#### 执行上下文栈

执行全局代码时，会产生一个执行上下文环境，每次调用函数都又会执行上下文环境。当函数调用完成时，这个上下文环境以及其中的数据都会被消除（当然了闭包并不会乖乖就范），处于活动状态的执行上下文环境只有一个。

既然调用一个函数时一个新的执行上下文会被创建。那执行上下文的生命周期同样可以分为两个阶段。

- 创建阶段

  在这个阶段中，执行上下文会分别创建
  - 变量对象(Variable object，VO)
  - 建立作用域链(Scope chain)
  - 确定this的指向

- 代码执行阶段

  在此阶段，js引擎会重扫一遍函数，用具体的变量的值来更新可变对象，并执行代码内容。

#### 变量对象

在函数上下文中，我们用活动对象(Activation object, AO)来表示变量对象(Variable object，VO)。

活动对象其实就是被激活的变量对象，只是变量对象是规范上的或者说是引擎实现上的，不可在 JavaScript 环境中访问，只有到当进入一个执行上下文中，这个执行上下文的变量对象才会被激活，所以才叫 activation object，而只有活动对象上的各种属性才能被访问。

变量对象会包括：

1. 语言内置
    - this
    - arguments

2. 函数的所有形参 (如果是函数上下文)
     - 由名称和对应值组成的一个变量对象的属性被创建
     - 没有实参，属性值设为 undefined

3. 函数声明
     - 由名称和对应值（函数对象(function-object)）组成一个变量对象的属性被创建
     - 如果变量对象已经存在相同名称的属性，则完全替换这个属性

4. 变量声明
     - 由名称和对应值（undefined）组成一个变量对象的属性被创建；
     - 如果变量名称跟已经声明的形式参数或函数相同，则变量声明不会干扰已经存在的这类属性

### 作用域

作用域(scope chain)是每一个执行上下文自身持有的活动对象的集合，如在本执行上下文中声明的变量和函数以及方法参数传入的对象。

每一个执行上下文可以访问的对象包括自身的作用域和父执行上下文的作用域和父父执行上下文作用域直到全局作用域，这就产生了作用域链。作用域链的用途是保证对执行环境有权访问的所有变量和函数的有序访问。

作用域规定了如何查找变量，也就是确定当前执行代码对变量的访问权限。
JavaScript 采用词法作用域(lexical scoping)，也就是静态作用域。

作用域只是一个“地盘”，其中没有变量。变量是通过作用域对应的执行上下文环境中的变量对象来实现的。所以作用域是静态观念的，而执行上下文环境是动态上的，两者并不一样。有闭包存在时，一个作用域存在两个上下文环境也是有的。也就是说，作用域只是用于划分你在这个作用域里面定义的变量的有效范围，出了这个作用域就无效。

同一个作用域下，对同一个函数的不同的调用会产生不同的执行上下文环境，继而产生不同的变量的值，所以，作用域中变量的值是在执行过程中确定的，而作用域是在函数创建时就确定的。

如果要查找一个作用域下某个变量的值，就需要找到这个作用域对应的执行上下文环境，再在其中找到变量的值。

```js
var a = 1
function out(){
    var a = 2
    inner()
}
function inner(){
    console.log(a)
}
out()  //====>  1
```

#### 自由变量

函数在定义的时候（不是调用的时候）就已经确定了函数体内部自由变量的作用域。

```js
let a = 100
function fn() {
  let b = 20
  function bar() {
    console.log(a + b) // a是在fn作用域使用，但是并没有在fn作用域定义，这就是自由变量。
  }
  return bar
}

let x = fn(), b = 200
x()
```

bar要取得a的值，就要到创建bar这个函数的作用域中取值（这里是fn作用域），fn作用域也没有a，就到创建fn这个函数的作用域中取值（这里是全局作用域），找到了就结束了。这就是作用域链。

#### 作用域链

当查找变量的时候，会先从当前上下文的变量对象中查找，如果没有找到，就会从父级(词法层面上的父级)执行上下文的变量对象中查找，一直找到全局上下文的变量对象，也就是全局对象。这样由多个执行上下文的变量对象构成的链表就叫做作用域链。
