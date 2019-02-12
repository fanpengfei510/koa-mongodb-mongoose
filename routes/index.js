const Router = require('koa-router')();

module.exports = (app) =>{
  Router.post('/api/user',require('./user').user);

  app.use(Router.routes()).use(Router.allowedMethods())
}