<!--
 * @Author: liuYang
 * @Description: 选择角色
 * @Path:   import ChoosePerson from '@components/ChoosePerson'
 * @Date: 2021-03-17 17:07:00
 * @LastEditors: liuYang
 * @LastEditTime: 2021-04-09 14:03:47
 * @MustParam: 必传参数
      distributionTitle 显示在dialog上的标题
 * @OptionalParam: 选传参数
 * @EmitFunction: 函数
 * @Slot/Props.children: 提供的插槽或render
 * @Examples: 使用示例

    ChoosePerson(
      ref="ChoosePerson"
      :title="distributionTitle"
    )
-->
<template lang="pug">
  el-dialog(
    :title="title"
    :visible.sync="dialogVisible"
    width="715px"
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
            el-input( prefix-icon='el-icon-search' v-model="form.keyword" placeholder="请输入搜索关键字" )
          .check-list-wrapper
            .check-list-item( v-for="item in treeData" :key="item.id" @change="checkedBoxChange(item)" )
              el-checkbox.checkbox( :checked="item.checked" )
              template( v-if="item.type === 'user'" )
                .check-list-item-des-user
                  img.img( v-lazy="item.img" v-if="item.img" )
                  span.text( :class="{'checked' : item.checked}" ) 按条件检索用户
              template( v-else )
                .check-list-item-des
                  div.text( :class="{'checked' : item.checked}" ) {{item.name}}
                  div.expand( @click="expandDep(item)" ) 展开

      .checked-list
        .title 已选
        .wrapper
          .checked-list-wrapper
            .checked-list-item( v-for="item in checkedPersonList" :key="item.id" )
              template( v-if="item.type === 'user'" )
                .check-list-item-des-user
                  img.img( v-lazy="item.img" v-if="item.img" )
                  span.text( :class="{'checked' : item.checked}" ) 按条件检索用户
              template( v-else )
                div.text( :class="{'checked' : item.checked}" ) {{item.name}}
              div.el-icon-close.icon-close( @click="deleteChecked(item)" )
    .button-wrapper
      el-button( type="primary" plain @click="resetCheckedList" ) 重置
      el-button( type="primary" @click="register" ) 注册
</template>
<script>
  import { SyncSelection } from '@/utils/treeTool'
  import { getStructTree } from '@api/struct'
  import { listToTree } from '@/utils/treeTool'
  import { searchUser } from '@api/user'
  export default {
    name: 'ChoosePerson',
    props: {
      title: {
        type: String,
        required: true,
        default: '请传入title'
      }
    },
    data() {
      return {
        dialogVisible: false,
        form: {
          keyword: ''
        },
        treeData: [],
        checkedPersonList: [],
        currentPage: 0
      }
    },
    components: {},
    methods: {
      searchKeyword() {},
      resetCheckedList() {
        this.checkedPersonList = []
        SyncSelection(this.treeData, [], 'checked')
      },
      register() {
        this.$emit('onSubmitRegister', this.checkedPersonList)
        this.closeDialog()
      },
      closeDialog() {
        this.dialogVisible = false
      },
      openDialog(nowCheckedData = []) {
        this.dialogVisible = true
        this.checkedPersonList = nowCheckedData
        SyncSelection(this.treeData, nowCheckedData, 'checked')
      },
      checkedBoxChange(item) {
        this.checkedPersonList.push(item)
      },
      deleteChecked(item) {
        this.checkedPersonList = this.checkedPersonList.filter((ite) => item.id !== ite.id)
      },
      getStructTree() {
        getStructTree().then(({ structs }) => {
          const newStructs = structs.map((item) => {
            if (!item.pid) {
              item.pid = 0
            }
            item.type = 'dep'
            return item
          })
          this.treeData = listToTree({ list: newStructs, key: 'id', Pkey: 'pid' })
        })
      },
      expandDep(data) {
        searchUser({
          structId: data.id,
          pageSize: 50,
          pageNum: this.currentPage
        }).then(({ rows, totalNum }) => {
          this.tableData = rows
          this.totalNum = totalNum
        })
      }
    },
    mounted() {
      this.getStructTree()
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

    .choose-list-wrapper {
      width: 286px;
    }
    .checked-list {
      width: 356px;
    }
    .wrapper {
      height: 360px;
      border: 1px solid #d9d9d9;
      box-sizing: border-box;
    }

    .form-wrapper {
      display: flex;
      flex-direction: column;
      .form {
        padding: 20px 20px 15px;
      }
      .check-list-wrapper {
        flex: 1;
        overflow-y: auto;
        @include selfScrollBar(rgba(153, 153, 153, 0.59));

        .check-list-item {
          display: flex;
          margin-bottom: 10px;

          .checkbox {
            margin-right: 10px;
          }
        }
      }
    }
    .checked-list-item,
    .check-list-item {
      cursor: pointer;
      display: flex;
      line-height: 20px;
      color: #666666;
      font-size: 14px;
      font-weight: 400;
      padding: 0 20px;
      .check-list-item-des-user {
        display: flex;
        align-items: center;

        .img {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          margin-right: 8px;
        }
        .text {
          &.checked {
            color: $themeBlue;
          }
        }
      }
      .check-list-item-des {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .expand {
          color: $themeBlue;
        }
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
        padding: 0 20px;
        justify-content: space-between;
        .icon-close {
          margin-left: 8px;
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
