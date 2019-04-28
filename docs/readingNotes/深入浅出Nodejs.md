# 深入浅出Nodejs

## Node简介

### 1.4 Node特点

- 异步I/O

- 事件与回调函数

- 单线程

  优点:

  - 没有死锁
  - 没有线程上下文交换所带来的性能上的开销

  缺点:

  - 无法利用多核CPU
  - 错误会引起整个应用退出，应用的健壮性值得考验
  - 大量计算占用CPU导致无法继续调用异步I/O

- 跨平台

### 2.2.3

Javascript模块的编译

在编译过程中，Node对于获取的JavaScript文件进行了头尾包装

在头部添加了

```js
(function (exports, require, module, __filename, dirname)) {\n
```

- filename: 返回当前模块文件被解析过后的绝对路径
- dirname: 返回当前模块文件解析过后所在的文件夹（目录）的绝对路径

在尾部添加了

```js
\n });
```

exports和module.exports

module.exports才是真正的接口，exports只不过是它的一个辅助工具。
最终返回给调用的是module.exports而不是exports。
所有的exports收集到的属性和方法，都赋值给了Module.exports。
当然，这有个前提，就是module.exports本身不具备任何属性和方法。
如果，module.exports已经具备一些属性和方法，那么exports收集来的信息将被忽略。

### 2.3.2

模块依赖关系: 内建模块（c/c++） -> 核心模块(javascript) -> 文件模块

node在启动时会生成一个全局变量process

### 2.4

C/C++拓展模块属于文件模块的一类，预先编译为.node文件，然后调用process.dlopen()方法加载执行

为了实现跨平台， dlopen()在内部实现时区分了平台，分别用的是加载.so(*nix)和.dll(Window)的方式