# Webpack

## hash chunkhash contenthash 区别

### hash

hash 是跟整个项目的构建相关，构建生成的文件 hash 值都是一样的，所以 hash 计算是跟整个项目的构建相关，同一次构建过程中生成的 hash 都是一样的，只要项目里有文件更改，整个项目构建的 hash 值都会更改

### chunkhash

chunkhash 和 hash 不一样，它根据不同的入口文件(Entry)进行依赖文件解析、构建对应的 chunk，生成对应的哈希值。我们在生产环境里把一些公共库和程序入口文件区分开，单独打包构建，接着我们采用 chunkhash 的方式生成哈希值，那么只要我们不改动公共库的代码，就可以保证其哈希值不会受影响

### contenthash

contenthash 表示由文件内容产生的 hash 值，内容不同产生的 contenthash 值也不一样。(在项目中，通常做法是把项目中 css 都抽离出对应的 css 文件来加以引用)

## webpack 优化白屏问题

### 使用 prerender-spa-plugin

github：[https://github.com/chrisvfritz/prerender-spa-plugin](https://github.com/chrisvfritz/prerender-spa-plugin)

rerender-spa-plugin 依赖 puppeteer 操作 chromium 对 SPA 跑了一遍，生成一个静态的 HTML，里面是已经填好的 dom 节点和数据。

这样的话有两个缺陷

1. 无法展示用户自身的内容
2. 不适合动态路由多的大型项目。

```js
var path = require("path");
var PrerenderSpaPlugin = require("prerender-spa-plugin");

{
  // ...
  plugins: [
    // ...
    new PrerenderSpaPlugin(
      // 输出目录的绝对路径
      path.join(__dirname, "../dist"),
      // 预渲染的路由
      ["/new", "/hot"],
    ),
  ];
}
```

### 使用 page-skeleton-webpack-plugin

github：[https://github.com/ElemeFE/page-skeleton-webpack-plugin/blob/master/docs/i18n/zh_cn.md](https://github.com/ElemeFE/page-skeleton-webpack-plugin/blob/master/docs/i18n/zh_cn.md)

page-skeleton-webpack-plugin 是一款由 ElemeFE 团队开发的 webpack 插件，该插件的目的是根据你项目中不同的路由页面生成相应的骨架屏页面，并将骨架屏页面通过 webpack 打包到对应的静态路由页面中。

## webapck splitChunksPlugin

首先 webpack 总共提供了三种办法来实现 Code Splitting，如下：

- 入口配置：entry 入口使用多个入口文件；
- 抽取公有代码：使用 SplitChunks 抽取公有代码；
- 动态加载 ：动态加载一些代码。

这里我们姑且只讨论使用 SplitChunks 抽取公有代码。

### SplitChunks

默认配置项

```js
module.exports = {
  //...
  optimization: {
    splitChunks: {
      chunks: "async",
      minSize: 30000,
      maxSize: 0,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: "~",
      name: true,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  },
};
```

参数说明如下

- chunks：表示从哪些 chunks 里面抽取代码，除了三个可选字符串值 initial、async、all 之外，还可以通过函数来过滤所需的 - chunks；
- minSize：表示抽取出来的文件在压缩前的最小大小，默认为 30000；
- maxSize：表示抽取出来的文件在压缩前的最大大小，默认为 0，表示不限制最大大小；
- minChunks：表示被引用次数，默认为 1；
- maxAsyncRequests：最大的按需(异步)加载次数，默认为 5；
- maxInitialRequests：最大的初始化加载次数，默认为 3；
- automaticNameDelimiter：抽取出来的文件的自动生成名字的分割符，默认为 ~；
- name：抽取出来文件的名字，默认为 true，表示自动生成文件名；
- cacheGroups: 缓存组。（这才是配置的关键）

- initial 把非动态模块打包进 vendor，动态模块优化打包
- async 只把动态模块打包进 vendor，非动态模块保持原样（不优化）
- all 把动态和非动态模块同时进行优化打包；所有模块都扔到 vendors.bundle.js 里面

#### 参考文献

- webapck4 玄妙的 SplitChunks Plugin：[https://juejin.im/post/5c08fe7d6fb9a04a0d56a702](https://juejin.im/post/5c08fe7d6fb9a04a0d56a702)

### cacheGroups

上面的那么多参数，其实都可以不用管，cacheGroups 才是我们配置的关键。它可以继承/覆盖上面 splitChunks 中所有的参数值，除此之外还额外提供了三个配置，分别为：test, priority 和 reuseExistingChunk。

- test: 表示要过滤 modules，默认为所有的 modules，可匹配模块路径或 chunk 名字，当匹配的是 chunk 名字的时候，其里面的所有 modules 都会选中；
- priority：表示抽取权重，数字越大表示优先级越高。因为一个 module 可能会满足多个 cacheGroups 的条件，那么抽取到哪个就由权重最高的说了算；
- reuseExistingChunk：表示是否使用已有的 chunk，如果为 true 则表示如果当前的 chunk 包含的模块已经被抽取出去了，那么将不会重新生成新的。

## webpack 的热更新是如何做到的？说明其原理

webpack 的热更新又称热替换（Hot Module Replacement），缩写为 HMR。 这个机制可以做到不用刷新浏览器而将新变更的模块替换掉旧的模块。

首先要知道 server 端和 client 端都做了处理工作

1. 第一步，在 webpack 的 watch 模式下，文件系统中某一个文件发生修改，webpack 监听到文件变化，根据配置文件对模块重新编译打包，并将打包后的代码通过简单的 JavaScript 对象保存在内存中。
2. 第二步是 webpack-dev-server 和 webpack 之间的接口交互，而在这一步，主要是 dev-server 的中间件 webpack-dev-middleware 和 webpack 之间的交互，webpack-dev-middleware 调用 webpack 暴露的 API 对代码变化进行监控，并且告诉 webpack，将代码打包到内存中。
3. 第三步是 webpack-dev-server 对文件变化的一个监控，这一步不同于第一步，并不是监控代码变化重新打包。当我们在配置文件中配置了 devServer.watchContentBase 为 true 的时候，Server 会监听这些配置文件夹中静态文件的变化，变化后会通知浏览器端对应用进行 live reload。注意，这儿是浏览器刷新，和 HMR 是两个概念。
4. 第四步也是 webpack-dev-server 代码的工作，该步骤主要是通过 sockjs（webpack-dev-server 的依赖）在浏览器端和服务端之间建立一个 websocket 长连接，将 webpack 编译打包的各个阶段的状态信息告知浏览器端，同时也包括第三步中 Server 监听静态文件变化的信息。浏览器端根据这些 socket 消息进行不同的操作。当然服务端传递的最主要信息还是新模块的 hash 值，后面的步骤根据这一 hash 值来进行模块热替换。
5. webpack-dev-server/client 端并不能够请求更新的代码，也不会执行热更模块操作，而把这些工作又交回给了 webpack，webpack/hot/dev-server 的工作就是根据 webpack-dev-server/client 传给它的信息以及 dev-server 的配置决定是刷新浏览器呢还是进行模块热更新。当然如果仅仅是刷新浏览器，也就没有后面那些步骤了。
6. HotModuleReplacement.runtime 是客户端 HMR 的中枢，它接收到上一步传递给他的新模块的 hash 值，它通过 JsonpMainTemplate.runtime 向 server 端发送 Ajax 请求，服务端返回一个 json，该 json 包含了所有要更新的模块的 hash 值，获取到更新列表后，该模块再次通过 jsonp 请求，获取到最新的模块代码。这就是上图中 7、8、9 步骤。
7. 而第 10 步是决定 HMR 成功与否的关键步骤，在该步骤中，HotModulePlugin 将会对新旧模块进行对比，决定是否更新模块，在决定更新模块后，检查模块之间的依赖关系，更新模块的同时更新模块间的依赖引用。
8. 最后一步，当 HMR 失败后，回退到 live reload 操作，也就是进行浏览器刷新来获取最新打包代码。

## 如何用 webpack 来优化前端性能

用 webpack 优化前端性能是指优化 webpack 的输出结果，让打包的最终结果在浏览器运行快速高效。

- 压缩代码:删除多余的代码、注释、简化代码的写法等等方式。可以利用 webpack 的 UglifyJsPlugin 和 ParallelUglifyPlugin 来压缩 JS 文件， 利用 cssnano（css-loader?minimize）来压缩 css
- 利用 CDN 加速: 在构建过程中，将引用的静态资源路径修改为 CDN 上对应的路径。可以利用 webpack 对于 output 参数和各 loader 的 publicPath 参数来修改资源路径
- Tree Shaking: 将代码中永远不会走到的片段删除掉。可以通过在启动 webpack 时追加参数--optimize-minimize 来实现
- Code Splitting: 将代码按路由维度或者组件分块(chunk),这样做到按需加载,同时可以充分利用浏览器缓存，如
  - 使用 import() 动态加载模块
  - 使用 React.lazy() 动态加载组件
  - 使用 lodable-component 动态加载路由，组件或者模块
- 提取公共第三方库: SplitChunksPlugin 插件来进行公共模块抽取,利用浏览器缓存可以长期缓存这些无需频繁变动的公共代码
- 选择替换的体积更小的模块，如使用`day.js`替换`moment.js`

## 如何提高 webpack 的打包速度

- happypack: 利用进程并行编译 loader,利用缓存来使得 rebuild 更快,遗憾的是作者表示已经不会继续开发此项目,类似的替代者是 thread-loader
- 外部扩展(externals): 将不怎么需要更新的第三方库脱离 webpack 打包，不被打入 bundle 中，从而减少打包时间,比如 jQuery 用 script 标签引入
- dll: 采用 webpack 的 DllPlugin 和 DllReferencePlugin 引入 dll，让一些基本不会改动的代码先打包成静态资源,避免反复编译浪费时间
- 利用缓存: webpack.cache、babel-loader.cacheDirectory、HappyPack.cache 都可以利用缓存提高 rebuild 效率
- 缩小文件搜索范围: 比如 babel-loader 插件,如果你的文件仅存在于 src 中,那么可以 include: path.resolve(\_\_dirname, 'src'),当然绝大多数情况下这种操作的提升有限,除非不小心 build 了 node_modules 文件

## module chunk bundle 的区别

1. 对于同一份代码，当我们手写下一个文件，它们无论是 ESM 还是 commonJS 或是 AMD，它们都是 module
2. 当我们写的 module 源文件传到 webpack 进行打包时，这个 bundle 文件包含了经过加载和编译的最终源文件
3. webpack 处理好 chunk 文件后，最终会输出 bundle 文件，这个 bundle 文件包含了经过加载和编译的最终源文件，所以它可以直接在浏览器中运行

## filename chunkFilename 的区别

- filename 指列在 entry 中，打包后输出的文件的名称
- chunkFilename 指未列在 entry 中，却又需要被打包出来的文件的名称

## webpackChunkName webpackPrefetch webpackPreload

这几个名词其实是 webpack 魔法注释（magic comments）

### webpackChunkName

webpackChunkName 是为预加载的文件取别名

```js
async function getAsyncComponent() {
  var element = document.createElement("div");

  // 在 import 的括号里 加注释 /* webpackChunkName: "lodash" */ ，为引入的文件取别名
  const { default: _ } = await import(
    /* webpackChunkName: "lodash" */ "lodash"
  );

  element.innerHTML = _.join(["Hello!", "dynamic", "imports", "async"], " ");

  return element;
}
```

### webpackPrefetch webpackPreload

在上面例子代码里，我们是函数执行时，才会触发异步加载 lodash 的动作，这时候会动态的生成一个 script 标签，加载到 head 里

如果我们 import 的时候添加 webpackPrefetch

```js
const { default: _ } = await import(
  /* webpackChunkName: "lodash" */ /* webpackPrefetch: true */ "lodash"
);
```

就会以 `<link rel="prefetch" as="script" href='xxx'>` 的形式拉取 lodash 代码
这个一部加载的代码不需要手动触发，webpack 会在父 chunk 完成加载后，闲时加载 lodash 文件

webpackPreload 是预加载当前导航下可能需要资源，它和 webpackPrefetch 的主要区别是：

- preload chunk 会在父 chunk 加载时，以并行的方式开始加载。prefetch chunk 会在父 chunk 加载结束后开始加载。
- preload chunk 具有中等优先级，并立即下载。prefetch chunk 在浏览器闲置时下载。
- preload chunk 会在父 chunk 中立即请求，用于当下时刻。prefetch chunk 会用于未来的某个时刻。

## source-map 中的参数

| 参数   | 参数解释                                                                |
| ------ | ----------------------------------------------------------------------- |
| eval   | 打包后的模块都使用 `eval()` 执行，行映射可能不准；不产生独立的 map 文件 |
| cheap  | map 映射只显示行不显示列，忽略源自 loader 的 source map                 |
| inline | 映射文件以 base64 格式编码，加在 bundle 文件最后，不产生独立的 map 文件 |
| module | 增加对 loader source map 和第三方模块的映射                             |

### cheap-source-map

cheap 不会产生列映射，相应的体积会小很多

### eval-source-map

eval 会以 eval() 函数打包运行模块，不产生独立的 map 文件，会显示报错的行列信息

### inline-source-map

映射文件以 base64 格式编码，加在 bundle 文件最后，不产生独立的 map 文件。加入 map 文件后，我们可以明显的看到包体积变大了

