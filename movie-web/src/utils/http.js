// // axios二次封装

// import axios from "axios";
// import store from "../store";

// const instance = axios.create({
//     baseURL: 'http://localhost:5173/maoyan/',
//     timeout: 5000,
//   });

// // axios.get('/users/yzm')
// // axios.get('/login/xxx')
// // axios.get('/xxx')

// // 添加请求拦截器 ->携带用户身份token
// instance.interceptors.request.use(function (config) {
//     // 在发送请求之前做些什么
//     //设置请求头信息，每个instance发起的请求都会携带用户的信息
//     config.headers.token=store.state.users.token
//     return config;
//   }, function (error) {
//     // 对请求错误做些什么 
//     return Promise.reject(error);
//   });

// // 添加响应拦截器 ->统一错误处理
// instance.interceptors.response.use(function (response) {
//     // 对响应数据做点什么
//     return response;
//   }, function (error) {
//     // 对响应错误做点什么
//     return Promise.reject(error);
//   });


// //封装
// let http = {
//     get(url,data,config){
//         return instance.get(url,{
//             params:data,
//             ...config
//         })
//     },
//     post(url,data,config){//发送
//         return instance.post(url,data,config)
//     },
//     put(url,data,config){
//         return instance.put(url,data,config)
//     },
//     patch(url,data,config){
//         return instance.patch(url,data,config)
//     },
//     delete(url,data,config){
//         return instance.delete(url,{
//             params:data,
//             ...config
//         })
//     },
// }

// export default http

