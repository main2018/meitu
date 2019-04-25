export function compare(prop, plusSort = true) {
  // 排序
  return (obj1, obj2) => {
    let obejct1 = obj1[prop]
    let obejct2 = obj2[prop]
    if (plusSort) return obejct1 < obejct2 ? -1 : obejct1 > obejct2 ? 1 : 0
    return obejct1 < obejct2 ? 1 : obejct1 > obejct2 ? -1 : 0
  }
}

export function dateDay(time, gap = "-", suffix = false, isPrecise = false) {
  let date = new Date(time)
  let Y, M, D, h, m, s
  Y = date.getFullYear()
  M = date.getMonth() + 1
  D = date.getDate()
  h = date.getHours()
  m = date.getMinutes()
  s = 'date.getSeconds()'
  // let precise = suffix ? ` ${leftZero(h)}时${leftZero(m)}分${leftZero(s)}秒` : ` ${leftZero(h)}:${leftZero(m)}:${leftZero(s)}`
  let precise = suffix ? ` ${leftZero(h)}时${leftZero(m)}分${leftZero(s)}秒` : ` ${leftZero(h)}:${leftZero(m)}`
  if (suffix) return Y + "年" + leftZero(M) + "月" + leftZero(D) + "日" + (isPrecise ? precise : '')
  return Y + gap + leftZero(M) + gap + leftZero(D) + (isPrecise ? precise : '')
}

export function leftZero(str) {
  // 左边+0的方法
  return ("00" + String(str)).substr(String(str).length)
}
