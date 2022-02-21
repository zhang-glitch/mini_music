import { getSongMenu } from "../../utils/http/api_music"

// pages/music-menu/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    huayuMenuList: {},
    gufenMenuList: {},
    oumeiMenuList: {},
    liuxingMenuList: {},
    metaToListMap: {
      "华语": "huayu",
      "古风": "gufen",
      "欧美": "oumei",
      "流行": "liuxing"
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCategoryMusicMenu()
  },

  getCategoryMusicMenu() {
    // 请求全部的歌单
    for(let key in this.data.metaToListMap) {
      getSongMenu(key).then(res => {
        this.setData({
          [`${this.data.metaToListMap[key]}MenuList`]: res
        })
      })
    }
    
  }
  
})