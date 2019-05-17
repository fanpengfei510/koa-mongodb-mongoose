const Post = require('../model/post');
const Comments = require('../model/comments');

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
    let id = ctx.query.id;
    try {
      // let data = await Post.findById(id).populate({path : 'author',select :['username','isAdmin']})
      // let comments = await Comments.find({postId : id}).populate({path : 'from',select : 'username'})
      let comments = await Comments.find({})
          .populate({
            path : 'postId',
            select : ['title','content'],
            populate : {
              path:'author',select:'username'
            }
          })
      ctx.response.body = {
        status : 200,
        // data,
        comments
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
    const post = await Post.findById(ctx.params.id)
    if(post.author.toString() !== ctx.session.user.id.toString()){
      ctx.response.body = {
        status : 500,
        msg : '没有权限修改',
      }
    }else{
      try {
        await Post.findByIdAndUpdate(id,{
          title,content
        })
        ctx.response.body = {
          stateu : 200,
          msg : '修改文章成功',
        }
      } catch (error) {
        ctx.response.body = {
          status : error.code ? 0 : 401,
          msg : '修改文章失败',
        }
      }
    }
  },

  // 所有文章列表
  async list(ctx,next){
    let { pageCount,pageSize } = ctx.query
    try {
      let data = await Post.find({})
      ctx.response.body = {
        state : 200,
        data
      }
    } catch (error) {
      ctx.response.body = {
        state : error.code ? 0 : 401,
        msg : "查询失败"
      }
    }
  },

  async delete(ctx,next){
    const post = await Post.findById(ctx.params.id);
    if(post.author.toString() !== ctx.session.user.id.toString()){
      ctx.response.body = {
        status : 500,
        msg : '没有权限修改',
      }
    }else{
      await Post.findByIdAndRemove(ctx.params.id);
      ctx.response.body = {
        status : 200,
        msg : '删除文章成功',
      }
    }
  }
}