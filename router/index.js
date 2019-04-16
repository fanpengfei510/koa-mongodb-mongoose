const Router = require('koa-router')();

module.exports = app => {
  Router.post('/api/post/loginup',require('./user').loginUp)                      // 注册
  Router.post('/api/post/loginin',require('./user').loginIn)                      // 登录

  Router.post('/api/menu/addmenu',require('./menu').add)                          // 添加导添加应用与菜单
  Router.get('/api/get/system/applist',require('./menu').applist)                 // 系统应用与菜单列表

  Router.get('/api/get/project/tabs/:menuId',require('./project').getTabs)           // 获取tabs列表
  Router.get('/api/get/project/list/:tabsId',require('./project').getProject)        // 获取项目列表
  Router.post('/api/post/project/add',require('./project').add)                      // 我的项目，添加项目

  Router.post('/api/post/task/add',require('./task').addTask)
  Router.get('/api/get/task/getlist/:userId',require('./task').list)
  Router.post('/api/post/task/addpersonnel',require('./task').addPersonnel)

  app.use(Router.routes()).use(Router.allowedMethods())
}