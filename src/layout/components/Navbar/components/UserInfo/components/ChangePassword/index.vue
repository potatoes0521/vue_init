<!--
 * @Author: liuYang
 * @Description: 请填写描述信息
 * @Path: 引入路径
 * @Date: 2021-04-13 14:51:18
 * @LastEditors: liuYang
 * @LastEditTime: 2021-04-13 15:38:52
 * @MustParam: 必传参数
 * @OptionalParam: 选传参数
 * @EmitFunction: 函数
 * @Slot/Props.children: 提供的插槽或render
 * @Examples: 使用示例
-->
<template lang="pug">
  el-dialog(
    label-width="84px"
    label-position="left"
    width="450px"
    destroy-on-close
    append-to-body
    :show-close="false"
    :visible.sync="dialogVisible"
  )
    span.dialog-title( slot="title" ) 修改密码
    .form-wrapper
      el-form(
        ref="form"
        :model="form"
        :rules="rules"
        label-width="84px"
        label-position="left"
        @keyup.enter.native="submitForm('form')"
      )
        el-form-item( label="旧密码" prop="oldPassword" )
          el-input.lang-input( clearable show-password v-model.trim="form.oldPassword" placeholder="请输入旧密码" )
        el-form-item( label="新密码" prop="newPassword" )
          el-input.lang-input( clearable show-password v-model.trim="form.newPassword" placeholder="请输入新密码" )
        el-form-item( label="确认新密码" prop="newPasswordConfirm" )
          el-input.lang-input( clearable show-password v-model.trim="form.newPasswordConfirm" placeholder="请确认新密码" )
    span.dialog-footer( slot="footer")
      el-button( @click="closeDialog" ) 取消
      el-button( type="primary" @click="submitForm" :loading="changePasswordLoading" ) 提交
</template>
<script>
  import { mapActions } from 'vuex'
  import { formValidateIsCodeNumberLine } from '@utils/patter'
  import { changePassword } from '@api/user'
  import { messageContentRender } from '@/utils/createdHtmlTemplate'

  export default {
    name: 'ChangePassword',
    data() {
      const formValidateValueAs = (rule, value, callback) => {
        if (value !== this.form.newPassword) {
          callback(new Error('两次输入新密码不一致'))
        } else {
          callback()
        }
      }
      return {
        dialogVisible: false,
        changePasswordLoading: false,
        form: {
          oldPassword: '',
          newPassword: '',
          newPasswordConfirm: ''
        },
        rules: {
          oldPassword: [
            { required: true, message: '请输入旧密码', trigger: 'blur' },
            {
              validator: formValidateIsCodeNumberLine,
              trigger: 'blur'
            }
          ],
          newPassword: [
            { required: true, message: '请输入新密码', trigger: 'blur' },
            {
              validator: formValidateIsCodeNumberLine,
              trigger: 'blur'
            }
          ],
          newPasswordConfirm: [
            { required: true, message: '请确认新密码', trigger: 'blur' },
            {
              validator: formValidateIsCodeNumberLine,
              trigger: 'blur'
            },
            {
              validator: formValidateValueAs,
              trigger: 'blur'
            }
          ]
        }
      }
    },
    components: {},
    methods: {
      ...mapActions({ commitLoginOut: 'commitLoginOut' }),
      submitForm() {
        if (!this.form.oldPassword) {
          this.$message.error('请输入旧密码')
          return
        }
        if (!this.form.newPassword || !this.form.newPasswordConfirm) {
          this.$message.error('请输入新密码')
          return
        }
        if (this.form.newPassword !== this.form.newPasswordConfirm) {
          this.$message.error('两次输入新密码不一致')
          return
        }
        this.changePasswordLoading = true
        changePassword({ ...this.form }).then(() => {
          this.changePasswordLoading = false
          this.$confirm(
            messageContentRender({
              icon: 'el-icon-success success',
              title: '提示',
              message: '密码修改成功，需要重新登录本系统'
            }),
            {
              dangerouslyUseHTMLString: true,
              showConfirmButton: true,
              confirmButtonText: '知道了',
              showCancelButton: false,
              showClose: false
            }
          ).then(() => {
            this.closeDialog()
            this.commitLoginOut()
          })
        })
      },
      openDialog() {
        this.dialogVisible = true
      },
      closeDialog() {
        this.dialogVisible = false
        this.resetForm()
      },
      resetForm() {
        this.$refs.form.resetFields()
      }
    },
    watch: {},
    mounted() {}
  }
</script>
<style scoped lang="scss">
  .form-wrapper {
    width: 100%;
  }
</style>
