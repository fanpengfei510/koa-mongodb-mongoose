/**
|--------------------------------------------------
| @class 文章分类
|--------------------------------------------------
*/
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  name : {
    type : String,
    required : true
  },
  title : {
    type : String,
    required : true
  },
  desc : {
    type : String
  },
  meta : {
    carateAt : {
      type : Date,
      default : Date.now()
    }
  }
})

module.exports = mongoose.model('Category',CategorySchema,'category')