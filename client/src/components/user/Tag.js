import React, { Component } from 'react';
import { Form,Layout,Table,Button,Input } from 'antd';
import HeaderMenu from '../Menu';
import { addTag,listTag } from '../../utils/api'
const { Header,Content,Footer } = Layout;
const {TextArea} = Input;

const columns = [
  {
    title : '名称',
    dataIndex : 'title'
  },{
    title : '描述',
    dataIndex : 'content'
  },{
    title : '操作',
    render : (text,record)=>(
      <span>
        <Button type="link">删除</Button>
        <Button type="link">编辑</Button>
      </span>
    )
  }
]

class TagForm extends Component {
  state = {  
    arrTableData : []
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Layout>
        <Header>
          <HeaderMenu history={this.props.history}/>
        </Header>

        <Content style={{ padding: '0 50px' }}>
        <div style={{ background: '#fff', padding: 24,marginTop : 20 }}>
          <Form onSubmit={this.handleSubmit}>
            <Form.Item label="名称">
              {
                getFieldDecorator('title',{
                  rules : [{required : true,message:'标题为必填项'}]
                })(
                  <Input placeholder="请输入标签名称"/>
                )
              }
            </Form.Item>
            <Form.Item label="说明">
              {
                getFieldDecorator('content')(
                  <TextArea />
                )
              }
            </Form.Item>
            <Form.Item>
            <Button type="primary" htmlType="submit">添加</Button>
            </Form.Item>
          </Form>
          <Table columns={columns} dataSource={this.state.arrTableData}/>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
      </Layout>
    );
  }

  componentDidMount() {
    this.getTableData()
  }
  handleSubmit = e =>{
    const that = this;
    e.preventDefault();
    this.props.form.validateFields((err,values)=>{
      addTag(values).then(data=>{
        if(data.data.status = 200){
          that.getTableData()
          that.props.form.resetFields();
        }
      })
      
    })
  }

  getTableData = () =>{
    listTag().then(data=>{
      if(data.status == 200){
        this.setState({
          arrTableData : data.result
        })
      }
    })
  }
}

export default Form.create()(TagForm);