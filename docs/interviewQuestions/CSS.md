# CSS

## BFC

> 块格式化上下文（Block Formatting Context，BFC） 是 Web 页面的可视化 CSS 渲染的一部分，是块盒子的布局过程发生的区域，也是浮动元素与其他元素交互的区域。

具有 BFC 特性的元素可以看作是隔离了的独立容器，容器里面的元素不会在布局上影响到外面的元素，并且 BFC 具有普通容器所没有的一些特性。

### 1. 如何形成 BFC

只要元素满足下面任一条件即可触发 BFC 特性:

- **根元素(`<html>`)**
- **浮动元素（元素的 float 不是 none）**
- **绝对定位元素（元素的 position 为 absolute 或 fixed）**
- **overflow 值不为 visible 的块元素(hidden、auto、scroll)**
- contain 值为 layout、content 或 paint 的元素
- 弹性元素（display 为 flex 或 inline-flex 元素的直接子元素）
- 网格元素（display 为 grid 或 inline-grid 元素的直接子元素）
- 多列容器（元素的 column-count 或 column-width 不为 auto，包括 column-count 为 1）
- column-span 为 all 的元素始终会创建一个新的 BFC，即使该元素没有包裹在一个多列容器中（标准变更，Chrome bug）
- display
  - 行内块元素（元素的 display 为 inline-block）
  - 表格单元格（元素的 display 为 table-cell，HTML 表格单元格默认为该值）
  - 表格标题（元素的 display 为 table-caption，HTML 表格标题默认为该值）
  - 匿名表格单元格元素（元素的 display 为 table、table-row、 table-row-group、table-header-group、
    table-footer-group（分别是 HTML table、row、tbody、thead、tfoot 的默认属性）或 inline-table）
  - display 值为 flow-root 的元素

### 2. BFC 的原理/BFC 的布局规则

- BFC 内部的子元素，在垂直方向，边距会发生重叠
- BFC 在页面中是独立的容器，外面的元素不会影响里面的元素，反之亦然
- BFC 区域不与旁边的 float box 区域重叠
- 计算 BFC 的高度时，浮动的子元素也参与计算
- 文字层不会被浮动层覆盖，环绕于周围

### 3. BFC 的原理应用

- 阻止 margin 重叠：由于 BFC 是一个独立的区域，内部的元素和外部的元素互不影响，将两个元素变为两个 BFC，就解决了 margin 重叠的问题
- 可以包含浮动元素——清除内部浮动（清除浮动的原理时两个 div 都位于同一个 BFC 区域之中）
- 可以阻止元素被浮动元素覆盖/解决高度塌陷：在对子元素设置浮动后，父元素会发生高度塌陷，也就是父元素的高度变为 0。解决这个问题，只需要把父元素变成一个 BFC。常用的办法是给父元素设置overflow:hidden
- 自适应两栏布局
  
  ```
    .left{
      width: 100px;
      height: 200px;
      background: red;
      float: left;
  }

  .right{
      height: 300px;
      background: blue;
      overflow: hidden;
  }

    <div class="left"></div>
    <div class="right"></div>
  ```
  
  左侧设置float:left，右侧设置overflow: hidden。这样右边就触发了 BFC，BFC 的区域不会与浮动元素发生重叠，所以两侧就不会发生重叠，实现了自适应两栏布局。
  
## margin 重叠问题

### 问题

两个块级元素的上外边距和下外边距可能会合并（折叠）为一个外边距，其大小会取其中外边距值大的那个，这种行为就是外边距折叠。需要注意的是，浮动的元素和绝对定位这种脱离文档流的元素的外边距不会折叠。重叠只会出现在垂直方向。

### 计算原则

折叠合并后外边距的计算原则如下：
- 如果两者都是正数，那么就去最大者
- 如果是一正一负，就会正值减去负值的绝对值
- 两个都是负值时，用 0 减去两个中绝对值大的那个

### 解决

1. 兄弟之间重叠
   1. 底部元素变为行内盒子 display: inline-block
   2. 底部元素设置浮动 float
   3. 底部元素的 position 的值为 absolute/fixed
2. 父子之间重叠
   1. 父元素加入 overflow:hidden
   2. 父元素添加透明边框 border:1px solid transparent
   3. 子元素变为行内盒子 display: inline-block
   4. 子元素加入浮动属性或定位



## css 性能优化

原文：[CSS 性能优化的 8 个技巧](https://juejin.im/post/5b6133a351882519d346853f?utm_source=gold_browser_extension)

### 1. 内联首屏关键 css(critical css)

### 2. 异步加载 css

1. 使用 JavaScript 动态创建样式表 link 元素，并插入到 DOM 中

   ```js
   // 创建link标签
   const myCSS = document.createElement("link");
   myCSS.rel = "stylesheet";
   myCSS.href = "mystyles.css";
   // 插入到header的最后位置
   document.head.insertBefore(
     myCSS,
     document.head.childNodes[document.head.childNodes.length - 1].nextSibling,
   );
   ```

2. 将 link 元素的 media 属性设置为用户浏览器不匹配的媒体类型（或媒体查询），如 media="print"，甚至可以是完全不存在的类型 media="noexist"。对浏览器来说，如果样式表不适用于当前媒体类型，其优先级会被放低，会在不阻塞页面渲染的情况下再进行下载

   在 css 文件中使用`@media`也可以达到异步加载的效果，例如`background-image`根据媒体查询加载不同的图片

3. `rel="preload"`这一 Web 标准指出了如何异步加载资源，包括 CSS 类资源

   `<link>` 元素的 rel 属性的属性值 preload 能够让你在你的 HTML 页面中 `<head>`元素内部书写一些声明式的资源获取请求，可以指明哪些资源是在页面加载完成后即刻需要的。对于这种即刻需要的资源，你可能希望在页面加载的生命周期的早期阶段就开始获取，在浏览器的主渲染机制介入前就进行预加载。这一机制使得资源可以更早的得到加载并可用，且更不易阻塞页面的初步渲染，进而提升性能

### 3. 文件压缩

文件的大小会直接影响浏览器的加载速度，这一点在网络较差时表现地尤为明显。相信大家都早已习惯对 CSS 进行压缩，现在的构建工具，如 webpack、gulp/grunt、rollup 等也都支持 CSS 压缩功能。压缩后的文件能够明显减小，可以大大降低了浏览器的加载时间。

webpack 中可以使用
`mini-css-extract-plugin`插件导出 css
`optimize-css-assets-webpack-plugin`压缩代码

### 4. 删除无用 css

找到并删除代码中无用的 css，可以借助`Uncss`库来实现自动删除

### 5. 有选择地使用选择器

1. 保持简单，不要使用嵌套过多过于复杂的选择器
2. 通配符和属性选择器效率最低，需要匹配的元素最多，尽量避免使用
3. 不要使用类选择器的 ID 选择器修饰元素标签
4. 不要为了追求速度而放弃可读性和可维护性

### 6. 减少使用昂贵的属性

在浏览器绘制屏幕时，所有需要浏览器进行操作或计算的属性相对而言都需要花费更大的代价。当页面发生重绘时，它们会降低浏览器的渲染性能。所以在编写 CSS 时，我们应该尽量减少使用昂贵属性，如`box-shadow`/`border-radius`/`filter`/`透明度`/`:nth-child`等

### 7. 优化重排/回流(reflow)和重绘(repaint)

#### 导致重排/回流的操作

1. 调整窗口大小
2. 改变字体大小
3. 样式表变动
4. 元素内容变化，尤其是输入控件
5. CSS 伪类激活
6. DOM 操作
7. DOM 元素的几何属性的获取， 会使浏览器将渐进回流队列 Flush，立即执行回流。

#### 一些常用且会导致回流的属性和方法

- clientWidth、clientHeight、clientTop、clientLeft
- offsetWidth、offsetHeight、offsetTop、offsetLeft
- scrollWidth、scrollHeight、scrollTop、scrollLeft
- scrollIntoView()、scrollIntoViewIfNeeded()
- getComputedStyle()
- getBoundingClientRect()
- scrollTo()

#### 导致重绘的操作

当页面中元素样式的改变并不影响它在文档流中的位置时（例如：color、background-color、visibility 等）

#### 避免频繁触发重排/回流的方法

CSS

- 避免使用 table 布局。
- 尽可能在 DOM 树的最末端改变 class。
- 避免设置多层内联样式。
- 将动画效果应用到 position 属性为 absolute 或 fixed 的元素上。
- 避免使用 CSS 表达式（例如：calc()）

JS

- 避免频繁操作样式，最好一次性重写 style 属性，或者将样式列表定义为 class 并一次性更改 class 属性。
- 避免频繁操作 DOM，创建一个 documentFragment，在它上面应用所有 DOM 操作，最后再把它添加到文档中。
- 也可以先为元素设置 display: none，操作结束后再把它显示出来。因为在 display 属性为 none 的元素上进行的 DOM 操作不会引发回流和重绘。
- 避免频繁读取会引发回流/重绘的属性，如果确实需要多次使用，就用一个变量缓存起来。
- 对具有复杂动画的元素使用绝对定位，使它脱离文档流，否则会引起父元素及后续元素频繁回流。

浏览器针对页面的回流与重绘，进行了自身的优化——渲染队列

浏览器会将所有的回流、重绘的操作放在一个队列中，当队列中的操作到了一定的数量或者到了一定的时间间隔，浏览器就会对队列进行批处理。这样就会让多次的回流、重绘变成一次回流重绘

上面，将多个读操作（或者写操作）放在一起，就会等所有的读操作进入队列之后执行，这样，原本应该是触发多次回流，变成了只触发一次回流。

#### 优化动画

对于如何优化动画，我们知道，一般情况下，动画需要频繁的操作DOM，就就会导致页面的性能问题，我们可以将动画的position属性设置为absolute或者fixed，将动画脱离文档流，这样他的回流就不会影响到页面了。

### 4. 不要使用@import

原因：

1. 使用@import 引入 css 会影响浏览器的并行下载。使用@import 引用的 css 闻不见只有在引用它的那个 css 文件被下载、解析之后，浏览器才会知道还有另外一个 css 需要下载，这时才去下载，然后下载后开始解析、构建 render 树等一系列操作。这就导致浏览器无法并行下载所需的样式文件

2. 多个@import 会导致下载顺序混乱。在 IE 中，@import 会引发资源文件的下载顺序被打乱，即排列在@import 后面的 js 文件先于@import 下载，并且打乱甚至破坏@import 自身的并行下载

## link 和@import 的区别

- link 属于 XHTML 标签，而@import 是 CSS 提供的。
- 页面被加载时，link 会同时被加载，而@import 引用的 CSS 会等到页面被加载完再加载。
- @import 只在 IE 5 以上才能识别，而 link 是 XHTML 标签，无兼容问题。
- link 方式的样式权重高于@import 的权重。
- 使用 dom 控制样式时的差别。当使用 javascript 控制 dom 去改变样式的时候，只能使用 link 标签，因为@import 不是 dom 可以控制的

## 居中布局

水平居中：

- 行内元素： text-align: center
- 块级元素： margin: 0 auto
- absolute + transform（不需知道元素宽度）/ 负 margin（需知道元素宽度）
- flex + justify-content: center

垂直居中：

- line-height: height
- absolute + transform（不需知道元素宽度）/ 负 margin（需知道元素宽度）
- flex + align-items: center
- table

水平垂直居中：

- absolute + transform（不需知道元素宽度）/ 负 margin（需知道元素宽度）
- flex + justify-content + align-items

## 选择器优先级

| 选择器         | 格式          | 优先级权重 |
| -------------- | ------------- | ---------- |
| id 选择器      | #id           | 100        |
| 类选择器       | .classname    | 10         |
| 属性选择器     | a[ref='e']    | 10         |
| 伪类选择器     | li:last-child | 10         |
| 标签选择器     | div           | 1          |
| 伪元素选择器   | li:after      | 1          |
| 相邻兄弟选择器 | h1+p          | 0          |
| 子选择器       | ul>li         | 0          |
| 后代选择器     | li a          | 0          |
| 通配符选择器   | *             | 0          |

对于选择器的优先级：
- 标签选择器、伪元素选择器：1
- 类选择器、伪类选择器、属性选择器：10
- id 选择器：100
- 内联样式：1000

注意事项：
- !important 声明的样式的优先级最高
- 如果优先级相同，则最后出现的样式生效
- 继承得到的样式的优先级最低
- 通用选择器（*）、子选择器（>）和相邻同胞选择器（+）并不在这四个等级中，所以它们的权值都为 0 ；
- 样式表的来源不同时，优先级顺序为：内联样式 > 内部样式 > 外部样式 > 浏览器用户自定义样式 > 浏览器默认样式。

## 伪元素和伪类的区别和作用

- 伪元素： 在内容元素的前后插入额外的元素或样式，但是这些元素实际上并不在文档中生成。它们只在外部显示可见，但不会在文档的源代码中找到它们，因此，称为“伪”元素。例如：

```css
p::before {content:"第一章：";}
p::after {content:"Hot!";}
p::first-line {background:red;}
p::first-letter {font-size:30px;}
```

- 伪类：将特殊的效果添加到特定选择器上。它是已有元素上添加类别的，不会产生新的元素。例如：

```css
a:hover {color: #FF00FF}
p:first-child {color: red}
```

- 总结：伪类是通过在元素选择器上加⼊伪类改变元素状态，⽽伪元素通过对元素的操作进⾏对元素的改变。


`!important`例外规则

当在一个样式声明中使用一个`!important`规则时，此声明将覆盖任何其他声明。虽然，从技术上讲，!important 与优先级无关，但它与最终的结果直接相关。
使用`!important`是一个坏习惯，应该尽量避免，因为这破坏了样式表中的固有的级联规则 使得调试找 bug 变得更加困难了。当两条相互冲突的带有`!important`规则的声明被应用到相同的元素上时，拥有更大优先级的声明将会被采用。

## display 的属性及其作用

| 属性         | 作用                                                       |
| ------------ | ---------------------------------------------------------- |
| none         | 元素不显示，并且会从文档流中移除。｜                       |
| block        | 块类型。默认宽度为父元素宽度，可设置宽高，换行显示。       |
| inline       | 行内严肃类型。默认宽度为内容宽度，不可设置宽高，同行显示。 |
| inline-block | 默认宽度为内容宽度，可以设置宽高，同行显示。               |
| list-item    | 像块类型元素一样显示，并添加样式列表标记。                 |
| table        | 此元素会作为块级表格来显示。                               |
| inherit      | 规定应该从父元素继承 display 属性的值。                    |

## display block inline inline-block 区别

1. block 独占一行，多个元素会另起一行，可以设置 width、height、margin 和 padding
2. inline 元素不会独占一行，设置 width、height 属性无效。但可以设置水平方向的 margin 和padding
3. inline-block 将对象设置为 inline 对象，但对象的内容作为 block 对象呈现，之后的內联对象会被排列在同一行内

## 行内元素和块级元素

### 行内元素

- 设置宽高无效
- 可以设置水平方向的 margin 和 padding，不能设置垂直方向的 padding 和 margin
- 不会自动换行

### 快级元素

- 可以设置宽高
- 设置 margin 和 padding 都有效
- 可以自动换行
- 多个块状，默认排列从上到下

## 隐藏元素方法

1. display: none 渲染树不会渲染该渲染对象，因此该元素不会在页面中占据位置，也不会响应绑定的监听事件
2. visibility: hidden 元素在页面中仍占据空间，但是不会响应绑定的监听事件
3. opacity: 0 将元素的透明度设置为 0，以此来实现元素的隐藏。元素在页面中仍然占据空间，并且能够响应元素绑定的监听事件
4. position: absolute 通过使用绝对定位将元素移除可视区域内，以此来实现元素的隐藏
5. z-index: 来使其他元素遮盖住该元素，以此来实现隐藏
6. clip/clip-path 使用元素裁剪的方法来实现元素的隐藏，这种方法下，元素仍在页面中占据位置，但是不会响应绑定的监听事件
7. transform: scale(0,0) 将元素缩放为 0，来实现元素的隐藏。这种方法下，元素仍在页面中占据位置，但是不会响应绑定的监听事件

## display:none,visibility:hidden,opacity:0 三者区别

|                                              | display:none | visibility:hidden | opacity:0 |
| -------------------------------------------- | ------------ | ----------------- | --------- |
| 是否占据页面空间                             | x            | √                 | √         |
| 对子元素影响                                 | √            | x                 | √         |
| 自身绑定的事件能否继续触发                   | x            | x                 | √         |
| 是否影响其他元素触发事件（例如被遮挡的元素） | x            | x                 | √         |
| 是否产生回流（reflow）                       | √            | x                 | x         |
| 是否产生重绘（repaint）                      | √            | √                 | 不一定    |

元素提升为合成层后，transform 和 opacity 不会触发 repaint，如果不是合成层，则其依然会触发 repaint。在 Blink 和 WebKit 内核的浏览器中，对于应用了 transition 或者 animation 的 opacity 元素，浏览器会将渲染层提升为合成层。也可以使用 translateZ(0) 或者 translate3d(0,0,0) 来人为地强制性地创建一个合成层。

display:none 是非继承属性，子孙元素会随着父节点从渲染树消失，通过修改子孙节点的属性也无法显示
visibility:hidden 是继承属性，子孙节点消失是由于继承了 hidden，通过设置 visibility:visible 可以让子孙节点显示

如果使用读屏器，设置为 display:none 的内容不会被读取，设置为 visibility:hidden 的内容会被读取

## requestAnimationFrame

实现动画效果的方法比较多，Javascript 中可以通过定时器 setTimeout 来实现，CSS3 中可以使用 transition 和 animation 来实现，HTML5 中的 canvas 也可以实现。除此之外，HTML5 提供一个专门用于请求动画的 API，那就是 requestAnimationFrame，顾名思义就是请求动画帧。

### 语法

window.requestAnimationFrame(callback); 其中，callback 是下一次重绘之前更新动画帧所调用的函数(即上面所说的回调函数)。该回调函数会被传入 DOMHighResTimeStamp 参数，它表示 requestAnimationFrame() 开始去执行回调函数的时刻。该方法属于宏任务，所以会在执行完微任务之后再去执行。

使用 cancelAnimationFrame()来取消执行动画，该方法接收一个参数——requestAnimationFrame 默认返回的 id，只需要传入这个 id 就可以取消动画了。

### 优势

- CPU节能：使用 SetInterval 实现的动画，当页面被隐藏或最小化时，SetInterval 仍然在后台执行动画任务，由于此时页面处于不可见或不可用状态，刷新动画是没有意义的，完全是浪费 CPU 资源。而 RequestAnimationFrame 则完全不同，当页面处理未激活的状态下，该页面的屏幕刷新任务也会被系统暂停，因此跟着系统走的 RequestAnimationFrame 也会停止渲染，当页面被激活时，动画就从上次停留的地方继续执行，有效节省了 CPU 开销。
- 函数节流：在高频率事件( resize, scroll 等)中，为了防止在一个刷新间隔内发生多次函数执行，RequestAnimationFrame 可保证每个刷新间隔内，函数只被执行一次，这样既能保证流畅性，也能更好的节省函数执行的开销，一个刷新间隔内函数执行多次时没有意义的，因为多数显示器每 16.7ms 刷新一次，多次绘制并不会在屏幕上体现出来。
- 减少 DOM 操作：requestAnimationFrame 会把每一帧中的所有 DOM 操作集中起来，在一次重绘或回流中就完成，并且重绘或回流的时间间隔紧紧跟随浏览器的刷新频率，一般来说，这个频率为每秒 60 帧。

## 1px 解决方案

### 形成原因

我们知道，像素可以分为物理像素（CSS 像素）和设备像素。由于现在手机大部分是 Retina 高清屏幕，所以在 PC 端和移动端存在设备像素比的概念。简单说就是你在 pc 端看到的 1px 和在移动端看到的 1px 是不一样的。

在 PC 端上，像素可以称为 CSS 像素，PC 端上 dpr 为 1。也就说你书写 css 样式是是多少在 pc 上就显示多少。而在移动端上，像素通常使用设备像素。往往 PC 端和移动端上在不做处理的情况下 1px 显示是不同的。

一个物理像素等于多少个设备像素取决于移动设备的屏幕特性(是否是 Retina)和用户缩放比例。

如果是 Retina 高清屏幕，那么 dpr 的值可能为 2 或者 3，那么当你在 pc 端上看到的 1px 时，在移动端上看到的就会是 2px 或者 3px。

由于业务需求，我们需要一些方法来实现移动端上的 1px。

### border-image（不推荐）

```css
.border-image-1px {
  border-width: 1px 0;
  border-image: url(linenew.png) 2 0 stretch;
}
```

缺点是修改起来很麻烦，需要替换图片

### transform 伪类（推荐）

```css
.setOnePx {
  position: relative;
  &::after {
    position: absolute;
    content: "";
    background-color: #e5e5e5;
    display: block;
    width: 100%;
    height: 1px;
    transform: scale(1, 0.5);
    top: 0;
    left: 0;
  }
}
```

### box-shadow（不推荐）

```css
.box-shadow-1px {
  box-shadow: inset 0px -1px 1px -1px #c8c7cc;
}
```

缺点是实现效果和边框还是有细微差异

### viewport 设置 scale

```js
<script>
var viewport = document.querySelector("meta[name=viewport]");
//下面是根据设备像素设置viewport
if (window.devicePixelRatio == 1) {
    viewport.setAttribute(
      'content',
      'width=device-width,initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no'
    );
}
if (window.devicePixelRatio == 2) {
    viewport.setAttribute(
      'content',
      'width=device-width,initial-scale=0.5,maximum-scale=0.5,minimum-scale=0.5,user-scalable=no'
      );
}
if (window.devicePixelRatio == 3) {
    viewport.setAttribute(
      'content',
      'width=device-width,initial-scale=0.333,maximum-scale=0.333,minimum-scale=0.333,user-scalable=no'
    );
}
</script>
```

这样解决了，但这样做的副作用也很大，整个页面被缩放了。这时 1px 已经被处理成物理像素大小，这样的大小在手机上显示边框很合适。但是，一些原本不需要被缩小的内容，比如文字、图片等，也被无差别缩小掉了。

### 直接写 0.5px（兼容性不好）

```
<div id="container" data-device={{window.devicePixelRatio}}></div>

#container[data-device="2"] {
  border:0.5px solid #333
}
```

直接把 1px 改成 1/devicePixelRatio 后的值，这是目前为止最简单的一种方法。这种方法的缺陷在于兼容性不行，IOS 系统需要 8 及以上的版本，安卓系统则直接不兼容。

## CSS 定位方式

- static: 正常文档流定位，此时 top, right, bottom, left 和 z-index 属性无效，块级元素从上往下纵向排布，行级元素从左向右排列。
- relative：相对定位，此时的『相对』是相对于正常文档流的位置。
- absolute：相对于最近的非 static 定位祖先元素的偏移，来确定元素位置，比如一个绝对定位元素它的父级、和祖父级元素都为 relative，它会相对他的父级而产生偏移。
- fixed：指定元素相对于屏幕视口（viewport）的位置来指定元素位置。元素的位置在屏幕滚动时不会改变，比如那种回到顶部的按钮一般都是用此定位方式。
- sticky：粘性定位，特性近似于 relative 和 fixed 的合体，其在实际应用中的近似效果就是 IOS 通讯录滚动的时候的『顶屁股』。

## 层叠山下文与层叠顺序

### 层叠上下文

层叠上下文是 HTML 元素的三维概念，这些 HTML 元素在一条假想的相对于面向（电脑屏幕的）视窗或者网页的用户的 z 轴上延伸，HTML 元素依据其自身属性按照优先级顺序占用层叠上下文的空间。

#### 产生条件

- 根元素 (HTML),
- z-index 值不为 "auto"的 绝对/相对定位，
- 一个 z-index 值不为 "auto"的 flex 项目 (flex item)，即：父- 元素 display: flex|inline-flex，
- opacity 属性值小于 1 的元素（参考 the specification for - opacity），
- transform 属性值不为 "none"的元素，
- mix-blend-mode 属性值不为 "normal"的元素，
- filter 值不为“none”的元素，
- perspective 值不为“none”的元素，
- isolation 属性被设置为 "isolate"的元素，
- position: fixed
- 在 will-change 中指定了任意 CSS 属性，即便你没有直接指定这些属性的值（参考 这篇文章）
- -webkit-overflow-scrolling 属性被设置 "touch"的元素

### 层叠顺序

![层叠顺序](../.vuepress/public/images/css_z-index.png)

- 诸如 border/background 一般为装饰属性
- 浮动和块状元素一般用作布局，
- 内联元素是内容

#### 层叠顺序准则

1. 谁大谁上：当具有明显的层叠水平标示的时候，如识别的 z-indx 值，在同一个层叠上下文领域，层叠水平值大的那一个覆盖小的那一个。通俗讲就是官大的压死官小的。
2. 后来居上：当元素的层叠水平一致、层叠顺序相同的时候，在 DOM 流中处于后面的元素会覆盖前面的元素。

### 参考文献

- 深入理解 CSS 中的层叠上下文和层叠顺序：[https://www.zhangxinxu.com/wordpress/2016/01/understand-css-stacking-context-order-z-index/](https://www.zhangxinxu.com/wordpress/2016/01/understand-css-stacking-context-order-z-index/)

## 盒模型

当对一个文档进行布局（lay out）的时候，浏览器的渲染引擎会根据标准之一的 CSS 基础框盒模型（CSS basic box model），将所有元素表示为一个个矩形的盒子（box）。CSS 决定这些盒子的大小、位置以及属性（例如颜色、背景、边框尺寸…）。

盒模型由 content（内容）、padding（内边距）、border（边框）、margin（外边距）组成。

### 标准盒模型和怪异盒模型

在 W3C 标准下，我们定义元素的 width 值即为盒模型中的 content 的宽度值，height 值即为盒模型中的 content 的高度值

而 IE 怪异盒模型（IE8 以下）width 的宽度并不是 content 的宽度，而是 border-left + padding-left + content 的宽度值 + padding-right + border-right 之和，height 同理。

### box-sizing

```css
box-sizing: content-box // 标准盒模型
box-sizing: border-box // 怪异盒模型
box-sizing: padding-box // 火狐的私有模型，没人用
```

## 去除 inline-block 元素间间距的 N 种方法

> 真正意义上的 inline-block 水平呈现的元素间，换行显示或空格分隔的情况下会有间距

### 移除空格

元素间留白间距出现的原因就是标签段之间的空格，因此，去掉 HTML 中的空格，自然间距就木有了。考虑到代码可读性，显然连成一行的写法是不可取的，我们可以：

```html
<div class="space">
  <a href="##"> 惆怅</a><a href="##"> 淡定</a><a href="##"> 热血</a>
</div>
```

### 使用 margin 负值

```css
.space a {
  display: inline-block;
  margin-right: -3px;
}
```

### 使用 font-size:0

```css
.space {
  font-size: 0;
}
.space a {
  font-size: 12px;
}
```

### 使用 letter-spacing

```css
.space {
  letter-spacing: -3px;
}
.space a {
  letter-spacing: 0;
}
```

### 使用 word-spacing

```css
.space {
  word-spacing: -6px;
}
.space a {
  word-spacing: 0;
}
```

## <img>元素底部为何有空白

要理解这个问题，首先要弄明白 CSS 对于 display: inline 元素的 vertical-align 各个值的含义。vertical-align 的默认值是 baseline

![img_bsaeline](../.vuepress/public/images/css_img_baseline.png)

可以看到，baseline 和 bottom 之间有一定的距离。实际上，inline 的图片下面那一道空白正是 baseline 和 bottom 之间的这段距离。即使只有图片没有文字，只要是 inline 的图片这段空白都会存在。

到这里就比较明显了，要去掉这段空白，最直接的办法是将图片的 vertical-align 设置为其他值。如果在同一行里有文字混排的话，那应该是用 bottom 或是 middle 比较好。

另外，top 和 bottom 之间的值即为 line-height。假如把 line-height 设置为 0，那么 baseline 与 bottom 之间的距离也变为 0，那道空白也就不见了。如果没有设置 line-height，line-height 的默认值是基于 font-size 的，视渲染引擎有所不同，但一般是乘以一个系数（比如 1.2）。因此，在没有设置 line-height 的情况下把 font-size 设为 0 也可以达到同样的效果。当然，这样做的后果就是不能图文混排了。

### 参考文献

- <img>元素底部为何有空白？：[https://www.zhihu.com/question/21558138](https://www.zhihu.com/question/21558138)

## 可替换元素

> 在 CSS 中，可替换元素（replaced element）的展现效果不是由 CSS 来控制的。这些元素是一种外部对象，它们外观的渲染，是独立于 CSS 的。

典型的可替换元素有：

- `<iframe>`
- `<video>`
- `<embed>`
- `<img>` \*

有些元素仅在特定情况下被作为可替换元素处理，例如：

- `<option>`
- `<audio>`
- `<canvas>`
- `<object>`
- `<applet>`

HTML 规范也说了 `<input>` 元素可替换，因为 "image" 类型的 `<input>` 元素就像 `<img>` 一样被替换。但是其他形式的控制元素，包括其他类型的 `<input>` 元素，被明确地列为非可替换元素（non-replaced elements）。该规范用术语小挂件（Widgets）来描述它们默认的限定平台的渲染行为。


## 画 0.5px 的线

- 采用 transform: scale()的方式，该方法用来定义元素的 2D 缩放转换：

```
transform: scale(0.5,0.5);
```

- 采用 meta viewport 的方式

```
<meta name="viewport" content="width=device-width, initial-scale=0.5, minimum-scale=0.5, maximum-scale=0.5"/>
```

这样就能缩放到原来的 0.5 倍，如果是 1px 那么就会变成 0.5px。viewport 只针对于移动端，只在移动端上才能看到效果

## 设置小雨 12px 的字体

在谷歌下 css 设置字体大小为 12px 及以下时，显示都是一样大小，都是默认 12px。

### 解决办法

- 使用 Webkit 的内核的-webkit-text-size-adjust 的私有 CSS 属性来解决，只要加了-webkit-text-size-adjust:none;字体大小就不受限制了。但是 chrome 更新到 27 版本之后就不可以用了。所以高版本 chrome 谷歌浏览器已经不再支持-webkit-text-size-adjust 样式，所以要使用时候慎用。
- 使用 css3 的 transform 缩放属性-webkit-transform:scale(0.5); 注意-webkit-transform:scale(0.75);收缩的是整个元素的大小，这时候，如果是内联元素，必须要将内联元素转换成块元素，可以使用 display：block/inline-block/...；
- 使用图片：如果是内容固定不变情况下，使用将小于 12px 文字内容切出做图片，这样不影响兼容也不影响美观。

## 如何重置元素的属性值到初始值

> 张鑫旭：[CSS inherit是继承，那initial和unset呢](https://www.zhangxinxu.com/wordpress/2020/01/css-initial-unset/)
>
> MDN：[all](https://developer.mozilla.org/zh-CN/docs/Web/CSS/all)

全局属性值

- initial 该关键字代表改变该元素或其父元素的所有属性至初始值
- inherit 该关键字代表改变该元素或其父元素的所有属性的值至他们的父元素属性的值
- unset 该关键字代表如果该元素的属性的值是可继承的，则改变该元素或该元素的父元素的所有属性的值为他们父元素的属性值，反之则改变为初始值
- revert 在许多情况下，revert 关键字的工作方式与 unset 完全相同。唯一的区别是，属性的值是由浏览器设置的，或者由用户创建的自定义样式表设置的(设置在浏览器端)


全局设置属性 all

all 属性被作为 CSS 全局关键词的其中之一. 除却 unicode-bidi 与 direction 之外的所有属性重设至其初始值，或继承值。