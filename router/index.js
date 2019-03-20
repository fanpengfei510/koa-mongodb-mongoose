const Router = require('koa-router')();

module.exports = app => {
  Router.post('/api/user/loginup',require('./user').loginUp)                      // 注册
  Router.post('/api/user/loginin',require('./user').loginIn)                      // 登录
  Router.post('/api/menu/addmenu',require('./menu').addMenu)                      // 添加导航与子菜单
  Router.post('/api/project/addtabs',require('./project').addtabs)                // 我的项目，tabs标签
  Router.post('/api/project/addproject',require('./project').myProject)           // 我的项目，添加项目

  Router.post('/api/project/getProject',require('./project').getProject)                   // 菜单列表
  app.use(Router.routes()).use(Router.allowedMethods())
}