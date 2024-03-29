## npm

原文: [你所需要的 npm 知识储备都在这了](https://juejin.im/post/5d08d3d3f265da1b7e103a4d?tdsourcetag=s_pcqq_aiomsg)

### npm 2.x - 嵌套结构

npm 2.x 安装依赖方式比较简单直接，以递归的方式按照包依赖的树形结构下载填充本地目录结构，也就是说每个包都会将该包的依赖安装到当前包所在的 node_modules 目录中。

问题：
- 在不同层级的依赖中，可能引用了同一个模块，导致大量冗余
- 在 Window 系统中，文件路径最大长度为 260 个字符，嵌套层级过深可能导致不可预知的问题。

### npm 3.x - 扁平结构

npm 3.x 则采用了扁平化的结构来安装组织 node_modules。也就是在执行 npm install 的时候，按照 package.json 里依赖的顺序依次解析，遇到新的包就把它放在第一级目录，后面如果遇到一级目录已经存在的包，会先按照约定版本判断版本，如果符合版本约定则忽略，否则会按照 npm 2.x 的方式依次挂在依赖包目录下。

问题：
- npm 为了让开发者在安全的前提下使用最新的依赖包，在 package.json 中通常做了锁定大版本的操作，这样在每次 npm install 的时候都会拉去依赖包大版本下的最新的版本。这种机制最大的一个缺点就是当有依赖包有小版本更新时，可能会出现协同开发者的依赖包不一致的问题

### npm 5.x - package-lock.json

为了解决 npm install 的不确定性问题，在 npm 5.x 版本新增了 package-lock.json 文件，而安装方式还沿用了 npm 3.x 的扁平化的方式。

package-lock.json 的作用是锁定依赖结构，即只要你目录下有 package-lock.json 文件，那么你每次执行 npm install 后生成的 node_modules 目录结构一定是完全相同的。

package-lock.json 文件精确描述了 node_modules 目录下所有的包的树状依赖结构，每个包的版本都是完全精确的

- version: 包唯一的版本号
- resolved: 安装源
- integrity: 表明包完整性的 hash 值（验证包是否已失效）
- dev: 如果为 true，则此依赖关系仅是顶级模块的开发依赖关系或者是一个的传递依赖关系
- require: 依赖包所需要的所有依赖项，对应依赖包 package.json 里 dependencies 中的依赖项
- dependencies: 依赖包 node_modules 中依赖的包，与顶层的 dependencies 一样的结构

### 依赖包版本号

npm 采用了语义化版本（semver）规范作为依赖版本管理方案 （x.y.z）

#### 主版本号（major version）

#### 次版本号（minor version）

#### 修订号（patch）

### 版本格式

#### x.y.z

表示精确版本号。任何其他版本号都不匹配，在一些比较重要的线上项目中，建议使用这种方式锁定版本

#### ^x.y.z

表示兼容补丁和小版本更新的版本号。官方的定义是`能够兼容除了最左侧非0版本号之外的其他变化`

```text
"^1.2.3" 等价于 ">= 1.2.3 < 2.0.0"。即只要最左侧的 "1" 不变，其他都可以改变。所以 "1.2.4", "1.3.0" 都可以兼容。

"^0.2.3" 等价于 ">= 0.2.3 < 0.3.0"。因为最左侧的是 "0"，那么只要第二位 "2" 不变，其他的都兼容，比如 "0.2.4" 和 "0.2.99"

"^0.0.3" 等价于 ">= 0.0.3 < 0.0.4"。这里最左侧的非 "0" 只有 "3"，且没有其他版本号了，所以这个也等价于精确的 "0.0.3"。
```

#### ~x.y.z

表示只兼容补丁更新的版本号。关于 ~ 的定义分为两部分：如果列出了小版本号（第二位），则只兼容补丁（第三位）的修改；如果没有列出小版本号，则兼容第二和第三位的修改

```text
"~1.2.3" 列出了小版本号 "2"，因此只兼容第三位的修改，等价于 ">= 1.2.3 < 1.3.0"。

"~1.2" 也列出了小版本号，因此和上面一样兼容第三位的修改，等价于 ">= 1.2.0 < 1.3.0"。

"~1" 没有列出小版本号，可以兼容第二第三位的修改，因此等价于 ">= 1.0.0 < 2.0.0"
```

#### x.y.z-beta.1

带预发布关键词的版本号

```text
alpha(α)：预览版，或者叫内部测试版；一般不向外部发布，会有很多bug；一般只有测试人员使用。

beta(β)：测试版，或者叫公开测试版；这个阶段的版本会一直加入新的功能；在alpha版之后推出。

rc(release candidate)：最终测试版本；可能成为最终产品的候选版本，如果未出现问题则可发布成为正式版本。
```

### npm script

如果全局安装@vue/cli-service 的话，@vue/cli-service 源文件会被安装在全局源文件安装目录（/user/local/lib/node_modules）下，而 npm 会在全局可执行 bin 文件安装（/usr/local/bin）目录下创建一个指向../lib/node_modules/@vue/cli-service/bin/vue-cli-service.js 文件的名为 vue-cli-service 的软链接，这样就可以直接在终端输入 vue-cli-service 来执行。

如果局部安装@vue/cli-service 的话，
npm 则会在本地项目 node_modules/.bin 目录下创建一个指向../@vue/cli-service/bin/vue-cli-service.js 名为 vue-cli-service 的软链接，
这个时候需要在终端中输入./node_modules/.bin/vue-cli-service 来执行（也可以使用 npx vue-cli-service 命令来执行，
npx 的作用就是为了方便调用项目内部安装的模块）。

### 文件完整性

在下载依赖包之前，我们一般救恩那个拿到 npm 对该依赖包计算的 hash 值，例如我们执行 `npm info` 命令， tarball（下载链接）的就是 shasum（hash）。

用户下载依赖包到本地后，需要确定在下载过程中没有出现错误，所以在下载完成后需要在本地计算一次文件的 hash 值，如果两个 hash 值是相同的，则确保下载的依赖是完整的，如果不同，则进行重新下载。

### 内存限制

在 32 位服务器上 Node.js 的内存限制是 0.7 G，而在 64 位服务器上则是 1.4 G，而这个限制主要是因为 Node.js 的垃圾回收线程在超过限制内存时，回收时长循环会大于 1s，从而会影响性能问题。