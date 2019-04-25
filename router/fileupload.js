// const FileUploadSchema = require('../models/fileupload');
const path = require('path');
const fs = require('fs');

module.exports = {
  async fileUpload(ctx,next){
    const data = ctx.request.files.file;
    const reader = fs.createReadStream(data.path);
    let filePath = path.join(__dirname,'../file') + `/${data.name}`;
    const upStream = fs.createWriteStream(filePath);
    reader.pipe(upStream)
    ctx.body = {
      status : 200,
      upStream,
      filePath
    }
  }
}