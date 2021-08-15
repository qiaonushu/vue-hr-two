// 数组转树
export function fn(arr) {
  const newarr = []
  const map = {}

  arr.forEach(item => {
    item.children = []
    map[item.id] = item
  })

  arr.forEach(item => {
    const parent = map[item.pid]
    if (parent) {
      parent.children.push(item)
    } else {
      newarr.push(item)
    }
  })
  return newarr
}
