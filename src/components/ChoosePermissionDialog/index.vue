<!--
 * @Author: liuYang
 * @Description: 选择权限对话框
 * @Path:   import ChoosePermissionDialog from '@components/ChoosePermissionDialog'
 * @Date: 2021-03-17 14:35:24
 * @LastEditors: liuYang
 * @LastEditTime: 2021-07-16 17:46:44
 * @MustParam: 必传参数
 * @OptionalParam: 选传参数
 * @EmitFunction: 函数
 * @Slot/Props.children: 提供的插槽或render
 * @Examples: 使用示例

  ChoosePermissionDialog(
    ref="choosePermission"
    @onSubmitRegister="onRegisterChecked"
  )

-->
<template lang="pug">
  el-dialog(
    title="选择权限"
    :visible.sync="dialogVisible"
    width="1045px"
    destroy-on-close
  )
    .dialog-wrapper
      .choose-list-wrapper
        .title 选择
        .wrapper.form-wrapper
          el-form.form(
            @submit.native.prevent
            ref="form"
            :model="form"
            label-width="100px"
            @keyup.enter.native="searchKeyword('form')"
          )
            el-input(
              clearable
              @clear="onClearInput"
              v-model="form.keyword"
              placeholder="请输入搜索关键字"
              prefix-icon='el-icon-search'
              @input="debounceSearchKeyword"
            )
          .check-list-wrapper
            template( v-if="!form.keyword && !searchState" )
              .check-list-item( v-for="item in permList" :key="item.permId" )
                el-checkbox(
                  v-model="item.checked"
                  @change="checkedBoxChange(item)"
                )
                span.perm-text {{item.permName}} {{item.permUri}}
            template( v-else )
              .check-list-item( v-for="item in keywordPermList" :key="item.permId" )
                el-checkbox(
                  v-model="item.checked"
                  @change="searchResCheckedBoxChange(item)"
                )
                span.perm-text {{item.permName}} {{item.permUri}}
      .checked-list
        .title 已选
        .wrapper
          .checked-list-wrapper
            .checked-list-item( v-for="item in checkedPermissionList" :key="item.permId" )
              span.text {{item.permName}}
              span.perm-text {{item.permUri}}
              span.el-icon-close.icon-close( @click="deleteChecked(item, 'delete')" )
    .button-wrapper
      el-button( type="primary" plain @click="resetCheckedList" ) 重置
      el-button( type="primary" @click="register" ) 注册

</template>
<script>
  import { SyncSelection } from '@/utils/treeTool'
  import _debounce from 'lodash/debounce'

  export default {
    name: 'ChoosePermissionDialog',
    data() {
      return {
        dialogVisible: false,
        form: {
          keyword: ''
        },
        checkedPermissionList: [],
        keywordPermList: [],
        searchState: false
      }
    },
    props: {
      permissionList: {
        type: Array,
        required: true,
        default: () => {}
      }
    },
    computed: {
      permList() {
        return this.permissionList
      }
    },
    methods: {
      searchKeyword() {
        if (!this.form.keyword || this.form.keyword.length < 1) {
          this.$message.error('最少填写1个关键字')
          this.searchState = false
          return
        }
        this.keywordPermList = this.permList.filter((item) => {
          return (
            item.permName.indexOf(this.form.keyword) !== -1 ||
            item.permUri.indexOf(this.form.keyword) !== -1
          )
        })
        this.searchState = true
      },
      debounceSearchKeyword: _debounce(function() {
        if (!this.form.keyword || this.form.keyword.length < 1) {
          this.onClearInput()
          return
        }
        this.searchKeyword()
      }, 1000),
      resetCheckedList() {
        this.checkedPermissionList = []
        SyncSelection({ needCleanData: this.permList, checkedData: [], statusKey: 'checked' })
      },
      register() {
        this.$emit('onSubmitRegister', this.checkedPermissionList)
        this.closeDialog()
      },
      closeDialog() {
        this.dialogVisible = false
        this.form.keyword = ''
        SyncSelection({
          needCleanData: this.permList,
          checkedData: [],
          statusKey: 'checked',
          idKey: 'permId'
        })
      },
      openDialog(nowCheckedData = []) {
        this.dialogVisible = true
        this.checkedPermissionList = [...nowCheckedData]
        SyncSelection({
          needCleanData: this.permList,
          checkedData: nowCheckedData,
          statusKey: 'checked',
          idKey: 'permId'
        })
      },
      /**
       * 当checked状态改变的时候触发
       * @param {Object} item 参数描述
       * 如果变成true就添加否则就删除
       * @return void
       */
      checkedBoxChange(item) {
        if (item.checked) {
          this.checkedPermissionList.push(item)
        } else {
          this.deleteChecked(item)
        }
      },
      /**
       * 删除已选中
       * @param {Object} item 数据
       * @param {String | Boolean} type 是否要删除左侧原始数据的选中状态
       * @return void
       */
      deleteChecked(item, type) {
        this.checkedPermissionList = this.checkedPermissionList.filter(
          (ite) => item.permId !== ite.permId
        )
        if (!type || type !== 'delete') return
        this.permList.forEach((ite) => {
          if (ite.permId === item.permId) {
            ite.checked = false
          }
        })
        if (!this.keywordPermList && !this.keywordPermList.length) return
        this.keywordPermList.forEach((ite) => {
          if (ite.permId === item.permId) {
            ite.checked = false
          }
        })
      },
      onClearInput() {
        this.searchState = false
        this.keywordPermList = []
      },
      searchResCheckedBoxChange(item) {
        this.checkedBoxChange(item)
      }
    }
  }
</script>
<style scoped lang="scss">
  @import '~@/assets/css/variables.scss';
  @import '~@/assets/css/mixin.scss';

  .dialog-wrapper {
    display: flex;
    justify-content: space-between;

    .title {
      font-size: 14px;
      font-weight: 400;
      color: #222d3e;
      line-height: 20px;
      margin-bottom: 10px;
    }

    .wrapper {
      width: 490px;
      height: 472px;
      border: 1px solid #d9d9d9;
      box-sizing: border-box;
    }

    .form-wrapper {
      display: flex;
      flex-direction: column;
      .form {
        padding: 20px 15px;
      }
      .check-list-wrapper {
        flex: 1;
        overflow-y: auto;
        @include selfScrollBar(rgba(153, 153, 153, 0.59));

        .check-list-item {
          display: flex;
          margin-bottom: 10px;
        }
      }
    }

    .checked-list-item,
    .check-list-item {
      width: 100%;
      box-sizing: border-box;
      line-height: 20px;
      color: #666666;
      font-size: 14px;
      font-weight: 400;
      padding: 0 15px;
      word-wrap: break-word;

      .perm-text {
        margin-left: 10px;
      }
    }
    .checked-list-wrapper {
      overflow-y: auto;
      height: 100%;
      padding: 20px 0;
      box-sizing: border-box;
      @include selfScrollBar(rgba(153, 153, 153, 0.59));

      .checked-list-item {
        margin-bottom: 10px;
        .icon-close {
          margin-left: 8px;
          cursor: pointer;
        }
        &:hover {
          color: $themeBlue;
        }
      }
    }
  }
  .button-wrapper {
    padding-top: 40px;
    text-align: right;
  }
</style>
