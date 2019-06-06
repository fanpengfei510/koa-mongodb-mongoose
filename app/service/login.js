const Service = require('egg').Service;

class loginService extends Service {
  async index(username, password) {
    const { ctx } = this;
    try {
      const result = await ctx.model.User.findOne({ username, password }).populate({path:'role',select:['access','name']});
      if (!!Object.keys(result).length) {
        ctx.session.user = result;
        return {
          status: 200,
          msg: '登录成功',
          result
        }
      } else {
        return {
          status: 401,
          msg: '账号或者密码错误',
        }
      }
    } catch (error) {
      return {
        status: 0,
        msg: '登录失败',
      }
    }
  }

  async loginUp(body) {
    const { ctx } = this;
    const { username } = body;
    try {
      const result = await ctx.model.User.findOne({ username });
      if (!result) {
        const result = await ctx.model.User.create(body)
        return {
          status: 200,
          msg: '注册成功',
          result
        }
      } else {
        return {
          status: 401,
          msg: '该账号存在，请从新注册'
        }
      }
    } catch (error) {
      return {
        status: 0,
        msg: '注册失败',
      }
    }
  }

  async outLogin() {
    const { ctx } = this;
    try {
      ctx.session.user = null;
      return {
        status: 200,
        msg: '退出登录成功',
      }
    } catch (error) {
      return {
        status: 401,
        msg: '退出失败',
      }
    }
  }
}

module.exports = loginService