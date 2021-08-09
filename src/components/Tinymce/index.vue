<!--
 * @Author: NiuNiu
 * @Description: 请填写描述信息
 * @Path: 引入路径
 * @Date: 2021-05-19 19:46:27
 * @LastEditors: liuYang
 * @LastEditTime: 2021-07-19 10:10:13
 * @MustParam: 必传参数
 * @OptionalParam: 选传参数
 * @EmitFunction: 函数
 * @Slot/Props.children: 提供的插槽或render
 * @Examples: 使用示例
-->
<template>
  <div class="tinymce-editor">
    <editor v-model="editorContent" :init="init"> </editor>
  </div>
</template>
<script>
  // baseUrl
  import config from '@/config'
  import storage from '@/utils/storage'
  // eslint-disable-next-line no-unused-vars
  import tinymce from 'tinymce/tinymce'
  import Editor from '@tinymce/tinymce-vue'
  import 'tinymce/themes/silver/theme'
  //插件plugins
  import 'tinymce/plugins/link'
  import 'tinymce/plugins/code'
  import 'tinymce/plugins/media'
  import 'tinymce/plugins/contextmenu'
  import 'tinymce/plugins/wordcount'
  import 'tinymce/plugins/textcolor'
  import 'tinymce/plugins/image' // 插入上传图片插件
  import 'tinymce/plugins/table' // 插入表格插件
  import 'tinymce/plugins/lists' // 列表插件
  import 'tinymce/icons/default/icons.js'
  export default {
    components: {
      Editor
    },
    props: {
      value: {
        type: String,
        default: ''
      },
      plugins: {
        type: [String, Array],
        default: 'lists image table link'
      },
      toolbar: {
        type: [String, Array],
        // default:'code undo redo restoredraft | forecolor backcolor | bold italic underline strikethrough link | alignleft aligncenter alignright alignjustify outdent indent | bullist numlist  blockquote subscript superscript removeformat | table image media | charmap emoticons hr pagebreak insertdatetime print preview  fullscreen  bdmap indent2em lineheight formatpainter axupimgs anchor formatselect fontselect fontsizeselect'
        default:
          'forecolor backcolor | bold italic underline strikethrough removeformat| bullist numlist outdent indent lineheight blockquote| hr subscript superscript charmap| alignleft aligncenter alignright |insertdatetime searchreplace preview| link unlink anchor |image media | codesample code fullscreen | formatselect fontselect fontsizeselect | undo redo table | tablerowprops tablecellprops| tableinsertrowbefore tableinsertrowafter tabledeleterow | tableinsertcolbefore tableinsertcolafter tabledeletecol | tablemergecells tablesplitcells'
      }
    },
    data() {
      return {
        init: {
          language_url: `/tinymce/langs/zh_CN.js`, //引入语言包
          language: 'zh_CN',
          skin_url: `/tinymce/skins/ui/oxide`,
          content_css: `/tinymce/skins/content/default/content.css`,
          // height: 300, //编辑器高度
          // statusbar: false, //隐藏最下面那个p结构标签，隐藏之后不可以调整大小
          // minHeight: 100,
          // width:"100%",
          resize: true, //true,both
          plugins: this.plugins,
          toolbar: this.toolbar,
          toolbar_mode: 'sliding', //scrolling,wrap超出的导航条不用...显示
          font_formats:
            '微软雅黑=Microsoft YaHei,Helvetica Neue,PingFang SC,sans-serif;苹果苹方=PingFang SC,Microsoft YaHei,sans-serif;宋体=simsun,serif;仿宋体=FangSong,serif;黑体=SimHei,sans-serif;Arial=arial,helvetica,sans-serif;Arial Black=arial black,avant garde;Book Antiqua=book antiqua,palatino;',
          fontsize_formats: '12px 14px 16px 18px 20px 22px 24px 26px 28px 30px 32px 34px 36px',
          branding: false,
          menubar: false,
          automatic_uploads: true,
          images_upload_credentials: true,
          images_upload_url:
            config.baseUrl +
            '/wiki/fs/upload-file?accessToken=' +
            storage.getCookie('acToken') +
            '&fp=' +
            storage.getLocal('visitorId'),
          images_reuse_filename: true
          // 图片上传配置
          // images_upload_base_path:'',
          // 前台上传逻辑
          /* images_upload_handler: function(blobInfo, success, failFun) {
            let formdata = new FormData()
            formdata.append('imgData', blobInfo.base64())
            formdata.append('name', blobInfo.blob().name)
            formdata.append('size', blobInfo.blob().size)
            formdata.append('type', blobInfo.blob().type)
            uploadFile({ file: formdata }).then((res) => {
              console.log('上传图片', res)
              success()
            })
          } */
          // // 上传文件
          // file_picker_callback: function(callback, value, meta) {}
          /* content_style: `
            *                         { padding:0; margin:0; }
            img                       { max-width:100%; display:block;height:auto; }
            a                         { text-decoration: none; }
            iframe                    { width: 100%; }
            p                         { line-height:1.6; margin: 0px; }
            table                     { word-wrap:break-word; word-break:break-all; max-width:100%; border:none; border-color:#999; }
            .mce-object-iframe        { width:100%; box-sizing:border-box; margin:0; padding:0; }
            ul,ol                     { list-style-position:inside; }
          `, */
        },
        editorContent: this.value
      }
    },
    mounted() {},
    methods: {},
    watch: {
      value(newValue) {
        this.editorContent = newValue
      },
      editorContent(newValue) {
        this.$emit('input', newValue)
      }
    }
  }
</script>
<style>
  .tox-tinymce {
    border: 1px solid #e6e6e6 !important;
    border-radius: 4px !important;
  }
  .tox .tox-statusbar {
    border-top: 1px solid #e6e6e6 !important;
  }
  .tox .tox-tbtn svg {
    fill: #666 !important;
  }
  .tox .tox-tbtn:hover svg {
    fill: #222f3e !important;
  }
</style>
