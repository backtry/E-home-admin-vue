<template>
  <div id="app">
      <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'App'
}
</script>

<style>
 
.clearfix::after{
  content:'';
  display: block;
  clear: both;
}
a{
  text-decoration: none;
  color: #fff
}
</style>
