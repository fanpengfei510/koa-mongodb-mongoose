const router = require('koa-router')();

module.exports = (app) => {
  router.post('/api/post/user',require('./user').user);      // 用户
  router.post('/api/post/login',require('./user').login);     // 登录

  router.post('/api/post/news',require('./post').post)        // 文章发布
  router.get('/api/post/news',require('./post').postItem) // 文章详情
  router.get('/api/post/list',require('./post').list)         // 所有文章列表
  router.post('/api/post/edit',require('./post').postEdit)    // 编辑文章

  app.use(router.routes()).use(router.allowedMethods())
}