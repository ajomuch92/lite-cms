module.exports = {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
    './node_modules/vue-tailwind-elements/**/*.{js,ts,vue}'
  ],
  theme: {
    extend: {}
  },
  plugins: [
    require('tw-elements/dist/plugin')
  ]
}
