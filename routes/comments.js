const CommentsModel = require('../models/comment');

module.exports = {
  async create(ctx,next){
    const comment = Object.assign(ctx.request.body,{
      from : ctx.session.user._id
    })
    await CommentsModel.create(comment)
    ctx.body = {
      state : 200,
      msg : '评论成功'
    }
  },
  async delete(ctx,next){
    let id = ctx.request.query.id;
    const comment = await CommentsModel.findById(id)
    if(!comment){
      ctx.body = {
        state : 0,
        msg : '留言不存在'
      }
    }
    if(comment.from.toString() !== ctx.session.user._id.toString()){
      ctx.body = {
        state : 0,
        msg : '没有权限'
      }
    }
    await CommentsModel.findByIdAndRemove(id)
    ctx.body = {
      state : 200,
      msg : '删除评论成功'
    }
  }
}