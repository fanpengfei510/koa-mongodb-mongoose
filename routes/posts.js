const PostModel = require('../models/post');
const CommentModel = require('../models/comment')

module.exports = {
  async indexe(ctx,next){
    const post = Object.assign(ctx.request.body,{
      author : ctx.session.user._id
    })
    const res = await PostModel.create(post);
    ctx.body = {
      state : 200,
      msg : '发表文章成功',
      res
    }
  },
  async show(ctx,next){
    let id = ctx.request.query.id;
    const list = await PostModel.findById(id).populate({path:'author',select:'name'})
    const comments = await CommentModel.find({'postId':id}).populate({path:'from',select:'name'})
    ctx.body = {
      state : 200,
      list,
      comments
    }
  },
  async showList(ctx,next){
    const data = await PostModel.find({});
    ctx.body = data;
  },
  async edit(ctx,next){
    let id = ctx.request.body.id
    const post = await PostModel.findById(id)
    if(!post){
      ctx.body = {
        state : 0,
        msg : '文章不存在'
      }
    }
    if(post.author.toString() !== ctx.session.user._id.toString()){
      ctx.body = {
        state : 0,
        msg : '没有权限'
      }
    }

    const { title,content } = ctx.request.body;
    await PostModel.findByIdAndUpdate(id,{
      title,
      content
    })
    ctx.body = {
      state : 200,
      msg : '更新成功'
    }
  },
  async delete(ctx,next){
    let id = ctx.request.query.id;
    let item = await PostModel.findById(id)
    if(!item){
      ctx.body = {
        state : 0,
        msg : '文章不存在'
      }
    }
    if(item.author.toString() !== ctx.session.user._id.toString()){
      ctx.body = {
        state : 0,
        msg : '没有权限'
      }
    }
    await PostModel.findByIdAndRemove(id);
    ctx.body = {
      state : 200,
      msg : '删除成功'
    }
  }
}