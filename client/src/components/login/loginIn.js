import React, { Component } from 'react';
import {Form,Input,Icon,Button} from 'antd';
import { loginUp } from '../../utils/api' 

class loginInForm extends Component {
  state = {  

  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} style={{width:"800px",margin:'0 auto'}}>
        <Form.Item label="用户名">
          {
            getFieldDecorator('username',{
              rules : [{required:true,message:'用户名为必填项'}]
            })(
              <Input 
                prefix={<Icon type="user" style={{color:"#cccccc"}}/>}
                placeholder="请输入用户名"/>
            )
          }
        </Form.Item>
        <Form.Item label="密码">
          {
            getFieldDecorator('password',{
              rules : [{required:true,message:'密码为必填项'}]
            })(
              <Input 
                prefix={<Icon type="lock" style={{color:"#cccccc"}}/>}
                placeholder="请输入密码"/>
            )
          }
        </Form.Item>
        <Form.Item label="邮箱">
          {
            getFieldDecorator('email')(
              <Input 
                prefix={<Icon type="mail" style={{color:"#cccccc"}}/>}
                placeholder="请输入邮箱"/>
            )
          }
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">确定注册</Button>
          <Button type="link" onClick={()=>this.props.history.push('/login')}>已有账号</Button>
        </Form.Item>
      </Form>
    );
  }
  handleSubmit = (e) =>{
    const that = this;
    e.preventDefault();
    this.props.form.validateFields((err,values)=>{
      loginUp(values).then(data=>{
        if(data.data.status == 200){
          that.props.history.push('/')
        }
      })
    })
  }
}

export default Form.create()(loginInForm);