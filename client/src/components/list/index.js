import React, { Component } from 'react';
import { Layout,List,Avatar,Drawer,Input,Button,Radio,Row,Col } from 'antd';
import HeaderMenu from '../Menu';
import { getList,getDetails,sendComments } from '../../utils/api'
import './style.css'
const { Header,Content,Footer } = Layout;
const { TextArea } = Input;
const RadioGroup = Radio.Group

class ArticleList extends Component {
  state = {  
    title : 'list',
    strSearch : '',
    arrListData : [],
    bolContentDrawer : false,
    objContent : {},
    arrComments : [],
    bolComments : false,
    strItemId : '',
    strTextArea : ''
  }
  render() {
    const { objContent } = this.state
    return (
      <Layout>
        <Header>
          <HeaderMenu history={this.props.history}/>
        </Header>

        <Content style={{ padding: '0 50px' }}>
        <div style={{ background: '#fff', padding: 24,marginTop : 20 }}>
        <RadioGroup defaultValue="all" buttonStyle="solid" onChange={this.handleTag}>
          <Radio.Button value='all'>全部</Radio.Button>
          <Radio.Button value='ess'>精华</Radio.Button>
          <Radio.Button value='share'>分享</Radio.Button>
          <Radio.Button value='problem'>问答</Radio.Button>
          <Radio.Button value='recruit'>招聘</Radio.Button>
        </RadioGroup>
        
        <List
          itemLayout="horizontal"
          dataSource={this.state.arrListData}
          style={{marginTop:20}}
          renderItem={item => (
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"/>}
                title={<a href="javascript:void(0)" onClick={()=>this.handleContent(item._id)}>{item.title}</a>}
                description={item.content}
              />
            </List.Item>
          )}
        />
      </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        <Drawer
          title={objContent.title}
          placement="right"
          closable={false}
          width="800px"
          onClose={()=>this.setState({bolContentDrawer : false})}
          visible={this.state.bolContentDrawer}
        >
          <Row>
            <Col span={12}>作者：{objContent.author && objContent.author.username ? objContent.author.username : "--"}</Col>
            <Col span={12}>创建时间：{objContent.mate && objContent.mate.createAt ? objContent.mate.createAt : "--"}</Col>
          </Row>
          <p>{objContent.content}</p>
          <List
            itemLayout="horizontal"
            dataSource={this.state.arrComments}
            size="small"
            style={{marginTop:20,background:"#f5f5f5",padding:" 0 10px"}}
            renderItem={item => (
              <List.Item>
                <List.Item.Meta
                  avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"/>}
                  title={<a href="javascript:void(0)">{item.author.username}</a>}
                  description={item.content}
                />
              </List.Item>
            )}
          />
          <div>
            <TextArea 
              placeholder="请输入评论内容" 
              disabled={!this.state.bolComments} 
              autosize={{minRows :3,maxRows : 6}} 
              style={{margin:'25px 0 10px 0'}}
              onChange={this.handleTextArea}
            />
            <Button type="primary" disabled={!this.state.bolComments} onClick={this.handleSend}>发布</Button>
          </div> 
          
        </Drawer>
      </Layout>
    );
  }

  componentDidMount() {
    getList().then(data=>{
      this.setState({
        arrListData : data.data,
      })
    })
  }
  handleSearch = (e) =>{
    this.setState({
      strSearch : e.target.value
    })
  }
  handleContent = (id) =>{
    getDetails(id).then(data=>{
      if(data.status == 200){
        this.setState({
          objContent : data.data,
          arrComments : data.comment,
          bolContentDrawer : true,
          bolComments : data.user,
          strItemId : id
        })
      }
    })
  }
  handleTag = (e) =>{
    console.log(e.target.value)
  }
  handleTextArea = (e) =>{
    this.setState({
      strTextArea : e.target.value
    })
  }

  handleSend = () =>{
    const that = this;
    sendComments({'postId' :this.state.strItemId,'content' : this.state.strTextArea }).then(data=>{
      if(data.data.status == 200){
        getDetails(this.state.strItemId).then(data=>{
          if(data.status == 200){
            that.setState({
              objContent : data.data,
              arrComments : data.comment,
            })
          }
        })
      }
    })
  }
}

export default ArticleList;