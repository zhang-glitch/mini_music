import { playerStore } from "../../store/player-store"

// components/music-list-item/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    musicList: {
      type: Object,
      value: {}
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
    // 跳转到音乐播放
    handleToMusicPlayer(event) {
      wx.navigateTo({
        url: `/pages/music-player/index?id=${event.currentTarget.dataset.id}`,
      })
      // 将音乐列表传入store中
      playerStore.dispatch("getCurrentMusicListAction", {
        currentMusicIndex: event.currentTarget.dataset.index,
        musicList: this.properties.musicList
      })
    }
  }
})
