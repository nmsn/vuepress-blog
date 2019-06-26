---
sidebar: auto
---

# 摘录

## 行高

参考: [前端读书寻宝记之读《包容性Web设计》有感](https://juejin.im/post/5bfa8f4be51d4574b133d0a0)

行高要设置成无单位的相对值，建议1.5倍间距

```css
p{
    font-size: 1rem;
    line-height: 1.5;
}
```

## DOM事件

### DOM级别

参考: [DOM事件机制](https://juejin.im/post/5bd2e5f8e51d4524640e1304)

DOM级别一共可以分为四个级别：DOM0级、DOM1级、DOM2级和DOM3级。而DOM事件分为3个级别：DOM 0级事件处理，DOM 2级事件处理和DOM 3级事件处理。由于DOM 1级中没有事件的相关内容，所以没有DOM 1级事件。

#### DOM0级

```js
element.on[] = function() {}
```

当给元素绑定多个同类型事件时，最后一个事件会覆盖前面的事件。

绑定事件在当前元素的冒泡阶段（或者目标阶段）执行。

#### DOM2级

```js
element.addEventListener(event-name, callback, useCapture)
```

参数：

- event-name: 事件名称，可以是标准的DOM事件
- callback: 回调函数，当事件触发时，函数会被注入一个参数为当前的事件对象 event
- useCapture: 默认是false，代表事件句柄在冒泡阶段执行（事件句柄）

可以同一元素绑定多个同类型事件（执行顺序有待实验）

#### DOM3级

在DOM2级事件的基础上添加了更多的事件类型

- UI事件，当用户与页面上的元素交互时触发，如：load、scroll
- 焦点事件，当元素获得或失去焦点时触发，如：blur、focus
- 鼠标事件，当用户通过鼠标在页面执行操作时触发如：dblclick、mouseup
- 滚轮事件，当使用鼠标滚轮或类似设备时触发，如：mousewheel
- 文本事件，当在文档中输入文本时触发，如：textInput
- 键盘事件，当用户通过键盘在页面上执行操作时触发，如：keydown、keypress
- 合成事件，当为IME（输入法编辑器）输入字符时触发，如：compositionstart
- 变动事件，当底层DOM结构发生变化时触发，如：DOMsubtreeModified
- 同时DOM3级事件也允许使用者自定义一些事件。

## Event对象常见的应用

### event. preventDefault()

阻止默认事件行为触发

### touchstart & click

意思的是，当我们在目标元素同时绑定 touchstart 和 click 事件时，在 touchstart 事件回调函数中使用该方法，可以阻止后续 click 事件的发生。

### event.stopPropagation() & event.stopImmediatePropagation()

event.stopPropagation() 方法阻止事件冒泡到父元素，阻止任何父事件处理程序被执行

event.stopImmediatePropagation 既能阻止事件向父元素冒泡，也能阻止元素同事件类型的其它监听器被触发

### event.target & event.currentTarget

event.target指向引起触发事件的元素，而event.currentTarget则是事件绑定的元素，只有被点击的那个目标元素的event.target才会等于event.currentTarget。也就是说，event.currentTarget始终是监听事件者，而event.target是事件的真正发出者。

## HTTP

### HTTP2 vs HTTP1.x

- HTTP2性能提升的核心就在于二进制分帧层。HTTP2是二进制协议，他采用二进制格式传输数据而不是1.x的文本格式。
- HTTP2多路复用解决HTTP1.x的线头阻塞和多个TCP连接的问题。
- HTTP2对头部进行压缩。

## 空格字符

参考: [小tips: 使用&#x3000;等空格实现最小成本中文对齐](https://www.zhangxinxu.com/wordpress/2015/01/tips-blank-character-chinese-align/)

|字符以及HTML实体|描述以及说明|
|---|---|
|`&nbsp;`|这是我们使用最多的空格，也就是按下space键产生的空格。在HTML中，如果你用空格键产生此空格，空格是不会累加的（只算1个）。要使用html实体表示才可累加。为了便于记忆，我总是把这个空格成为“牛逼(nb)空格(sp – space)”，虽然实际上并不牛逼。该空格占据宽度受字体影响明显而强烈。在inline-block布局中会搞些小破坏，在两端对齐布局中又是不可少的元素。是个让人又爱又恨的小东东。|
|`&ensp;`|该空格学名不详。为了便于记忆，我们不妨就叫它“恶念(e n-ian)空格”。此空格传承空格家族一贯的特性：透明滴！此空格有个相当稳健的特性，就是其**占据的宽度正好是1/2个中文宽度**，而且基本上不受字体影响。|
|`&emsp;`|该空格学名不详。为了便于记忆，我们不妨就叫它”恶魔(e m-o)空格”。此空格也传承空格家族一贯的特性：透明滴！此空格也有个相当稳健的特性，就是其**占据的宽度正好是1个中文宽度**，而且基本上不受字体影响。|
|`&thinsp;`|该空格学名不详。我们不妨称之为“瘦弱空格”，就是该空格长得比较瘦弱，身体单薄，占据的宽度比较小。我目前是没用过这个东西，这里亮出来是让其过一下群众演员的瘾。|

## MuationObserver

参考：[了解HTML5中的MutationObserver](https://segmentfault.com/a/1190000012787829)

MutationObserver翻译过来就是变动观察器，字面上就可以理解这是用来观察Node（节点）变化的。

MutationObserver是一个构造器，接受一个callback参数，用来处理节点变化的回调函数，返回两个参数，mutations：节点变化记录列表（`sequence<MutationRecord>`），observer：构造MutationObserver对象。

```js
var observe = new MutationObserver(function(mutations,observer){
})
```

MutationObserver对象有三个方法，分别如下：

1. **observe**：设置观察目标，接受两个参数，target：观察目标，options：通过对象成员来设置观察选项
2. **disconnect**：阻止观察者观察任何改变
3. **takeRecords**：清空记录队列并返回里面的内容

关于observe方法中options参数有已下几个选项：

1. **childList**：设置true，表示观察目标子节点的变化，比如添加或者删除目标子节点，不包括修改子节点以及子节点后代的变化
2. **attributes**：设置true，表示观察目标属性的改变
3. **characterData**：设置true，表示观察目标数据的改变
4. **subtree**：设置为true，目标以及目标的后代改变都会观察
5. **attributeOldValue**：如果属性为true或者省略，则相当于设置为true，表示需要记录改变前的目标属性值，设置了attributeOldValue可以省略attributes设置
6. **characterDataOldValue**：如果characterData为true或省略，则相当于设置为true,表示需要记录改变之前的目标数据，设置了characterDataOldValue可以省略characterData设置
7. **attributeFilter**：如果不是所有的属性改变都需要被观察，并且attributes设置为true或者被忽略，那么设置一个需要观察的属性本地名称（不需要命名空间）的列表

## css加载会造成阻塞吗？

参考：[css加载会造成阻塞吗？](https://www.cnblogs.com/chenjg/p/7126822.html)

1. css加载不会阻塞DOM解析
2. css加载会阻塞DOM树的渲染
3. css加载会阻塞后面js语句的执行

## 浏览器如果渲染过程遇到JS文件怎么处理？

原文：[你不知道的浏览器页面渲染机制](https://juejin.im/post/5ca0c0abe51d4553a942c17d?tdsourcetag=s_pcqq_aiomsg)

渲染过程中，如果遇到`<script>`就停止渲染，执行 JS 代码。因为浏览器渲染和 JS 执行共用一个线程，而且这里必须是单线程操作，多线程会产生渲染 DOM 冲突。
JavaScript的加载、解析与执行会阻塞DOM的构建，也就是说，在构建DOM时，HTML解析器若遇到了JavaScript，那么它会暂停构建DOM，将控制权移交给JavaScript引擎，等JavaScript引擎运行完毕，浏览器再从中断的地方恢复DOM构建。
也就是说，如果你想首屏渲染的越快，就越不应该在首屏就加载 JS 文件，这也是都建议将 script 标签放在 body 标签底部的原因。当然在当下，并不是说 script 标签必须放在底部，因为你可以给 script 标签添加 defer 或者 async 属性（下文会介绍这两者的区别）。

原本DOM和CSSOM的构建是互不影响，井水不犯河水，但是一旦引入了JavaScript，CSSOM也开始阻塞DOM的构建，只有CSSOM构建完毕后，DOM再恢复DOM构建。

这是因为JavaScript不只是可以改DOM，它还可以更改样式，也就是它可以更改CSSOM。因为不完整的CSSOM是无法使用的，如果JavaScript想访问CSSOM并更改它，那么在执行JavaScript时，必须要能拿到完整的CSSOM。所以就导致了一个现象，如果浏览器尚未完成CSSOM的下载和构建，而我们却想在此时运行脚本，那么浏览器将延迟脚本执行和DOM构建，直至其完成CSSOM的下载和构建。也就是说，在这种情况下，浏览器会先下载和构建CSSOM，然后再执行JavaScript，最后在继续构建DOM。

## 浏览器多内核与JS线程

原文：[浅谈浏览器多进程与JS线程](https://segmentfault.com/a/1190000013083967)

- 图形用户界面GUI渲染线程
  - 负责渲染浏览器界面，包括解析HTML、CSS、构建DOM树、Render树、布局与绘制等
  - 当界面需要重绘（Repaint）或由于某种操作引发回流（Reflow）时，该线程就会执行
- JS引擎线程
  - JS内核，也称JS引擎，负责处理执行javascript脚本
  - 等待任务队列的任务的到来，然后加以处理，浏览器无论什么时候都只有一个JS引擎在运行JS程序
- 事件触发线程
  - 听起来像JS的执行，但其实归属于浏览器，而不是JS引擎，用来控制时间循环
  - 当JS引擎执行代码如setTimeout时，会将对应任务添加到事件线程中
  - 当对应的事件符合触发条件被触发时，该线程会把事件添加到待处理队列的队尾，等待JS引擎的处理
  - 注意：由于JS单线程关系，所以这些待处理队列中过的事件都得排队等待JS引擎处理
- 定时触发器线程
  - setIntervel与setTimeout所在线程
  - 定时计时器并不是又JS引擎计时的，因为如果JS引擎时单线程又处于堵塞状态，那回影响到及时的准确
  - 当计时完成被触发，事件会被添加到事件队列，等待JS引擎空闲了执行
- 异步HTTP请求线程
  - 在XMLHttpRequest在连接后新启动的一个线程
  - 线程如果检测到请求的状态变更，如果设置又回调函数，该线程会把回调函数添加到事件队列，同理，等待JS引擎空闲了执行

## Load和DOMContentLoadad区别

- DOMContentLoaded事件将在DOM层次结构完全构建后立即触发
- Load事件将在所有图像和CSS文件完成加载后执行

## ios12键盘收起页面不回弹问题

原文: [ios 最新系统bug与解决——微信公众号中弹出键盘再收起时，原虚拟键盘位点击事件无效](https://juejin.im/post/5c07442f51882528c4469769?tdsourcetag=s_pcqq_aiomsg)

```js
;(/iphone|ipod|ipad/i.test(navigator.appVersion)) && document.addEventListener('blur', (e) => {
    // 这里加了个类型判断，因为a等元素也会触发blur事件
    ['input', 'textarea'].includes(e.target.localName) && document.body.scrollIntoView(false)
}, true)
```

## 在单页应用中，如何优雅的监听url的变化

原文: [在单页应用中，如何优雅的监听url的变化](https://juejin.im/post/5c26ec2f51882501cd6f497a)

### 1. 单页应用原理

通过hash或者html5 Bom对象中的history可以做到改变url，但是不刷新页面。

(1)通过hash来实现单页路由

```js
window.location.hash
```

(2)通过history实现前端路由

HTML5的History接口，History对象是一个底层接口，不继承于任何的接口。History接口允许我们操作浏览器会话历史记录。

属性:

- History.length
- History.state

方法:

- History.back (会刷新)
- History.forward (会刷新)
- History.go (会刷新)
- History.pushState (不会刷新)
- History.replaceState (不会刷新)

### 2. 监听url中的hash变化

```js
1.
window.onhashchange=function(event){
  console.log(event);
}
2.
window.addEventListener('hashchange',function(event){
   console.log(event);
})

```

### 3. 监听通过history来改变url的事件

监听 back,forward和go

```js
window.addEventListener('popstate', function(event) {
     console.log(event);
})
```

监听 replaceState和pushState

手动创建全局事件

```js
var _wr = function(type) {
   var orig = history[type];
   return function() {
       var rv = orig.apply(this, arguments);
      var e = new Event(type);
       e.arguments = arguments;
       window.dispatchEvent(e);
       return rv;
   };
};
 history.pushState = _wr('pushState');
 history.replaceState = _wr('replaceState');
```

```js
window.addEventListener('replaceState', function(e) {
  console.log('THEY DID IT AGAIN! replaceState 111111');
});
window.addEventListener('pushState', function(e) {
  console.log('THEY DID IT AGAIN! pushState 2222222');
});
```

## 深浅拷贝

### 浅拷贝

- Object.assign()

- 拓展运算符

- Array.prototype.slice()

### 深拷贝

- JSON.stringify()

注意事项:

1. 拷贝的对象的值中如果有函数,undefined,symbol则经过JSON.stringify()序列化后的JSON字符串中这个键值对会消失。
2. 无法拷贝不可枚举的属性，无法拷贝对象的原型链。
3. 拷贝Date引用类型会变成字符串。
4. 拷贝RegExp引用类型会变成空对象。
5. 对象中含有NaN、Infinity和-Infinity，则序列化的结果会变成null。
6. 无法拷贝对象的循环应用(即obj[key] = obj)。

- lodash & jQuery

## console中的'$'

### $0

在Chrome的Elements面板中，$0 是当前我们选中的html节点的引用。

理所当然，$1 是我们上一次选择的节点的引用，$2 是在那之前选择的节点的引用，等等。一直到 $4。

### $ 和 $$

在你还没有在app中定义 $变量的情况下(例如 jQuery)，$在console中是冗长的函数document.querySelector的一个别名。
但是$$ 能节省更多的时间，因为它不仅仅执行document.QuerySelectorAll并且返回的是一个节点的数组，而不是一个Node list
从本质上说:Array.from(document.querySelectorAll('div')) === $$('div'),但是$$('div')要简短太多了！

### $_

$_变量是上次执行的结果的引用。

## setTimeout & requestAnimationFrame

原文: [你知道的requestAnimationFrame【从0到0.1】](https://juejin.im/post/5c3ca3d76fb9a049a979f429)

- 使用 setTimeout 实现的动画，当页面被隐藏或最小化时，定时器setTimeout仍在后台执行动画任务，此时刷新动画是完全没有意义的（实际上 FireFox/Chrome 浏览器对定时器做了优化：页面闲置时，如果时间间隔小于 1000ms，则停止定时器，与requestAnimationFrame行为类似。如果时间间隔>=1000ms，定时器依然在后台执行）

- 使用requestAnimationFrame，当页面处于未激活的状态下，该页面的屏幕刷新任务会被系统暂停，由于requestAnimationFrame保持和屏幕刷新同步执行，所以也会被暂停。当页面被激活时，动画从上次停留的地方继续执行，节约 CPU 开销。

## 真值和虚值

原文: [[译] 优秀 JavaScript 开发人员应掌握的 9 个技巧](https://juejin.im/post/5c4506c9e51d45524c7cf206)

当我们使用默认值时，通常要对现有值进行一系列判断，这种方法使代码变得异常繁琐，而现在我们可以真值（Truthy）和虚值（Falsy）的方式来改进它，不仅可以节省代码量，还使人更加信服。

Falsy

```js
if (false)
if (null)
if (undefined)
if (0)
if (NaN)
if ('')
if ("")
if (``)
if (document.all)
```

Truthy

```js
if (true)
if ({})
if ([])
if (42)
if ("foo")
if (new Date())
if (-42)
if (3.14)
if (-3.14)
if (Infinity)
if (-Infinity)
```

## object-fit

当你在CSS中改变一个图片的大小，如果没有设置宽高的话，图片的大小会被压缩或拉伸。解决方法很简单，就是使用CSS的 object-fit，它的实用性跟背景图片的 background-size: cover 很类似。

链接: [object-fit](https://developer.mozilla.org/zh-CN/docs/Web/CSS/object-fit)

`object-fit` CSS 属性指定可替换元素的内容应该如何适应到其使用的高度和宽度确定的框。

取值:

`contain`

被替换的内容将被缩放，以在填充元素的内容框时保持其宽高比。 整个对象在填充盒子的同时保留其长宽比，因此如果宽高比与框的宽高比不匹配，该对象将被添加“黑边”。

`cover`

被替换的内容在保持其宽高比的同时填充元素的整个内容框。如果对象的宽高比与内容框不相匹配，该对象将被剪裁以适应内容框。

`fill`

被替换的内容正好填充元素的内容框。整个对象将完全填充此框。如果对象的宽高比与内容框不相匹配，那么该对象将被拉伸以适应内容框。

`none`

被替换的内容将保持其原有的尺寸。

`scale-down`

内容的尺寸与 none 或 contain 中的一个相同，取决于它们两个之间谁得到的对象尺寸会更小一些。

## 不同刷新的请求执行过程

原文: [HTTP----HTTP缓存机制](https://juejin.im/post/5a1d4e546fb9a0450f21af23)

1. 浏览器地址栏中写入URL，回车
   浏览器发现缓存中有这个文件了，不用继续请求了，直接去缓存拿。（最快）
2. F5  
   F5就是告诉浏览器，别偷懒，好歹去服务器看看这个文件是否有过期了。于是浏览器就胆胆襟襟的发送一个请求带上If-Modify-since。
3. Ctrl+F5  
   告诉浏览器，你先把你缓存中的这个文件给我删了，然后再去服务器请求个完整的资源文件下来。于是客户端就完成了强行更新的操作。

## -webkit-tap-highlight-color

这个属性只用于iOS（iPhone和iPad）。当你点击一个链接或者通过Javascript定义的可点击元素的时候，它就会出现一个半透明的灰色背景。要重设这个表现，你可以设置-webkit-tap-highlight-color为任何颜色。

想要禁用这个高亮，设置颜色的alpha值为0即可。

## text-align:justify

text-align:justify 属性规定元素中的文本水平对齐方式为两端对齐文本效果。

移动端`&npsp``&ensp``&emsp``&thinsp`的显示效果与浏览器端不同，不能够完美占位就需要使用text-align: justify;

但该属性对于单行及多行的最后一行不起作用，可以用（伪类）伪元素解决

```css
::after{
  content: '';
  display: inline-block;
  width: 100%;
}
```

## sessionStorage共享问题

页面会话在浏览器打开期间一直保持，并且重新加载或恢复页面仍会保持原来的页面会话。
在新标签或窗口打开一个页面时会在顶级浏览上下文中初始化一个新的会话。

**通过点击链接（或者用了window.open）打开的新标签页之间是属于同一个 session 的**，但新开一个标签页总是会初始化一个新的 session，即使网站是一样的，它们也不属于同一个 session。

## 即时计算属性获取导致回流（reflow）

offset(Top/Left/Width/Height)

scroll(Top/Left/Width/Height)

client(Top/Left/Width/Height)

...

使用这些属性时，需要通过及时计算得到，因此浏览器为了获取这些值，也会进行回流

## 环境变量管理工具

- dotenv 可以解决跨平台和持久化的问题，但使用场景有限，只适用于node项目，且和项目代码强耦合，需要在弄得代码运行后手动执行触发
- cross-env 支持在命令行自定义环境变量。问题也非常明显，不能解决大型项目中自定义环境变量的持久化问题
- env-cmd 也可以解决跨平台和持久化的问题，支持定义默认环境变量，不足的是不支持在命令行自定义环境变量

## 进程 线程 携程

### 进程

进程（Process）是计算机中的程序关于某数据集合上的一次运行活动，是系统进行资源分配和调度的基本单位，是操作系统结构的基础。在早期面向进程设计的计算机结构中，进程是程序的基本执行实体；在当代面向线程设计的计算机结构中，进程是线程的容器。程序是指令、数据及其组织形式的描述，进程是程序的实体。

组成

进程是一个实体。每一个进程都有它自己的地址空间，一般情况下，包括文本区域（text region）、数据区域（data region）和堆栈（stack region）。文本区域存储处理器执行的代码；数据区域存储变量和进程执行期间使用的动态分配的内存；堆栈区域存储着活动过程调用的指令和本地变量。

特征

动态性：进程的实质是程序在多道程序系统中的一次执行过程，进程是动态产生，动态消亡的。
并发性：任何进程都可以同其他进程一起并发执行
独立性：进程是一个能独立运行的基本单位，同时也是系统分配资源和调度的独立单位；
异步性：由于进程间的相互制约，使进程具有执行的间断性，即进程按各自独立的、不可预知的速度向前推进
结构特征：进程由程序、数据和进程控制块三部分组成。
多个不同的进程可以包含相同的程序：一个程序在不同的数据集里就构成不同的进程，能得到不同的结果；但是执行过程中，程序不能发生改变。

### 线程

在多线程OS中，通常是在一个进程中包括多个线程，每个线程都是作为利用CPU的基本单位，是花费最小开销的实体。线程具有以下属性。

- 轻型实体
线程中的实体基本上不拥有系统资源，只是有一点必不可少的、能保证独立运行的资源。
线程的实体包括程序、数据和TCB。线程是动态概念，它的动态特性由线程控制块TCB（Thread Control Block）描述。TCB包括以下信息：
  - 线程状态。
  - 当线程不运行时，被保存的现场资源。
  - 一组执行堆栈。
  - 存放每个线程的局部变量主存区。
  - 访问同一个进程中的主存和其它资源。
用于指示被执行指令序列的程序计数器、保留局部变量、少数状态参数和返回地址等的一组寄存器和堆栈。

- 独立调度和分派的基本单位。
在多线程OS中，线程是能独立运行的基本单位，因而也是独立调度和分派的基本单位。由于线程很“轻”，故线程的切换非常迅速且开销小（在同一进程中的）。

- 可并发执行。
在一个进程中的多个线程之间，可以并发执行，甚至允许在一个进程中所有线程都能并发执行；同样，不同进程中的线程也能并发执行，充分利用和发挥了处理机与外围设备并行工作的能力。

- 共享进程资源。

在同一进程中的各个线程，都可以共享该进程所拥有的资源，这首先表现在：所有线程都具有相同的地址空间（进程的地址空间），这意味着，线程可以访问该地址空间的每一个虚地址；此外，还可以访问进程所拥有的已打开文件、定时器、信号量机构等。由于同一个进程内的线程共享内存和文件，所以线程之间互相通信不必调用内核。

### 协程

协程与子例程一样，协程（coroutine）也是一种程序组件。相对子例程而言，协程更为一般和灵活，但在实践中使用没有子例程那样广泛。协程源自 Simula 和 Modula-2 语言，但也有其他语言支持。

协程不是进程或线程，其执行过程更类似于子例程，或者说不带返回值的函数调用。
一个程序可以包含多个协程，可以对比与一个进程包含多个线程，因而下面我们来比较协程和线程。我们知道多个线程相对独立，有自己的上下文，切换受系统控制；而协程也相对独立，有自己的上下文，但是其切换由自己控制，由当前协程切换到其他协程由当前协程来控制。

协程和线程区别：协程避免了无意义的调度，由此可以提高性能，但也因此，程序员必须自己承担调度的责任，同时，协程也失去了标准线程使用多CPU的能力。

## click事件存在的问题

### IE

IE8&9，具有background-color样式计算为transparent的元素覆盖在其他元素顶端时，不会收到click事件。取而代之，所有的click事件将被触发于其地下的元素

已知会触发此漏洞的情景:

- 仅针对IE9
  - 设置`background-color: rgba(0,0,0,0)`
  - 设置`opacity: 0`并且明确指定background-color而不是transparent
- 对于IE8和IE9: 设置`filter: alpha(opacity = 0);`并且明确指定`background-color`而不是transparent

### Safari

safari手机版会有一个bug，当点击事件不是绑定在交互式的元素上（比如说HTML的div），并且也没有直接的事件监听器绑定在他们自身。

解决方法如下：

为其元素或者祖先元素，添加cursor: pointer的样式，使元素具有交互式点击为需要交互式点击的元素添加onclick="void(0)"的属性，但并不包括body元素使用可点击元素如`<a>`,代替不可交互式元素如div不使用click的事件委托。

Safari 手机版里，以下元素不会受到上述bug的影响：

- `<a>` 需要href链接
- `<area>` 需要href
- `<button>`
- `<img>`
- `<input>`
- `<label>` 需要与form控制器连接

### 文本换行css属性

#### overflow-wrap

用来说明当一个不能被分开的字符串太长而不能填充其包裹盒时，为防止其溢出，浏览器是否允许这样的单词中断换行

- normal 表示在正常的单词结束处换行
- break-word 表示如果行内没有多余的地方容纳该单词到结尾，则那些正常的不能被分隔的单词会被强制分隔换行

#### word-break

指定了怎样在单词内断行

- normal 使用默认的断行规则
- break-all 对于non-CJK（CJK指中文/日文/韩文）文本，可在任意字符间断行
- keep-all CJK文本不断行。Non-CJK文本表现同normal
- break-word （非标准）

#### white-space

用来设置如何处理元素中的空白

- normal 连续的空白会被合并，换行符会被空白符来处理，填充line盒子时，必要的话会换行
- nowrap 和normal一样，连续的空白符会被合并。但文本内的换行无效
- pre 连续的空白符会被保留。在遇到换行符或者`<br>`元素时才会换行
- pre-wrap 连续的空白符会被保留。在遇到换行符或者`<br>`元素，或者需要为了填充line盒子时才会换行
- pre-line 连续的空白符会被合并。在遇到换行符或者`<br>`元素，或者需要为了填充line盒子时才会换行

### 自定义滚动条样式

- 整体部分，::-webkit-scrollbar;
- 两端按钮，::-webkit-scrollbar-button;
- 外层轨道，::-webkit-scrollbar-track;
- 内层轨道，::-webkit-scrollbar-track-piece;
- 滚动滑块，::-webkit-scrollbar-thumb;
- 边角部分，::-webkit-scrollbar-corner;

### npm

原文: [你所需要的npm知识储备都在这了](https://juejin.im/post/5d08d3d3f265da1b7e103a4d?tdsourcetag=s_pcqq_aiomsg)

#### npm 2.x - 嵌套结构

npm 2.x安装依赖方式比较简单直接，以递归的方式按照包依赖的树形结构下载填充本地目录结构，也就是说每个包都会将该包的依赖安装到当前包所在的node_modules目录中

#### npm 3.x - 扁平结构

npm 3.x则采用了扁平化的结构来安装组织node_modules。也就是在执行npm install的时候，按照package.json 里依赖的顺序依次解析，遇到新的包就把它放在第一级目录，后面如果遇到一级目录已经存在的包，会先按照约定版本判断版本，如果符合版本约定则忽略，否则会按照npm 2.x的方式依次挂在依赖包目录下

#### npm 5.x - package-lock.json

npm为了让开发者在安全的前提下使用最新的依赖包，在package.json中通常做了锁定大版本的操作，这样在每次npm install的时候都会拉去依赖包大版本下的最新的版本。这种机制最大的一个缺点就是当有依赖包有小版本更新时，可能会出现协同开发者的依赖包不一致的问题

package-lock.json文件精确描述了node_modules目录下所有的包的树状依赖结构，每个包的版本都是完全精确的

- version: 包唯一的版本号
- resolved: 安装源
- integrity: 表明包完整性的hash值（验证包是否已失效）
- dev: 如果为true，则此依赖关系仅是顶级模块的开发依赖关系或者是一个的传递依赖关系
- require: 依赖包所需要的所有依赖项，对应依赖包package.json里dependencies中的依赖项
- dependencies: 依赖包node_modules中依赖的包，与顶层的dependencies一样的结构

#### 依赖包版本号

npm采用了语义化版本（semver）规范作为依赖版本管理方案 （x.y.z）

##### 主版本号（major version）

##### 次版本号（minor version）

##### 修订号（patch）

#### 版本格式

##### x.y.z

表示精确版本号。任何其他版本号都不匹配，在一些比较重要的线上项目中，建议使用这种方式锁定版本

##### ^x.y.z

表示兼容补丁和小版本更新的版本号。官方的定义是`能够兼容除了最左侧非0版本号之外的其他变化`

```text
"^1.2.3" 等价于 ">= 1.2.3 < 2.0.0"。即只要最左侧的 "1" 不变，其他都可以改变。所以 "1.2.4", "1.3.0" 都可以兼容。

"^0.2.3" 等价于 ">= 0.2.3 < 0.3.0"。因为最左侧的是 "0"，那么只要第二位 "2" 不变，其他的都兼容，比如 "0.2.4" 和 "0.2.99"

"^0.0.3" 等价于 ">= 0.0.3 < 0.0.4"。这里最左侧的非 "0" 只有 "3"，且没有其他版本号了，所以这个也等价于精确的 "0.0.3"。
```

##### ~x.y.z

表示只兼容补丁更新的版本号。关于 ~ 的定义分为两部分：如果列出了小版本号（第二位），则只兼容补丁（第三位）的修改；如果没有列出小版本号，则兼容第二和第三位的修改

```text
"~1.2.3" 列出了小版本号 "2"，因此只兼容第三位的修改，等价于 ">= 1.2.3 < 1.3.0"。

"~1.2" 也列出了小版本号，因此和上面一样兼容第三位的修改，等价于 ">= 1.2.0 < 1.3.0"。

"~1" 没有列出小版本号，可以兼容第二第三位的修改，因此等价于 ">= 1.0.0 < 2.0.0"
```

##### x.y.z-beta.1

带预发布关键词的版本号

```text
alpha(α)：预览版，或者叫内部测试版；一般不向外部发布，会有很多bug；一般只有测试人员使用。

beta(β)：测试版，或者叫公开测试版；这个阶段的版本会一直加入新的功能；在alpha版之后推出。

rc(release candidate)：最终测试版本；可能成为最终产品的候选版本，如果未出现问题则可发布成为正式版本。
```

#### npm script

如果全局安装@vue/cli-service的话，@vue/cli-service源文件会被安装在全局源文件安装目录（/user/local/lib/node_modules）下，而npm会在全局可执行bin文件安装（/usr/local/bin）目录下创建一个指向../lib/node_modules/@vue/cli-service/bin/vue-cli-service.js文件的名为vue-cli-service的软链接，这样就可以直接在终端输入vue-cli-service来执行。

如果局部安装@vue/cli-service的话，npm则会在本地项目node_modules/.bin目录下创建一个指向../@vue/cli-service/bin/vue-cli-service.js名为vue-cli-service的软链接，这个时候需要在终端中输入./node_modules/.bin/vue-cli-service来执行（也可以使用npx vue-cli-service命令来执行，npx 的作用就是为了方便调用项目内部安装的模块）。

#### 多命令运行

- && 串行
- & 并行

### Oliver Steele的嵌套对象访问模式

const name = ((user || {}).personalInfo || {}).name;

使用这种表示法，永远不会遇到无法读取未定义的属性“name”。做法是检查用户是否存在，如果不存在，就创建一个空对象，这样，下一个级别的键将始终从存在的对象访问。

### 如何让 `a == 1 && a == 2 && a == 3`

```js
const a = {
   value:[3,2,1],
   valueOf: function () {return this.value.pop(); },
}
```

### new的实现原理

原文: [这儿有20道大厂面试题等你查收](https://juejin.im/post/5d124a12f265da1b9163a28d?tdsourcetag=s_pcqq_aiomsg)

1. 创建一个空对象，构造函数中的this指向这个空对象
2. 这个新对象被执行[[原型]]连接
3. 执行构造函数方法，属性和方法被添加到this引用的对象中
4. 如果构造函数中没有返回其它对象，那么返回this，即创造的这个的新对象，否则，返回构造函数中返回的对象

```js
function _new() {
  let target = {}; // 创造的新对象
  let [constructor, ...args] = [...arguments]; // 第一个参数是构造函数
  target.___proto__ = constructor.prototype; // 执行[[原型]]连接；target是constructor的实例
  let result = constructor.apply(target, args); // 执行构造函数，将属性或方法添加到创建的空对象上
  if (result && (typeof (result) == 'object' || typeof (result) == 'function')) {
    return result; // 如果构造函数执行的结构返回的是一个对象，那么返回这个对象
  }
  return target; // 如果构造函数返回的不是一个对象，返回创建的新对象
}
```

<Gitalk />
