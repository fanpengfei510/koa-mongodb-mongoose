const Service = require('egg').Service;

class ListService extends Service{
  async create(){
    const { ctx } = this;
    const param = ctx.query.type;
    let data;
    // let post = await ctx.model.Post.find({}).populate({path : 'author',select:['username','isAdmin']});
    if(param == 'all'){
      data = await ctx.model.Post.aggregate([
        {
          $project : {
            "_id" : 1,
            "title" : 1,
            "content" : 1,
            "author" : 1
          }
        }
      ])
    }else{
      data = await ctx.model.Post.find({'tag':param})
    }
    return {
      status : 200,
      data,
      // result
    };
    // let result = data.map(item=>{
    //   if(typeof (ctx.session.user) == 'undefined'){
    //     return{
    //       "id" : item._id,
    //       "title" : item.title,
    //       "content" : item.content,
    //       "author" : false
    //     }
    //   }else{
    //     if(item.author == ctx.session.user._id){
    //       return{
    //         "id" : item._id,
    //         "title" : item.title,
    //         "content" : item.content,
    //         "author" : true
    //       }
    //     }else{
    //       return{
    //         "id" : item._id,
    //         "title" : item.title,
    //         "content" : item.content,
    //         "author" : false
    //       }
    //     }
    //   }
    // })
  }
  async details(id){
    const { ctx } = this;
    let data = await ctx.model.Post.findById(id).populate({path:'author',select:['username']});
    let comment = await ctx.model.Comments.find({"postId" : id}).populate({path:'author',select:['username']})
    return {
      status : 200,
      data,
      comment,
      user : !!ctx.session.user
    }
  }

  async addPost(){
    const {ctx} = this;
    const body = ctx.request.body;
    if(body.id){
      try {
        let result = await ctx.model.Post.findByIdAndUpdate({_id:body.id},Object.assign(body,{'author' : ctx.session.user._id}))
        return {
          status : 200,
          msg : '修改成功',
          result
        }
      } catch (error) {
        return {
          status : 401,
          msg : '修改失败'
        }
      }
    }else{
      try {
        let result = await ctx.model.Post.create(Object.assign(body,{'author' : ctx.session.user._id}))
        return {
          status : 200,
          msg : '发布成功',
          result
        }
      } catch (error) {
        return {
          status : 401,
          msg : '发布失败'
        }
      }
    }
  }
  async myPost(){
    const {ctx} = this;
    try {
      let result = await ctx.model.Post.find({'author' : ctx.session.user._id})
      return {
        status : 200,
        msg : '查询成功',
        result
      }
    } catch (error) {
      return {
        status : 401,
        msg : '查询失败'
      }
    }
  }
  async delete(){
    const {ctx} = this;
    const id = ctx.query.id;
    try {
      await ctx.model.Post.findByIdAndRemove(id);
      return {
        status : 200,
        msg : '删除成功',
      }
    } catch (error) {
      return {
        status : 401,
        msg : '删除失败'
      }
    }
  }
}

module.exports = ListService;