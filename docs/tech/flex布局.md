# FLex

Flex 是 Flexible Box 的缩写，意为“弹性布局”，用来为盒装模型提供最大的灵活性

```css
.box {
  display: box;
}

/* 行内元素 */
.box {
  display: inline-flex;
}

/* Webkit 内核的浏览器，必须加上 -webkit 前缀 */
.box {
  display: -webkit-flex; /* Safari */
  display: flex;
}
```

设置为 Flex 布局后，子元素的 `float`, `clear`, `vertical-align` 属性将失效

## 基本概念

采用 Flex 布局的元素，称为 Flex 容器（flex container），简称“容器”。它的所有的子元素自动称为容器成员，称为 Flex 项目（flex item），简称“项目”。

## 容器的属性

以下 6 个属性设置在容器上

- flex-direction
- flex-wrap
- flex-flow
- justify-content
- align-items
- align-content

### flex-direction

flex-direction 属性决定主轴的方向（即项目的排列方向）

- row(默认)：主轴为水平方向，起点在左端
- row-reverse：主轴为水平方向，起点在右端
- column：主轴为垂直方向，起点在上沿
- column-reverse：主轴为垂直方向，起点在下沿

### flex-wrap

默认情况下，项目都排在一条线上。flex-wrap 属性定义，如果一条轴线排不下，如何换行

- nowrap(默认)：不换行
- wrap：换行，第一行在上方
- wrap-reverse：换行，第一行在下方

### flex-flow

flex-flow 属性是 flex-direction 属性和 flex-wrap 属性的简写形式，默认值为 row nowrap

```css
.box {
  flex-flow: <flex-direction> || <flex-wrap>;
}
```

### justify-content 属性

justify-content 属性定义了项目在主轴上的对齐方式

- flex-start(默认)：左对齐
- flex-end：右对齐
- center：居中
- space-between：两端对齐，项目之间的间隔都相等
- space-around：每个项目两侧的间隔相等。所以，项目之间的间隔比项目与边框的间隔大一倍

### align-items 属性

align-items 属性定义项目在交叉轴上如何对齐

- flex-start：交叉轴的起点对齐
- flex-end：交叉轴的终点对齐
- center：交叉轴的中点对齐
- baseline： 项目的第一行文字的基线对齐
- stretch(默认值)：如果项目未设置高度或设为 auto，**将占满整个容器的高度**

### align-content 属性

align-content 属性定义了**多根轴线**（当元素出现换行时使用）的对齐方式。如果项目只有一根轴线，该属性不起作用

flex-start：与交叉轴的起点对齐
flex-end：与交叉轴的终点对齐
center：与交叉轴的中点对齐
space-between：与交叉轴两端对齐，轴线之间的间隔平均分布
space-around：每根轴线两侧的间隔都相等。所以，轴线之间的间隔比轴线与边框的间隔大一倍
stretch(默认值)：轴线占满整个交叉轴

## 项目的属性

- order
- flex-grow
- flex-shrink
- flex-basis
- flex
- align-self

### order 属性

order 属性定义项目的排列顺序。数值越小，排列越靠前，默认是 0

```css
.item {
  order: <integer>; /* 整数类型，可使用负数 */
}
```

### flex-grow 属性

flex-grow 属性定义项目的放大比例，默认为 0，即如果存在剩余空间，也不放大

```css
.item {
  flex-grow: <number>; /* 可使用小数，不可使用负数 */
}
```

### flex-shrink 属性

flex-shrink 属性定义了项目的缩小比例，默认为 1，即如果空间不足，该项目将缩小

```css
.item {
  flex-shrink: <number>; /* 可使用小数，不可使用负数 */
}
```

### flex-basis 属性

flex-basis 属性定义了在分配多余空间之前，项目占据的主轴空间（main size）。浏览器根据这个属性，计算主轴是否有多余空间。它的默认值为 auto，即项目的本来大小

```css
.item {
  flex-basis: <length> | auto; /* default auto */
}
```

它可以设为跟 width 或 height 属性一样的值，则项目将占据固定空间

### flex 属性

flex 属性是 flex-grow,flex-shrink 和 flex-basis 的简写，默认值为 `0 1 auto`。后两个属性可选

```css
.item {
  flex: none | [ < "flex-grow" > < "flex-shrink" >? || < "flex-basis" >];
}
```

该属性有两个快捷值：auto(1 1 auto) 和 none(0 0 auto)

建议有限使用这个属性，而不是单独写三个分离的属性，因为浏览器会推算相关值

### align-self 属性

align-self 属性允许单个项目有与其他项目不一样的对齐方式，可覆盖 align-items 属性。默认值为 auto，表示继承父元素的 align-items 属性，如果没有父元素，则等同于 stretch
