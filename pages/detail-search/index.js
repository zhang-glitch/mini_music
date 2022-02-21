import { getHotSearchKey, getSearchMessge, getSearch } from "../../utils/http/api_search";
import debounce from "../../utils/debounce"
const debounceGetSearchMessge = debounce(getSearchMessge, 200)
// pages/detail-search/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hotKeys: [],
    inputMessage: "",
    searchList: [],
    ensureSearchMusicList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 热门搜索
    getHotSearchKey().then(res => {
      this.setData({
        hotKeys: res.result.hots
      })
    })
   
  },

  // 搜索
  handleMessageChange(event) {
    // 先清空上一次的
    this.setData({
      inputMessage: event.detail,
      ensureSearchMusicList: []
    })
    if(!event.detail) return
    // 搜索数据
    debounceGetSearchMessge(this.data.inputMessage).then(res => {
      this.setData({
        searchList: res.result
      })
    })
  },
  // 确定搜索
  handleSearch() {
    const inputMessage = this.data.inputMessage;
    getSearch(inputMessage).then(res => {
      this.setData({
        ensureSearchMusicList: res.result.songs
      })
    })
  },
  // 点击每一项item
  handleItem(event) {
    const item = event.currentTarget.dataset.item;
    this.setData({
      inputMessage: item.name
    })
    getSearch(item.name).then(res => {
      this.setData({
        ensureSearchMusicList: res.result.songs
      })
    })
  },
  // 点击热门关键字
  handleTagSearch(event) {
    const keyword = event.currentTarget.dataset.name;
    this.setData({
      inputMessage: keyword
    })
    getSearch(keyword).then(res => {
      this.setData({
        ensureSearchMusicList: res.result.songs
      })
    })
  },
  // 清空搜索
  handleClear() {
    this.setData({
      ensureSearchMusicList: []
    })
  },

  
  onUnload: function () {

  },

 
})