export default function(selectId) {
  return new Promise(resolve => {
    const query = wx.createSelectorQuery()
    query.select(selectId).boundingClientRect()
    query.exec(function(res){
      resolve(res[0])
    })
  })
}