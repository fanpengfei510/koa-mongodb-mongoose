/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1558401155234_3172';

  // add your middleware config here
  config.middleware = [];

  config.mongoose = {
    client : {
      url : 'mongodb://localhost:27017/blog',
      options : {
        useNewUrlParser: true
      }
    }
  }
  config.security = {
    csrf : {
      enable : false
    }
  }
  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
