# Markdown 常用语法

## 标题

标题分为两种类型（类 Setext 形式/类 Atx 形式）

### 类 Atx 标题

一般使用 h1-h3 分别作为文章标题段落（个人常用类型）

```markdown
# 一级标题 h1

## 二级标题 h2

### 二级标题 h3

#### 二级标题 h4

##### 二级标题 h5

###### 六级标题 h6
```

### 类 Setext 标题

=（最高阶标题） -（第二阶标题） 数量>=1

```markdown
# aaa

## bbb
```

## 区块引用

Markdown 标记区块引用是使用类似 emaigit 起来像是你自己先断好行，然后在每行的最前面加上 > ：

```markdown
> 第一段
> 第二段
```

Markdown 也允许你偷懒只在整个段落的第一行最前面加上 >

```markdown
> 第一段
> 第二段
```

且区块引用支持嵌套

```markdown
> 第一段
>
> > 第二段
```

引用的区块内也可以使用其他的 Markdown 语法，包括标题、列表、代码区块等：

```markdown
> ## 这是一个标题。
>
> 1.  这是第一行列表项。
> 2.  这是第二行列表项。
>
> 给出一些例子代码：
>
>     return shell_exec("echo $input | $markdown_script")
```

## 列表

Markdown 支持有序列表和无序列表

### 无序列表

无序列表使用星号、加号或是减号作为列表标记

```markdown
- 星号

* 加号

- 减号
```

### 有序列表

有序列表则使用数字接着一个英文句点

```markdown
1. 第一项
2. 第二项
3. 第三项
```

注意：列表符号与文本间需要至少一个空格隔开

## 分隔线

你可以在一行中用三个以上的星号、减号、底线来建立一个分隔线，行内不能有其他东西。你也可以在星号或是减号中间插入空格。下面每种写法都可以建立分隔线：

```markdown
---

---

---

---

---
```

## 链接

Markdown 支持两种形式的链接语法： 行内式和参考式两种形式。

```markdown
This is [an example](http://example.com/ "Title") inline link.
```

This is [an example](http://example.com/ "Title") inline link.

如果你是要链接到同样主机的资源，你可以使用相对路径：

```markdown
See my [About](/about/) page for details.
```

See my [About](/about/) page for details.

参考式的链接是在链接文字的括号后面再接上另一个方括号，而在第二个方括号里面要填入用以辨识链接的标记：

```markdown
This is [an example][id] reference-style link.
[id]: http://example.com/ "Optional Title Here"
```

This is [an example][id] reference-style link.

[id]: http://example.com/ "Optional Title Here"

参考式的链接其实重点不在于它比较好写，而是它比较好读，比较一下上面的范例，使用参考式的文章本身只有 81 个字符，但是用行内形式的却会增加到 176 个字元，如果是用纯 HTML 格式来写，会有 234 个字元，在 HTML 格式中，标签比文本还要多。

使用 Markdown 的参考式链接，可以让文件更像是浏览器最后产生的结果，让你可以把一些标记相关的元数据移到段落文字之外，你就可以增加链接而不让文章的阅读感觉被打断。

## 强调

Markdown 使用星号（_）和底线（\_）作为标记强调字词的符号，被 _ 或 _ 包围的字词会被转成用 `<em>` 标签包围，用两个 \* 或 _ 包起来的话，则会被转成 `<strong>`，例如：

```markdown
_single asterisks_

_single underscores_

**double asterisks**

**double underscores**
```

_single asterisks_

_single underscores_

**double asterisks**

**double underscores**

## 代码

如果要标记一小段行内代码，你可以用反引号把它包起来（`），例如：

```markdown
Use the `printf()` function.
```

Use the `printf()` function.

如果要在代码区段内插入反引号，你可以用多个反引号来开启和结束代码区段：

```markdown
`` There is a literal backtick (`) here. ``
```

`` There is a literal backtick (`) here. ``

## 图片

Markdown 使用一种和链接很相似的语法来标记图片，同样也允许两种样式： 行内式和参考式。

```markdown
![Alt text](../.vuepress/public/images/test.jpg)

![Alt text](../.vuepress/public/images/test.jpg "Optional title")
```

![Alt text](../.vuepress/public/images/test.jpg)

![Alt text](../.vuepress/public/images/test.jpg "Optional title")

## 表格

单元格中的内容默认左对齐；表头单元格中的内容会一直居中对齐（不同的实现可能会有不同表现）。

```markdown
---- 默认对齐
:--- 左对齐
---: 右对齐
:--: 居中对齐
```

```markdown
| Tables        |      Are      |   Cool |
| ------------- | :-----------: | -----: |
| col 3 is      | right-aligned | \$1600 |
| col 2 is      |   centered    |   \$12 |
| zebra stripes |   are neat    |    \$1 |
```

| Tables        |      Are      |   Cool |
| ------------- | :-----------: | -----: |
| col 3 is      | right-aligned | \$1600 |
| col 2 is      |   centered    |   \$12 |
| zebra stripes |   are neat    |    \$1 |

## 其他

### 转化链接

Markdown 支持以比较简短的自动链接形式来处理网址和电子邮件信箱，只要是用方括号包起来， Markdown 就会自动把它转成链接。一般网址的链接文字就和链接地址一样，例如：

```markdown
<http://example.com/>
```

<http://example.com/>

```markdown
<address@example.com>
```

<address@example.com>

### 代码 diff

```diff
const unique = (arr)=>{
-  return Array.from(new Set(arr))
+  return [...new Set(arr)]
}
```

### 折叠

```md
<details>
<summary>展开查看规范</summary>
这是展开后的内容1
</details>
```

<details>
<summary>展开查看规范</summary>
这是展开后的内容1
</details>
