const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TabsSchema = new Schema({
  title : {
    type : String,
    required : true
  },
  menuId : {
    type : Schema.Types.ObjectId,
    required : true
  },
})

module.exports = mongoose.model('Tabs',TabsSchema,'tabs')