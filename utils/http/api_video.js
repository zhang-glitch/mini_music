import myRequest from "./MyRequest";

// video列表
export function getTopMvs(offset, limit = 10) {
  return myRequest.get("top/mv", {
    offset,
    limit
  })
}

// 详情页--mv的url
export function getMvUrlById(id, r = 1080) {
  return myRequest.get("mv/url", {
    id,
    r
  })
}
// 详情页--mv数据
export function getMvDetailById(id) {
  return myRequest.get("mv/detail", {
    mvid: id
  })
}

// 详情页--mv相关数据
export function getMvRelatedDataById(id) {
  return myRequest.get("related/allvideo", {
    id
  })
}