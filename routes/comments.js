/**
|--------------------------------------------------
| @class 评论
|--------------------------------------------------
*/
const CommentsModel = require('../models/comment');

module.exports = {
  // 添加评论
  async add(ctx,next){
    const comment = Object.assign(ctx.request.body)
    await CommentsModel.create(comment)
    ctx.body = {
      state : 200,
      msg : '评论成功'
    }
  },
  // 删除评论
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