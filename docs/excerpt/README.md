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

### Event对象常见的应用

#### event. preventDefault()

阻止默认事件行为触发

#### touchstart & click

意思的是，当我们在目标元素同时绑定 touchstart 和 click 事件时，在 touchstart 事件回调函数中使用该方法，可以阻止后续 click 事件的发生。

#### event.stopPropagation() & event.stopImmediatePropagation()

event.stopPropagation() 方法阻止事件冒泡到父元素，阻止任何父事件处理程序被执行

event.stopImmediatePropagation 既能阻止事件向父元素冒泡，也能阻止元素同事件类型的其它监听器被触发

#### event.target & event.currentTarget

event.target指向引起触发事件的元素，而event.currentTarget则是事件绑定的元素，只有被点击的那个目标元素的event.target才会等于event.currentTarget。也就是说，event.currentTarget始终是监听事件者，而event.target是事件的真正发出者。

### HTTP

#### HTTP2 vs HTTP1.x

- HTTP2性能提升的核心就在于二进制分帧层。HTTP2是二进制协议，他采用二进制格式传输数据而不是1.x的文本格式。
- HTTP2多路复用解决HTTP1.x的线头阻塞和多个TCP连接的问题。
- HTTP2对头部进行压缩。

### 空格字符

参考：[小tips: 使用&#x3000;等空格实现最小成本中文对齐](https://www.zhangxinxu.com/wordpress/2015/01/tips-blank-character-chinese-align/)

|字符以及HTML实体|描述以及说明|
|---|---|
|`&nbsp;`|这是我们使用最多的空格，也就是按下space键产生的空格。在HTML中，如果你用空格键产生此空格，空格是不会累加的（只算1个）。要使用html实体表示才可累加。为了便于记忆，我总是把这个空格成为“牛逼(nb)空格(sp – space)”，虽然实际上并不牛逼。该空格占据宽度受字体影响明显而强烈。在inline-block布局中会搞些小破坏，在两端对齐布局中又是不可少的元素。是个让人又爱又恨的小东东。|
|`&ensp;`|该空格学名不详。为了便于记忆，我们不妨就叫它“恶念(e n-ian)空格”。此空格传承空格家族一贯的特性：透明滴！此空格有个相当稳健的特性，就是其**占据的宽度正好是1/2个中文宽度**，而且基本上不受字体影响。|
|`&emsp;`|该空格学名不详。为了便于记忆，我们不妨就叫它”恶魔(e m-o)空格”。此空格也传承空格家族一贯的特性：透明滴！此空格也有个相当稳健的特性，就是其**占据的宽度正好是1个中文宽度**，而且基本上不受字体影响。|
|`&thinsp;`|该空格学名不详。我们不妨称之为“瘦弱空格”，就是该空格长得比较瘦弱，身体单薄，占据的宽度比较小。我目前是没用过这个东西，这里亮出来是让其过一下群众演员的瘾。|

### MuationObserver

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

### css加载会造成阻塞吗？

参考：[css加载会造成阻塞吗？](https://www.cnblogs.com/chenjg/p/7126822.html)

1. css加载不会阻塞DOM
2. css加载会阻塞DOM树的渲染
3. css加载会阻塞后面js语句的执行