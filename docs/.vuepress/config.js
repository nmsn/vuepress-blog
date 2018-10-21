module.exports = {
  title: "NMSN",
  description: 'Somebody has to win, so why not be me?',
  head: [
    ['link', { rel: 'icon', href: `/favicon.ico` }],
  ],
  themeConfig: {
    // sidebar: 'auto',
    nav: [
      { text: '主页', link: '/' },
      { text: '技术', link: '/tech/' },
      { text: '计划', link: '/plan/' },
    ],
    lastUpdated: 'Last Updated',
    sidebar: {
      '/tech/': genSidebarConfig('技术')
    },
    // sidebar: {
    //   '/tech/':[
    //     'Markdown',
    //     'test2'
    //     // 'README',
    //   ],
    // },
    repo: 'nmsn',
    // 自定义项目仓库链接文字
    // 默认根据 `themeConfig.repo` 中的 URL 来自动匹配是 "GitHub"/"GitLab"/"Bitbucket" 中的哪个，如果不设置时是 "Source"。
    repoLabel: 'Github',
  }
}

function genSidebarConfig(title) {
  return [{
    title,
    collapsable: false,
    children: [
      '',
      'Markdown',
      'Console',
    ]
  }]
}