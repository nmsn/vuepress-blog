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

传输控制协议（TCP）是一个面向连接的协议，它保证了两台计算机之间数据传输的可靠性和顺序

Node HTTP服务器是构建与Node TCP服务器之上的。从变成角度来说，也就是Node中的http.Server继承自net.Server(net是TCP模块)

### TCP有哪些特征

#### 面向连接的通信和保证顺序的传递

IP是基于数据报的传输。这些数据报时独立进行传输的，送达的顺序也是无序的

当在TCP连接内进行数据传递时，发送的IP数据包包含了标识该连接以及数据流顺序的信息

#### 面向字节

TCP对字符以及字符编码是完全无知的，不同的编码会导致传输的字节数不同，所以，TCP允许数据以ASCII字符（每个字符一个字节）或者Unicode（每个字符四个字节）进行传输。

正因为对消息格式没有严格的约束，使得TCP有很好的灵活性

#### 可靠性

由于TCP时基于底层不可靠的服务，因此，它必须要基于确认和超时实现一系列的机制来达到可靠性的要求

当数据发送出去后，发送方就会等待一个确认消息。如果过了指定的窗口事件，还未收到确认消息，发送方就会对数据进行重发

#### 流控制

TCP通过一种叫流控制的方式来确保两点之间传输数据的平衡

#### 拥堵控制

#### Telnet

Telnet是一个早期的网络协议，旨在提供双向的虚拟终端。在SSH出现前，它作为一种控制远程计算机的方式被广泛使用，如远程服务器管理。它是TCP协议上层的协议 

## HTTP

超文本传输协议

### 头信息

### 连接

## 8 Connect

Connect是一个基于HTTP服务器的工具集，它提供了一种新的组织代码的方式来与请求、相应对象进行交互，称为中间件

简单来哦说，中间件由幻术组成，它除了处理req和res对象外，还接受一个next函数来做流控制

### static中间件

Connect允许中间件挂载到URL上。比如。static允许将任意一个URL匹配到文件系统中任意一个目录

### query中间件

使用query中间件，就能够通过req.query对象自动获取查询字符串数据

### logger中间件

logger中间件是一个对Web应用非常有用的诊断工具。它将发送过来的请求信息和发送出去的相应信息打印在终端

提供四种日志格式

- default
- dev
- short
- tiny

logger中间允许自定义日志输出格式

下面是完整的可用token

- ：req[header]
- :res[header]
- :http-version
- response-time
- remote-addr
- date
- method
- url
- referrer
- user-agent
- status

### body parser中间件

### cookie

### session

### redis session

生产环境中，需要使用一种当应用重启后，还能够将session信息持久化存储下来的机制，如Redis

### methodOverride中间件

### basicAuth中间件

## 9 Express

鉴于Connect基于HTTP模块提供了开发Web应用的常用的基础功能，Express基于Connect为个构建整个网站以及Web应用提供了更为方便的API

