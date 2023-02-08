import request from "./http";

export function getCheckData(params){
    return request({
        url:"http://localhost:8080/json/check.json",
        method:"get",
        params
    })
}
// 获取账号密码
export function getLoginCellphone(params){
    return request({
        url:"http://localhost:8080/json/cellphone.json",
        method:"get",
        params
    })
}
// 获取用户信息
export function getUserData(params){
    return request({
        url:"http://localhost:8080/json/user.json",
        method:"get",
        params:{
            userId:123564
        }
    })
}