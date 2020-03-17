# CSS

## BFC

> 块格式化上下文（Block Formatting Context，BFC） 是Web页面的可视化CSS渲染的一部分，是块盒子的布局过程发生的区域，也是浮动元素与其他元素交互的区域。

具有 BFC 特性的元素可以看作是隔离了的独立容器，容器里面的元素不会在布局上影响到外面的元素，并且 BFC 具有普通容器所没有的一些特性。

### 1. 如何形成BFC

只要元素满足下面任一条件即可触发 BFC 特性:

- **根元素(`<html>`)**
- **浮动元素（元素的 float 不是 none）**
- **绝对定位元素（元素的 position 为 absolute 或 fixed）**
- **overflow 值不为 visible 的块元素(hidden、auto、scroll)**
- contain 值为 layout、content或 paint 的元素
- 弹性元素（display为 flex 或 inline-flex元素的直接子元素）
- 网格元素（display为 grid 或 inline-grid 元素的直接子元素）
- 多列容器（元素的 column-count 或 column-width 不为 auto，包括 column-count 为 1）
- column-span 为 all 的元素始终会创建一个新的BFC，即使该元素没有包裹在一个多列容器中（标准变更，Chrome bug）
- display
  - 行内块元素（元素的 display 为 inline-block）
  - 表格单元格（元素的 display为 table-cell，HTML表格单元格默认为该值）
  - 表格标题（元素的 display 为 table-caption，HTML表格标题默认为该值）
  - 匿名表格单元格元素（元素的 display为 table、table-row、 table-row-group、table-header-group、
  table-footer-group（分别是HTML table、row、tbody、thead、tfoot的默认属性）或 inline-table）
  - display 值为 flow-root 的元素

### 2. BFC的原理/BFC的布局规则

- BFC 内部的子元素，在垂直方向，边距会发生重叠
- BFC在页面中是独立的容器，外面的元素不会影响里面的元素，反之亦然
- BFC区域不与旁边的float box区域重叠
- 计算BFC的高度时，浮动的子元素也参与计算
- 文字层不会被浮动层覆盖，环绕于周围

### 3. BFC的原理应用

- 阻止margin重叠
- 可以包含浮动元素——清除内部浮动（清除浮动的原理时两个div都位于同一个BFC区域之中）
- 自适应两栏布局
- 可以阻止元素被浮动元素覆盖

## css性能优化

原文：[CSS性能优化的8个技巧](https://juejin.im/post/5b6133a351882519d346853f?utm_source=gold_browser_extension)

### 1. 内联首屏关键css(critical css)

### 2. 异步加载css

1. 使用JavaScript动态创建样式表link元素，并插入到DOM中

    ```js
    // 创建link标签
    const myCSS = document.createElement( "link" );
    myCSS.rel = "stylesheet";
    myCSS.href = "mystyles.css";
    // 插入到header的最后位置
    document.head.insertBefore(
      myCSS, document.head.childNodes[document.head.childNodes.length - 1].nextSibling
    );
    ```

2. 将link元素的media属性设置为用户浏览器不匹配的媒体类型（或媒体查询），如media="print"，甚至可以是完全不存在的类型media="noexist"。对浏览器来说，如果样式表不适用于当前媒体类型，其优先级会被放低，会在不阻塞页面渲染的情况下再进行下载

3. `rel="preload"`这一Web标准指出了如何异步加载资源，包括CSS类资源

    `<link>` 元素的 rel 属性的属性值preload能够让你在你的HTML页面中 `<head>`元素内部书写一些声明式的资源获取请求，可以指明哪些资源是在页面加载完成后即刻需要的。对于这种即刻需要的资源，你可能希望在页面加载的生命周期的早期阶段就开始获取，在浏览器的主渲染机制介入前就进行预加载。这一机制使得资源可以更早的得到加载并可用，且更不易阻塞页面的初步渲染，进而提升性能

### 3. 文件压缩

  文件的大小会直接影响浏览器的加载速度，这一点在网络较差时表现地尤为明显。相信大家都早已习惯对CSS进行压缩，现在的构建工具，如webpack、gulp/grunt、rollup等也都支持CSS压缩功能。压缩后的文件能够明显减小，可以大大降低了浏览器的加载时间。

  webpack中可以使用
  `mini-css-extract-plugin`插件导出css
  `optimize-css-assets-webpack-plugin`压缩代码
  
### 4. 删除无用css

  找到并删除代码中无用的css，可以借助`Uncss`库来实现自动删除
  
### 5. 有选择地使用选择器

1. 保持简单，不要使用嵌套过多过于复杂的选择器
2. 通配符和属性选择器效率最低，需要匹配的元素最多，尽量避免使用
3. 不要使用类选择器的ID选择器修饰元素标签
4. 不要为了追求速度而放弃可读性和可维护性

### 6. 减少使用昂贵的属性

在浏览器绘制屏幕时，所有需要浏览器进行操作或计算的属性相对而言都需要花费更大的代价。当页面发生重绘时，它们会降低浏览器的渲染性能。所以在编写CSS时，我们应该尽量减少使用昂贵属性，如`box-shadow`/`border-radius`/`filter`/`透明度`/`:nth-child`等

### 7. 优化重排/回流(reflow)和重绘(repaint)

#### 导致重排/回流的操作

1. 调整窗口大小
2. 改变字体大小
3. 样式表变动
4. 元素内容变化，尤其是输入控件
5. CSS伪类激活
6. DOM操作
7. offsetWidth, width, clientWidth, scrollTop/scrollHeight的计算， 会使浏览器将渐进回流队列Flush，立即执行回流。

#### 一些常用且会导致回流的属性和方法

- clientWidth、clientHeight、clientTop、clientLeft
- offsetWidth、offsetHeight、offsetTop、offsetLeft
- scrollWidth、scrollHeight、scrollTop、scrollLeft
- scrollIntoView()、scrollIntoViewIfNeeded()
- getComputedStyle()
- getBoundingClientRect()
- scrollTo()

#### 导致重绘的操作

当页面中元素样式的改变并不影响它在文档流中的位置时（例如：color、background-color、visibility等）

#### 避免频繁触发重排/回流的方法

CSS

- 避免使用table布局。
- 尽可能在DOM树的最末端改变class。
- 避免设置多层内联样式。
- 将动画效果应用到position属性为absolute或fixed的元素上。
- 避免使用CSS表达式（例如：calc()）

JS

- 避免频繁操作样式，最好一次性重写style属性，或者将样式列表定义为class并一次性更改class属性。
- 避免频繁操作DOM，创建一个documentFragment，在它上面应用所有DOM操作，最后再把它添加到文档中。
- 也可以先为元素设置display: none，操作结束后再把它显示出来。因为在display属性为none的元素上进行的DOM操作不会引发回流和重绘。
- 避免频繁读取会引发回流/重绘的属性，如果确实需要多次使用，就用一个变量缓存起来。
- 对具有复杂动画的元素使用绝对定位，使它脱离文档流，否则会引起父元素及后续元素频繁回流。

### 4. 不要使用@import

原因：

1. 使用@import引入css会影响浏览器的并行下载。使用@import引用的css闻不见只有在引用它的那个css文件被下载、解析之后，浏览器才会知道还有另外一个css需要下载，这时才去下载，然后下载后开始解析、构建render树等一系列操作。这就导致浏览器无法并行下载所需的样式文件

2. 多个@import会导致下载顺序混乱。在IE中，@import会引发资源文件的下载顺序被打乱，即排列在@import后面的js文件先于@import下载，并且打乱甚至破坏@import自身的并行下载

## link和@import的区别

- link属于XHTML标签，而@import是CSS提供的。
- 页面被加载时，link会同时被加载，而@import引用的CSS会等到页面被加载完再加载。
- import只在IE 5以上才能识别，而link是XHTML标签，无兼容问题。
- link方式的样式权重高于@import的权重。
- 使用dom控制样式时的差别。当使用javascript控制dom去改变样式的时候，只能使用link标签，因为@import不是dom可以控制的

## 居中布局

水平居中：

- 行内元素： text-align: center
- 块级元素： margin: 0 auto
- absolute + transform（不需知道元素宽度）/ 负margin（需知道元素宽度）
- flex + justify-content: center

垂直居中：

- line-height: height
- absolute + transform（不需知道元素宽度）/ 负margin（需知道元素宽度）
- flex + align-items: center
- table

水平垂直居中：

- absolute + transform（不需知道元素宽度）/ 负margin（需知道元素宽度）
- flex + justify-content + align-items

## 选择器优先级

1. 类型选择器（例如：`h1`）和伪元素（例如：`::before`）
2. 类选择器（例如：`.class`），属性选择器（例如：`[type="radio"]`）和伪类（例如：`:hover`）
3. ID选择器（例如：`#id`）

通配符选择器（*）关系选恶气（+，>，~,' ',||）和否定伪类（例如：`:not()`）对优先级没有影响（但是在`:not()`内部声明的选择器会影响优先级）

给元素添加内联样式（例如：`style="font-weight: blod"`）总会覆盖外部样式表的任何样式，因此可看作具有最高的优先级

`!important`例外规则

当在一个样式声明中使用一个`!important`规则时，此声明将覆盖任何其他声明。虽然，从技术上讲，!important 与优先级无关，但它与最终的结果直接相关。
使用`!important`是一个坏习惯，应该尽量避免，因为这破坏了样式表中的固有的级联规则 使得调试找bug变得更加困难了。当两条相互冲突的带有`!important`规则的声明被应用到相同的元素上时，拥有更大优先级的声明将会被采用。

## 1px解决方案

### 形成原因

我们知道，像素可以分为物理像素（CSS像素）和设备像素。由于现在手机大部分是Retina高清屏幕，所以在PC端和移动端存在设备像素比的概念。简单说就是你在pc端看到的1px和在移动端看到的1px是不一样的。

在PC端上，像素可以称为CSS像素，PC端上dpr为1。也就说你书写css样式是是多少在pc上就显示多少。而在移动端上，像素通常使用设备像素。往往PC端和移动端上在不做处理的情况下1px显示是不同的。

一个物理像素等于多少个设备像素取决于移动设备的屏幕特性(是否是Retina)和用户缩放比例。

如果是Retina高清屏幕，那么dpr的值可能为2或者3，那么当你在pc端上看到的1px时，在移动端上看到的就会是2px或者3px。

由于业务需求，我们需要一些方法来实现移动端上的1px。

### border-image

```css
.border-image-1px {
  border-width: 1px 0;
  border-image: url(linenew.png) 2 0 stretch;
}
```

缺点是修改起来很麻烦，需要替换图片

### transform伪类（推荐）

```css
.setOnePx{
  position: relative;
  &::after{
    position: absolute;
    content: '';
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

### box-shadow

```css
.box-shadow-1px {
box-shadow: inset 0px -1px 1px -1px #c8c7cc;
}
```

缺点是实现效果和边框还是有细微差异

### viewport设置scale

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
```

此方案全局更改显示方案，还是要慎重考虑

## display:none,visibility:hidden,opacity:0三者区别

||display:none|visibility:hidden|opacity:0|
|---|---|---|---|
|是否占据页面控件|x|√|√|
|对子元素影响|√|x|√|
|自身绑定的事件能否继续触发|x|x|√|
|是否影响其他元素触发事件（例如被遮挡的元素）|x|x|√|
|是否产生回流（reflow）|√|x|x|
|是否产生重绘（repaint）|√|√|不一定|

元素提升为合成层后，transform 和 opacity 不会触发 repaint，如果不是合成层，则其依然会触发 repaint。在 Blink 和 WebKit 内核的浏览器中，对于应用了 transition 或者 animation 的 opacity 元素，浏览器会将渲染层提升为合成层。也可以使用 translateZ(0) 或者 translate3d(0,0,0) 来人为地强制性地创建一个合成层。

## CSS定位方式

- static: 正常文档流定位，此时 top, right, bottom, left 和 z-index 属性无效，块级元素从上往下纵向排布，行级元素从左向右排列。
- relative：相对定位，此时的『相对』是相对于正常文档流的位置。
- absolute：相对于最近的非 static 定位祖先元素的偏移，来确定元素位置，比如一个绝对定位元素它的父级、和祖父级元素都为relative，它会相对他的父级而产生偏移。
- fixed：指定元素相对于屏幕视口（viewport）的位置来指定元素位置。元素的位置在屏幕滚动时不会改变，比如那种回到顶部的按钮一般都是用此定位方式。
- sticky：粘性定位，特性近似于relative和fixed的合体，其在实际应用中的近似效果就是IOS通讯录滚动的时候的『顶屁股』。

## 层叠山下文与层叠顺序

### 层叠上下文

层叠上下文是HTML元素的三维概念，这些HTML元素在一条假想的相对于面向（电脑屏幕的）视窗或者网页的用户的z轴上延伸，HTML元素依据其自身属性按照优先级顺序占用层叠上下文的空间。

#### 产生条件

- 根元素 (HTML),
- z-index 值不为 "auto"的 绝对/相对定位，
- 一个 z-index 值不为 "auto"的 flex 项目 (flex item)，即：父- 元素 display: flex|inline-flex，
- opacity 属性值小于 1 的元素（参考 the specification for - opacity），
- transform 属性值不为 "none"的元素，
- mix-blend-mode 属性值不为 "normal"的元素，
- filter值不为“none”的元素，
- perspective值不为“none”的元素，
- isolation 属性被设置为 "isolate"的元素，
- position: fixed
- 在 will-change 中指定了任意 CSS 属性，即便你没有直接指定这些属性的值（参考 这篇文章）
- -webkit-overflow-scrolling 属性被设置 "touch"的元素

### 层叠顺序

![层叠顺序](../.vuepress/public/images/css_z-index.png)

- 诸如border/background一般为装饰属性
- 浮动和块状元素一般用作布局，
- 内联元素是内容

#### 层叠顺序准则

1. 谁大谁上：当具有明显的层叠水平标示的时候，如识别的z-indx值，在同一个层叠上下文领域，层叠水平值大的那一个覆盖小的那一个。通俗讲就是官大的压死官小的。
2. 后来居上：当元素的层叠水平一致、层叠顺序相同的时候，在DOM流中处于后面的元素会覆盖前面的元素。

### 参考文献

- 深入理解CSS中的层叠上下文和层叠顺序：[https://www.zhangxinxu.com/wordpress/2016/01/understand-css-stacking-context-order-z-index/](https://www.zhangxinxu.com/wordpress/2016/01/understand-css-stacking-context-order-z-index/)

## 盒模型

当对一个文档进行布局（lay out）的时候，浏览器的渲染引擎会根据标准之一的 CSS 基础框盒模型（CSS basic box model），将所有元素表示为一个个矩形的盒子（box）。CSS 决定这些盒子的大小、位置以及属性（例如颜色、背景、边框尺寸…）。

盒模型由content（内容）、padding（内边距）、border（边框）、margin（外边距）组成。

### 标准盒模型和怪异盒模型

在W3C标准下，我们定义元素的width值即为盒模型中的content的宽度值，height值即为盒模型中的content的高度值

而IE怪异盒模型（IE8以下）width的宽度并不是content的宽度，而是border-left + padding-left + content的宽度值 + padding-right + border-right之和，height同理。

### box-sizing

```css
box-sizing: content-box // 标准盒模型
box-sizing: border-box // 怪异盒模型
box-sizing: padding-box // 火狐的私有模型，没人用
```
