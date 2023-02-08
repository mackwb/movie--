import request from "./http";

export function getCheckData(){
    return request({
        url:"http://localhost:8080/json/check.json",
        method:"get",
    })
}
// 获取账号密码
export function getLoginCellphone(){
    return request({
        url:"http://localhost:8080/json/cellphone.json",
        method:"get",
    })
}
// 获取用户信息
export function getUserData(){
    return request({
        url:"http://localhost:8080/json/user.json",
        method:"get",
        params:{
            userId:123564
        }
    })
}