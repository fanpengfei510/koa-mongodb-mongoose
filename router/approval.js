const ApprovalSchema = require('../models/approval');
const TabsSchema = require('../models/approval/tabs');

module.exports = {
  // 添加请假类型tabs
  async addTabs(ctx,next){
    const { label } = ctx.request.body;
    let result = await TabsSchema.find({label})
    if(!!result.length){
      ctx.body = {
        status : 0,
        msg : '该tabs已存在'
      }
    }else{
      try {
        await TabsSchema.create(ctx.request.body)
        ctx.body = {
          status : 200,
          msg : '创建成功'
        }
      } catch (error) {
        ctx.body = {
          status : 0,
          msg : '创建失败'
        }
      }
    }
  },
  // 发起审批
  async add(ctx,next){
    try {
      await ApprovalSchema.create(ctx.request.body)
      ctx.body = {
        status : 200,
        msg : '发起成功'
      }
    } catch (error) {
      ctx.body = {
        status : 0,
        msg : '发起失败'
      }
    }
  },

  // 审批列表
  async list(ctx,next){
    const { userId,state } = ctx.params;
    let data = await ApprovalSchema.find({userId,state})
    ctx.body = {
      status : 200,
      msg : '查询成功',
      data
    }
  }
}