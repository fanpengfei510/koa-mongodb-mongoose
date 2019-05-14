const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  author : {
    type : Schema.Types.ObjectId,
    ref : 'User',
    required : true
  },
  title : {
    type : String,
    required : true,
    unique : true
  },
  content : {
    type : String,
  },
  mate : {
    createAt : {
      type : Date,
      default : Date.now()
    },
    updateAt : {
      type : Date,
      default : Date.now()
    }
  }
})

module.exports = mongoose.model('Post',PostSchema,'post')