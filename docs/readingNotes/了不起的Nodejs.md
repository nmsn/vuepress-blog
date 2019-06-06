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

## 5命令行工具（CLI）以及FS API

### 创建模块

npm最寻一个名为semver的版本控制标准

[https://semver.org/](https://semver.org/)

### 理解什么是流（stream）

process全局对象中包含了三个流对象，分别对应三个UNIX标准流:

- stdin 标准输入
- stdout 标准输出
- stderr 标准错误

流的另一个属性是它默认的编码。如果在流上设置了编码，那么会得到编码后的字符串（utf-8、ascii等）而不是原始的Buffer作为事件参数

#### 输入和输出

process.stdout.write()
process.stdin.resume()
process.stdin.setEncoding('utf8')

#### 对CLI一探究竟

process.argv包含了所有Node程序运行时的参数值

第一个元素始终是node，第二个元素始终是执行的文件路径。紧接着是命令行后紧跟着的参数

#### 工作目录

__dirname 获取执行文件时该文件在文件系统中所在的目录

process.cwd 获取当前工作目录

process.chdir 更改工作目录

#### 环境变量

Node允许通过process.env变量来轻松访问shell环境下的变量

#### 退出

process.exit 使应用退出

#### ANSI转义码

要在文本终端下控制格式、颜色以及其他输出选项，可以使用ANSI转义码
在文本周围添加的明显不用于输出的字符，被称为非打印字符

```js
console.log('\033[90m' + data.replace(/(.*)g, '   $1') + '\033[39m');
```

- \033 表示转义序列的卡是
- [表示开始颜色设置
- 90表示前景色为亮灰色
- m表示颜色设置结束

## TCP

## HTTP

