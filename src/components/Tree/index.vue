<!--
 * @Author: liuYang
 * @Description: 树形组件
    因需求要求tree里面相同id的要一起选中
    市面上没有可以实现的组件
 * @Path:   import Tree from '@components/Tree'
 * @Date: 2021-04-01 11:44:44
 * @LastEditors: liuYang
 * @LastEditTime: 2021-05-12 17:54:50
 * @MustParam: 必传参数
    treeData 要渲染的树形数据
    labelKey 要渲染的文字的key
    allTreeData 所有的树的扁平化数据
    treeCheckedList 树里面已经选择的数据
      传参必须用.sync修饰符
      传参必须用.sync修饰符
      传参必须用.sync修饰符
    idKey 用来处理数据的关键字   如id
 * @OptionalParam: 选传参数
 * @EmitFunction: 函数
      this.$emit('update:treeCheckedList', 已选中的数据)
 * @Slot/Props.children: 提供的插槽或render
 * @Examples: 使用示例
-->
<template lang="pug">
  el-tree(
    :data="treeData"
    default-expand-all
    :props="defaultProps"
  )
    span( class="custom-tree-node" slot-scope="{ node, data }" @click.stop="return false")
      el-checkbox.checkbox( :disabled="!data.checkable || disabled || ((!data.children || !data.children.length) && data.id < 0)"  :indeterminate="data.isIndeterminate" :value="data.checked" @change="onClick(data)" )
      span( :title="data[labelKey]" ) {{data[labelKey]}}
</template>
<script>
  import { flatten, findPathById, arrayToMapBy } from '@/utils/treeTool'
  import { SyncSelectionOnlyRoot, SyncSelectionOnlyLeaf, handleFromToTree } from './utils'
  import _uniqBy from 'loadsh/unionBy'
  import _differenceBy from 'loadsh/differenceBy'
  import _intersectionBy from 'loadsh/intersectionBy'

  export default {
    name: 'Tree',
    props: {
      treeData: {
        type: Array,
        required: true,
        default: () => []
      },
      labelKey: {
        type: String,
        required: true,
        default: 'name'
      },
      allTreeData: {
        type: Array,
        required: true,
        default: () => []
      },
      treeCheckedList: {
        type: Array,
        required: true,
        default: () => []
      },
      idKey: {
        type: String,
        required: true,
        default: 'id'
      },
      disabled: {
        type: Boolean,
        required: false,
        default: false
      }
    },
    data() {
      return {
        defaultProps: {
          children: 'children',
          label: 'name'
        }
      }
    },
    components: {},
    methods: {
      /**
       * 当点击了节点
       * @param {Object} data node节点数据
       * @return void
       */
      onClick(data) {
        if (!data.children) {
          this.onClickLeaf(data)
        } else {
          this.handleClickBranch(data)
        }
      },
      /**
       * 当点击了叶节点
       * @param {Object} data node节点数据
       * @return void
       */
      onClickLeaf(data) {
        if (data.checked) {
          // 要取消
          this.$set(data, 'checked', false)
          data.from && data.from.clear()
          this.$emit('onClickLeaf', { data, checked: false })
          this.handleRightCheckedList(false, data)
        } else {
          // 要选中
          this.$set(data, 'checked', true)
          data.from ? data.from.set('tree') : (data.from = new Map().set('tree'))
          this.$emit('onClickLeaf', { data, checked: true })
          this.handleRightCheckedList(true, data)
        }
      },
      /**
       * 处理右侧已选中
       * @param {Boolean} checkedType 是选中还是删除
       * @param {Object} data 当前要处理的数据
       * @return void
       */
      handleRightCheckedList(checkedType, data) {
        if (checkedType) {
          // 要选中
          const newCheckedList = [...this.treeCheckedList, data]
          this.$emit('update:treeCheckedList', _uniqBy(newCheckedList, this.idKey))
        } else {
          // 要取消
          const newCheckedList = this.treeCheckedList.filter(
            (item) => item[this.idKey] !== data[this.idKey]
          )
          this.$emit('update:treeCheckedList', _uniqBy(newCheckedList, this.idKey))
        }
        this.handlePathChecked(data, checkedType)
      },
      /**
       * 找到被选中的数据的可选中路径 然后挨个选中
       * @param {Object} data 参数描述
       * @param {Boolean} checkedType 本次是选中还是取消
       * @return void
       */
      handlePathChecked(data, checkedType) {
        // 先找到所有可选路径
        const pathList = findPathById(this.treeData, data[this.idKey])?.path
        for (let i of pathList) {
          const list = i
            .filter((item) => item !== data[this.idKey])
            .map((item) => {
              return { id: item }
            })
          const mapData = arrayToMapBy({
            arrayData: list,
            idKey: this.idKey
          })
          // 根据路径处理根节点
          SyncSelectionOnlyRoot({
            mapData: mapData,
            checkedType,
            needCleanData: this.treeData
          })
        }
      },
      /**
       * 当点击了分支节点
       * @param {Object} data 数据
       * @return void
       */
      handleClickBranch(data) {
        const childrenData = flatten(data.children)
        const filterData = childrenData.filter((item) => item.id > 0)
        if (data.checked) {
          this.$emit('onClickBranch', { arr: filterData, checked: false })
          this.handleCancelCheckedByArr({ checkData: childrenData })
        } else {
          this.$emit('onClickBranch', { arr: filterData, checked: true })
          // 现在是取消状态  点击是要选中
          this.handleCheckedByArr(childrenData)
        }
      },
      /**
       * 取消选中
       * 根据某个数组来给树里面对应的取消选中
       * @param {Array[Object]} checkData 应该要取消的一些数据
       * @return void
       */
      handleCancelCheckedByArr({ checkData, permTabData = {} }) {
        if (permTabData && permTabData.id) {
          checkData = checkData
            .map((item) => {
              if (item.from && item.from.has(permTabData.id)) {
                item.from.delete(permTabData.id)
              }
              return item
            })
            .filter((item) => !item.from || !item.from.size)
          if (!checkData.length) return
        }
        // 现在是选中状态  被点击证明要取消选中
        // 首先先删除已选中里跟他相同ID的数据  拿现在的对比以前有得就是应该留下的
        const newCheckedList = _differenceBy(this.treeCheckedList, checkData, this.idKey).filter(
          (item) => item[this.idKey] > 0
        )
        // newCheckedList 是现在应该是选中态的
        this.$emit('update:treeCheckedList', _uniqBy(newCheckedList, this.idKey))
        // 先按照已选中数据全部重置整个tree的选中态
        // 只重置叶节点的
        // 选中所有应该选中的子节点
        const mapData = arrayToMapBy({ arrayData: newCheckedList })
        SyncSelectionOnlyLeaf({
          needCleanData: this.treeData,
          mapData: mapData,
          fromKey: 'from',
          fromData: permTabData[this.idKey] || 'tree'
        })
        this.$nextTick(() => {
          // 找当前节点的子级节点
          const childrenNode = checkData.filter((item) => item[this.idKey] > 0)
          // 每个应该取消选中的子节点找到对应 选择的路径 然后取消选中
          for (let i of childrenNode) {
            this.handlePathChecked(i, false)
          }
          // 这个时候要取消选中的父节点状态已经全部重置
          this.$nextTick(() => {
            // 这里把应该选中的每个子节点的父节点再选中
            for (let i of newCheckedList) {
              this.handlePathChecked(i, true)
            }
          })
        })
      },
      /**
       * 选中
       * 根据某个数组来给树里面对应的选中
       * @param {Array[Object]} checkData 应该要选中的一些数据
       * @param {Boolean} transform=false 如果是从编辑来的   没有详细数据  需要数据对比然后拿到全量数据
       * @return void
       */
      handleCheckedByArr(checkData, transform = false, permTabData = {}) {
        if (transform) {
          // 在全部数据里找到相同的数据
          checkData = _intersectionBy(this.allTreeData, checkData, this.idKey)
        }
        // 处理来源
        checkData = checkData.map((item) => {
          item.from
            ? item.from.set(permTabData?.id || 'tree')
            : (item.from = new Map().set(permTabData?.id || 'tree'))
          return item
        })
        if (!checkData.length) return
        // 处理合并  得到应该选中的数据
        const newCheckedList = [...checkData, ...this.treeCheckedList].filter(
          (item) => item[this.idKey] > 0
        )
        this.$emit('update:treeCheckedList', _uniqBy(newCheckedList, this.idKey))
        const mapData = arrayToMapBy({ arrayData: newCheckedList })
        // 选中所有应该选中的子节点
        SyncSelectionOnlyLeaf({
          needCleanData: this.treeData,
          mapData: mapData,
          fromKey: 'from',
          fromData: permTabData[this.idKey] || 'tree'
        })
        // 根据要选中的子节点找到 选中路径  然后挨个选中
        this.$nextTick(() => {
          for (let i of newCheckedList) {
            this.handlePathChecked(i, true)
          }
        })
      },
      /**
       * 处理快速选中数据被触发取消时  将树上的来源更改为游离权限
       * @param {Array} arr 参数描述
       * @return void
       */
      handleInvalidQuickCheckFromToTree(arr) {
        const mapData = arrayToMapBy({ arrayData: arr })
        // 这里只处理了已选中数据
        // 原因如下
        // 1.tree上的from没有响应在界面上  加上树形结构需要遍历的次数太多
        // 2.就算树上选中  来源里面有这个  在最后给服务端提交数据的时候 ChoosePerm 组件内也会忽略
        //    这个组件是处理treeCheckedList里面的数据 只要这个更改了这个组件是处理treeCheckedList里面的数据就够用
        const data = handleFromToTree({
          needHandleData: this.treeCheckedList,
          mapData
        })
        this.$emit('update:treeCheckedList', _uniqBy(data, this.idKey))
      }
    }
  }
</script>
<style scoped lang="scss">
  .custom-tree-node {
    display: flex;
    align-items: center;
    font-size: 14px;
    font-weight: 400;
    color: #666666;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    word-break: break-all;
    width: 100%;
    display: inline-block;
    .checkbox {
      width: 14px;
      height: 14px;
    }
    > span {
      margin-left: 5px;
    }
  }
</style>
