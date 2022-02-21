
import {getTopMvs} from '../../utils/http/api_video.js'

// pages/home-video/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    topMvs: [],
    // 判断刷新时候还有数据
    hasMore: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // const res = await getTopMvs(0)
    // this.setData({
    //   topMvs: res.data
    // })
    this.getTopMvsData(0)
  },

  //  通用请求函数
  async getTopMvsData(offset) {
    if(!this.data.hasMore && offset !== 0) return
    const res = await getTopMvs(offset)
    let newData = this.data.topMvs
    if(offset === 0) {
      // 首次请求
      newData = res.data
    }else {
      // 上拉加载
      newData = [...newData, ...res.data]
    }
    this.setData({
      topMvs: newData,
      hasMore: res.hasMore
    })
    wx.stopPullDownRefresh()
  },


  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    // const res = await getTopMvs(0)
    // this.setData({
    //   topMvs: res.data
    // })
    // wx.stopPullDownRefresh()
    this.getTopMvsData(0)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    // if(!this.data.hasMore) return
    // const res = await getTopMvs(this.data.topMvs.length)
    // this.setData({
    //   topMvs: [...this.data.topMvs, ...res.data],
    //   hasMore: res.hasMore
    // })
    
    this.getTopMvsData(this.data.topMvs.length)
  },

  // 跳转到详情页
  toVideoDetail(event) {
   
    const id = event.currentTarget.dataset.item.id;
    wx.navigateTo({
      url: `../video-detail/index?id=${id}`,
    })
  }

})