
const Config = require('./config');
const MongoClient = require('mongodb').MongoClient;

class Db {
  static getInstance(){
    // 单例模式，避免重复连接数据库
    if(!Db.instance){
      Db.instance = new Db();
    }
    return Db.instance;
  }
  constructor(){
    // 初始化连接数据库
    this.dbClient = '';
    // 默认连接数据库
    this.connect();
  };

  // 连接数据库
  connect(){
    return new Promise((resolve,reject)=>{
      if(!this.dbClient){
        MongoClient.connect(Config.dbUrl,{useNewUrlParser:true},(err,client)=>{
          if(err){
            reject(err);
          }else{
            this.dbClient = client.db(Config.dbName)
            resolve(this.dbClient)
          }
        })
      }else{
        resolve(this.dbClient)
      }
    })
  };

  /**
  |--------------------------------------------------
  | @method 查询
    @param collectionName  表名
    @param json 所要查询的数据
  |--------------------------------------------------
  */
  find(collectionName,json){
    return new Promise((resolve,reject)=>{
      this.connect().then((db)=>{
        let result = db.collection(collectionName).find(json);
        result.toArray(function(err,docs){
          if(err){
            reject(err)
          }
          resolve(docs)
        })
      })
    })
  };

  /**
  |--------------------------------------------------
  | @method 修改
    @param collectionName 表名
    @param json1 所要修改的数据
    @param json2 修改成的数据
  |--------------------------------------------------
  */
  update(collectionName,json1,json2){
    return new Promise((resolve,reject)=>{
      this.connect().then((db)=>{
        db.collection(collectionName).updateOne(json1 ,{
          $set : json2
        },(err,result)=>{
          if(err){
            reject(err)
          }else{
            resolve(result)
          }
        })
      })
    })
  };

  /**
  |--------------------------------------------------
  | @method 插入
    @param collectionName 表名
    @param json 插入的数据
  |--------------------------------------------------
  */
  insert(collectionName,json){
    return new Promise((resolve,reject)=>{
      this.connect().then((db)=>{
        db.collection(collectionName).insertOne(json,(err,result)=>{
          if(err){
            reject(err)
          }else{
            resolve(result)
          }
        })
      })
    })
  };

  /**
  |--------------------------------------------------
  | @method 删除
    @param collectionName 表名
    @param json 删除的数据
  |--------------------------------------------------
  */
  remove(collectionName,json){
    return new Promise((resolve,reject)=>{
      this.connect().then((db)=>{
        db.collection(collectionName).removeOne(json,(err,result)=>{
          if(err){
            reject(err)
          }else{
            resolve(result)
          }
        })
      })
    })
  }
}

module.exports = Db.getInstance();