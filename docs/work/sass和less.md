# sass和less

Sass (Syntactically Awesome Stylesheets)是一种动态样式语言，Sass语法属于缩排语法，比css比多出好些功能(如变量、嵌套、运算,混入(Mixin)、继承、颜色处理，函数等)，更容易阅读。

Less也是一种动态样式语言. 对CSS赋予了动态语言的特性，如变量，继承，运算， 函数.  Less 既可以在客户端上运行 (支持IE 6+, Webkit, Firefox)，也可在服务端运行 (借助 Node.js)。

## 区别

### 安装

Sass的安装需要Ruby环境，是在服务端处理的，而Less是需要引入less.js来处理Less代码输出css到浏览器，也可以在开发环节使用Less，然后编译成css文件，直接放到项目中，也有 Less.app、SimpleLess、CodeKit.app这样的工具，也有在线编译地址。

在Webpack中使用时使用sass-loader工具进行编译， 但是需要安装node-sass（Node Sass）或sass（Dart Sass）包

> sass-loader requires you to install either Node Sass or Dart Sass on your own (more documentation can be found below). This allows you to control the versions of all your dependencies, and to choose which Sass implementation to use.

LibSass的解释

> Node-sass is a library that provides binding for Node.js to LibSass, the C version of the popular stylesheet preprocessor, Sass.
It allows you to natively compile .scss files to css at incredible speed and automatically via a connect middleware.

同时node-sass包的安装经常会受到墙的影响而下载失败，因此使用npm install时需要修改源地址，或者直接使用sass包作为依赖

less-loader就不用这么麻烦

### api

变量表示方式不同

- less:@
- sasss:$

作用域不同

less

```less
@color: #00c;/*blue*/

#header{

@color:#c00;/*red*/

border:1px solid @color;

}

#footer{

border:1px solid @color;

}

// Less-作用域编译后

#header{border:1px solid #cc0000;}

#footer{border:1px solid #0000cc;}
```

sass

```scss
$color: #00c;/*blue*/

#header{

$color:#c00;/*red*/

border:1px solid $color;

}

#footer{

border:1px solid $color;

}

// Sass-作用域编译后

#header{border:1px solid #c00}

#footer{border:1px solid #c00}
```a

sass支持if else条件语句 for循环语句，less不支持

sass引用的外部文件命名必须以_开头, 如下例所示:其中_test1.sass、_test2.scss、_test3.scss文件分别设置的h1 h2 h3。文件名如果以下划线_开头的话，Sass会认为该文件是一个引用文件，不会将其编译为css文件。
