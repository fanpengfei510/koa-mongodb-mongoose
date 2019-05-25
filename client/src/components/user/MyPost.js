import React, { Component } from 'react';
import { Layout,Table,Button,Form,Modal,Input,Select } from 'antd';
import HeaderMenu from '../Menu';
const {Header,Content,Footer} = Layout;
const { TextArea } = Input;
const Option = Select.Option;

class MyPost extends Component {
  state = {  
    arrTableData : [
      { name : "分享",content:"此标签内容均为分享文章" },
      { name : "精华",content:"精华好评文章" },
    ],
    bolModalvisible : false
  }
  render() {
    const columns = [
      {
        title : '标题',
        dataIndex : 'name'
      },{
        title : '内容',
        dataIndex : 'content'
      },{
        title : '操作',
        render : (text,record)=>(
          <span>
            <Button type="link">删除</Button>
            <Button type="link" onClick={this.handleEdit}>编辑</Button>
          </span>
        )
      }
    ]

    return (
      <Layout>
        <Header>
          <HeaderMenu history={this.props.history}/>
        </Header>

        <Content style={{ padding: '0 50px' }}>
          <div style={{ background: '#fff', padding: 24,marginTop : 20 }}>
            <Table columns={columns} dataSource={this.state.arrTableData}/>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        <EditModal 
          wrappedComponentRef={this.saveFormRef}
          visible={this.state.bolModalvisible}
          onCancel={()=>this.setState({bolModalvisible:false})}
          onSave={this.handleSave}
        />
      </Layout>
    );
  }
  handleSave = () =>{
    const form = this.formRef.props.form;
    form.validateFields((err,values)=>{
      console.log(values)
    })
  }

  saveFormRef = formRef =>{
    this.formRef = formRef
  }

  handleEdit = () =>{
    this.setState({
      bolModalvisible : true
    })
  }
}

const EditModal = Form.create()(
  class extends Component{
    render(){
      const { visible,onCancel,onSave,form } = this.props;
      const { getFieldDecorator } = form;
      return(
        <Modal
          visible={visible}
          title="编辑文章"
          okText="保存"
          cancelText="关闭"
          onCancel={onCancel}
          onOk={onSave}
          width="1000px"
        >
          <Form>
            <Form.Item label="标题">
              {
                getFieldDecorator('title')(
                  <Input />
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
          </Form>
        </Modal>
      )
    }
  }
)

export default MyPost;