class MyRequest {
  constructor(baseUrl) {
    // http://123.207.32.32:9001/
    this.baseUrl = baseUrl
  }

  get(url,data) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: this.baseUrl + url,
        method: "GET",
        data,
        success(result) {
          resolve(result.data)
        },
        fail(err) {
          reject(err)
        }
      })
    })
  }


  post(url,data) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: this.baseUrl + url,
        method: "POST",
        data,
        success(result) {
          resolve(result.data)
        },
        fail(err) {
          reject(err)
        }
      })
    })
  }
}

const myRequest = new MyRequest("http://123.207.32.32:9001/")
// const myRequest = new MyRequest("http://127.0.0.1:3000/")
// 当手机热点和电脑热点连接的同一个时。
// const myRequest = new MyRequest("http://192.168.43.63:3000/")
// const myRequest = new MyRequest("https://2ecc-2409-8944-87f0-1a5-68fb-38b2-3c7a-8df2.ngrok.io/")

export default myRequest