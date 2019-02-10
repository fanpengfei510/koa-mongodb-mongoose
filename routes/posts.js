/**
|--------------------------------------------------
| @class 文章发布、编辑、删除
|--------------------------------------------------
*/
const PostModel = require('../models/post');
const CommentModel = require('../models/comment')
const CategoryModel = require('../models/category')

module.exports = {
  // 发布文章
  async publish(ctx,next){
    // const post = Object.assign(ctx.request.body,{
    //   author : ctx.session.user._id
    // })
    const res = await PostModel.create(ctx.request.body);
    ctx.body = {
      state : 200,
      msg : '发表文章成功',
      res
    }
  },

  // 显示指定文章内容
  async item(ctx,next){
    let id = ctx.request.query.id;
    const list = await PostModel.findById(id).populate([
      {path:'author',select:'name'},
      {path:'category',select:['title','name']}
    ])
    const comments = await CommentModel.find({'postId':id}).populate({path:'from',select:'name'})
    ctx.body = {
      state : 200,
      list,
      comments
    }
  },
  // 所有文章列表
  async list(ctx,next){
    // const data = await PostModel.find({});
    // ctx.body = data;
    await PostModel.aggregate([
      // {
      //   $lookup : {
      //     from : 'category',
      //     localField : 'category',
      //     foreignField : '_id',
      //     as : 'items'
      //   }
      // },
      {
        $match : {
          "category" : '5c597789cfe8620871ea39ae'
        }
      }
    ],function(err,data){
      ctx.body = data;
    })
  },

  // 编辑保存
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

  // 删除文章
  async delete(ctx,next){
    let id = ctx.request.query.id;
    console.log(id)
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
  },

  // 文章列表分页
  async page(ctx,next){
    const cname = ctx.query.cid;
    let cid;
    if(cname){
      const cateogry = await CategoryModel.findOne({name:cname})
      cid = cateogry._id;
    }
    const query = cid ? { category : cid } : {};
    const currentPage = parseInt(ctx.query.page) || 1;
    const size = parseInt(ctx.query.size)
    const allPostsCount = await PostModel.count();
    const pageCount = Math.ceil(allPostsCount / size)
    const posts = await PostModel.find(query).skip((currentPage - 1) * size).limit(size).sort({meta:-1});

    const pageStart = currentPage - 2 > 0 ? currentPage - 2 : 1;
    const pageEnd = pageStart +4 >= pageCount ? pageCount : pageStart +4;
    ctx.body = {
      posts,
      currentPage,
      pageCount,
      allPostsCount,
      pageStart,
      pageEnd
    }
  }
}