# 构建
yarn run docs:build

# 进入生成的构建文件夹
cd docs/.vuepress/dist

# 如果你是要部署到自定义域名
echo 'nmsn.site' > CNAME

git init
git add -A
git commit -m 'deploy'

# 如果你想要部署到 https://<USERNAME>.github.io
git push -f $GITHUB_TOKEN@github.com:nmsn/nmsn.github.io.git master