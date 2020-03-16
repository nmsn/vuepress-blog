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
