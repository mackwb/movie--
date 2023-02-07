import request from "./http";

// 近期最受期待
// https://apis.netstart.cn/maoyan/index/mostExpected?ci=20&limit=10&offset=0
export function getMostExpected(params){
    return request({
        url:"/index/mostExpected",
        method:"get",
        params
    })
}
// 待映
// https://apis.netstart.cn/maoyan/index/comingList?ci=1&limit=10
export function getComingList(params){
    return request({
        url:"/index/comingList",
        method:"get",
        params
    })
}
// 更多待映
// https://apis.netstart.cn/maoyan/index/moreComingList?ci=1&limit=10&movieIds=1280794,1291076,1352665,1298520,1230347,1443761,1355028,1250708,1404730,1397684
export function getMoreComing(params){
    return request({
        url:"/index/moreComingList",
        method:"get",
        params
    })
}
