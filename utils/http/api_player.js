import myRequest from './MyRequest'

export function getSongDetail(id) {
  return myRequest.get("song/detail", {
    ids: id
  })
}
export function getSongLyric(id) {
  return myRequest.get("lyric", {
    id
  })
}