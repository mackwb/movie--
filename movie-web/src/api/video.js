import request from "./http";

// 视频数据
// https://apis.netstart.cn/maoyan/video/0
export function getMoreVideos(id){
    return request({
        url:`/video/${id}`,
        method:"get",
    })
}
// 小视频数据
// https://apis.netstart.cn/maoyan/video/short/0
export function getShortVideos(offset){
    return request({
        url:`/video/short/${offset}`,
        method:"get",
    })
}