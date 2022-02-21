// components/nav-bar/index.js
Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  properties: {
    text: {
      type: String,
      value: "默认文字"
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    statusBarHeight: getApp().globalData.statusBarHeight
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 发送事件
    handleTap() {
      this.triggerEvent("handleClick")
    }
  }
})
