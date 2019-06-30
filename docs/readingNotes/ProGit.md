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


