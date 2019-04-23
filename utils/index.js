export function compare(prop, plusSort = true) {
  // 排序
  return (obj1, obj2) => {
    let obejct1 = obj1[prop]
    let obejct2 = obj2[prop]
    if (plusSort) return obejct1 < obejct2 ? -1 : obejct1 > obejct2 ? 1 : 0
    return obejct1 < obejct2 ? 1 : obejct1 > obejct2 ? -1 : 0
  }
}