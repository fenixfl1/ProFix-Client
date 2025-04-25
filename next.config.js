const withTM = require("next-transpile-modules")([
  "@ant-design/icons",
  "@babel/runtime",
  "rc-pagination",
  "rc-util",
  "rc-picker",
  "rc-tree",
  "rc-table",
  "rc-input",
])

const nextConfig = {
  compiler: {
    styledComponents: true,
  },
}

module.exports = withTM(nextConfig)
