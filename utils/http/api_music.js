import myRequest from './MyRequest.js'

export function getBannerList(type = 2) {
  return myRequest.get("banner", {
    type
  })
}


export function getTopMusicList(id = 1) {
  return myRequest.get("top/list", {
    idx: id
  })
}

// 展示歌单
export function getSongMenu(cat = "全部", limit = 6, offset = 0) {
  return myRequest.get("top/playlist", {
    cat,
    limit,
    offset
  })
}

// 歌单详情
export function getSongMenuDetail(id) {
  return myRequest.get("playlist/detail/dynamic", {
    id
  })
}