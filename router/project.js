const MyProjectAddTabs = require('../models/project/myProjectAddTabs');
const MyProject = require('../models/project/myProject');
const Tabs = require('../models/project/tabs');
const Menu = require('../models/menu');

module.exports = {
  async addtabs(ctx,next){
    let { title } = ctx.request.body;
    let tabTitle = await Tabs.find({title})
    if(!!tabTitle.length){
      ctx.body = {
        status : 0,
        msg : '标签已存在'
      }
    }else{
      try {
        await Tabs.create(ctx.request.body).catch(err=>{
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
    }
  },
  async myProject(ctx,next){
    let { projectName } = ctx.request.body;
    let project = await MyProject.find({projectName})
    if(!!project.length){
      ctx.body = {
        status : 0,
        msg : '该项目已存在'
      }
    }else{
      try {
        await MyProject.create(ctx.request.body).catch(err=>{
          ctx.thorw(500,err)
        })
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
  async getProject(ctx,next){
    let { projectName,id } = ctx.request.body;
    if(id && id.length == 2){
      try {
        let data = await MyProject.aggregate([
          {
            $match : {id : {$all : id}}
          },
          {
            $project : {
              id : 0,
              __v : 0
            }
          }
        ],(err,data)=>{
          ctx.body = {
            status : 200,
            data
          }
        });
        ctx.body = {
          status : 200,
          data
        }
      } catch (error) {
        
      }
    }else{
      ctx.body = {
        status : 0,
        msg : '缺少id'
      }
    }
  }
}