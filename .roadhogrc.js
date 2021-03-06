export default {
  "entry": "src/index.js",
  "env": {
    "development": {
      "extraBabelPlugins": [
        "dva-hmr",
        "transform-runtime",
        [
          "import",
          {
            "libraryName": "antd-mobile",
            "style": "css"
          }
        ]
      ]
    },
    "production": {
      "extraBabelPlugins": [
        "transform-runtime",
        [
          "import",
          {
            "libraryName": "antd-mobile",
            "style": "css"
          }
        ]
      ]
    }
  },
  "proxy": {
    "/api": {
      "target": "https://cnodejs.org/api/v1",
      "changeOrigin": true,
      "pathRewrite": { "^/api" : "" }
    }
  },
  "define": {
    "API_ENV": process.env.API_ENV
  }
}
