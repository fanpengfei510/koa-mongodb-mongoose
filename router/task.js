const TaskSchema = require('../models/task');

module.exports = {
  // 添加任务
  async addTask(ctx,next){
    const result = ctx.request.body;
    try {
      await TaskSchema.create(result).catch(err=>{
        ctx.throw(500,err)
      })
      ctx.body = {
        status : 200,
        msg : '任务创建成功'
      }
    } catch (error) {
      ctx.body = {
        status : 0,
        msg : '任务创建失败'
      }
    }
  },
  // 获取任务列表
  async list(ctx,next){
    const userId = ctx.params.userId;
    const data = await TaskSchema.find({userId : {$all : [userId]}});
    ctx.body = {
      status : 200,
      msg : '查询成功',
      data
    }
  },

  // 添加人员
  async addPersonnel(ctx,next){
    const { taskId,userId } = ctx.request.body;
    const result = await TaskSchema.find({userId : {$all : [userId]}})
    if(!!result.length){
      ctx.body = {
        status : 500,
        msg : '添加失败,成员已在项目中'
      }
    }else{
      const data = await TaskSchema.updateOne({_id:taskId},{$push : {userId}})
      if(data.ok == 1){
        ctx.body = {
          status : 200,
          msg : '添加人员成功'
        }
      }else{
        ctx.body = {
          status : 0,
          msg : '添加失败'
        }
      }
    }
  }
}