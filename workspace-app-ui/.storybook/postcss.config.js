module.exports = {
    modules: true,
    plugins: [
      require('postcss-flexbugs-fixes'),
      require('postcss-preset-env'),
      require("postcss-nested"),
      require("postcss-import"),
      require("postcss-normalize"),
      require("postcss-mixins"),
      require("postcss-nested"),
      require("postcss-responsive-type"),
      require('postcss-font-magician'),
    ]
}
