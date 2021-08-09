<!--
 * @Author: liuYang
 * @Description: 请填写描述信息
 * @Path: 引入路径
 * @Date: 2021-07-01 15:15:45
 * @LastEditors: liuYang
 * @LastEditTime: 2021-07-01 15:26:22
 * @MustParam: 必传参数
 * @OptionalParam: 选传参数
 * @EmitFunction: 函数
 * @Slot/Props.children: 提供的插槽或render
 * @Examples: 使用示例
-->
<template lang="pug">
  el-upload.width530(
    action=""
    :headers="header"
    ref="upload"
    multiple
    :before-upload="handleBefore"
    :auto-upload="true"
    :file-list="fileList"
  )
    .upload-handle-btn
      .add-file-btn
        .el-icon-plus
        .btn-text 添加
      .upload-tips 文件大小不超过XXM
    template( slot="file" slot-scope="{file}" )
      .file-lite-item
        .el-icon-paperclip
        span {{file.name}}
        //- .el-icon-download
        .el-icon-delete( @click="deleteFile(file)" )
</template>
<script>
  export default {
    name: 'Upload',
    props: {
      // : {
      //   type: ,
      //   required: ,
      //   default: () => {}
      // }
    },
    data() {
      return {
        fileList: [
          {
            name: 'food.jpeg',
            url:
              'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
          },
          {
            name: 'foodahsgdkajsgdkaskj2.jpeg',
            url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg'
          }
        ],
        header: {
          'Content-Type': 'multipart/form-data'
        }
      }
    },
    components: {},
    methods: {
      /**
       * 上传文件之前，判断文件类型
       * @return void
       */
      handleBefore(file) {
        let fd = new FormData()
        console.log('%c [ fd ]', 'font-size:13px; background:pink; color:#bf2c9f;', file)
        fd.append('file', file)
        // this.$PCApi.upload.fileUpload(fd, this).then((res) => {
        //   if (res.code === 200) {
        //     this.$message({
        //       message: '上传成功',
        //       type: 'success'
        //     })
        //   }
        // })
      },
      deleteFile(file) {
        console.log('[ file ] >', file)
        this.fileList = this.fileList.filter((item) => item.url !== file.url)
      }
    },
    watch: {
      fileList(newValue, oldValue) {
        console.log(
          '%c [ newValue, oldValue ]',
          'font-size:13px; background:pink; color:#bf2c9f;',
          newValue,
          oldValue
        )
        this.$emit('onFileListChange', newValue)
      }
    },
    mounted() {}
  }
</script>
<style scoped lang="scss">
  .upload-handle-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    .add-file-btn {
      width: 60px;
      height: 60px;
      background: #f3f4f7;
      display: flex;
      align-items: center;
      flex-direction: column;
      box-sizing: border-box;
      padding-top: 20px;
      .el-icon-plus {
        color: #0a0a0a;
        opacity: 0.4954;
        margin-bottom: 3px;
      }
      .btn-text {
        font-size: 12px;
        font-weight: 400;
        color: #999999;
        line-height: 17px;
      }
    }
    .upload-tips {
      font-size: 12px;
      font-weight: 400;
      color: #999999;
      line-height: 17px;
      margin-left: 17px;
    }
  }
  .el-icon-paperclip {
    font-size: 12px;
    color: #43a6fd;
    margin-right: 4px;
  }
  .el-icon-download,
  .el-icon-delete {
    font-size: 14px;
    margin-left: 8px;
    color: #999999;
  }
  ::v-deep .el-upload-list__item {
    cursor: pointer;
  }

  ::v-deep .el-upload-list__item:hover {
    width: auto;
    background-color: transparent;
  }

  .file-lite-item {
    display: flex;
    align-items: center;
  }
</style>
