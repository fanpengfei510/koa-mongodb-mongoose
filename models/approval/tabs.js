const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ApprovalSchema = new Schema({
  label : String,
  state : {
    type : String,
    default : 'ing'
  }
})

module.exports = mongoose.model('ApprovalTabs',ApprovalSchema,'approvalTabs')