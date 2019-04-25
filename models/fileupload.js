const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FileUploadSchema = new Schema({

})

module.exports = mongoose.model('FileUpload',FileUploadSchema,'file')