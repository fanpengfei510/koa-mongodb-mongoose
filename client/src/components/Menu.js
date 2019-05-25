import React, { Component } from 'react';
import { Menu,Avatar,Dropdown } from 'antd';
import { outLogin } from '../utils/api'

class HeaderMenu extends Component {
  state = {  
    strMenuSelect : '/',
  }
  render() {
    const userList = (
      <Menu onClick={this.handleMenu}>
        <Menu.Item key="post">发布文章</Menu.Item>
        <Menu.Item key="tag">添加标签</Menu.Item>
        <Menu.Item key="mypost">我发布的文章</Menu.Item>
        <Menu.Item key="out">退出</Menu.Item>
      </Menu>
    )
    return (
      <div style={{display:'flex'}}>
        <div className="logo">
          Logo
        </div>
        <Menu 
          mode="horizontal" 
          selectedKeys={[this.state.strMenuSelect]}
          theme="dark"
          onClick={this.handleMenu}
        >
          <Menu.Item key="/">首页</Menu.Item>
          <Menu.Item key="news">新手入门</Menu.Item>
          <Menu.Item key="api">API</Menu.Item>
          <Menu.Item key="about">关于</Menu.Item>
          <Menu.Item key="loginup">注册</Menu.Item>
          <Menu.Item key="login">登录</Menu.Item>
        </Menu>
        <Dropdown overlay={userList}>
          <div>
            <Avatar icon="user" />
            <span style={{color:"#ffffff"}}>超级管理员</span>
          </div>
        </Dropdown>
      </div>
    );
  }
  handleMenu = (e) =>{
    const that = this;
    if(e.key == 'out'){
      outLogin().then(data=>{
        if(data.status == 200){
          that.props.history.push('/')
        }
      })
    }else{
      this.setState({
        strMenuSelect : e.key
      })
      this.props.history.push(e.key)
    }
  }
}

export default HeaderMenu;