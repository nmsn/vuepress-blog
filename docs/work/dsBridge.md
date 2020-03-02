# dsBridge

## 介绍

官方地址：[https://github.com/wendux/DSBridge-Android/blob/master/readme-chs.md](https://github.com/wendux/DSBridge-Android/blob/master/readme-chs.md)

三端易用的现代跨平台 Javascript bridge， 通过它，你可以在Javascript和原生之间同步或异步的调用彼此的函数.

## JavaScript API

```js
var dsBridge=require("dsbridge")

//同步调用
var str=dsBridge.call("testSyn","testSyn");

//异步调用
dsBridge.call("testAsyn","testAsyn", function (v) {
  alert(v);
})

//注册 javascript API
 dsBridge.register('addValue',function(l,r){
     return l+r;
 })

 //注册 javascript API
 dsBridge.registerAsyn('addValue',function(l,r){
     return l+r;
 })
```

## JsBridge原理

JavaScript 是运行在一个单独的 JS Context 中（例如，WebView 的 Webkit 引擎、JSCore）。由于这些 Context 与原生运行环境的天然隔离，我们可以将这种情况与 RPC（Remote Procedure Call，远程过程调用）通信进行类比，将 Native 与 JavaScript 的每次互相调用看做一次 RPC 调用。
在 JSBridge 的设计中，可以把前端看做 RPC 的客户端，把 Native 端看做 RPC 的服务器端，从而 JSBridge 要实现的主要逻辑就出现了：通信调用（Native 与 JS 通信） 和 句柄解析调用。（如果你是个前端，而且并不熟悉 RPC 的话，你也可以把这个流程类比成 JSONP 的流程）
通过以上的分析，可以清楚地知晓 JSBridge 主要的功能和职责，接下来就以 Hybrid 方案 为案例从这几点来剖析 JSBridge 的实现原理。

### JavaScript 调用 Native

avaScript 调用 Native 的方式，主要有两种：注入 API 和 拦截 URL SCHEME。

#### 注入API

注入 API 方式的主要原理是，通过 WebView 提供的接口，向 JavaScript 的 Context（window）中注入对象或者方法，让 JavaScript 调用时，直接执行相应的 Native 代码逻辑，达到 JavaScript 调用 Native 的目的。

#### 拦截 URL SCHEME

先解释一下 URL SCHEME：URL SCHEME是一种类似于url的链接，是为了方便app直接互相调用设计的，形式和普通的 url 近似，主要区别是 protocol 和 host 一般是自定义的，例如: qunarhy://hy/url?url=ymfe.tech，protocol 是 qunarhy，host 则是 hy。
拦截 URL SCHEME 的主要流程是：Web 端通过某种方式（例如 iframe.src）发送 URL Scheme 请求，之后 Native 拦截到请求并根据 URL SCHEME（包括所带的参数）进行相关操作。
在时间过程中，这种方式有一定的 缺陷：

使用 iframe.src 发送 URL SCHEME 会有 url 长度的隐患。

创建请求，需要一定的耗时，比注入 API 的方式调用同样的功能，耗时会较长。
但是之前为什么很多方案使用这种方式呢？因为它 支持 iOS6。而现在的大环境下，iOS6 占比很小，基本上可以忽略，所以并不推荐为了 iOS6 使用这种 并不优雅 的方式。

### Native 调用 JavaScript

相比于 JavaScript 调用 Native， Native 调用 JavaScript 较为简单，毕竟不管是 iOS 的 UIWebView 还是 WKWebView，还是 Android 的 WebView 组件，都以子组件的形式存在于 View/Activity 中，直接调用相应的 API 即可。
Native 调用 JavaScript，其实就是执行拼接 JavaScript 字符串，从外部调用 JavaScript 中的方法，因此 JavaScript 的方法必须在全局的 window 上。（闭包里的方法，JavaScript 自己都调用不了，更不用想让 Native 去调用了）

### JSBridge 如何引用

#### 由 Native 端进行注入

注入方式和 Native 调用 JavaScript 类似，直接执行桥的全部代码。
它的优点在于：桥的版本很容易与 Native 保持一致，Native 端不用对不同版本的 JSBridge 进行兼容；与此同时，它的缺点是：注入时机不确定，需要实现注入失败后重试的机制，保证注入的成功率，同时 JavaScript 端在调用接口时，需要优先判断 JSBridge 是否已经注入成功。

#### 由 JavaScript 端引用

直接与 JavaScript 一起执行。
与由 Native 端注入正好相反，它的优点在于：JavaScript 端可以确定 JSBridge 的存在，直接调用即可；缺点是：如果桥的实现方式有更改，JSBridge 需要兼容多版本的 Native Bridge 或者 Native Bridge 兼容多版本的 JSBridge。

## 参考文献

- DsBridge：[https://github.com/wendux/DSBridge-Android/blob/master/readme-chs.md](https://github.com/wendux/DSBridge-Android/blob/master/readme-chs.md)
- JSBridge的原理：[https://juejin.im/post/5abca877f265da238155b6bc](https://juejin.im/post/5abca877f265da238155b6bc)
