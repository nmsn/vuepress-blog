# 深入浅出Nodejs

## 1 Node简介

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

### 2.6.1

包目录

- package.json 包描述文件
- bin 用于存放可执行二进制文件的目录
- lib 用于存放javaScript代码的目录
- doc 用于存放文档的目录
- test 用于存放单元测试用例的代码

### 2.7 

模块规范

- CommonJS
- AMD
- CMD

## 3 异步I/O

### 3.1.1

|I/O类型|花费的CPU时钟周期|
|---|---|
|CPU一级缓存|3|
|CPU二级缓存|14|
|内存|250|
|硬盘|41000000|
|网络|240000000|

### 3.2.1

- 阻塞I/O的一个特点是调用之后一定要等到系统内核层面完成所有操作后，调用才结束。以读取磁盘上的一段文件为例，系统内核在完成磁盘寻道、读取数据、复制数据到内存中之后，这个调用才结束
- 非阻塞I/O返回之后，CPU的时间片可以用来处理其他事务，此时的性能提升明显。但是由于完整的I/O并没有结束，立即返回的不是业务层期望的数据，而仅仅是当前调用的状态。为了获取完整的数据，应用程序需要重复调用I/O操作来确认是否完成。这种重复调用判断操作是否完成的技术叫做轮询。

- 任何技术都并非完美。阻塞I/O造成CPU等待浪费，非阻塞带来的麻烦却是需要轮询去确认是否完全完成数据获取，它会让CPU处理处理状态判断，是对CPU资源的浪费

轮询技术

- **read** 最原始性能最低，重复调用来检查I/O状态来完成完整数据的读取。在得到最终数据前，CPU一直耗用在等待上
- **select** read基础上的改进，通过对文件描述符上的时间状态来进行判断（限制为采用1024长度的数组来存储状态）
- **poll** 较select有所改进，采用链表的方式避免数组长度的限制，其次能避免不需要的检查，但是当文件描述符较多时，性能还是十分低下
- **epoll** Linux下效率最高的I/O事件通知机制，在进入轮询的时候如果没有检查到I/O事件，将会进行休眠，直到事件发生将它唤醒。它是真实利用了事件通知、执行回调的方式，而不是遍历查询，所以不会浪费CPU，执行效率较高
- **kequeue** 实现方式类似epoll，在FreeBSD系统下存在

### 3.3.5

- 在Node中，Javascript是单线程的，Node自身是多线程的，只是I/O线程使用的CPU较少
- 除了用户代码无法并行执行外，所有的I/O(磁盘I/O和网络I/O)则是可以并行的

### 3.4.1

setTimeout()和serInterval()与浏览器中的API是一致的，实现原理与异步I/O比较类似，只是不需要I/O线程池的参与。调用setTimeout()或者setInterval()创建的定时器会被插入到定时器观察者内部的一个红黑树中。每次Tick执行时，会从该红黑树中迭代去除定时器对象，检查是否超过定时时间，如果超过，就形成一个事件，它的会掉函数将立即执行。

### 3.4.2

- setTimeout()/setInterval() 需要动用红黑树，比较浪费性能 时间复杂度O(lg(n))
- process.nextTick() 相对轻量，只会将回调函数放入队列中，在下一轮Tick时取出执行 时间复杂度O(1)
- setImmediate() 与process.nextTick()相似，区别是process.nextTick()中的回调函数执行的优先级要高于setImmediate()
  - process.nextTick()属于idle观察者，setImmediate()属于check观察者。在每一轮循环检查中，idle观察者先于I/O观察者，I/O观察者先于check观察者
  - 在实现上，process.nextTick的回调函数保存在一个数组中，setImmediate()的结果则是保存在链表中
  - 在行为上，process.nextTick()在每轮循环中会将数组中的回调函数全部执行完，而setImmediate()在每轮循环中执行链表中的一个回调函数

之所以这这样设计，是为了保证每轮循环能够较快地执行结束，防止CPU占用过多而阻塞后续I/O调用的情况

各观察者优先级

- idle观察者 > I/O观察者 > check观察者
- idle观察者: process.nextTick()
- I/O观察者: 一般性的I/O回调，如网络，文件，数据库I/O
- check: setImmediate，setTimeout

// TODO
setTimmediate setTimeout 执行顺序问题

### 3.5

经典服务器模型:

- 同步式: 对于同步时式的服务，一次只能执行一个请求，并且其余请求都处于等待状态
- 每进程/每强求: 为每个请求启动一个进程，这样可以处理多个请求，但是它不具备拓展性，因为系统资源只有那么多
- 每线程/每请求: 为每个请求启动一个线程来处理。尽管线程比进程要轻量，但是由于每个线程都占用一定内存，当大并发请求到来时，内存将会被很快用光，导致服务器缓慢

### 4.1.1

高阶函数

除了通常意义的函数调用返回外，还形成了一种后续传递风格的结果接收方式，而非单一的返回值形式，后续传递风格的程序编写将函数的业务重点从返回值转移到了回调函数中

### 4.2.2

异步编程难点:

1. 异常处理

```js
try {
  JSON.parse(json);
} catch(e) {
  // TODO
}
```

但是这对于异步编程而言不适应适用。
异步I/O的实现主要包含两个阶段: 提交请求和处理结果。这两个阶段中间有事件循环的调度，两者彼此不关联。异步方法则通常在第一阶段提交请求后立即返回，因为异常并不一定发生在这个阶段，try/catch的功效不会发挥任何作用。

```js
var async = function(callback) {
  process.nextTick(callback);
};
```

调用async()后，callback直到下一个事件循环(Tick)才会取出来执行。尝试对异步方法执行try/catch操作只能捕获当次事件循环内的异常，对callback执行是爆出的异常将无能为力。

Node在处理异常上形成一种约定，将异常作为回调函数的第一个实参传回如果是空值，则表明异步调用没有异常抛出:

```js
async(function (err, results) {
  // TODO
})
```

在我们自行编写的异步方法上，也需要去遵循这样一些原则:

- 必须执行调用者传入的回调函数
- 正确传递回异常供调用者判断

```js
var async = function (callback) {
  process.nextTick(function() {
    var results = somethings;
    if (error) {
      return callback(error);
    }
    callback(null, results);
  });
};
```

2. 函数嵌套过深

3. 阻塞代码

    没有sleep()这样的线程沉睡功能，遇见这样的需求时，在统一规划业务逻辑后，调用setTimeout()的效果会更好

4. 多线程编程

5. 异步转同步

### 4.3.1 事件发布/订阅模式

事件监听器模式是一种广泛用于异步编程的模式，是回调函数的事件话，又称发布/订阅模式。
Node自身提供的events模块是发布/订阅模式的一个简单实现，比线段浏览器中的大量DOM事件简单，不存在事件冒泡，也不存在preventDefault()，stopPropagation()和stopImmediatePropagation()等控制事件传递的方法。它具有addListener/on()、once()、removeListener()、removeAllListeners()和emit()等几本的事件监听模式的方法实现。

```js
// 订阅
emitter.on('event', function(message) {
  console.log(message);
});
// 发布
emitter.emit('event','I am message!');
```

事件订阅就是一个高阶函数的应用。事件发布/订阅模式可以实现一个事件与多个回调函数的关联，这些回调函数被称为事件监听器。
通过emit()发布事件后，消息会立即传递给当前事件的所有监听器执行。

Node对事件发布/订阅的机制做了一些额外的处理，这大多是基于健壮性而考虑的

- 如果对一个事件添加了超过10个监听器，将会得到一条警告。这一设计与Node自身单线程运行有关，设计者认为监听器太多可能导致内存泄露，所以存在这样一条警告。调用emitter.setMaxListener(0);可以将这个限制去掉
- 为了处理异常，EventEmitter对象对error事件进行了特殊处理。如果运行期间的错误触发了error事件，EventEmitter会检查是否对error事件添加过监听器。若果添加了，这个错误将会交由该监听器处理，否则这个错误将会作为异常抛出。如果外部没有捕获这个异常，将会引起线程退出。一个健壮的EventEmitter实例应该对error事件做处理

利用事件队列解决雪崩问题

在计算机中，缓存由于存放在内存中，访问速度十分快，常常用于加速数据访问，让绝大多数的请求不必重复去做一些低效的数据读取。所谓雪崩问题，就是在高访问量、大并发量的情况下缓存失效的情景，此时大量的请求同时涌入数据库中，数据库无法同时承受如此大的查询请求，进而往前影响到网站整体的相应速度

一种改进方案是添加一个状态锁

```js
var status = 'ready';
var select = function(callback) {
  if (status === 'ready') {
    status = 'pending';
    db.select('SQL', function(results) {
      status = 'ready';
      callback(results);
    });
  }
};
```

但在这种情况下，连续多次调用select()时，只有第一次调用是生效的，后续的select()是没有数据服务的，这个时候可以引入事件队列

```js
var proxy = new events.EventEmitter();
var status = 'ready';
var select = function(callback) {
  proxy.once('select',callback);
  if (status === 'ready') {
    status = 'pending';
    db.select('SQL', function(results) {
      proxy.emit('selected', results);
      status = 'ready';
    });
  }
};
```

利用once()方法，将所有请求的会掉都压入事件队列中，利用其执行一次就会将监视器移除的特点，保证每一个回调只会被执行一次

### 4.3.2 Promise/Deferred模式 *

### 4.3.3 流程控制库