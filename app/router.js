'use strict';
/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.post('/api/login', controller.login.index);
  router.post('/api/loginup', controller.login.loginUp);
  router.get('/api/outlogin', controller.login.outLogin);
  router.get('/api/getList', controller.list.getList);
  router.get('/api/details', controller.list.details);

  router.post('/api/comments', controller.comments.send);

  router.post(`/api/addpost`, controller.list.addPost);
  router.get('/api/mypost', controller.list.myPost);

  router.post('/api/addtag', controller.tag.addTag);
  router.get('/api/listtag', controller.tag.listTag);
};
