#!/usr/bin/env sh

# 终止一个错误
set -e

# 构建
yarn run docs:build

# 进入生成的构建文件夹
cd docs/.vuepress/dist

# 如果你是要部署到自定义域名
echo 'blog.nmsn.site' > CNAME

git init
git add -A
git commit -m 'deploy'

# 如果你想要部署到 https://<USERNAME>.github.io
git push -f git@github.com:nmsn/nmsn.github.io.git master

# 如果你想要部署到 https://<USERNAME>.github.io/<REPO>
# git push -f git@github.com:<USERNAME>/<REPO>.git master:gh-pages

# push source code to remote
cd ../../../

git add -A
git commit -m 'update'
git push git@github.com:nmsn/vuepress-blog.git master

cd -

