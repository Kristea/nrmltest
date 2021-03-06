
export default {
  mode: 'universal',
  target: 'static',
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~/plugins/components',
    '~/plugins/filters'
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
      // Doc: https://buefy.github.io/#/documentation
      // 'nuxt-buefy',
      '@nuxtjs/pwa',
      // Doc: https://github.com/nuxt/content
      '@nuxt/content',
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/markdownit'
  ],
  markdownit: {
    injected: true,
  },
  /*
  ** Content module configuration
  ** See https://content.nuxtjs.org/configuration
  */
 content: {
  dir: 'assets/content'
 },
 buefy: {
   'materialDesignIcons': false
 },
  /*
  ** Build configuration
  */
  build: {
    analyze: true,
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  },
  generate: {
    routes: function() {
      const fs = require('fs');
      const path = require('path');
      let blogRoutes = fs.readdirSync('./assets/content/blog').map(file => {
        return {
          route: `/blog/${path.parse(file).name}`, // Return the slug
          payload: require(`./assets/content/blog/${file}`),
        };
      });

      let pageRoutes = fs.readdirSync('./assets/content/pages').map(file => {
        return {
          route: `/${path.parse(file).name}`, // Return the slug
          payload: require(`./assets/content/pages/${file}`),
        };
      });

      let homePageRoute = {
        route: `/`, // Return the slug
        payload: require(`./assets/content/pages/Home.json`),
      }

      return blogRoutes.concat(pageRoutes, homePageRoute)
    },
  },
}
