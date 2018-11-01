module.exports = {
  title: "NMSN",
  description: 'Somebody has to win, so why not be me?',
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['script', {}, mountAliMonitoring()],
    ['script', {}, mountBaiduAnalytics()],
    ['script', { aysnc: true, src: 'https://www.googletagmanager.com/gtag/js?id=UA-127895888-1' }],
    ['script', {}, mountGoogleAnalytics()],
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

function mountAliMonitoring() {
  return `
  !(function(c,b,d,a){c[a]||(c[a]={});c[a].config={pid:"de5i8y5c56@2e3a6c0c5764760",imgUrl:"https://arms-retcode.aliyuncs.com/r.png?",enableSPA:true,useFmp:true,sendResource:true};
  with(b)with(body)with(insertBefore(createElement("script"),firstChild))setAttribute("crossorigin","",src=d)
  })(window,document,"https://retcode.alicdn.com/retcode/bl.js","__bl");
  `;
}

