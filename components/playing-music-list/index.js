import { playerStore } from "../../store/player-store"

// components/playing-music-list/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
  },

  /**
   * 组件的初始数据
   */
  data: {
    // 设置播放列表的高度
    playListHeight: 0,
    musicList: [],
    currentMusicIndex: 0
  },
  lifetimes: {
    attached() {
      // 监听musicList
      playerStore.onStates(["musicList", "currentMusicIndex"], ({currentMusicIndex, musicList }) => {
        if(currentMusicIndex !== undefined) {
          this.setData({currentMusicIndex})
        }
        if(musicList !== undefined) {
          this.setData({
            musicList
          })
        }
      })
      // 计算播放列表的高度
      this.setData({
        playListHeight: this.data.musicList.length * 50
      })
      if(this.data.playListHeight > 600) {
        this.setData({
          playListHeight: 600
        })
      }
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    
    // 点击列表的某一项
    handleMusicListItem(event) {
      const id = event.currentTarget.dataset.id
      // 播放点击的音乐
      playerStore.dispatch("getRequestSongeDetialAction", {
        id
      })
      // 将音乐列表传入store中
      playerStore.dispatch("getCurrentMusicListAction", {
        currentMusicIndex: event.currentTarget.dataset.index,
        musicList: this.properties.musicList
      })
    },
    // 当点击遮罩层时，传递事件
    handleClickCover() {
      this.triggerEvent("handleClickCover", false)
    }
  }
})
