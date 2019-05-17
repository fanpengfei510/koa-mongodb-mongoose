const router = require('koa-router')();

async function isLogin(ctx,next){
  console.log(!ctx.session.user)
  if(!ctx.session.user){
    return ctx.response.body = {
      status : 401,
      msg : "未登录，请登录"
    }
  }
  await next()
}

module.exports = (app) => {
  router.post('/api/post/user',require('./user').user);               // 用户
  router.post('/api/post/login',require('./user').login);             // 登录
  router.get('/api/post/out',require('./user').outLogin);             // 退出登录

  router.post('/api/post/news',isLogin,require('./post').post)        // 文章发布
  router.get('/api/post/details',require('./post').postItem)          // 文章详情
  router.get('/api/post/list',require('./post').list)                 // 所有文章列表
  router.post('/api/post/edit',require('./post').postEdit)            // 编辑文章
  
  router.post('/api/post/comments/news',isLogin,require('./comments').post)            // 发布评论
  router.post('/api/post/comments/delete',isLogin,require('./comments').delete)        // 删除评论
  app.use(router.routes()).use(router.allowedMethods())
}