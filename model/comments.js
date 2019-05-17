const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentsSchema = new Schema({
  postId : {      // 文章id
    type : Schema.Types.ObjectId,
    ref : 'Post'
  },
  from : {    // 代表发言者
    type : Schema.Types.ObjectId,
    ref : 'User',
    required : true
  },
  to : {      // @的人，暂时不支持
    type : Schema.Types.ObjectId,
    ref : 'User'
  },
  content : {
    type : String,
    required : true
  },
  mate : {
    createAt : {
      type : Date,
      default : Date.now()
    }
  }
})

module.exports = mongoose.model('Comments',CommentsSchema,'comments')