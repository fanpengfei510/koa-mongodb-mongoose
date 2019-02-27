const Router = require('koa-router')();

module.exports = app => {
  Router.post('/api/user/loginup',require('./user').loginUp)                      // 注册
  Router.post('/api/user/loginin',require('./user').loginIn)                      // 登录
  Router.post('/api/menu/addmenu',require('./menu').addMenu)                      // 添加导航与子菜单
  Router.post('/api/project/addtabs',require('./project').addtabs)                // 我的项目，tabs标签
  Router.post('/api/project/addproject',require('./project').addProject)          // 我的项目，添加项目

  Router.get('/api/project/tabsList',require('./project').tabsList)                // 
  app.use(Router.routes()).use(Router.allowedMethods())
}