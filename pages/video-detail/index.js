import audioContext from "../../store/player-store";
import { getMvDetailById, getMvUrlById, getMvRelatedDataById } from "../../utils/http/api_video"

// pages/video-detail/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mvUrl: "",
    detailInfo: {},
    relatedData: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    // 先将正在播放的音乐关闭
    audioContext.pause()
    const id = options.id
    // 请求详情播放url
    const urlRes = await getMvUrlById(id);
    this.setData({
      mvUrl: urlRes.data.url
    })
    // 请求详情数据
    const detailRes = await getMvDetailById(id);
    this.setData({
      detailInfo: detailRes.data
    })

    // 请求相关视频数据
    const relateRes = await getMvRelatedDataById(id)
    this.setData({
      relatedData: relateRes.data
    })
  },

  toVideoDetail(event) {
    const id = event.currentTarget.dataset.item.id;
    wx.navigateTo({
      url: `../video-detail/index?id=${id}`,
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})