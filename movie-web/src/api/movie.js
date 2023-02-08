import request from "./http";

// 影片详情
// https://apis.netstart.cn/maoyan/movie/detail?movieId=1224712
export function getMovieDetail(params){
    return request({
        url:"/movie/detail",
        method:"get",
        params
    })
}
// 影片上映影院筛选条件
// https://apis.netstart.cn/maoyan/movie/select/items?movieid=1335230&cityId=20&showDate=2022-11-08
export function getSelectDetail(params){
    return request({
        url:"/movie/select/items",
        method:"get",
        params
    })
}
// 影片上映日期
// https://apis.netstart.cn/maoyan/movie/showdays?movieId=1224712&cityId=20
export function getShowdays(params){
    return request({
        url:"/movie/showdays",
        method:"get",
        params
    })
}
// 影片上映日期
// https://apis.netstart.cn/maoyan/movie/intro?movieId=1331230
export function getMovieIntro(params){
    return request({
        url:"/movie/intro",
        method:"get",
        params
    })
}
// 影片上映日期
// https://apis.netstart.cn/maoyan/movie/select/cinemas
export function getSelectCinemas(params){
    return request({
        url:"/movie/select/cinemas",
        method:"get",
        params
    })
}