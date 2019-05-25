module.exports = app =>{
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const TagSchema = new Schema({
    title : {
      type : String,
      required : true,
    },
    content : String,
    mate : {
      createAt : {
        type : Date,
        default : new Date()
      }
    },
    postId : {
      type : Schema.Types.ObjectId,
      ref : 'Post'
    },
    author : {
      type : Schema.Types.ObjectId,
      ref : 'User',
      required : true
    }
  })

  return mongoose.model('Tag',TagSchema,'tag')
}