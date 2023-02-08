// // 用户相关的状态管理
// //
// import http from '../../api/http' //引入二次封装

// const state = {
//     message:[],
//     username:''
// }
// const actions = {
//   yzm(context,data){
//     //在二次封装下 进行查询
//     return http.get('/index/topRatedMovies', data)//返回的是 数据的整体
//   },
// //   /index/movieOnInfoList

//   login(context,data){
//     return http.post('/users/login', data)
//   },
//   huoQu(context,data){
//     return http.get('/index/movieOnInfoList', data)
//   },
//   info(context, data){
//     return http.get('users/info', data)
//   }
// }
// const getters = {}
// const mutations = {// 更新状态管理的数据
//     updateToken(state, payload){
//         state.message = payload;
//     },
//     clearToken(state){
//         state.token=''
//     },
//     updateUsername(state, payload){
//         state.username = payload;
//     },

// }

// export default {
//   namespaced: true,
//   state,
//   actions,
//   getters,
//   mutations
// }