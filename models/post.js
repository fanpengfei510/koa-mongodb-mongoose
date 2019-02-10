/**
|--------------------------------------------------
| @class 文章Schema
|--------------------------------------------------
*/
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
  },
  category : {
    type : Schema.Types.ObjectId,
    ref : 'Category'
  },
  content : {
    type : String,
    default : 0
  },
  meta : {
    createdAt : {
      type : Date,
      default : Date.now()
    },
    updatedAt : {
      type : Date,
      default : Date.now()
    }
  }
})

PostSchema.pre('save',function(next){
  if(this.isNew){
    this.meta.createdAt = this.meta.updateAt = Date.now()
  }else{
    this.meta.updatedAt = Date.now()
  }
  next()
})

module.exports = mongoose.model('Post',PostSchema,'post')