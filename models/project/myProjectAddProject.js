const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MyProjectAddProject = Schema({
  projectName : String,
  projectDesc : String,
  comp : String,
  startTime : Date,
  endTime : Date,
  user_id : Schema.Types.ObjectId,
  tabs_id : Schema.Types.ObjectId
})

module.exports = mongoose.model('MyProjectAddProject',MyProjectAddProject,'myProjectAddProject')