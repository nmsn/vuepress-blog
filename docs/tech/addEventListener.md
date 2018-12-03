# EventTarget.addEventListener()

EventTarget.addEventListener() 方法将指定的监听器注册到 EventTarget 上，当该对象触发指定的事件时，指定的回调函数就会被执行。 事件目标可以是一个文档上的元素 Element,Document和Window或者任何其他支持事件的对象 (比如 XMLHttpRequest)。

## 语法

- target.addEventListener(type, listener[, options]);

- target.addEventListener(type, listener ,{capture: Boolean, passive: Boolean, once: Boolean});

- target.addEventListener(type, listener[, useCapture]);

- target.addEventListener(type, listener[, useCapture, wantsUntrusted  ]);

## 参数

`type`

`listener`

`options` 可选

`useCapture ` 可选

`wantsUntrusted` 可选

## 用法