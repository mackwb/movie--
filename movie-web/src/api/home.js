import request from "./http";

// 最受好评电影列表数据
// https://apis.netstart.cn/maoyan/index/topRatedMovies
export function getMostpraised(){
    return request({
        url:"/index/topRatedMovies",
        method:"get"
    })
}
//热映电影
// https://apis.netstart.cn/maoyan/index/movieOnInfoList
export function getHotmovies(){
    return request({
        url:"/index/movieOnInfoList",
        method:"get"
    })
}
// 更多热映电影
// https://apis.netstart.cn/maoyan/index/moreComingList?movieIds=1363244,1331230,1417305,1199023,246968,1236599,1370269,1280799,1285684,1370983
export function getMoreHotmovies(params){
    return request({
        url:"/index/moreComingList",
        method:"get",
        params
    })
}

//城市列表
// https://apis.netstart.cn/maoyan/cities.json
export function getCitysLists(){
    return request({
        url:"/cities.json",
        method:"get",
    })
}
//根据地理定位获取当前城市
// https://apis.netstart.cn/maoyan/city/latlng?lat=23.4&lng=113.3
export function getLocalCity(params){
    return request({
        url:"/city/latlng",
        method:"get",
        params
    })
}
