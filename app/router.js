'use strict';
/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller,middleware } = app;
  const auth = middleware.role();
  router.post('/api/login', controller.login.index);
  router.post('/api/loginup', controller.login.loginUp);
  router.get('/api/outlogin', controller.login.outLogin);
  router.get('/api/getList', controller.list.getList);
  router.get('/api/details', controller.list.details);

  router.post('/api/comments',auth, controller.comments.send);

  router.get('/api/role', controller.role.findAll);
  router.post('/api/role/create', controller.role.create);

  router.post(`/api/addpost`,auth, controller.list.addPost);
  router.get('/api/mypost',auth, controller.list.myPost);

  router.post('/api/addtag',auth, controller.tag.addTag);
  router.get('/api/listtag', controller.tag.listTag);
};
