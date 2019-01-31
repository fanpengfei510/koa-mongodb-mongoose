module.exports = {
  prot : process.env.PORT || 3000,
  session : {
    key : 'fan',
    maxAge : 86400000
  },
  mongodb : 'mongodb://localhost:27017/nodeBlog'
}