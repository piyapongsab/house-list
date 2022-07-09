const { version } = require('./package.json')

process.env.VUE_APP_VERSION = version

module.exports = {
  transpileDependencies: [
    'vuetify',
  ],
};
