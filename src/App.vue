<template>

  
  <div id="app">
    <link rel="stylesheet" href="https://unpkg.com/element-ui/lib/theme-chalk/index.css">

  <!-- 路由出口 -->
  <!-- 路由匹配到的组件将渲染在这里 -->
  <router-view></router-view>
  </div>
</template>

<script>

  
export default {
  name: 'App',
  components: {

  }
}
</script>

<style lang="less">
html,body,h3,p{
  margin: 0;
  padding: 0;
}
body html {
  width: 100%;
  height: 100%;
}

</style>
