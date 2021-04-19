<template>
  <div class="error-page">
    <div class="content-con">
      <div class="desc">{{ desc }}</div>
      <img class="img" :src="src" :alt="code" />
      <back-btn-group class="back-btn-group"></back-btn-group>
    </div>
  </div>
</template>

<script>
  import './error.scss'
  import backBtnGroup from './back-btn-group.vue'
  export default {
    name: 'error_content',
    components: {
      backBtnGroup
    },
    props: {
      desc: String,
      src: String
    }
  }
</script>
