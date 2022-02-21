import { hotMusicStore } from "../../store/index.js"
import { getSongMenuDetail } from "../../utils/http/api_music.js"

// pages/music-list/index.js
Page({
  data: {
    rankName: "",
    musicList: [],
    songMenuMusicData: {},
    // 区分要展示那个组件
    isShowRank: false
  },
  onLoad: function (options) {
    if(options.type === "menu") {
      // 发送网络请求
      getSongMenuDetail(options.id).then(res => {
        // console.log(res)
        this.setData({
          songMenuMusicData: res.playlist,
          musicList: res.playlist.tracks,
          isShowRank: false
        })
      })
    }else if(options.type === "rank") {
      // 从共享数据中取
      this.setData({
        rankName: options.rankName,
        isShowRank: true
      })
      
      hotMusicStore.onState(`${this.data.rankName}List`, res => {
        this.setData({
          musicList: res
        })
      })
    }
  },
  onUnload: function () {

  },
})