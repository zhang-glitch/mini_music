import {HYEventStore} from 'hy-event-store'
import { getSongDetail, getSongLyric } from '../utils/http/api_player'
import parseLyric from '../utils/parse-lyric'

// const audioContext = wx.createInnerAudioContext()
const audioContext = wx.getBackgroundAudioManager()
// 保留当前歌曲的id
export const playerStore = new HYEventStore({
  state: {
    id: 0,
    // 当前歌词
    currentLyricText: "",
    // 当前歌词的index
    currentLyricIndex: 0,
    lyricArr: [],
    songDetail: {},
    currentTime: 0,
    // 歌曲列表
    musicList: [],
    currentMusicIndex: 0,
    // 是否是第一次播放音乐
    isFirst: true,
    // 音乐是否正在播放
    isPlaying: true
  },
  actions: {
    // 请求音乐数据
    getRequestSongeDetialAction(ctx, {id, isRefresh = false}) {
      if(ctx.id == id && !isRefresh) return;
      // 先清空上次歌曲的内容
      ctx.currentLyricText = ""
      ctx.currentLyricIndex = 0
      ctx.lyricArr = []
      ctx.songDetail = {}
      ctx.currentTime = 0
      ctx.id = id

      // 请求音乐详情
      getSongDetail(id).then(res => {
        ctx.songDetail = res.songs[0]
        audioContext.title = ctx.songDetail.name
      })
      // 请求歌词
      getSongLyric(id).then(res => {
        const lyric = res.lrc.lyric
        const lyricArr = parseLyric(lyric)
        ctx.lyricArr = lyricArr
      })

      // 播放音乐并且监听播放过程
      // 处理音乐播放
      audioContext.stop()
      audioContext.src = `https://music.163.com/song/media/outer/url?id=${ctx.id}.mp3`
      audioContext.title = ctx.songDetail.name
      // audioContext.autoplay = true
      if(ctx.isFirst) {
        this.dispatch("playMusicAction")
        ctx.isFirst = false
      }
    },

    // 播放音乐
    playMusicAction(ctx) {
      
      // 监听音乐可以播放
      audioContext.onCanplay(() => {
        audioContext.play()
      })

      // 监听音乐播放的过程
      audioContext.onTimeUpdate(() => {
        const currentTime = audioContext.currentTime * 1000
        ctx.currentTime = currentTime
        
        // 展示歌词
        // 匹配到当前的歌词
        const lyricArr = ctx.lyricArr;
        for(let i in lyricArr) {
          if(lyricArr[i].time > currentTime) {
            if(ctx.currentLyricIndex !== i - 1) {
                ctx.currentLyricText = lyricArr[i - 1].text
                ctx.currentLyricIndex = i - 1
            }
            break;
          }
        }
      })
      // 监听音乐是否暂停
      audioContext.onPause(() => {
        ctx.isPlaying = false
      })
      // 监听音乐是否播放
      audioContext.onPlay(() => {
        // 由于音乐被关闭后，音乐播放的url会被清除，所以，我们需要再次请求
        audioContext.src = `https://music.163.com/song/media/outer/url?id=${ctx.id}.mp3`
        audioContext.title = ctx.songDetail.name
        ctx.isPlaying = true
      })
      // 监听音乐被关闭
      audioContext.onStop(() => {
        ctx.isPlaying = false
      })
    },

    // 获取当前音乐列表
    getCurrentMusicListAction(ctx, {musicList, currentMusicIndex}) {
      ctx.musicList = musicList
      ctx.currentMusicIndex = currentMusicIndex
    }
  }
})
export default audioContext