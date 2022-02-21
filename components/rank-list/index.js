// components/rank-list/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    musicList: {
      type: Array,
      value: []
    },
    title: {
      type: String,
      value: ''
    },
    itemImageUrl: {
      type: String,
      value: ""
    },
    // 判断是否有音乐播放
    isPlaying: {
      type: Boolean,
      value: false
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

  }
})
