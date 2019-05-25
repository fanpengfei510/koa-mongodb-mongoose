module.exports = app =>{
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const CommentsSchema = new Schema({
    postId : {
      type : Schema.Types.ObjectId,
      ref : 'Post',
      required : true
    },
    author : {
      type : Schema.Types.ObjectId,
      ref : 'User',
      required : true
    },
    content : String,
    mate : {
      createAt : {
        type : Date,
        default : Date.now()
      }
    }
  })

  return mongoose.model('Comments',CommentsSchema,'comments')
}