const Router = require('koa-router')();

module.exports = (app) =>{
  Router.post('/signup',require('./user').signup)
  Router.post('/signin',require('./user').signin)
  Router.get('/signout',require('./user').signout)

  Router.post('/post',require('./posts').indexe)
  Router.get('/show',require('./posts').show)
  Router.get('/getList',require('./posts').showList)
  Router.post('/edit',require('./posts').edit)
  Router.get('/delete',require('./posts').delete)

  Router.post('/comment',require('./comments').create)
  Router.get('/deleteComment',require('./comments').delete)
  app.use(Router.routes()).use(Router.allowedMethods())
}