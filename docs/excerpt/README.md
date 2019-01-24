---
sidebar: auto
---

# 摘录

## 行高

参考：[前端读书寻宝记之读《包容性Web设计》有感](https://juejin.im/post/5bfa8f4be51d4574b133d0a0)

行高要设置成无单位的相对值，建议1.5倍间距

```css
p{
    font-size: 1rem;
    line-height: 1.5;
}
```

## DOM事件

### DOM级别

参考：[DOM事件机制](https://juejin.im/post/5bd2e5f8e51d4524640e1304)

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

参考：[小tips: 使用&#x3000;等空格实现最小成本中文对齐](https://www.zhangxinxu.com/wordpress/2015/01/tips-blank-character-chinese-align/)

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

1. css加载不会阻塞DOM
2. css加载会阻塞DOM树的渲染
3. css加载会阻塞后面js语句的执行

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

<Gitalk />