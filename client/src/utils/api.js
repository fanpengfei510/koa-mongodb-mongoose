import { get,post } from './server';
export function getList(){
  return get('/getList')
}

export function getDetails(id){
  return get(`/details?id=${id}`)
}

export function login(data){
  return post(`/login`,data)
}

export function loginUp(data){
  return post(`/loginup`,data)
}

export function outLogin(){
  return get(`/outlogin`)
}

export function sendComments(body){
  return post(`/comments`,body)
}

export function addTag(body){
  return post(`/addtag`,body)
}

export function listTag(){
  return get(`/listtag`)
}