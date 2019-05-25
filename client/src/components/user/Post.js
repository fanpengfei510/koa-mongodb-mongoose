import React, { Component } from 'react';
import HeaderMenu from '../Menu';
import {Layout,Form,Input,Button,Select} from 'antd';
const { Header,Content,Footer } = Layout;
const Option = Select.Option;
const { TextArea } = Input;

class PostForm extends Component {
  state = {  

  }
  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <Layout>
        <Header>
          <HeaderMenu history={this.props.history}/>
        </Header>

        <Content style={{ padding: '0 50px' }}>
        <div style={{ background: '#fff', padding: 24,marginTop : 20 }}>
          <Form onSubmit={this.handleSubmit}>
            <Form.Item label="标题">
              {
                getFieldDecorator('title',{
                  rules : [{required : true,message:'标题为必填项'}]
                })(
                  <Input placeholder="请输入标题"/>
                )
              }
            </Form.Item>
            <Form.Item label="内容">
              {
                getFieldDecorator('content')(
                  <TextArea />
                )
              }
            </Form.Item>
            <Form.Item label="标签">
              {
                getFieldDecorator('tag')(
                  <Select
                    mode="multiple"
                  >
                    <Option key="1">精华</Option>
                    <Option key="2">分享</Option>
                  </Select>
                )
              }
            </Form.Item>
            <Form.Item>
            <Button type="primary" htmlType="submit">发表</Button>
            </Form.Item>
          </Form>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
      </Layout>
    );
  }
  handleSubmit = e =>{
    e.preventDefault();
    this.props.form.validateFields((err,values)=>{
      console.log(values)
    })
  }
}

export default Form.create()(PostForm);