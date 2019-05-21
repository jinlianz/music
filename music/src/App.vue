<template>
  <div id="app" class="app">
  	<!--一级路由-->
    <router-view></router-view>
    
  </div>
</template>

<script>


export default {
  name: 'app'

}
</script>

<style>
.app{
	max-width: 640PX;
	margin: 0 auto;
	
}
img{
	width: 100%;
	display: block;
}
</style>
