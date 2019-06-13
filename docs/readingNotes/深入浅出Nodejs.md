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

## 5 内存控制

### 5.1.3 V8的对象分配

node process.memoryUsage() 输出内存信息

```js
{
  rss: xxx, resident set size 进程的常驻内存部分
  heapTotal: xxx, 已申请到的堆内存
  heapUsed: xxx, 当前使用的堆内存
}
```

V8限制堆大小的原因，表层是因为V8最初给浏览器设计，不太可能遇到大量内存的场景。深层原因是V8的垃圾回收机制的限制。
垃圾回收中引起JavaScript线程暂停执行，在这样的事件花销下，应用的性能和响应能力都会直线下降。

```js
node --max-old-space-size= xxx xxx.js // 单位为MB 老生代内存
node --max-new-space-size= xxx xxx.js // 单位为KB 新生代内存
```

### 5.1.4 V8的垃圾回收机制

V8的垃圾回收策略主要基于分代式垃圾回收机制

在V8中，主要将内存分为新生代和老生代两代。新生代中的对象为存活事件较短的对象，老生代中的对象为存活是将较长或常驻内存的对象

在分代的基础上，新生代中的对象主要通过Scavenge算法进行垃圾回收，具体实现采用Cheney算法，它将堆内存一分为二，在这两个semispace中，只有一个处于使用中，另一个处于闲置状态，简而言之，在垃圾回收过程中，就是通过将存活对象在两个semispace空间之间进行复制，缺点是只能使用堆内存中的一半，优点是在时间效率上有优异的表现

由于Scavenge是典型的牺牲空间换取时间的算法，所以无法大规模应用到所有的垃圾回收中，但可以发现，它非常适合应用在新生代中，因为新生代中对象的生命周期较短

在分代式垃圾回收的前提下，在一定条件下，需要将存货周期长的对象移动到老生代中，也就是完成对象晋升。

对象晋升的条件主要有两个，一个是对象是否经历过Scavenge回收，一个是To空间的内存占用比超过限制（25%）

对于老生代的对象，主要采用Mark-Sweep（标记清除）和Mark-Compact（标记整理）相结合的方式进行垃圾回收

Mark-Sweep在标记阶段遍历堆中的所有对象，并标记活着的对象，在随后的清除阶段中，只清除没有标记的对象。Mark-Sweep最大的问题是在进行一次标记清除回收后，内存空间回出现不连续的状态。这种内存碎片会对后续的内存分配造成问题

Mark-Compact是在Mark-Sweep的基础上演变而来的。差别在于对象在标记为死亡后，在整理过程中，将活着的对象往一端移动，移动完成后，直接清理掉边界外的内存

|回收算法|Mark-Sweep|Mark-Compact|Scavenge|
|---|---|---|---|
|速度|中等|最慢|最快|
|空间开销|少（有碎片）|少（无碎片）|双倍空间（无碎片）|
|是否移动对象|否|是|是|

V8主要使用Mark-Sweep，在空间不足以对从新生代中晋升过来的对象进行分配时才使用Mark-Compact

Incremental marking（增量标记）用于改善老生代全堆垃圾回收的标记、清理、整理等动作造成的停顿

### 5.1.5 查看垃圾回收日志

启动时添加`--trace_gc`参数，在进行垃圾回收时，会从标准输出打印垃圾回收的日志信息，执行结束后，将会在gc.log中得到所有的垃圾回收信息

启动时添加`--prof`参数，可以得到V8执行时的性能分析数据，v8.log

### 5.2 高效使用内存

### 5.2.1 作用域

### 5.2.2 闭包

在JavaScript中，实现外部作用域访问内部作用域中变量的方法叫做闭包（closure）。这得益于高阶函数的特性: 函数可以作为参数或者返回值

```js
var foo = function() {
  var bar = function() {
    var local = '局部变量';
    return function() {
      return local;
    };
  };
  var baz = bar();
  console.log(baz());
}
```

### 5.3.1 查看内存使用情况

```js
os.totalmem() // 返回系统的总内存
os.freemem() // 返回系统的闲置内存
```

### 5.3.2 堆外内存

通过process.memoryUsage()的结果，堆中的内存用量总是小于进程的常驻内存用量，这意味这Node中的内存使用并非都是通过V8进行分配的。将那些不是通过V8分配的内存称为堆外内存

### 5.4 内存泄漏

尽管内存泄漏的情况不尽相同，但其实质只有一个，就是应当回收的对象出现意外而没有被回收，变成了常驻在老生代中的对象

原因通常有如下几个:

- 缓存
- 队列消费不及时
- 作用域未释放

### 5.4.1 慎将内存当作缓存

缓存在应用中的作用举足轻重，可以十分有效的节约资源。因为它的访问效率比I/O的效率高，一旦命中缓存，就可以节省一次I/O的时间
但在Node中，一旦一个对象呗当作缓存来使用，那就意味着它将会常驻在老生代中

1. 缓存限制策略

    - 为了解决缓存中的对象永远无法释放的问题，需要加入一种策略来限制缓存的无限增长
    - 另一个案例在于模块机制: 为了加速模块的引入，所有模块都会通过编译执行，然后被缓存起来。由于通过exports导出的函数，可以访问文件模块中的私有变量，这样每个文件模块在编译执行后形成的作用域因为模块缓存的原因，不会被释放，由于模块的缓存机制，模块是常驻老生代的。

2. 缓存的解决方案

    直接将内存作为缓存的方案要十分慎重。除了限制缓存的大小外，另外要考虑的事情是，进程之间无法共享内存。如果在进程内使用缓存，这些缓存不可避免的有重复，对物理内存的使用是一种浪费

    目前比较好的解决方案是采用进程外的缓存，进程自身不存储状态。在Node中可以解决一下两个问题

      - 将缓存转移到外部，减少常驻内存的对象的数量，让垃圾回收更高效
      - 进程之间可以共享缓存

    目前市面上较好的缓存有`Redis`和`Memcached`

### 5.4.2 关注队列状态

  如果欠缺考虑，也许会采用数据库来记录日志。日志通常会是海量的，数据库构建在文件系统上，写入效率远远低于文件直接写入，于是会形成数据库写入操作的堆积，而JavaScript中相关的作用域也不会得到释放，内存占用不会回落，从而出现内存泄漏

  深度的解决方案应该是监控队列的长度，一旦堆积，应当通过监控系统产生报警并通知相关人员。另一个解决方案是任意异步调用都应该包含超时机制，一旦在限定时间内未完成响应，通过回调函数传递超时异常，使得任意异步调用的回调都具备可控的响应时间
  
### 5.5 内存泄漏排查

定位Node应用内存泄漏常用工具:

- v8-profiler
- node-heapdump
- node-mtrace
- dtrace
- node-memwatch

### 5.6 大内存应用

Node提供stream模块用于处理大文件

## 6 理解Buffer

### 6.1 Buffer结构

### 6.1.1 模块结构

Buffer是一个典型的JavaScript与C++结合的模块，它将性能相关部分用C++实现，将非性能相关的部分用JavaScript实现

Buffer所占用额度内存不是通过V8分配的，属于堆外内存

由于Buffer太过常见，Node在进程启动时就已经加载了它，并将其放在全局对象（global）上，所以在使用时，无须通过require()即可直接使用

### 6.1.2 Buffer

Buffer对象类似于数组，它的元素为16进制的两位数，即0到255的数值
Buffer受Array类型的影响很大，可以访问length属性得到长度，也可以通过下标访问元素，在构造对象时也十分相似

```js
var buf = new Buffer(100);
console.log(buf.length) // => 100
console.log(buf[10]) // 这里得到一个0到255的随机数
```

同样，通过下标可以进行赋值

赋值:

- `<0`: 依次加256，直到得到0到255的随机整数
- `>255`: 依次减256 ...
- `小数`: 舍弃小数部分

### 6.1.3 Buffer的内存分配

Buffer对象的内存分配不是在V8堆内存中，而是在Node的C++层面实现内存的申请，在JavaScript中分配内存的策略

Node采用slab动态内存管理机制、

通过new Buffer(size)分配指定大小对象

Node以8KB来界定区分Buffer是大对象还是小对象

Buffer.poolSize = 8 * 1024

8KB也是每slab的大小，在JavaScript层面，以它作为单位单元进行内存的分配

1. 分配小Buffer对象

    如果指定Buffer的大小少于8KB，Node会按照小对象的方式进行分配

2. 分配大Buffer对象

    如果需要超过8KB的Buffer对象，将会直接分配一个SlowBuffer对象作为slab单元，这个slab单元将会被这个大Buffer对象独占

    这里的SlowBuffer类实在C++中定义的，虽然引用buffer模块可以访问到它，但是不推荐直接操作它，而是用Buffer替代

简而言之，真正的内存是在Node的C++层面提供的，JavaScript层面只是使用它。当进行小而频繁的Buffer操作时，采用slab的机制进行预先申请和事后分配，使得JavaScript到操作系统之间不必有过多的内存申请方面的系统调用。对于大块的Buffer而言，则直接使用C++层面提供的内存，而无需细腻的分配操作。

### 6.2 Buffer的转换

Buffer对象可以与字符串相互转换

### 6.2.1 字符串转Buffer

```js
new Buffer(str, [encoding]); // encoding不传时默认为UTF-8
```

调用write()实现一个Buffer对象存储不同编码类型的字符串转码的值

```js
buf.write(string, [offset], [length], [encoding])
```

### 6.2.2 Buffer转字符串

```js
buf.toString([encoding], [start], [end])
```

如果Buffer对象由多种编码写入，就需要在局部指定不同的编码，**才能转换回正常的编码**

### 6.2.3 Buffer不支持的编码类型

```js
Buffer.isEncoding(encoding) // 判断编码是否支持
```

### 6.3 Buffer的拼接

```js
var fs = require('fs');
var rs = fs.createReadStream('test.md');
var data = '';
rs.on('data', function(trunk) {
  data += trunk;
});
rs.on('end', function() {
  console.log(data);
})
```

一旦输入流中有宽字节码时，可能会出现乱码

问题在于

```js
data += trunk // data = data.toString() + trunk.toString()
```

### 6.3.1 乱码是如何产生的

buf.toString()方法默认以UTF-8为编码，中文字在UTF-8下占3个字节，所以一个中文字中的三个字节可能被分隔到两个Buffer对象中，造成不能形成文字的字节，只能显示乱码

对于任意长度的Buffer而言，宽字节字符串都有可能存在被截断的情况，只不过Buffer的长度越大出现的概率越低而已

### 6.3.2 setEncoding()与string_decoder()

可读流设置编码

```js
setEncoding()
```

该方法的作用是让data事件中传递的不再是一个Buffer对象，而是编码候得字符串

```js
var rs = fs.createReadStream('test.md');
rs.setEncoding('utf-8');
```

在调用setEncoding()时， 可读流对象在内部设置了一个decoder对象，每次data事件都通过该decoder对象进行Buffer到字符串的解码，然后传递给调用者

decoder对象来自于string_decoder模块StringDecoder的实例对象

```js
var StringDecoder = require('string_decoder').StringDecoder;
var decoder = new StringDecoder('utf-8');
decoder.write(xxx);
```

StringDecoder在得到编码后，知道宽字节字符串在UTF-8编码下是以3字节的方式存储的，所以本应被截断的字节保留在StringDecoder实例内部，第二次write()时，将保留下来的字节和后续的拼在一起

### 6.3.3 正确拼接Buffer

```js
var chunks = [];
var size = 0;
res.on('data', function(chunk) {
  chunks.push(chunk);
  size += chunk.length;
});
res.on('end',function() {
  var buf = Buffer.concat(chunks, size);
  var str = iconv.decode(buf, 'utf-8');
  console.log(str);
})
```

正确的拼接方法使用一个数组来存储接收到的所有Buffer片段并记录下所有片段的总长度，然后调用Buffer.concat()方法生成一个合并的Buffer对象

### 6.4 Buffer与性能

通过预先转换静态内容为Buffer对象，可以有效地减少CPU的重复使用，节省服务器资源

highWaterMark的大小对性能影响

- highWaterMark设置对Buffer内存的分配和使用有一定影响
- highWaterMark设置过小，可能导致系统调用次数过多

## 7 网络编程

### 7.1 构建TCP服务

### 7.1.1 TCP

TCP全名为传输控制协议，再OSI模型（由七层著称，分别为物理层、数据链阶层、网络层、传输层、会话层、表示层、应用层）中属于传输层协议

|||
|---|---|
|HTTP、SMTP、IMAP等|应用层|
|加密、解密等|表示层|
|通信连接、维持会话|会话层|
|TCP、UDP|传输层|
|IP|网络层|
|网络特有的链路接口|链路层|
|网络物理硬件|物理层|

TCP是面向连接的协议，其显著的特征是在传输之前需要3次握手形成会话

### 7.2 UDP服务

UDP又称用户数据包协议，与TCP一样同属于网络传输层。UDP与TCP最大的不同是UDP不是面向连接的。

### 7.3 构建HTTP服务

### 7.3.1 HTTP

HTTP全称是超文本传输协议。HTTP构建在TCP之上，属于应用层协议

### 7.3.2 http模块

HTTP与TCP服务模型有区别的地方在于，在开启keepalive后，一个TCP会话可以用于多次请求和响应。TCP服务以connection为单位进行服务，HTTP服务以request为单位进行服务。http模块即是connection到request的过程进行了封装

#### 1. HTTP请求

#### 2. HTTP响应

res.setHeader() 可以调用多次进行设置，但只有调用writeHead后，报头才会写入到连接中

res.writeHead()

res.write()

res.end()

#### 3. HTTP服务的事件

如同TCP服务一样，HTTP服务器页抽象了一些事件，以供应用层使用，同样典型的是，服务器也是一个EventEmitter实例

- connection
- request
- close
- checContinue
- connect
- upgrade
- clientError

### 7.3.3 HTTP客户端

1. HTTP响应

2. HTTP代理

3. HTTP客户端事件

### 7.4 构建WebSocket服务

WebSocket在Node中的优点

- WebSocket客户端基于事件的编程模型于Nod自定义事件相差无几
- WebSocket实现了客户端与服务端之间的长连接，而Node事件驱动的方式十分擅长与大量的客户端保持高并发连接

WebSocket与传统HTTP相比的好处

- 客户端与服务器端只建立一个TCP连接，可以使用更少的连接
- WebSocket服务器端可以推送数据到客户端，这远比HTTP请求响应模式更灵活、更高效
- 有更轻量的协议头，减少数据传送量

相比HTTP，WebSocket更接近于传输层协议，它并没有在HTTP的基础上模拟服务器端的推送，而是在TCP上定独立的协议。让人迷惑的部分在于WebSocket的握手部分是由HTTP完成的，使人觉得它可能是基于HTTP实现的

WebSocket协议主要分为两个部分: 握手和数据传输

### 7.4.1 WebSocket握手

客户端建立连接时，通过HTTP发起请求报文，与普通HTTP请求协议略有区别的部分在于如下协议头: 

- Upgrade: websocket
- Connection: Upgrade

上述两个字段表示请求服务器端升级协议为WebSocket

### 7.4.2 WebSocket数据传输

为了安全考虑，客户端需要对发送的数据进行掩码处理，服务器一旦收到无掩码帧，连接将关闭。而服务端发送到客户端的数据帧则无须做掩码处理，同样，如果客户端收到的带掩码的数据帧，连接也将关闭

### 7.5 网络服务与安全

Node在网路安全上提供了三个模块，分别是crypto、tls、https。

- crypto 主要用于加密解密，SHA1、MD5等加密算法都在其中有提现
- tls 模块提供了与net模块类似的功能，区别在于它建立在TLS/SSL加密的TCP连接上
- https 完全与http模块接口一致，区别也仅在于它建立于安全的连接之上

### 7.5.1 TLS/SSL

#### 1. 密钥

TLS/SSL是一公钥/私钥的结构，非对称，每一个服务器端和客户端都有自己的公私钥。公钥用来加密要传输的数据，私钥用来解密接收到的数据。公钥私钥配对，所以在建立安全传输之前，客户端和服务端之间需要互换公钥

Node在底层采用的是openssl实现TLS/SSL的，为此要生成公钥和私钥可以通过openssl完成

```bash
// 生成服务器私钥
openssl genrsa -out server.key 1024
// 生成客户端私钥
openssl genrsa -out client.key 1024
```

上述命令生成了两个1024位长的RSA私钥，我们可以通过它继续生成公钥

```bash
openssl rsa -in server.key -pubout -out server.pem
openssl rsa -in client.key -pubout -out client.pem
```

公私钥的非对称加密虽好，但是网络中依然可能存在窃听的情况，典型的例子是中间人攻击，为了解决这个问题，TLS/SSL引入了数字证书来进行认证。与直接用公钥不同，数字证书中包含了服务器的名称和主机名、服务器的公钥、签名颁发机构的名称、来自签名颁发机构的签名。在连接建立前，会通过证书中的签名确认收到的公钥是来自目标服务器的，从而产生信任关系。

#### 2. 数字证书

为了确保我们的数据安全，现在我们引入了一个第三方: CA(Certificate Authority,数字证书认证中心)。

为了得到签名证书，服务器需要通过自己的私钥生成CSR(Certificate Signing Request，证书签名请求)文件。CA机构将通过这个文件办法属于服务器端的签名证书，只要通过CA机构就能验证证书是否合法。

对于中小型企业而言，多半是采用自签名证书来构建安全网络的。所谓自签名证书，就是自己扮演CA机构，给自己的服务器端颁发签名证书。以下为生成私钥、生成私钥、生成CSR文件、通过私钥自签名生成证书的过程

```bash
openssl genrsa -out ca.key 1024
openssl req -new -key ca.key -out ca.csr
open x509 -req -in ca.csr -signkey ca.key -out ca.crt
```

### 7.5.2 TLS服务

### 7.5.3 HTTPS服务

#### 1. 准备证书

#### 2. 创建HTTPS服务

#### 3. HTTPS客户端

## 8 构建Web应用

### 8.1 基础功能

### 8.1.1 请求方法

- GET
- POST
- HEAD
- DELETE
- PUT
- CONNECT

### 8.1.2 路径解析

### 8.1.3 查询字符串

Node提供querystring模块用于处理这部分数据

```js
var url = require('url');
var querystring = require('quertstring');
var query = querystring.parse(url.parse(req.url).query);
```

更简洁的方法是给url.parse()传递第二个参数

```js
var query = url.parse(req.url, true).query;
```

### 8.1.4 Cookie

#### 1. 初识Cookie

Cookie的处理分为如下几步

- 服务器向客户端发送Cookie
- 浏览器将Cookie保存
- 之后每次浏览器都会将Cookie发向服务器端

#### 2. Cookie的性能影响

- 减小Cookie大小
- 为静态组件使用不同的域名
- 减少DNS查询

### 8.1.5 Session

为了解决Cookie敏感数据的问题，Session应运而生。Session的数据只保留在服务器端，客户端无法修改，这样数据的安全性得到一定的保障，数据也无须再协议中每次都被转递

客户端与服务器中数据对应方式

1. 基于Cookie来实现用户和数据的映射

2. 通过查询字符串来实现浏览器端和服务器端数据的对应

    有的服务器在客户端禁用Cookie时，会采用这种方案实现退化

#### Session与内存

为了解决性能问题和Session数据无法跨进程共享的问题，常用的方式是将Session集中化，将原本可能分散在多个进程的数据，同意转移到集中的数据存储中。目前常用的工具是Redis、Memcached等

采用第三方缓存来存储Session引起的一个问题是会引起网络访问。理论上来说访问网络中的数据要比访问本地磁盘中的数据速度要慢，因为涉及到握手、传输以及网络终端自身的磁盘I/O等，尽管如此依然采用这些高速缓存的理由有一下jitiao

- Node与缓存服务保持长连接，而非频繁的短连接，握手导致的延迟只影响初始化
- 高速缓存直接在内存中进行数据存储和访问
- 缓存服务通常与Node进程运行在相同的机器上或者相同的机房里，网络速度受到的影响较小

#### Session与安全

### 8.1.6 缓存

- If-Modified-Since/Last-Modified

- If-None-Match/ETag

- Expires

- Cache-Control

### 8.1.7 Basic认证

## 8.2 数据上传

Node的http模块只对HTTP报文的头部进行了解析，然后出发request事件。如果请求中还带有内容部分（如POST请求，它具有报头和内容），内容部分需要用户自行接收和解析。通过报头的Transfer-Encoding或Content-Length即可判断请求中是否带有内容

```js
var hasBody = function(req) {
  return 'transfer-encoding' in req.headers || 'content-length' in req.headers;
}
```

### 8.2.1 表单数据

默认的表单提交，请求头中的Content-Type字段值为application/x-www-form-urlencoded

### 8.2.2 其他格式

1. JSON application/json

2. JSON application/xml

### 8.2.3 附件上传

multipart/form-data

### 8.2.4 数据上传与安全

1. 内存限制

      在解析表单、JSON和XML部分，我们采用的策略是先保存用户调教的所有数据，然后再解析处理，最后才传递给业务逻辑。它仅仅适合数据量小的提交请求，一旦数据量过大，将发生内存被占光的情况

      解决这个问题主要有两个方案

      - 限制上传内容的大小，一旦超过限制，停止接收数据，并响应400
      - 通过流式解析，将数据流导向到磁盘中，Node只保留文件路径等小数据

2. CSRF

全程Cross-Site Request Forgery 跨站请求伪造

### 8.3 路由解析

### 8.3.1 文件路径型

1. 静态文件
2. 动态文件

### 8.3.2 MVC

MVC模型的主要思想是将业务逻辑按职责分离，分为:

- 控制器 Controller 一组行为的集合
- 模型 Model 数据相关的操作和封装
- 视图 View 视图的渲染

工作模式如下

- 路由解析，根据URL寻找到对应的控制器和行为
- 行为调用相关的模型，进行数据操作
- 数据操作结束后，调用视图和相关数据进行页面渲染，输出到客户端

1. 手工映射
2. 自然映射

### 8.3.3 RESTful

RESTful的全称是Representational State Transfer，中文含义为表现程状态转化

它的设计哲学主要将服务器提供的内容实体看作一个资源，并表现在URL上

所以REST的设计就是，通过URL设计资源，请求方法定义资源的操作（POST DELETE PUT GET），通过Accept决定资源的表现形式

RESTful与MVC设计并不冲突，而且是更好的改进。相比MVC，RESTful只是将HTTP请求方法也加入了路由的过程，以及在URL路径上体现得更资源化

### 8.4 中间件 *

在最早的中间件的定义中，它是一种在操作系统上为应用软件提供服务的计算机软件。它既不是操作系统的一部分，也不是应用软件的一部分，它处于操作系统与应用软件之间，让应用软件更好、更方便地使用底层服务

如今中间件含义借指了这种封装底层细节，为上层提供更方便服务的意义，并非限定在操作系统层面。这里要提到的中间件，就是为我们封装上文提及的所有HTTP请求细节处理的中间件，开发者可以脱离这部分细节，专注在业务上

### 8.4.1 异常处理

### 8.4.2 中间件与性能

1. 编写高效的中间件
2. 合理使用路由

### 8.5 页面渲染

### 8.5.1 内容响应

1. MIME

    浏览器正是通过不同的Content-Type的值来决定采用不同的渲染方式，这个值我们简称为MIME值
    MIME的全称是Multipurpose Internet Mail Extensions，最早用于电子邮件，后来也应用到浏览器中。不同的文件类型具有不同的MIME值

    除了MIME外，Content-Type的值也可以包含一些参数，如字符集

2. 附件下载

    Content-Disposition字段影响的行为是客户端会根据它的值判断是应该将报文数据当作及时浏览的内容，还是可下载的附件
    当内同只需即时查看时，它的值为inline，当数据可以存为附件时，它的值为attachment。另外，Content-Disposition字段还能通过参数指定保存时应该使用的文件名

    ```
    Content-Disposition: attachment; filename="filename.ext"
    ```

3. 响应JSON

  Content-Type: application/json


4. 响应跳转