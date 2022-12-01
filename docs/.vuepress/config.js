module.exports = (_ctx) => ({
  sourceDir: 'docs',
  dest: 'docs/dist',
  base: process.env.CI ? '/bitkeep-docs/' : '/',

  locales: {
    '/guide/': {
      lang: 'en-US',
      title: 'BitKeep Docs',
      description: 'Developer documentation for BitKeep Wallet',
    },
    '/guide/zh-cn/': {
      lang: 'zh-CN',
      title: 'BitKeep 文档',
      description: 'BitKeep 钱包开发者文档'
    }
  },

  head: [
    ['link', { rel: 'icon', href: `/bitkeep-icon.svg` }],
    ['link', { rel: 'manifest', href: '/manifest.json' }],
    ['meta', { name: 'theme-color', content: '#7524F9' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    [
      'meta',
      { name: 'apple-mobile-web-app-status-bar-style', content: 'black' },
    ],
    [
      'link',
      { rel: 'apple-touch-icon', href: `/icons/apple-touch-icon-152x152.png` },
    ],
    [
      'link',
      {
        rel: 'mask-icon',
        href: '/icons/safari-pinned-tab.svg',
        color: '#3eaf7c',
      },
    ],
    [
      'link',
      {
        rel: 'shortcut icon',
        href: '/bitkeep-icon.svg',
        color: '#3eaf7c',
        type: 'image/x-icon'
      },
    ],
    [
      'meta',
      {
        name: 'msapplication-TileImage',
        content: '/icons/msapplication-icon-144x144.png',
      },
    ],
    ['meta', { name: 'msapplication-TileColor', content: '#000000' }],
    ['script', { src:"/js/extend.js" }],
  ],

  theme: '@vuepress/theme-default',

  themeConfig: {
    repo: 'bitkeepwallet/docs',
    docsDir: 'docs',
    docsBranch: 'main',
    editLinks: true,
    logo: '/bitkeep-icon.svg',
    smoothScroll: true,
    sidebarDepth:5,
    algolia: {
      apiKey: process.env.ALGOLIA_API_KEY,
      indexName: process.env.ALGOLIA_INDEX_NAME,
    },
    locales: {
      '/guide/': {
        label: 'English',
        selectText: 'Languages',
        editLinkText: 'Edit this page on GitHub',
        lastUpdated: 'Last Updated',
        nav: require('./nav/en'),
        sidebar: {
          '/guide/': [
            {
              title: 'Guide',
              collapsable: false,
              children: [
                ''
              ]
            },
            {
              title: 'DApp Development',
              collapsable: false,
              children: [
                {
                  title: "Extension Wallet",
                  collapsable: false,
                  children:[
                    "wallet/introduction",
                    "wallet/quickly",
                    "wallet/ethereum",
                    "wallet/solana",
                    "wallet/tron",
                    "wallet/aptos",
                    "wallet/bitkeep",
                    "wallet/faq"
                  ]
                },
                {
                  title: "Mobile",
                  collapsable: false,
                  children:[
                    'mobile/walletconnet',
                    'mobile/Deeplink',
                    'mobile/switch-network-for-dapp',
                    'mobile/webview-function'
                  ]
                }
              ]
            },
            {
              title: 'Resources',
              collapsable: false,
              children: [
                'resources'
              ]
            }
          ]
        }
      },
      '/guide/zh-cn/': {
        label: '简体中文',
        selectText: '选择语言',
        editLinkText: '在 GitHub 上编辑',
        lastUpdated: '最后更新',
        nav: require('./nav/zh-cn'),
        sidebar: {
          '/guide/zh-cn/': [
            {
              title: '手册',
              collapsable: false,
              children: [
                ''
              ]
            },
            {
              title: 'DApp 开发',
              collapsable: false,
              children: [
                {
                  title: "插件钱包",
                  collapsable: false,
                  children:[
                    "wallet/introduction",
                    "wallet/quickly",
                    "wallet/ethereum",
                    "wallet/solana",
                    "wallet/tron",
                    "wallet/aptos",
                    "wallet/bitkeep",
                    "wallet/faq"
                  ]
                },
                {
                  title: "移动端",
                  collapsable: false,
                  children:[
                    'mobile/walletconnet',
                    'mobile/Deeplink',
                    'mobile/switch-network-for-dapp',
                    'mobile/webview-function'
                  ]
                }
              ]
            },
            {
              title: '资源',
              collapsable: false,
              children: [
                'resources'
              ]
            }
          ]
        }
      }
    }
  },

  plugins: [
    ['@vuepress/back-to-top', false],
    [
      '@vuepress/pwa',
      {
        serviceWorker: false,
        popupComponent: 'MySWUpdatePopup',
        updatePopup: true,
      },
    ],
    ['@vuepress/medium-zoom', true],
    [
      'container',
      {
        type: 'vue',
        before: '<pre class="vue-container"><code>',
        after: '</code></pre>',
      },
    ],
    [
      'container',
      {
        type: 'upgrade',
        before: (info) => `<UpgradePath title="${info}">`,
        after: '</UpgradePath>',
      },
    ],
    [
      'vuepress-plugin-redirect',
      {
        redirectors: [
          {
            base: '/',
            alternative: '/guide',
          }
        ]
      }
    ],
    [
      'tabs',
      {
        useUrlFragment: false,
      },
    ],
    ['vuepress-plugin-code-copy', true]
  ],

  extraWatchFiles: ['.vuepress/nav/en.js'],
  markdown:{
    lineNumbers:true
  }
});
