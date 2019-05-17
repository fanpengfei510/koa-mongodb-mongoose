const Comments = require('../model/comments');

module.exports = {
  async post(ctx,next){
    try {
      await Comments.create(Object.assign(ctx.request.body,{
        from : ctx.session.user.id
      }))
      ctx.response.body = {
        status : 200,
        msg : "评论成功"
      }
    } catch (error) {
      ctx.response.body = {
        status : error.code ? 0 : 401,
        msg : "评论失败"
      }
    }
  },
  async delete(ctx,next){
    let comment = await Comments.findById(ctx.params.id)
    if(comment.from.toString() !== ctx.session.user.id.toString()){
      ctx.response.body = {
        status : 500,
        msg : '没有权限',
      }
    }else{
      try {
        await Comments.findByIdAndRemove(ctx.params.id)
        ctx.response.body = {
          status : 200,
          msg : '删除成功',
        }
      } catch (error) {
        ctx.response.body = {
          status : error.code ? 0 : 401,
          msg : "删除失败"
        }
      }
    }
  }
}