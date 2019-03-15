const MyProjectAddTabs = require('../models/project/myProjectAddTabs');
const MyProjectAddProject = require('../models/project/myProjectAddProject');
const Menu = require('../models/menu');

module.exports = {
  async addtabs(ctx,next){
    let { title } = ctx.request.body;  
    let tabTitle = await MyProjectAddTabs.find({title})
    if(!!tabTitle.length){
      try {
        await MyProjectAddTabs.create(ctx.request.body).catch(err=>{
          ctx.thorw(500,err)
        })
        ctx.body = {
          status : 200,
          msg : '创建标签成功'
        }
      } catch (error) {
        ctx.body = {
          status : 0,
          msg : '创建失败'
        }
      }
    }else{
      ctx.body = {
        status : 0,
        msg : '标签已存在'
      }
    }
  },
  async addProject(ctx,next){
    try {
      await MyProjectAddProject.create(ctx.request.body)
      ctx.body = {
        status : 200,
      }
    } catch (error) {
      ctx.body = {
        status : 0
      }
    }
  },
  async getMenuList(ctx,next){
    try {
      let data = await Menu.find({});
      ctx.body = {
        status : 200,
        data
      }
    } catch (error) {
      ctx.renderError('失败')
    }
  }
}