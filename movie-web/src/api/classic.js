import request from "./http";

// 经典电影
// https://apis.netstart.cn/maoyan/index/moreClassicList?sortId=1&showType=3&limit=10&offset=0
export function getMoreClassic(params){
    return request({
        url:"/index/moreClassicList",
        method:"get",
        params
    })
}