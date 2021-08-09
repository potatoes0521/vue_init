/*
 * @Author: liuYang
 * @Description: 各种转换数据格式的方法
 * @Path: 引入路径
 * @Date: 2021-03-20 16:37:05
 * @LastEditors: liuYang
 * @LastEditTime: 2021-08-09 13:38:58
 * @MustParam: 必传参数
 * @OptionalParam: 选传参数
 * @EmitFunction: 函数
 * @Slot/Props.children: 提供的插槽或render
 * @Examples: 使用示例
 */

import _uniqBy from 'loadsh/unionBy'
import _differenceBy from 'loadsh/differenceBy'
import _orderBy from 'loadsh/orderBy'
/**
 *  线性数据转换成树形数据
 * @param {Array} list tree数据
 * @param {String} key id的key
 * @param {String} Pkey 父级ID的key
 * @param {String} orderBy 按照哪个字段排序
 * @param {String} orderType 排序类型  desc 降序, asc升序
 * @param {Boolean} needParentData 是否需要父级节点数据  不推荐需要 容易造成数据臃肿
 * @return void
 */
export const listToTree = ({
  list,
  key = 'menuId',
  Pkey = 'menuPid',
  orderBy = 'order',
  orderType = ['asc'],
  needParentData = false
}) => {
  let root = {}
  root[key] = 0
  root[Pkey] = 0
  root['children'] = []
  const group = {}
  for (let index = 0; index < list.length; index += 1) {
    if (list[index][Pkey] !== null && list[index][Pkey] !== undefined) {
      if (!group[list[index][Pkey]]) {
        group[list[index][Pkey]] = []
      }
      group[list[index][Pkey]].push(list[index])
    }
  }
  const queue = []
  queue.push(root)
  while (queue.length) {
    const node = queue.shift()
    node.children = group[node[key]] && group[node[key]].length ? group[node[key]] : null
    if (node.children) {
      node.children = _orderBy(node.children, orderBy, orderType).map((item, index) => ({
        ...item,
        index, // 当前下标
        parentData: needParentData ? node : null, // 父级节点
        parentChildrenLength: node.length // 父级节点
      }))
      queue.push(...node.children)
    }
  }
  return root.children
}
/**
 * 同步选中
 * 一般应用于处理根据部分数据选中tree里面的某一部分数据
 * @param {Array[Object]} needCleanData 需要处理的树形数据
 * @param {Array[Object]} checkedData 需要参照处理的属性数据
 * @param {String} statusKey='checked'需要处理的属性
 * @param {String} idKey='id'} 关键字
 * @return void
 */
export const SyncSelection = ({
  needCleanData,
  checkedData,
  statusKey = 'checked',
  idKey = 'id'
}) => {
  if (!needCleanData || !needCleanData.length) {
    return
  }
  const mapData = checkedData.reduce(
    (res, item) => ({
      ...res,
      [item[idKey]]: item
    }),
    {}
  )
  dfs({
    needCleanData,
    mapData,
    statusKey,
    idKey
  })
}
/**
 * 递归处理
 * @param {Array[Object]} arr 要处理的数据
 * @param {Map} mapData map类型的参照数据
 * @param {String} statusKey='checked' 需要处理的属性
 * @param {String} idKey='id'} 关键字
 * @return void
 */
const dfs = ({ needCleanData, mapData, statusKey = 'checked', idKey = 'id' }) => {
  for (const item of needCleanData) {
    if (item.children) {
      dfs({
        needCleanData: item.children,
        mapData,
        statusKey,
        idKey
      })
    }
    if (item[idKey] in mapData) {
      item[statusKey] = true
    } else {
      item[statusKey] = false
    }
  }
}

/**
 * 将一个数组转化为map类型
 * @param {Array[Object]} arrayData
 * @param {String} idKey='id' 关键字
 * @return {Map} map类型的数据
 */
export const arrayToMapBy = ({ arrayData, idKey = 'id' }) => {
  const mapData = arrayData.reduce(
    (res, item) => ({
      ...res,
      [item[idKey]]: item
    }),
    {}
  )
  return mapData
}

/**
 * 根据目标查找tree里面所有路径
 * @param {Array[Object]} tree 参数描述
 * @param {Number | String} idNum 参数描述
 * @param {String} idKey='id' 参数描述
 * @return {Object}
 *  path = [path1, path2, path3, ...]
 *  pathList = [...path1, ...path2, ...path3, ...xxx]
 */
export const findPathById = (tree, idNum, idKey = 'id') => {
  if (!tree || !tree.length || isNaN(idNum)) {
    return {
      path: [],
      pathList: []
    }
  }
  let path = []
  let pathList = []
  const findPath = (tree, idNum, arr) => {
    for (let i = 0; i < tree.length; i++) {
      let tempPath = [...arr]
      tempPath.push(tree[i][idKey])
      if (tree[i][idKey] === idNum) {
        return tempPath
      }
      if (tree[i].children) {
        let result = findPath(tree[i].children, idNum, tempPath)
        if (result) {
          path.push(result)
          pathList = [...pathList, ...result]
        }
      }
    }
  }
  findPath(tree, idNum, [])
  return {
    path,
    pathList
  }
}
/**
 * 根据目标查找tree里面单条路径
 * @param {Array[Object]} tree 参数描述
 * @param {Number | String} idNum 参数描述
 * @param {String} idKey='id' 参数描述
 * @return {Array} [xxx, xxx, xxx, id]
 */
export const findOnePathById = ({ tree, idNum, idKey = 'id', arr = [], allData = false }) => {
  if (!tree || !tree.length || isNaN(idNum)) {
    return []
  }
  for (let i = 0; i < tree.length; i++) {
    let tempPath = [...arr]
    if (allData) {
      tempPath.push(tree[i])
    } else {
      tempPath.push(tree[i][idKey])
    }
    if (tree[i][idKey] === idNum) {
      return tempPath
    }
    if (tree[i].children) {
      let result = findOnePathById({
        tree: tree[i].children,
        idNum,
        idKey,
        arr: tempPath,
        allData
      })
      if (result) {
        return result
      }
    }
  }
}

/**
 * 数组扁平化
 * @param {Array[Object]} arr 要处理的数据
 * @param {String} key 关键字
 * @return void
 */
export const flatten = (arr, key = 'children') => {
  if (!arr || !arr.length) return []
  return (
    arr.reduce((result, item) => {
      return result.concat(Array.isArray(item[key]) ? flatten(item[key]) : item)
    }, []) || []
  )
}
/**
 * 树形数据转为线性数据
 * @param {Array[Object]} arr 参数描述
 * @param {String} key='children' 参数描述
 * @return void
 */
export const treeToList = (arr, key = 'children') => {
  let queen = []
  let result = []
  queen = queen.concat(arr)
  while (queen.length) {
    let item = queen.shift()
    if (item[key]) {
      queen = queen.concat(item[key])
      delete item[key]
    }

    result.push(item)
  }
  return result
}

/**
 * 根据一个关键字list  找到某个数据里面对应的数据
 * @param {Array[Number]} keyList 关键参数
 * @param {Array[Object]} data 要处理的数据
 * @param {String} key 关键字
 * @return {Object[Array]}
 * targetArr 符合关键字条件的数据
 * last 排除了符合关键字数据的数据
 */
export const handleCancelCheckedByArr = (keyList, data, key = 'permIds', uniqKey = 'id') => {
  let targetArr = []
  const mapData = keyList.reduce(
    (res, item) => ({
      ...res,
      [item]: item
    }),
    {}
  )
  data.forEach((item) => {
    for (const ite of item[key]) {
      if (ite in mapData) {
        item.checked = false
        targetArr.push(item)
        break
      }
    }
  })
  return {
    targetArr: _uniqBy(targetArr, uniqKey) || [],
    lastArr: _differenceBy(data, targetArr, uniqKey) || []
  }
}
