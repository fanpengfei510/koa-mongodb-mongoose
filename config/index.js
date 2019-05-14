module.exports = {
  prot : process.env.PORT || 3001,
  mongodb : 'mongodb://localhost:27017/blog',
  secret : 'RS256',
  session : {
    key : '',
    maxAge : 0
  }
}