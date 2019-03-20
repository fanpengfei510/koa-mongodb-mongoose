const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TabsSchema = new Schema({
  title : {
    type : String,
    required : true
  },
  menu_id : {
    type : Schema.Types.ObjectId,
    required : true
  }
})

module.exports = mongoose.model('Tabs',TabsSchema,'tabs')