export default function(lyric) {
  // 1. 先根据换行符分割字符串
  if(!lyric) return
  const sliptLyric = lyric.split("\n");
  // 2. 遍历每一时刻的字符串和时间.通过正则匹配
  // [00:00.000] 作词 : 陶旧
  const strRegExp = /\[(\d{2})\:(\d{2})\.(\d{2,3})\]/
  const lyricArr = []
  for(let item of sliptLyric) {
    const partter = strRegExp.exec(item)
    if(!partter) continue;
    // 3.计算毫秒数
    const m = partter[1] * 60 * 1000
    const s = partter[2] * 1000
    const ms = partter[3].length === 2 ? partter[3] * 10 : partter[3] * 1;
    const totalMillSecond = m + s + ms;
    // 4. 截取歌词
    const text = item.replace(strRegExp, "");
    lyricArr.push({time: totalMillSecond, text})
  }
  return lyricArr
}