# Webpack

## hash chunkhash contenthash区别

### hash

hash是跟整个项目的构建相关，构建生成的文件hash值都是一样的，所以hash计算是跟整个项目的构建相关，同一次构建过程中生成的hash都是一样的，只要项目里有文件更改，整个项目构建的hash值都会更改

### chunkhash

chunkhash和hash不一样，它根据不同的入口文件(Entry)进行依赖文件解析、构建对应的chunk，生成对应的哈希值。我们在生产环境里把一些公共库和程序入口文件区分开，单独打包构建，接着我们采用chunkhash的方式生成哈希值，那么只要我们不改动公共库的代码，就可以保证其哈希值不会受影响

### contenthash

contenthash表示由文件内容产生的hash值，内容不同产生的contenthash值也不一样。(在项目中，通常做法是把项目中css都抽离出对应的css文件来加以引用)
