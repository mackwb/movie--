// 安装axios
// $cnpm i axios -S
import axios from "axios";

// 创建axios 初始化
// http://192.168.44.1:3000/homepage/block/page

const service = axios.create({
    baseURL:"/maoyan",
    // baseURL:"/api", 打包时改
    timeout:30000,//超时时间
    headers:{
        "Content-Type":"application/json;charset=utf-8",//表单数据转化
    },
    withCredentials:true,
})


// request 拦截器 发送数据到后台前拦截
service.interceptors.request.use(
    config=>{
        return config;
    },
    error=>{
        console.log("axios中request报错",error);
        Promise.reject(error);
    }
)

// response 拦截器 发送数据到后台前拦截
service.interceptors.response.use(
    response=>{
        return response.data;
    },
    error=>{
        console.log("axios中response报错",error);
        Promise.reject(error);
    }
)

export default service;



