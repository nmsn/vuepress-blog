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
