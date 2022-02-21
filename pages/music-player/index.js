// import { getSongDetail, getSongLyric } from "../../utils/http/api_player";
import audioContext, {playerStore} from '../../store/player-store'
// import parseLyric from "../../utils/parse-lyric";
// 切换播放模式
// const playMode = [
//   "/assets/imgs/order-play.png",
//   "/assets/imgs/single-play.png",
//   "/assets/imgs/random-play.png"
// ]


// pages/music-player/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: "",
    songDetail: {},
    // 确定播放还是暂停
    isPlaying: false,
    // 确定播放模式
    modeIndex: 0,
    playMode: [
      "/assets/imgs/order-play.png",
      "/assets/imgs/single-play.png",
      "/assets/imgs/random-play.png"
    ],
    // 歌曲当前时间
    currentTime: 0,
    sliderValue: 0,
    // 滑块是否正在移动
    isChanging: false,
    // 当前歌词
    currentLyricText: "",
    lyricArr: [],
    // 是否展示歌词页
    isShowLyric: false,
    // 当前歌词的index
    currentLyricIndex: 0,
    // 滚动条的位置
    scrollTop: 0,
    // 是否正在滚动歌词
    isDragging: false,
    // 音乐列表
    musicList: [],
    currentMusicIndex: 0,
    // 是否展示播放列表
    isShowMusicList: false,
    // 设置播放列表的高度
    // playListHeight: 0
  },
  onLoad: function (options) {
    // 改变播放图标,再次点击同一个歌曲。
    // this.setData({
    //   isPlaying: true
    // })
    // audioContext.play()
    // 当音乐暂停时
    // audioContext.onPause(() => {
    //   this.setData({
    //     isPlaying: false
    //   })
    // })
    // // 监听音乐播放
    // audioContext.onPlay(() => {
    //   this.setData({
    //     isPlaying: true
    //   })
    // })
    
    // // 监听音乐播放或者暂停
    playerStore.onState("isPlaying", res => {
      this.setData({
        isPlaying: res
      })
    })
    
    const id = options.id;
    playerStore.dispatch("getRequestSongeDetialAction", {
      id
    })

    // 更新对应的数据
    playerStore.onStates(["songDetail", "lyricArr"], ({songDetail, lyricArr}) => {
     if(songDetail) this.setData({songDetail});
     if(lyricArr) this.setData({lyricArr});
    })

    playerStore.onStates(["currentTime", "currentLyricText", "currentLyricIndex"], 
    ({currentTime, currentLyricText, currentLyricIndex}) => {
      // 监听当前持续时间变化。在滑块滑动的时候，currentTime的逻辑已经在那个事件中处理
      // 这里不需要处理，防止冲突。
      if(currentTime && !this.data.isChanging) this.setData({
        currentTime,
        sliderValue: (currentTime / this.data.songDetail.dt) * 100
      });
      if(currentLyricText) this.setData({currentLyricText});
      // 监听歌词变化
      if(currentLyricIndex) this.setData({currentLyricIndex, scrollTop: currentLyricIndex * 40});
    }
    )
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

    // 音乐播放完毕后，自动播放下一首
    audioContext.onEnded(() => {
      this.handleNextMusic()
    })

    // // 计算播放列表的高度
    // this.setData({
    //   playListHeight: this.data.musicList.length * 50
    // })
    // if(this.data.playListHeight > 600) {
    //   this.setData({
    //     playListHeight: 600
    //   })
    // }
    
    
    
    // 监听播放暂停
    // audioContext.onPause(() => {
    //     this.setData({
    //       isPlaying: true
    //     })
    // })
    
    // // 请求音乐详情
    // getSongDetail(this.data.id).then(res => {
    //   this.setData({
    //     songDetail: res.songs[0]
    //   })
    // })
    // // 请求歌词
    // getSongLyric(id).then(res => {
    //   const lyric = res.lrc.lyric
    //   const lyricArr = parseLyric(lyric)
    //   this.setData({
    //     lyricArr
    //   })
    // })
    // // 处理音乐播放
    // audioContext.stop()
    // audioContext.src = `https://music.163.com/song/media/outer/url?id=${id}.mp3`
    // // audioContext.autoplay = true

    // audioContext.onCanplay(() => {
    //   audioContext.play()
    // })

    // audioContext.onTimeUpdate(() => {
    //   const currentTime = audioContext.currentTime * 1000
    //   // 当滑块没有正在移动的时候，才去改变
    //   if(!this.data.isChanging) {
    //     // 这里的currentTime是为了防止和移动时修改时间冲突，
    //     // 所以让其再滑动后在修改
    //     this.setData({
    //       currentTime,
    //       sliderValue: (currentTime / this.data.songDetail.dt) * 100
    //     })
    //   }
      
    //   // 展示歌词
    //   this.matchCurrentLyricText(currentTime)
    // })
  },
  // 处理播放按钮
  handlePlayBtn() {
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
  // 改变歌曲切换模式
  handleChangeMode() {
    // 每次点击都会加一。但是当modeIndex为3时，让其等于0
    if(this.data.modeIndex < 2) {
      this.setData({
        modeIndex: ++this.data.modeIndex
      })
    }else {
      this.setData({
        modeIndex: 0
      })
    }
  },
  // 当点击滑块位置时
  handleClick(event) {
    const value = event.detail.value
    // audioContext.pause()
    audioContext.seek((this.data.songDetail.dt * value / 100) / 1000)
    this.setData({
      sliderValue: value,
      // 这里一定要设置成false。在滑动的时候他被设置成了true
      isChanging: false,
      // 点击时，将播放按钮改变
      isPlaying: true
    })
  },
  //当滑动滑块位置时
  handleSlider(event) {
    const value = event.detail.value
    // 滑动的时候，还要计算当前的时间
    this.setData({
      isChanging: true,
      currentTime: this.data.songDetail.dt * value / 100
    })
  },
  // 匹配到当前的歌词
  matchCurrentLyricText(currentTime) {
    const lyricArr = this.data.lyricArr;
    const currentLyricText = this.data.currentLyricText
    for(let i in lyricArr) {
      if(lyricArr[i].time > currentTime) {
        if(this.data.currentLyricIndex !== i - 1) {
          this.setData({
            currentLyricText: lyricArr[i - 1].text,
            currentLyricIndex: i - 1
          })
          // 当正在滚动歌词的时候，不要再这里修改scrollTop
          if(!this.data.isDragging) {
            this.setData({
              scrollTop: (i - 1) * 40
            })
          }
        }
        // if(currentLyricText !== this.data.currentLyricText) {
        //   setTimeout(() => {
        //     this.setData({
        //       scrollTop: this.data.scrollTop + 25
        //     })
        //   }, 1000)
        // }
        break;
      }
    }
  },
  // 点击背景切换页面
  handleClickBg() {
    this.setData({
      isShowLyric: !this.data.isShowLyric
    })
  },
  // // 点击滚动歌词的一项
  // handleClickLyricItem(event) {
  //   const index = event.currentTarget.dataset.index;
  //   // 取出时间
  //   const time = this.data.lyricArr[index].time;
  //   this.setData({
  //     currentLyricIndex: index,
  //     // 设置当前播放的时间
  //     currentTime: time
  //   })
  // },

  // // 当滚动歌词的时候，让其跟随滚动，而不是跟随歌词滚动
  // handleDragging(event) {
  //   const scrollTop = event.detail.scrollTop;
  //   console.log("sc", scrollTop)
  //   this.setData({
  //     scrollTop,
  //     isDragging: true
  //   })
  // },
  // // 滚动结束
  // handleDragend() {
  //   this.setData({
  //     isDragging: false
  //   })
  // },
  // 处理返回按钮
  handleBackBtn() {
    wx.navigateBack()
  },
  // 播放下一首
  handleNextMusic() {
    let index = this.data.currentMusicIndex;
    switch(this.data.modeIndex) {
      case 0: // 顺序播放
        if(index === this.data.musicList.length - 1) {
          index = 0;
        }else {
          index++;
        } 
        break;
      case 1: // 单曲播放
        break;  
      case 2: // 随机播放
        index = Math.floor(Math.random() * this.data.musicList.length)
    }
   
    playerStore.dispatch("getRequestSongeDetialAction", {
      id: this.data.musicList[index].id,
      isRefresh: true
    })
    this.setData({currentMusicIndex: index, isPlaying: true})
    // console.log("====", this.data.musicList, index, this.data.musicList[index].name)

  },
  // 播放上一首
  handlePrevMusic() {
    let index = this.data.currentMusicIndex;
    switch(this.data.modeIndex) {
      case 0: // 顺序播放
        if(index === 0) {
          index = this.data.musicList.length - 1;
        } else {
          index--;
        }
        break;
      case 1: // 单曲播放
        break;  
      case 2: // 随机播放
        index = Math.floor(Math.random() * this.data.musicList.length)
    }
    console.log("index========", index)
    // 切换歌曲是，即使同一个id也要重新播放
    playerStore.dispatch("getRequestSongeDetialAction", {
      id: this.data.musicList[index].id,
      isRefresh: true
    })
    this.setData({currentMusicIndex: index, isPlaying: true})
    // console.log("====", this.data.musicList, index, this.data.musicList[index].name)
  },
  // 以下都是播放列表的展示逻辑
  // 展示歌单
  handleShowMusicList() {
    this.setData({
      isShowMusicList: true
    })
  },
  // // 点击列表的某一项
  // handleMusicListItem(event) {
  //   const id = event.currentTarget.dataset.id
  //   this.setData({
  //     id
  //   }) 
  //   // 播放点击的音乐
  //   playerStore.dispatch("getRequestSongeDetialAction", {
  //     id
  //   })
  //   // 将音乐列表传入store中
  //   playerStore.dispatch("getCurrentMusicListAction", {
  //     currentMusicIndex: event.currentTarget.dataset.index,
  //     musicList: this.data.musicList
  //   })
  // },
  // 点击遮罩层
  handleClickCover(event) {
    this.setData({
      isShowMusicList: event.detail
    })
  },
  onUnload: function () {

  },

})