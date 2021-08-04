# 其他

## 实现 (5).add(3).minus(2) 功能

```js
Number.prototype.add = function (number) {
    if (typeof number !== 'number') {
        throw new Error('请输入数字～');
    }
    return this + number;
};
Number.prototype.minus = function (number) {
    if (typeof number !== 'number') {
        throw new Error('请输入数字～');
    }
    return this - number;
};
console.log((5).add(3).minus(2));
```

## 连续赋值

```js
var a = {n: 1};
var b = a;
a.x = a = {n: 2};

console.log(a.x) // undefined
console.log(b.x) // {n:2}
```

1. 点的优先级大于等号的优先级
2. 对象以指针的形式进行存储，每个新对象都是一份新的存储地址

## 变量提升

```js
var a = 10;
(function () {
  console.log(a) // undefined
  a = 5
  console.log(window.a) // 10
  var a = 20
  console.log(a) // 20
})()
```

## 函数表达式

```js
var b = 10;
(function b() {
  b = 20;
  console.log(b)
})()
```

1. 函数表达式与函数声明不同，函数名只在该函数内部有效，并且此绑定是常量绑定。
2. 对于一个常量进行赋值，在 strict 模式下会报错，非 strict 模式下静默失败。
3. IIFE中的函数是函数表达式，而不是函数声明。

## 实现a == 1 && a == 2 && a == 3

```js
var a = {
  i: 1,
  toString() {
    return a.i++;
  }
}
```

因为==会进行隐式类型转换 所以我们重写toString方法就可以了

## ['1', '2', '3'].map(parseInt)

答案为 [1, NaN, NaN]

原式等价于

```js
[parseInt('1',0), parseInt('2',1), parseInt('3',2)]
```

parseInt(string, radix) 将一个字符串 string 转换为 radix 进制的整数， radix 为介于 2-36 之间的数。

radix 参数为 n 将会把第一个参数看作是一个数的 n 进制表示，而返回的值则是十进制。

如果被解析参数的第一个字符无法被转化成数值类型，则返回 NaN，第一个字符不为数字或者大于等于进制数，就会返回 NAN。

当 radix 为 0 、false、null、undefined，如果 string 不包含 0x，一般默认为十进制。

## 什么是字面量形式？

字面量指的是能够使用简单结构和符号创建对象的表达式。比如字符串字面量，使用一个双引号来创建字符串对象，而不需要完整的调用 new String() 语句。大多数语言都支持字面量，而其中最著名的要数 JavaScript，它支持字符串字面量，数字字面量(即2, 8, 10, 16进制数)，布尔值字面量(true, false)，对象字面量({})，数组字面量([])，匿名函数字面量(function, lambda)以及正则表达式字面量(/.*/)。而在其他语言中，还更加细分或者叫不同的名字，比如 Java 使用单引号的字符字面量，整数和浮点数字面量，python 把对象叫做字典等。

> 作者：A-yon
链接：https://www.zhihu.com/question/62411257/answer/559130266
来源：知乎
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。