import request from "./http";

// 电影搜索
// https://apis.netstart.cn/maoyan/search/movies?keyword=%E5%BD%B1&ci=1
export function getSearchFilm(params){
    return request({
        url:"/search/movies",
        method:"get",
        params
    })
}
// 影院搜索
// https://apis.netstart.cn/maoyan/search/cinemas?keyword=%E5%BD%B1&ci=1
export function getSearchCinemas(params){
    return request({
        url:"/search/cinemas",
        method:"get",
        params
    })
}