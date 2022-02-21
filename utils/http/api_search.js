import myRequest from "./MyRequest";

export function getHotSearchKey() {
  return myRequest.get("search/hot")
}

export function getSearchMessge(keywords, type = "moble") {
  return myRequest.get("search/suggest", {
    keywords,
    type
  })
}

export function getSearch(keywords) {
  return myRequest.get("search/cloudsearch", {
    keywords
  })
}
