module.exports = {
  title: "NMSN",
  description: 'Somebody has to win, so why not be me?',
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['script', {}, mountBaiduAnalytics()],
    ['script', { aysnc: true, src: 'https://www.googletagmanager.com/gtag/js?id=UA-127895888-1' }],
    ['script', {}, mountGoogleAnalytics()],
  ],
  locales: {
    '/': {
      lang: 'zh-CN',
    },
  },
  themeConfig: {
    nav: [
      // { text: '主页', link: '/' },
      { text: '快查总结', link: '/tech/' },
      { text: '摘录', link: '/excerpt/' },
      { text: '面试题', link: '/interviewQuestions/' },
      { text: '读书笔记', link: '/readingNotes/' },
      { text: '工作总结', link: '/work/' },
      // { text: '计划', link: '/plan/' },
    ],
    lastUpdated: 'Last Updated',
    sidebar: {
      '/tech/': [
          {
          title: '快查总结',
          collapsable: false,
          children: [
            // '',
            'Markdown',
            'Console',
            'Git',
            'RegEx',
            'Github',
            'JS继承',
            '前端性能优化之雅虎35条军规',
            '排序算法',
            '代码实现',
            'ES6',
          ]
        },
      ],
      '/readingNotes/': [
        {
        title: '读书笔记',
        collapsable: false,
        children: [
          // '',
          'Linux',
          '了不起的Nodejs',
          '深入浅出Nodejs',
          '代码整洁之道',
          'HTTP权威指南',
          'ProGit',
        ]
      },
      ],
      '/interviewQuestions/': [
        {
        title: '面试题',
        collapsable: false,
        children: [
          // '',
          'HTML',
          'CSS',
          'JS',
          'Network',
          '浏览器',
          'React',
          'Vue',
          'Webpack',
          '设计模式',
        ]
      },
      ],
      '/work/': [
        {
        title: '工作总结',
        collapsable: false,
        children: [
          // '',
          'axios取消请求',
          'axios文件处理',
          'fetch',
          'dsBridge',
          '前端水印生成方案',
          '移动端适配',
          'bug解决方案',
          'sass和less',
          '公祭日灰色效果',
        ]
      },
      ],
    },
    repo: 'nmsn',
    // 自定义项目仓库链接文字
    // 默认根据 `themeConfig.repo` 中的 URL 来自动匹配是 "GitHub"/"GitLab"/"Bitbucket" 中的哪个，如果不设置时是 "Source"。
    repoLabel: 'Github',
    ga: 'UA-127895888-1',
  },
  plugins: {
    '@vuepress/active-header-links': {},
    '@vuepress/back-to-top': {},
    '@vssue/vuepress-plugin-vssue': {
      // 设置 `platform` 而不是 `api`
      platform: 'github-v4',
      // 其他的 Vssue 配置
      owner: 'nmsn',
      repo: 'blog-comments',
      clientId: '233b22bf00c6bf0029e8',
      clientSecret: 'a26bdb297de9c860c0f7515cb56f91d4a9534354',
      autoCreateIssue: true,
    },
  }
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

