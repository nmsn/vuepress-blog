# HTML

## 页面周期事件

### document.DOMContentLoaded

浏览器完成全部 HTML 的加载，并构建 DOM 树，但像 <img> 和样式这样的外部资源可能还没有加载完成。

DOM 已经准备好，因此事件处理器可以查找 DOM 节点，并初始化接口。

使用 document.addEventListener("DOMContentLoaded", func);来进行监听

### window.onload

浏览器加载完所有资源，包括 HTML 文档，图像，样式等。

外部资源加载完成后，我们就可以应用样式表，获取图像大小等。

### window.beforeunload

用户即将离开：我们可以检查用户是否保存了修改，并询问他是否真的要离开。

### window.unload

用户几乎已经离开了，但是我们仍然可以启动一些操作，比如发送统计数据。

### document.readyState

它有三个可能的值：

    - loading —— 文档正在被加载
    - interactive —— 文档被全部读取。
    - complete —— 文档被全部读取，并且所有的资源（图像之类的）都被加载。

因此我们可以检查 document.readyState 并设置一个处理器，或在代码准备就绪时立即执行它。

就像这样：

    ```js
    function work() { /*...*/ }

    if (document.readyState == 'loading') {
      // 正在加载，等待事件
      document.addEventListener('DOMContentLoaded', work);
    } else {
      // DOM 已经准备就绪！
      work();
    }
    ```
还有一个 readystatechange 事件，当状态发生变化时触发，因此我们可以打印所有这些状态，就像这样：

    ```js
    // 当前状态
    console.log(document.readyState);

    // 状态改变时打印它
    document.addEventListener('readystatechange', () => console.log(document.readyState));
    ```

## script标签defer和async属性

![defer和async](../.vuepress/public/images/defer&async.png)

1. 没有 defer 或 async，浏览器会立即加载并执行指定的脚本，“立即”指的是在渲染该 script 标签之下的文档元素之前，也就是说不等待后续载入的文档元素，读到就加载并执行。
2. 有 defer，加载后续文档元素的过程将和 script.js 的加载并行进行（异步），但是 script.js 的执行要在所有元素解析完成之后，DOMContentLoaded 事件触发之前完成。
3. 有 async，加载和渲染后续文档元素的过程将和 script.js 的加载与执行并行进行（异步）。

另外对于defer书中描述为在页面解析完毕后，按照原本的顺序执行，这句话是有问题的，defer不一定按照顺序执行。
而async异步加载完成后就会立即执行所以无所谓顺序。

## src和href的区别

- src是指向外部资源的位置，指向的内容会嵌入到文档中当前标签所在的位置，在请求src资源时会将其指向的资源下载并应用到文档内，如js脚本，img图片和frame等元素。当浏览器解析到该元素时，会**暂停**其他资源的下载和处理，知道将该资源加载、编译、执行完毕，所以一般js脚本会放在底部而不是头部。

- href是指向网络资源所在位置（的超链接），用来建立和当前元素或文档之间的连接，当浏览器识别到它他指向的文件时，就会**并行**下载资源，不会停止对当前文档的处理。

## 有几种前端储存的方式

- cookies： 在HTML5标准前本地储存的主要方式，优点是兼容性好，请求头自带cookie方便，缺点是大小只有4k，自动请求头加入cookie浪费流量，每个domain限制20个cookie，使用起来麻烦需要自行封装

- localStorage：HTML5加入的以键值对(Key-Value)为标准的方式，优点是操作方便，永久性储存（除非手动删除），大小为5M，兼容IE8+

- sessionStorage：与localStorage基本类似，区别是sessionStorage当页面关闭后会被清理，而且与cookie、localStorage不同，他不能在所有同源窗口中共享，是会话级别的储存方式

- Web SQL：2010年被W3C废弃的本地数据库数据存储方案，但是主流浏览器（火狐除外）都已经有了相关的实现，web sql类似于SQLite，是真正意义上的关系型数据库，用sql进行操作，当我们用JavaScript时要进行转换，较为繁琐。

- IndexedDB： 是被正式纳入HTML5标准的数据库储存方案，它是NoSQL数据库，用键值对进行储存，可以进行快速读取操作，非常适合web场景，同时用JavaScript进行操作会非常方便。


## 常用 meta 标签

meta 标签由 name 和 content 属性定义，**用来描述网页文档的属性**，比如网页的作者，网页描述，关键词等，除了 HTTP 标准固定了一些 name 作为大家使用的共识，开发者还可以自定义 name。

常用的 meta 标签

1. charset 用来描述 HTML 文档的编码类型

  ```html
  <meta charset='UTF-8'>
  ```
  
2. keywords 页面关键词

  ```html
  <meta name='keywords' content='关键词'>
  ```
  
3. description 页面描述

 ```html
  <meta name='description' content='页面描述内容'>
  ```

4. refresh 页面重定向和刷新

 ```html
  <meta http-equiv='refresh' content='0;url='>
  ```
  
5. viewport 适配移动端，可以控制适口的大小和比例

 ```html
  <meta name='viewport' content="width=device-width,initial-scale=1, maximum-scale=1">>
  ```
  
  其中 content 参数有以下几种：
  - width viewport 宽度（数值/device-width）
  - height viewport 高度（数值/device-width）
  - initial-scale 初始缩放比例
  - maximum-scale 最大缩放比例
  - minimum-scale 最小缩放比例
  - user-scalable 是否允许用户缩放

6. 搜索引擎索引方式

  ```html
   <meta name="robots" content="index,follow" />
  ```

  其中 content 参数有以下几种：
  - all 文件将被索引，且页面商的链接可以被查询
  - none 文件将不被检索，且页面上的链接不可以被查询
  - index 文件将被检索
  - follow 页面上的链接可以被查询
  - noindex 文件将不被检索
  - nofollow 页面上的链接不可以被查询

