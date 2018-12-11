---
sidebar: auto
---

# 摘录

## 行高

参考： [前端读书寻宝记之读《包容性Web设计》有感](https://juejin.im/post/5bfa8f4be51d4574b133d0a0)

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

#### HTTP2 VS HTTP1.x

- HTTP2性能提升的核心就在于二进制分帧层。HTTP2是二进制协议，他采用二进制格式传输数据而不是1.x的文本格式。
- HTTP2多路复用解决HTTP1.x的线头阻塞和多个TCP连接的问题。
- HTTP2对头部进行压缩。