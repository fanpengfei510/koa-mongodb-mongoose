import React, { Component } from 'react';
import { Button,Input,Form } from 'antd';
import { login } from '../../utils/api'

class LoginForm extends Component {
  state = {  
    title : 'login'
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <Form onSubmit={this.handleSubmit} style={{width:"500px",margin:'0 auto'}}>
          <Form.Item label="账号">
          {
            getFieldDecorator('username',{
              rules : [{required:true,message : '账户为必填项'}]
            })(
              <Input placeholder="请输入账号"/>
            )
          }
          </Form.Item>
          <Form.Item label="密码">
            {
              getFieldDecorator('password',{
                rules : [{required:true,message : '密码为必填项'}]
              })(
                <Input placeholder="请输入密码" type="password"/>
              )
            }
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">登录</Button>
            <Button type="default" onClick={()=>this.props.history.push('/loginup')}>注册</Button>
            <Button type="link" onClick={()=>this.props.history.push('/')}>返回首页</Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
  handleSubmit = (e) =>{
    const that = this;
    e.preventDefault();
    this.props.form.validateFields((err,values)=>{
      login(values).then(data=>{
        if(data.data.status == 200){
          that.props.history.push('/')
        }
      })
    })
  }
}

export default Form.create()(LoginForm);