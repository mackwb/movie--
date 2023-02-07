import request from "./http";

// 影院列表
// https://apis.netstart.cn/maoyan/index/moreCinemas
export function getMoreCinemas(params){
    return request({
        url:"/index/moreCinemas",
        method:"get",
        params
    })
}
// 影院筛选
// https://apis.netstart.cn/maoyan/index/filterCinemas?ci=20
export function getCinemasType(params){
    return request({
        url:"/index/filterCinemas",
        method:"get",
        params
    })
}
// 影院详情
// https://apis.netstart.cn/maoyan/cinema/detail?cinemaId=17166
export function getCinemasDetail(params){
    return request({
        url:"/cinema/detail",
        method:"get",
        params
    })
}
// 影院正在上映电影详情
// https://apis.netstart.cn/maoyan/cinema/shows?cinemaId=17166&ci=1&channelId=4
export function getCinemaShows(params){
    return request({
        url:"/cinema/shows",
        method:"get",
        params
    })
}
// 影院选座
// https://apis.netstart.cn/maoyan/cinema/seat-m.json
export function getCinemaSeat(params){
    return request({
        url:"/cinema/seat-m.json",
        method:"get",
        params
    })
}

