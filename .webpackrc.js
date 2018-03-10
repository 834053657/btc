export default {
  'entry': 'src/index.js',
  'extraBabelPlugins': [
    'transform-decorators-legacy',
    [
      'import',
      {
        'libraryName': 'antd',
        'libraryDirectory': 'es',
        'style': true,
      },
    ],
  ],
  'define': {
    '__DEV__': false,
    '__PROD__': true,
    '__KG_API_ENV__': process.env.KG_API_ENV,
    '__KG_DATATIME__': (new Date()).toLocaleString(),
  },
  'env': {
    'development': {
      'extraBabelPlugins': [
        'dva-hmr',
      ],
      'define': {
        '__DEV__': true,
        '__PROD__': false,
        '__KG_API_ENV__': process.env.KG_API_ENV,
        '__KG_DATATIME__': (new Date()).toLocaleString(),
      },
    },
    "production": {
      // "extraBabelPlugins": [
      //   "transform-runtime",
      //   "transform-decorators-legacy",
      //   ["import", { "libraryName": "antd", "style": true }]
      // ],
      "define": {
        "__DEV__": false,
        "__PROD__": true,
        '__KG_API_ENV__': process.env.KG_API_ENV,
        '__KG_DATATIME__': (new Date()).toLocaleString(),
      }
    }
  },
  'ignoreMomentLocale': true,
  'theme': './src/theme.js',
  'html': {
    'template': './src/index.ejs',
  },
  'publicPath': '/',
  //  "disableDynamicImport": true,
  'hash': true,
};

// export default conifg;
