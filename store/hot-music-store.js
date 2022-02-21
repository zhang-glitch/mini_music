import {HYEventStore} from 'hy-event-store'
import { getTopMusicList } from '../utils/http/api_music'


export const hotMusicStore = new HYEventStore({
  state: {
    hotMusicList: [],
    upMusicList: [],
    newMusicList: [],
    originalMusicList: []
  },
  actions: {
    async getHotMusicList(ctx, pload = 1) {
          // 请求推荐歌曲 1 0 新歌， 1热门， 2原创， 3飙升
      switch (pload) {
        case 0:
          // 新歌榜
          const newMusicList = await getTopMusicList(0)
          ctx.newMusicList = newMusicList.playlist.tracks
          break;
        case 2:
          // 原创
          const originalMusicList = await getTopMusicList(2)
          ctx.originalMusicList = originalMusicList.playlist.tracks
          break;
        case 3:
          // 飙升
          const upMusicList = await getTopMusicList(3)
          ctx.upMusicList = upMusicList.playlist.tracks
          break;
        default:
          // 热门
          const hotMusicList = await getTopMusicList()
          ctx.hotMusicList = hotMusicList.playlist.tracks
          break;
      }
    }
  }
})

