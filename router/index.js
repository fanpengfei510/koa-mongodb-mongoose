const Router = require('koa-router')();

module.exports = app => {
  Router.post('/api/post/loginup',require('./user').loginUp)                      // 注册
  Router.post('/api/post/loginin',require('./user').loginIn)                      // 登录
  Router.get('/api/get/user',require('./user').userList)                  // 所有用户信息

  Router.post('/api/menu/addmenu',require('./menu').add)                          // 添加导添加应用与菜单
  Router.get('/api/get/system/applist',require('./menu').applist)                 // 系统应用与菜单列表

  Router.get('/api/get/project/tabs/:menuId',require('./project').getTabs)           // 获取tabs列表
  Router.get('/api/get/project/list/:tabsId',require('./project').getProject)        // 获取项目列表
  Router.post('/api/post/project/add',require('./project').add)                      // 我的项目，添加项目

  Router.post('/api/post/task/add',require('./task').addTask)                     // 添加任务
  Router.get('/api/get/task/getlist/:userId',require('./task').list)              // 任务列表

  Router.post('/api/post/approval/tabs',require('./approval').addTabs)
  Router.post('/api/post/approval/add',require('./approval').add)
  Router.get('/api/get/approval/list/:userId/:state',require('./approval').list)

  Router.post('/api/post/file/upload',require('./fileupload').fileUpload)

  app.use(Router.routes()).use(Router.allowedMethods())
}