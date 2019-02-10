const Router = require('koa-router')();

module.exports = (app) =>{
  Router.post('/signup',require('./user').signup)               // 注册
  Router.post('/signin',require('./user').signin)               // 登陆
  Router.get('/signout',require('./user').signout)              // 退出登陆

  Router.post('/news/publish',require('./posts').publish)       // 发布文章
  Router.get('/news/item',require('./posts').item)              // 显示指定文章内容
  Router.get('/news/list',require('./posts').list)              // 显示所有文章
  Router.post('/news/edit',require('./posts').edit)             // 编辑保存文章
  Router.get('/news/delete',require('./posts').delete)          // 删除文章
  Router.get('/news/typeList',require('./posts').page)          // 根据分类显示文章

  Router.post('/comment/add',require('./comments').add)         // 创建评论
  Router.get('/comment/delete',require('./comments').delete)    // 删除评论

  Router.post('/category/add',require('./category').create)     // 添加分类
  Router.get('/category/list',require('./category').list)       // 分类列表
  app.use(Router.routes()).use(Router.allowedMethods())
}