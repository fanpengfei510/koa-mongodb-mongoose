const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MenuSchema = new Schema({
  title : String,
  href : String,
  subMenu : {
    type : Array,
    subTitle : String,
    style : String,
    href : String,
  }
})

module.exports = mongoose.model('MenuSchema',MenuSchema,'menu')
