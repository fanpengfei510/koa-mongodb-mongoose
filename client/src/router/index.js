import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from '../components/login';
import LoginIn from '../components/login/loginIn';
import List from '../components/list';
import Post from '../components/user/Post';
import Tag from '../components/user/Tag';
import MyPost from '../components/user/MyPost';

const RouterLink = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={List}></Route>
      <Route path="/login" component={Login}></Route>
      <Route path="/loginup" component={LoginIn}></Route>
      <Route path="/post" component={Post}></Route>
      <Route path="/tag" component={Tag}></Route>
      <Route path="/mypost" component={MyPost}></Route>
    </Switch>
  </BrowserRouter>
)

export default RouterLink;