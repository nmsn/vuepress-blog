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

![defer_async.png](https://s2.loli.net/2022/01/16/mcSQYeJEru9hqP7.jpg)

1. 没有 defer 或 async，浏览器会立即加载并执行指定的脚本，“立即”指的是在渲染该 script 标签之下的文档元素之前，也就是说不等待后续载入的文档元素，读到就加载并执行。
2. 有 defer，加载后续文档元素的过程将和 script.js 的加载并行进行（异步），但是 script.js 的执行要在所有元素解析完成之后，DOMContentLoaded 事件触发之前完成。
3. 有 async，加载和渲染后续文档元素的过程将和 script.js 的加载与执行并行进行（异步）。

另外对于defer书中描述为在页面解析完毕后，按照原本的顺序执行，这句话是有问题的，defer不一定按照顺序执行。
而async异步加载完成后就会立即执行所以无所谓顺序。

## src和href的区别

- src是指向外部资源的位置，指向的内容会嵌入到文档中当前标签所在的位置，在请求src资源时会将其指向的资源下载并应用到文档内，如js脚本，img图片和frame等元素。当浏览器解析到该元素时，会**暂停**其他资源的下载和处理，知道将该资源加载、编译、执行完毕，所以一般js脚本会放在底部而不是头部。

- href是指向网络资源所在位置（的超链接），用来建立和当前元素或文档之间的连接，当浏览器识别到它他指向的文件时，就会**并行**下载资源，不会停止对当前文档的处理。

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

## HTML5 有哪些更新

### 语义化标签

- header
- nav
- footer
- article
- section
- aside

### 媒体标签

- audio 音频

```html
<audio src='' controls autoplay loop='true'></audio>
```

属性：

- controls 控制面板
- autoplay 自动播放
- loop 循环播放

- video 视频

```html
<video src='' poster='imgs/aa.jpg' controls></video>
```

属性：
- poster：指定视频还没有完全下载完毕，或者用户还没有点击播放前显示的封面。默认显示当前视频文件的第一针画面，当然通过 poster 也可以自己指定。
- controls 控制面板
- width 看度
- height 高度

- source 标签

因为浏览器对视频格式支持程度不一样，为了能够兼容不同的浏览器，可以通过 source 来指定视频源

```html
<video>
    <source src='aa.flv' type='video/flv'></source>
    <source src='aa.mp4' type='video/mp4'></source>
</video>
```

### 表单

#### 表单类型

- email 验证邮箱
- url 验证 url
- number 只能输入数字
- search 提供删除按钮
- range 提供范围选择
- color 颜色拾取器
- time 时分秒
- date 日期选择年月日
- datetime 时间和日期
- date-local 日期时间控件
- week 周
- month 月

#### 表单属性

- placeholder 提示信息
- autofocus 自动获取焦点
- autocomplete 自动完成
- required 输入框不能为空
- pattern 正则
- multiple 选择多个文件
- form form id

#### 表单事件

- oninput 当 input 输入框发生变化触发
- oninvalid 当验证不通过时触发

### 进度条 度量器

- progress 标签 用来显示任务进度
- meter 属性 用来显示剩余容量或剩余库存

### DOM 查询操作

document.querySelector
document.querySelectorAll

### Web 存储

- localStorage
- sessionStorage

### 其他

- 拖放：拖放是一种常见的特性，即抓取对象以后拖到另一个位置。设置元素可拖放：

  ```html
  <img draggable="true" />
  ```

- 画布：canvas 元素使用 JavaScript 在网页上绘制图像。画布是一个矩形区域，可以控制其每一像素。canvas 拥有多种绘制路径、矩形、圆形、字符以及添加图像的方法。

  ```html
  <canvas id="myCanvas" width="200" height="100"></canvas>
  ```
- svg：SVG 指可伸缩矢量图形，用于定义用于网络的基于矢量的图形，使用 XML 格式定义图形，图像在放大或改变尺寸的情况下其图形质量不会有损失，它是万维网联盟的标准
  
- 地理位置：Geolocation（地理定位）用于定位用户的位置。

## img 的 srcset 属性

响应式页面中经常用到根据屏幕密度设置不同的图片。这时就用到了 img 标签的 srcset 属性。srcset 属性用于设置不同屏幕密度下，img 会自动加载不同的图片。用法如下：

```html
<img src="image-128.png" srcset="image-256.png 2x" />
```

使用上面的代码，就能实现在屏幕密度为 1x 的情况下加载 image-128.png, 屏幕密度为 2x 时加载 image-256.png。

按照上面的实现，不同的屏幕密度都要设置图片地址，目前的屏幕密度有 1x,2x,3x,4x 四种，如果每一个图片都设置 4 张图片，加载就会很慢。所以就有了新的 srcset 标准。代码如下：

```html
<img src="image-128.png"
     srcset="image-128.png 128w, image-256.png 256w, image-512.png 512w"
     sizes="(max-width: 360px) 340px, 128px" />
```

其中 srcset 指定图片的地址和对应的图片质量。sizes 用来设置图片的尺寸零界点。对于 srcset 中的 w 单位，可以理解成图片质量。如果可视区域小于这个质量的值，就可以使用。浏览器会自动选择一个最小的可用图片。

sizes 语法如下：

```html
sizes="[media query] [length], [media query] [length] ... "
```

sizes 就是指默认显示 128px, 如果视区宽度大于 360px, 则显示 340px。

## 行内元素 块级元素 空（void）元素

- 行内元素：`a b span img input select strong`
- 块级元素：`div ul ol li dl dt dd h1 h2 h3 h4 h5 h6 p`

空元素，即没有内容的 HTML 元素。空元素是在开始标签中关闭的，也就是空元素没有闭合标签：

- 常见的有 `<br>、<hr>、<img>、<input>、<link>、<meta>`
- 鲜见的有 `<area>、<base>、<col>、<colgroup>、<command>、<embed>、<keygen>、<param>、<source>、<track>、<wbr>`

## Web Worker

在 HTML 页面中，如果在执行脚本时，页面的状态是不可响应的，直到脚本执行完成后，页面才变成可响应。web worker 是运行在后台的 js，独立于其他脚本，不会影响页面的性能。 并且通过 postMessage 将结果回传到主线程。这样在进行复杂操作的时候，就不会阻塞主线程了。

## iframe 优缺点

iframe 元素会创建包含另外一个文档的内联框架（即行内框架）

优点：
- 用来加载速度较慢的内容（如广告）
- 可以使脚本并行下载
- 可以实现跨子域通信

缺点：
- iframe 会阻塞主页面的 onload 事件
- 无法被一些搜索引擎识别
- 会产生很多页面，不容易管理

## Canvas 和 SVG 的区别

### svg

SVG 可缩放矢量图形（Scalable Vector Graphics）是基于可扩展标记语言 XML 描述的 2D 图形的语言，SVG 基于 XML 就意味着 SVG DOM 中的每个元素都是可用的，可以为某个元素附加 Javascript 事件处理器。在 SVG 中，每个被绘制的图形均被视为对象。如果 SVG 对象的属性发生变化，那么浏览器能够自动重现图形。

其特点如下：
- 不依赖分辨率
- 支持事件处理器
- 最适合带有大型渲染区域的应用程序（如谷歌地图）
- 复杂度高会减慢渲染速度（任何过度使用DOM的应用都不快）
- 不适合游戏应用

### canvas

Canvas 是画布，通过 Javascript 来绘制 2D 图形，是逐像素进行渲染的。其位置发生改变，就会重新进行绘制。

其特点如下：
- 依赖分辨率
- 不支持事件处理器
- 弱的文本渲染能力
- 能够以 .png 或 .jpg 格式保存结果图像
- 最适合图像密集型的游戏，其中的许多对象会被频繁重绘

注：矢量图，也称为面向对象的图像或绘图图像，在数学上定义为一系列由线连接的点。矢量文件中的图形元素称为对象。每个对象都是一个自成一体的实体，它具有颜色、形状、轮廓、大小和屏幕位置等属性。

## head 标签作用及必须项

标签用于定义文档的头部，它是所有头部元素的容器。 其中的元素可以引用脚本、指示浏览器在哪里找到样式表、提供元信息等。

文档的头部描述了文档的各种属性和信息，包括文档的标题、在 Web 中的位置以及和其他文档的关系等。绝大多数文档头部包含的数据都不会真正作为内容显示给读者。

下面这些标签可用在 head 部分： `<script>, <style>, <title>`。

其中 `<title>` 定义文档的标题，它是 head 部分中唯一必需的元素。

## 文档声明（Doctype）和 `<!Doctype html>` 有何作用? 严格模式与混杂模式如何区分？它们有何意义?

### 文档声明的作用

文档声明是为了告诉浏览器，当前HTML文档使用什么版本的HTML来写的，这样浏览器才能按照声明的版本来正确的解析。

### `<!Doctype html>` 的作用

`<!doctype html>` 的作用就是让浏览器进入标准模式，使用最新的 HTML5 标准来解析渲染页面；如果不写，浏览器就会进入混杂模式，我们需要避免此类情况发生。

### 严格模式与混杂模式的区别

- 严格模式：又称为标准模式，指浏览器按照 W3C 标准解析代码
- 混杂模式 又称为怪异模式、兼容模式，是指浏览器用自己的方式解析代码。混杂模式通常模拟老式浏览器的行为，以防止老站点无法工作；

