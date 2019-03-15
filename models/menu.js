const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MenuSchema = new Schema({
  title : String,
  href : String,
  children : {
    type : Array,
    title : String,
    href : String,
    id : Schema.Types.ObjectId
  }
})

module.exports = mongoose.model('MenuSchema',MenuSchema,'menu')
