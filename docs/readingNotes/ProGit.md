# ProGit

## 起步

### 初次运行Git前的配置

#### 用户信息

```bash
git config --global user.name xxx
git config --global user.email xxx
```

如果使用了`--global`，那么该命令只需要运行一次，因为之后无论你在该系统上做任何事情，Git都会使用那些信息。当你想针对特定项目使用不同的用户名称和邮件地址时，可以在那个项目目录下运行没有`--global`选项的命令来配置

#### 检查配置信息

git config --list

列出所有Git当时能找到的配置

你可能会看到重复的变量名，因为Git会从不同的文件同读取同一个配置。这种情况下，Git会使用它找到的每一个变量的最后一个配置

git config `<key>` 来检查Git的某一项配置

### 记录每次更新到仓库

#### 状态简览

git status -s/--short

#### 跳过使用暂存区域

git commit -a

#### 移除文件

git rm

git rm 命令后面可以列出文件或者目录的名字，也可以使用glob模式

#### 移动文件

git mv

可用来重命名

### 查看提交历史

git log

git log -p 用来显示每次提交的内容差异

git log -stat 每次提交的简略统计信息

#### 限制输出长度

git log -`<n>` 表示仅显示最近的若干条提交

--since/after

--until/before

--author 显示指定作者的提交

--grep 搜索提交说明中的关键字

### 撤销操作

git commit --amend

这个命令会将暂存区中的文件提交。如果自上次提交以来你还未做任何修改，那么快照会保持不变。而你所修改的只是提交信息

#### 取消暂存文件

git reset HEAD `<file>`

#### 撤销对文件的修改

git checkout -- `<file>`

### 远程仓库的使用

#### 查看远程仓库

git remote -v 显示远程仓库使用的Git保存的简写与其对应的URL

#### 添加远程仓库

git remote add `<shortname>` url 添加一个新的远程Git仓库，同时指定一个你可以轻松引用的简写

#### 从远程仓库中抓取与拉取

git fetch [remote-name]

git pull

#### 推送到远程仓库

git push origin master

#### 查看远程仓库

git remote show [remote-name]

#### 远程仓库的移除与重命名

git remote rename [old_name] [new_name]

git remote rm [remote-name]

### 打标签

git tag

#### 创建标签

Git使用两种主要类型的标签: 轻量标签与附注标签

#### 附注标签

git tag -a [tag] -m [message]

#### 轻量标签

git tag [message]

#### 后期打标签

git tag -a [tag] [hash]

#### 共享标签

git push origin [tag]

一次性推送多个标签

git push --tags

#### 检出标签

git checkout -b [branchname] [tag]

### Git别名

Git 并不会在你输入部分命令时自动推断出你想要的命令。如果不想每次都输入完整的 Git 命令，可以通过 git
config 文件来轻松地为每一个命令设置一个别名

例如:

```bash
git config --global alias.co checkout
git config --global alias.br branch
git config --global alias.ci commit
git config --global alias.st status
```

## Git分支

### 分支简介

#### 分支创建

git branch [branch-name]

#### 分支切换

git checkout [branch-name]

### 分支的新建与合并

#### 新建分支

git checkout -b [new_branch]

新建一个分支并同时切换到那个分支上

等于

git branch [new_branch]
git checkout [new_branch]

git merge --no-ff

git branch -d

#### 分支的合并

需要指出的是，Git会自行决定选区哪一个提交作为最优的共同祖先，并以此作为合并的基础

#### 遇到冲突时的分支合并

### 分支管理

git branch -v --merged | --no-merged

### 分支开发工作流

#### 长期分支

#### 特性分支

### 远程分支

#### 推送

git push

#### 跟踪分支

git checkout --track origin/xxx

git checkou -b xx origin/xxx

git branch -u origin/xxx

#### 拉取

git fetch  get merge

git pull

#### 删除远程分支

git push origin --delete [branch_name]

### 变基

#### 变基的基本操作

git checkout [current_branch]

git rebase [target_branch]

#### 更有趣的变基例子

git rebase --onto [target_branch] [mid_branch] [current_branch]

#### 变基的风险

不要对在你的仓库外有副本的分支执行变基

### 用变基解决变基

## 服务器上的Git

### 协议

#### 本地协议

git clone /xxx/xxx.git

git clone file:///xxx/xxx.git

git remote add

#### HTTP协议

#### SSH协议

#### Git协议

### 在服务器上搭建Git

### 生成SSH公钥

默认情况下，用户的ssh密钥存储在其~/.ssh目录下

ssh-keygen

## 分布式Git

### 维护项目

#### 生成一个构建号

如果你想为提交附上一个可读的名称，可以对其运行git describe命令

Git将会给胡一个字符串，它由最近的标签名、自该标签之后的提交数目和你所描述的提交的部分SHA-1值构成

## Git工具

### 选择修订版本

#### 简短的SHA-1

Git 十分智能，你只需要提供 SHA-1 的前几个字符就可以获得对应的那次提交，当然你提供的 SHA-1 字符数量不得少于 4 个，并且没有歧义——也就是说，当前仓库中只有一个对象以这段 SHA-1 开头

#### 引用日志

git reflog 查看引用日志

git log -g 查看类似git log输出格式的引用日志信息

值得注意的是，引用日志只存在于本地仓库，一个记录你在你自己的仓库里做过什么的日志。
其他人拷贝的仓库里的引用日志不会和你的相同；而你新克隆一个仓库的时候，引用日志是空的，因为你在仓库里还没有操作。

#### 祖先引用

HEAD^

HEAD~

#### 提交区间

##### 双点

git log branch_A..branch_B 显示在A分之中而不在B中的提交

##### 多点

Git 允许你在任意引用前加上 ^ 字符或者 --not 来指明你不希望提交被包含其中的分支

git log refA refB ^refC
git log refA refB --not refC

### 交互式暂存

git add -i

### 储藏与清理

git stash

git stash apply 如果不指定储藏，Git认为指定的是最近的储藏

git stash drop 移除贮藏

git stash pop 应用贮藏并删除记录

### 搜索

git grep

从提交历史或者工作目录中查找一个字符串或者正则表达式

### 重写历史

#### 修改最后一次提交

git commit --amend 修改最后一次提交的提交信息

#### 修改多个提交信息

git rebase -i HEAD~n

交互式变基

##### 重新排序提交

##### 压缩提交

使用squash选项

##### 拆分提交

使用edit选项

##### 核武器级选项: filter-branch

### 重置揭秘

#### 三棵树

|树|用途|
|---|---|
|HEAD|上一次提交的快照，下一次提交的父结点|
|Index|预期的下一次提交的快照|
|Working Directory|沙盒|

#### HEAD

HEAD是当前分支引用的指针，它总是指向该分支上的最后一次提交，这表示HEAD将是下一次提交的父结点

通常，理解HEAD的最简方式，就是将它看作你的上一次提交的快照

##### 索引

索引是你的预期的下一次提交。我们也会将这个概念引用为Git的“暂存区域”，这就是当你运行git commit时Git看起来的样子

Git将上一次检出到工作目录中的所有文件填充到索引去，它们看起来就像最初被检出时的样子

##### 工作目录

另外两颗树以一种高效但并不直观的方式，将它们的内容存储在.git文件夹中。工作目录会将他们解包为实际的文件以便编辑

##### 重置的作用

### 高级合并

#### 合并冲突

##### 中断一次合并

git merge --abort

#### 撤销合并

##### 修复引用

git reset --hard HEAD~

这种方法的缺点是它会重写历史，在一个共享的仓库中这会造成问题

##### 还原提交

git revert -m 1 HEAD

-m 1 标记指出"mainline"需要被保留下来的父节点

#### 其他类型的合并

到目前为止我们介绍的都是通过一个叫做"recursive"的合并策略来正常处理的两个分支的正常合并

##### 我们的或者他们的偏好

默认情况下，当Git看到两个分支合并中的冲突时，它会将合并冲突标记添加到你的代码中并标记文件为冲突状态来让你解决。如果你希望Git简单地选择特定的一边并忽略另外一边而不是让你手动合并冲突，你可以传递给merge命令一个 -Xours或-Xtheirs参数

如果 Git 看到这个，它并不会增加冲突标记。任何可以合并的区别，它会直接合并。任何有冲突的区别，它会简单地选择你全局指定的一边，包括二进制文件

##### 子树合并

### Rerere

git rerere功能是一个隐藏的功能。正如它的名字 “reuse recorded resolution” 所指，它允许你让Git记住解决一个块冲突的方法，这样在下一次看到相同冲突时，Git 可以为你自动地解决它

为了启用rerere功能，仅仅需要运行这个配置选项：

git config --global rerere.enabled true

### 使用Git调试

git blame 查看文件每一行的最后修改时间以及是被谁修改的

-L 选项来限制输出返回在 m,n行之间