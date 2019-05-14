const Post = require('../model/post');

module.exports = {

  // 发布文章
  async post(ctx,next){
    try {
      await Post.create(Object.assign(ctx.request.body,{
        author : ctx.session.user.id
      }))
      ctx.response.body = {
        status : 200,
        msg : '发布文章成功',
      }
    } catch (error) {
      ctx.response.body = {
        status : error.code ? 0 : 401,
        msg : '发布文章失败',
      }
    }
  },

  // 查看文章详情内容
  async postItem(ctx,next){
    try {
      let data = await Post.findById(ctx.query.id).populate({path : 'author',select :['username','isAdmin']})
      ctx.body = {
        status : 200,
        data
      }
    } catch (error) {
      ctx.response.body = {
        status : error.code ? 0 : 401,
        msg : '查询失败',
      }
    }
  },

  // 编辑修改文章
  async postEdit(ctx,next){
    let { id,title,content } = ctx.request.body;
    try {
      await Post.findByIdAndUpdate(id,{
        title,content
      })
      ctx.body = {
        stateu : 200,
        msg : '修改文章成功',
      }
    } catch (error) {
      ctx.response.body = {
        status : error.code ? 0 : 401,
        msg : '修改文章失败',
      }
    }
  },

  // 所有文章列表
  async list(ctx,next){
    let { pageCount,pageSize } = ctx.query
    let data = await Post.find({})
    ctx.body = {
      state : 200,
      data
    }
  }
}