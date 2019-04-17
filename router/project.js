const MyProject = require('../models/project/myProject');
const Tabs = require('../models/project/tabs');

module.exports = {
  // 根据菜单id，获取tabs列表
  async getTabs(ctx,next){
    let menuId = ctx.params.menuId;
    if(menuId){
      let result = await Tabs.find({menuId});
      ctx.body = {
        data : result,
        firstId : result[0].id
      };
    }else{
      let tabs = await Tabs.find();
      ctx.body = tabs;
    }
  },

  // 添加项目
  async add(ctx,next){
    let { title } = ctx.request.body;
    let result = await MyProject.find({title})
    if(!!result.length){
      ctx.body = {
        status : 0,
        msg : '该项目已存在'
      }
    }else{
      try {
        await MyProject.create(ctx.request.body)
        ctx.body = {
          status : 200,
          msg : '项目创建成功'
        }
      } catch (error) {
        ctx.body = {
          status : 0,
          msg : '项目创建失败'
        }
      }
    }
  },

  // 根据tabsid，获取项目列表
  async getProject(ctx,next){
    let tabsId = ctx.params.tabsId;
    let result = await MyProject.find({tabsId})
    ctx.body = {
      status : 200,
      msg : '获取成功',
      data : result
    };
  }
}