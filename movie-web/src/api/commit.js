import request from "./http";
export function getCommitsData(){
    return request({
        url:"http://localhost:8080/json/commits.json",
        method:"get",
    })
}