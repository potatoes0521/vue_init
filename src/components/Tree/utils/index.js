/*
 * @Author: liuYang
 * @Description: 请填写描述信息
 * @Path: 引入路径
 * @Date: 2021-04-19 15:12:24
 * @LastEditors: liuYang
 * @LastEditTime: 2021-04-19 16:06:02
 * @MustParam: 必传参数
 * @OptionalParam: 选传参数
 * @EmitFunction: 函数
 * @Slot/Props.children: 提供的插槽或render
 * @Examples: 使用示例
 */
/**
 * 处理来源 比如角色来的来源改为从树上来
 * @return void
 */
export const handleFromToTree = ({ needHandleData, mapData }) => {
  for (const item of needHandleData) {
    if (item.from) {
      const arr = Array.from(item.from.keys())
      for (const ite of arr) {
        if (ite in mapData) {
          item.from.set('tree')
          item.from.delete(ite)
        }
      }
    }
  }
  return needHandleData
}

/**
 * 有条件的同步选中
 * 只处理跟节点的同步选中
 * @param {Array[Object]} arr 要处理的数据
 * @param {Map} mapData map类型的参照数据
 * @param {String} statusKey='checked' 需要处理的属性
 * @param {String} idKey='id'} 关键字
 * @return void
 */
export const SyncSelectionOnlyRoot = ({
  needCleanData,
  mapData,
  statusKey = 'checked',
  idKey = 'id',
  indeterKey = 'isIndeterminate',
  checkedType
}) => {
  for (const item of needCleanData) {
    if (item.children) {
      SyncSelectionOnlyRoot({
        needCleanData: item.children,
        mapData,
        statusKey,
        idKey,
        indeterKey,
        checkedType
      })
    }
    // 如果是选中处理选中父级
    if (checkedType) {
      if (item[idKey] in mapData) {
        // 如果是全选 更改父级的checked
        const everyChecked = item.children?.every((item) => item[statusKey])
        if (everyChecked) {
          item[statusKey] = true
          item[indeterKey] = false
        } else {
          // 不是全选就更改半选
          item[indeterKey] = true
        }
      }
    } else {
      if (item[idKey] in mapData) {
        // 在取消当前跟节点时候
        // 如果是 有任何一个是选中的 那就给半选选中
        const someChecked = item.children?.some((item) => item[statusKey] || item[indeterKey])
        if (someChecked) {
          const everyChecked = item.children?.every((item) => item[statusKey])
          item[indeterKey] = true
          // 如果每个都是选中 那就是全选状态
          if (everyChecked) {
            item[statusKey] = true
            item[indeterKey] = false
          } else {
            item[statusKey] = false
          }
        } else {
          item[indeterKey] = false
          item[statusKey] = false
        }
      }
    }
  }
}

/**
 * 有条件的同步选中
 * 只处理叶节点的同步选中
 * @param {Array[Object]} arr 要处理的数据
 * @param {Map} mapData map类型的参照数据
 * @param {String} statusKey='checked' 需要处理的属性
 * @param {String} idKey='id'} 关键字
 * @return void
 */
export const SyncSelectionOnlyLeaf = ({
  needCleanData,
  mapData,
  statusKey = 'checked',
  idKey = 'id',
  fromKey,
  fromData
}) => {
  for (const item of needCleanData) {
    if (item.children) {
      SyncSelectionOnlyLeaf({
        needCleanData: item.children,
        mapData,
        statusKey,
        fromKey,
        fromData
      })
    }
    if (!item.children) {
      if (item[idKey] in mapData) {
        item[statusKey] = true
        // if (fromKey) {
        //   item[fromKey]
        //     ? item[fromKey].set(fromData || 'tree')
        //     : (item[fromKey] = new Map().set(fromData || 'tree'))
        // }
      } else {
        // 先取消选中
        item[statusKey] = false
        if (fromKey) {
          item[fromKey] && item[fromKey].clear()
        }
      }
    }
  }
}
