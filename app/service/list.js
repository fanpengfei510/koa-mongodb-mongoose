const Service = require('egg').Service;

class ListService extends Service{
  async create(){
    const { ctx } = this;
    // let post = await ctx.model.Post.find({}).populate({path : 'author',select:['username','isAdmin']});
    let data = await ctx.model.Post.aggregate([
      {
        $project : {
          "_id" : 1,
          "title" : 1,
          "content" : 1,
        }
      }
    ])
    return {
      status : 200,
      data
    };
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
}

module.exports = ListService;