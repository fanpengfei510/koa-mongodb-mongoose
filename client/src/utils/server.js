import axios from 'axios';
import qs from 'qs';

export function get(url){
  return new Promise((resolve,reject)=>{
    axios.get(url).then((res)=>{
      resolve(res.data)
    })
  })
}

export function post(url,data){
  return new Promise((resolve,reject)=>{
    axios.post(url,data).then((res)=>{
      resolve(res)
    })
  })
}