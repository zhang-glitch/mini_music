// components/song-menu/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    songMenuList: {
      type: Array,
      value: []
    },
    subTitleText: {
      type: String
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 点击item，跳转到对应的歌单列表
    handleToMusicList(event) {
      const id = event.currentTarget.dataset.item.id
      wx.navigateTo({
        url: `/pages/music-list/index?id=${id}&type=menu`,
      })
    },
    // 点击歌单更多，跳转到歌单详情页面
    handleMoreMenu() {
      wx.navigateTo({
        url: '/pages/music-menu/index',
      })
    }
  }
})
