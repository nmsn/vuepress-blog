# 了不起的Node.js

## 1 安装

### 1.1

npm search 根据name/tags/description搜索模块

npm view 查看模块相关属性

## 2 JavaScript概览

## 3 阻塞与非阻塞IO

### 堆栈追踪

要捕获一个未来才会执行到的函数所抛出的错误是不可能的。这会直接抛出未捕获的一场，并且catch代码块永远都不会被执行

## 4 Node中的JavaScript

### global对象

在浏览器中，全局对象指的就是window对象。在window对象上定义的任何内容都可以被全局访问到。

Node中有两个类似但却各自代表着不同含义的对象

- global: 和window一样，任何global对象上的属性都可以被全局访问到
- process: 所有全局执行上下文中的内容都在process对象中

