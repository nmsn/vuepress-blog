# ES6

## let/const

### for 循环

而使用使用 let/const 关键字声明变量的 for 循环，除了会创建块级作用域，let/const 还会将它绑定到每个循环中，确保对上个循环结束时候的值进行重新赋值

即给每次循环创建一个块级作用域

```js
for (var i = 0; i < 10; i++) {
  // do something
}

console.log(i); // 10
```

```js
for (let i = 0; i < 10; i++) {
  // do something
}

console.log(i); // Uncaught ReferenceError: i is not defined
```

### 暂时性死区

使用 let/const 声明的变量，从一开始就形成了封闭作用域，在声明变量之前是无法使用这个变量的，这个特点也是为了弥补 var 的缺陷（var 声明的变量有变量提升）

在没有 let/const 之前。typeof 运算符是百分之百安全额，永远不会报错。现在这一点不成立了。

```js
1.
if (true) {
  name = "a"; // VM326:2 Uncaught ReferenceError: Cannot access 'name' before initialization
  let name;
}

2.
(() => {
  typeof a; // undefined
})()(() => {
  typeof a; // VM792:2 Uncaught ReferenceError: Cannot access 'a' before initialization
  let a = 1;
})();
```

### const 声明变量的时候必须赋值

```js
const x; // Uncaught SyntaxError: Invalid or unexpected token
```

### let/const 不是全局变量

let/const 在全局声明的变量是在一个叫 script 作用域下的，而 var 声明的变量因为变量提升所以提升到了全局变量 window 对象中，这使我们能放心的使用新语法，不用担心污染全局的 window 对象

## 箭头函数

1. 箭头函数没有 arguments（建议使用更好的语法，剩余运算符替代）
2. 箭头函数没有 prototype 属性，不能用作构造函数（不能用 new 关键字调用）
3. 箭头函数没有自己 this，它的 this 是词法的，引用的是上下文的 this，即在你写这行代码的时候就箭头函数的 this 就已经和外层执行上下文的 this 绑定了(这里个人认为并不代表完全是静态的,因为外层的上下文仍是动态的可以使用 call,apply,bind 修改,这里只是说明了箭头函数的 this 始终等于它上层上下文中的 this)

## iterator 迭代器

可迭代的数据解构，ES6 在内部部署了一个[Symbol.iterator]属性，它是一个函数，执行后会返回 iterator 对象（也叫迭代器对象），而生成 iterator 对象[Symbol.iterator]属性叫 iterator 接口,有这个接口的数据结构即被视为可迭代的

默认部署 iterator 接口的数据结构有以下几个，注意普通对象默认是没有 iterator 接口的（可以自己创建 iterator 接口让普通对象也可以迭代）

- Array
- Map
- Set
- String
- TypedArray（类数组）
- 函数的 arguments 对象
- NodeList 对象

## for ... of 循环

for ... of 是作为 ES6 新增的遍历方式,允许遍历一个含有 iterator 接口的数据结构并且返回各项的值,和 ES3 中的 for ... in 的区别如下

1. for ... of 只能用在可迭代对象上,获取的是迭代器返回的 value 值,for ... in 可以获取所有对象的键名
2. for ... in 会遍历对象的整个原型链,性能非常差不推荐使用,而 for ... of 只遍历当前对象不会遍历它的原型链
3. 对于数组的遍历,for ... in 会返回数组中所有可枚举的属性(包括原型链上可枚举的属性),for ... of 只返回数组的下标对应的属性值

## 函数默认值

如果使用了函数默认参数,在函数的参数的区域(括号里面),它会作为一个单独的块级作用域,并且拥有 let/const 方法的一些特性,比如暂时性死区

```js
let w = 1,
  z = 2;

function func(x = w + 1, y = x + 1, z = z + 1) {
  console.log(x, y, z); // Uncaught ReferenceError: z is not defined
}
func();
```

```js
function bar(func = () => foo) {
  let foo = 'inner';
  console.log(func());
}
bar() // ReferrenceError: foo is not defined
}
```

### 参考文献

- 近一万字的 ES6 语法知识点补充：[https://juejin.im/post/5c6234f16fb9a049a81fcca5](https://juejin.im/post/5c6234f16fb9a049a81fcca5)
