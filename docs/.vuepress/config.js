module.exports = {
  title: "NMSN",
  description: 'Somebody has to win, so why not be me?',
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['script', {}, mountBaiduAnalytics()],
    ['script', { aysnc: true, src: 'https://www.googletagmanager.com/gtag/js?id=UA-127895888-1' }],
    ['script', {}, mountGoogleAnalytics()],
  ],
  themeConfig: {
    // sidebar: 'auto',
    nav: [
      { text: '主页', link: '/' },
      { text: '技术总结', link: '/tech/' },
      { text: '笔记', link: '/notes/' },
      { text: '计划', link: '/plan/' },
    ],
    lastUpdated: 'Last Updated',
    sidebar: {
      '/tech/': genSidebarConfig('技术总结'),
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
    ga: 'UA-127895888-1',
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
      'Git',
      'RegEx',
      'MongoDB',
      'addEventListener',
    ]
  }]
}

function mountBaiduAnalytics() {
  return `
  var _hmt = _hmt || [];
  (function() {
    var hm = document.createElement("script");
    hm.src = "https://hm.baidu.com/hm.js?6594ba1364804631f0a8fd4452766fed";
    var s = document.getElementsByTagName("script")[0]; 
    s.parentNode.insertBefore(hm, s);
  })();
  `;
}

function mountGoogleAnalytics() {
  return `
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'UA-127895888-1');
  `;
}

