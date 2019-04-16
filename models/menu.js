const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MenuSchema = new Schema({
  label : String,
  href : String,
  userId : {
    type : Schema.Types.ObjectId,
    required : true
  },
  children : {
    type : Array,
    title : String,
    href : String,
    appId : Schema.Types.ObjectId
  }
})

module.exports = mongoose.model('MenuSchema',MenuSchema,'menu')
