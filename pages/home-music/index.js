import { hotMusicStore } from "../../store/index"
import audioContext, { playerStore } from "../../store/player-store"
import { getBannerList, getSongMenu } from "../../utils/http/api_music"
import queryDomRect from "../../utils/queryDomRect"
import throttle from '../../utils/throttle'
// pages/home-music/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bannerList: [],
    // swiperHeight
    swiperHeight: "0px",
    // 推荐歌曲
    topMusicList: [],
    hotSongList: [],
    recommentSongList: [],
    // 巅峰榜数据
    upMusicList: [],
    newMusicList: [],
    originalMusicList: [],
    // 当前播放的音乐
    currentMusicDetail: {},
    isPlaying: true,
    // 是否展示播放列表
    isShowMusicList: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    // 为什么这里的监听没有效果
    // 当音乐暂停时
    audioContext.onPause(() => {
      console.log("==============")
      this.setData({
        isPlaying: false
      })
    })
    // 监听音乐播放
    audioContext.onPlay(() => {
      this.setData({
        isPlaying: true
      })
    })
    // 请求bannerList
    const bannerRes = await getBannerList()
    this.setData({
      bannerList: bannerRes.banners
    })

    // 发送请求,推荐歌单
    hotMusicStore.dispatch("getHotMusicList", 1)
    hotMusicStore.onState("hotMusicList", res => { 
      if(!res.length) return 
      this.setData({
        topMusicList: res.slice(0, 6)
      })
    })

    // 音乐歌单
    const hotSongRes = await getSongMenu()
    const recommentSongRes = await getSongMenu("古风")
    this.setData({
      hotSongList: hotSongRes.playlists,
      recommentSongList: recommentSongRes.playlists
    })

     // 发送请求,巅峰榜
    //  原创
     hotMusicStore.dispatch("getHotMusicList", 2)
     hotMusicStore.onState("originalMusicList", res => { 
       if(!res.length) return 
       this.setData({
        originalMusicList: res.slice(0, 3)
       })
     })
     // 飙升
     hotMusicStore.dispatch("getHotMusicList", 3)
     hotMusicStore.onState("upMusicList", res => { 
       if(!res.length) return 
       this.setData({
        upMusicList: res.slice(0, 3)
       })
     })

     // 新歌
     hotMusicStore.dispatch("getHotMusicList", 0)
     hotMusicStore.onState("newMusicList", res => { 

       if(!res.length) return 
       this.setData({
        newMusicList: res.slice(0, 3)
       })
     })

    //  获取当前播放的歌曲
    playerStore.onState("songDetail", res => {
      if(res) {
        this.setData({
          currentMusicDetail: res
        })
      }
    })
    // 监听音乐播放或者暂停
    playerStore.onState("isPlaying", res => {
      this.setData({
        isPlaying: res
      })
    })
  },

  // 跳转到search
  handleToSearch() {
    wx.navigateTo({
      url: '/pages/detail-search/index',
    })
  },
  // 获取图片高度
  handleSwiperImageLoaded() {
    throttle(queryDomRect)(".swiper-image").then(res => {
      this.setData({
        swiperHeight: res.height + "px"
      })
    })
  },
  // 通过更多跳转到音乐列表页面
  handleMore(event) {
    const rankName = event.currentTarget.dataset.rankname
    wx.navigateTo({
      url: `/pages/music-list/index?rankName=${rankName}&type=rank`,
    })
  },
  handleToMusicList(event) {
    const rankName = event.currentTarget.dataset.rankname
    wx.navigateTo({
      url: `/pages/music-list/index?rankName=${rankName}&type=rank`,
    })
  },
  // 跳转到音乐播放
  handleToMusicPlayer(event) {
    wx.navigateTo({
      url: `/pages/music-player/index?id=${event.currentTarget.dataset.id}`,
    })
         
      // 将音乐列表传入store中
      playerStore.dispatch("getCurrentMusicListAction", {
        currentMusicIndex: event.currentTarget.dataset.index,
        musicList: this.data.topMusicList
      })
  },
  // 点击跳转到音乐详情
  handleCurrentPlayingMusic(event) {
    wx.navigateTo({
      url: `/pages/music-player/index?id=${event.currentTarget.dataset.id}`,
    })
  },
  // 点击暂停播放按钮
  handlePlayingMusicItem() {
    if(this.data.isPlaying) {
      audioContext.pause()
      this.setData({
        isPlaying: false
      })
    }else {
      this.setData({
        isPlaying: true
      })
      audioContext.play()
    }
  },
    // 展示歌单
    handleShowMusicList() {
      this.setData({
        isShowMusicList: true
      })
    },
    // 点击遮罩层
    handleClickCover(event) {
      this.setData({
        isShowMusicList: event.detail
      })
    },
})