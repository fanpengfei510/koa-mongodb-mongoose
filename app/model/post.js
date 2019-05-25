module.exports = app =>{
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const PostSchema = new Schema({
    title : String,
    content : String,
    author : {
      type : Schema.Types.ObjectId,
      ref : 'User',
      required : true
    },
    comments : {
      type : Schema.Types.ObjectId,
      ref : 'Comments',
      required : true
    },
    mate : {
      createAt : {
        type : Date,
        default : new Date()
      },
      updateAt : {
        type : Date,
        default : new Date()
      }
    }
  })

  return mongoose.model('Post',PostSchema,'post')
}