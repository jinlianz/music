<template>
	<div class="main">
		<div class="top" ref="top">
			<van-tag class="top-tags" @click="login" size="large" plain>登录/注册</van-tag>
			<van-tag  class="search" @click="search" size="large" plain><van-icon name="search" size="18px"></van-icon></van-tag>
		</div>

		<div class="bannar">
			<van-swipe :autoplay="4500" indicator-color="red">
			  <van-swipe-item class="bannar-item" v-for="(image,index) in images" :key="index" >
			    <img :src="image" />
			  </van-swipe-item>
			</van-swipe>
		</div>

		

		<div class="middle" v-show="isShow" ref="middle">
			<van-row type="flex" justify="space-around">
			  <van-col span="5" v-for="(item,index) in tabs">
			  	<div class="item"  @click="clickTab(item,index)"   :key="index">
					<span class="icon" :class="{'active-icon':item.isactive}">
						<van-icon class="iconfont" :class="item.icon" size="32px"></van-icon>
					</span>
					<span>{{item.title}}</span>
				</div>
			  </van-col>
			</van-row>

		</div>
		<!--<div class="show" v-show="isShowsScoll">
			<div class="backbtn" v-show="isShowsScoll">
				<span @click="back"><van-icon name="arrow-left" size="16px"/>返回</span>
			</div>
			<van-row type="flex" justify="space-around">
			  <van-col span="5" v-for="(item,index) in tabs">
			  	<div class="item"  @click="clickTab(item,index)" :key="index" :class="{'active':item.isactive}">
					<span>{{item.title}}</span>
				</div>
			  </van-col>
			</van-row>
		</div>-->
		<router-view></router-view>
	</div>

</template>

<script>
	import { Tab, Tabs,Tag,Swipe,SwipeItem,Lazyload } from 'vant'
	export default {
		name: 'Main',
		components: {
			[Tab.name]: Tab,
			[Tabs.name]: Tabs,
			[Tag.name]:Tag,
			[Swipe.name]:Swipe,
			[SwipeItem.name]:SwipeItem,
			[Lazyload.name]:Lazyload
		},
		data() {
			return {
				idx: 0,
				isShow: true,
				isShowsScoll:false,
				images:[
					'http://p1.music.126.net/I1YJ0IxMFA2T4axSB8x_ww==/109951164026094675.jpg',
					'http://p1.music.126.net/ZnKLhQ5iPi9NdqLYDm0D_g==/109951164030419134.jpg',
					'http://p1.music.126.net/BUj9IOnSkUDlcK_TFRnO9A==/109951164027533394.jpg',
					'http://p1.music.126.net/q0rq5Kr7kk8JaFWwBs24zg==/109951164031232567.jpg',
					'http://p1.music.126.net/vRIQSR-lzzrcdg-b3UMC6g==/109951164030370973.jpg',
					'http://p1.music.126.net/-emRzrwbJdqMmkRxYvUkEg==/109951164030387776.jpg',
					'http://p1.music.126.net/hHRVXjBYgs0LtEYl9sg2LQ==/109951164030366979.jpg'
					
				],
				tabs: [{
						title: '推荐音乐',
						path: {
							name: 'Home'
						},
						isactive:true,
						flag: '/main/home',
						icon:'icon-yinle1'
					},
					{
						title: '最新音乐',
						path: {
							name: 'Newest'
						},
						isactive:false,
						flag: '/main/newest',
						icon:'icon-zuixin'
					},
					{
						title: '热歌榜',
						path: {
							name: 'Hot'
						},
						isactive:false,
						flag: '/main/hot',
						icon:'icon-rege'
					},
					{
						title: '我的主页',
						path: {
							name: 'MyHome'
						},
						isactive:false,
						flag: '/main/myhome',
						icon:'icon-geren1'
					}
				]
			}
		},
		methods: {
			back() {
				this.isShow = !this.isShow
				this.$router.push({name:'Home'})
				//this.$router.push({name:'Home',params:{ ss: '123' }})
				//this.$route.params.scrollTop
				
			},
			clickTab(item,index) {
//				this.isShow = false
				this.$router.push(this.tabs[index].path)
				//this.$router.push({name:'Home',params: { ss: '123' }})
				for (var i = 0; i < this.tabs.length; i++) {
					this.tabs[i].isactive = false
				}
				item.isactive = true
				

			},
			play() {
				console.log("000")
			},
			search() {
				this.$router.push({
					name: 'Search'
				})
			},
			login(){
				this.$dialog.confirm({
					message:'是否要重新登录？'
					
				}).then(()=>{
					localStorage.removeItem('userlogin')
					this.$router.push({name:'Index'})
					
				}).catch(()=>{
					
				})
			}

		},
		mounted(){
			var middle = this.$refs.middle
			var top = this.$refs.top
		},
		created() {

			var hash = location.hash
			//console.log('hash -->',hash)
			for(var i = 0; i < this.tabs.length; i++) {
				
				//console.log(hash.indexOf(this.tabs[i].flag))
				this.tabs[i].isactive = false
				if (hash.indexOf(this.tabs[i].flag) > -1) {
					this.tabs[i].isactive = true
				}

			}

		}
	}
	
</script>

<style scoped lang="less">


	.main {
		.top {
			position: sticky;
			top: 0;
			z-index: 10;
			padding: 0.25rem 0.3rem 0.1rem 0.3rem;
			background:#fff;
			/*line-height:12PX;*/
			.txt {
				display: inline-block;
				margin-left: 3.5rem;
				font-size: 24PX;
				color: #ccc;
			}
			.search {
				float: right;
				padding: 0.1rem 0.1rem 0rem 0.15rem;
				/*display: block;*/
			}
		}
		.bannar {
			margin-top: 5px;
			padding: 0 0.3rem;
			overflow: hidden;
			/*border-radius: 0 1.2555rem;*/
			.bannar-item{
				overflow: hidden;
			}
			img {
				display: block;
				width: 100%;
				border-radius: 0.5rem;
				/*overflow: hidden;*/
			}
		}
		.backbtn{
			padding: 0.2666rem;
			font-size: 16PX;
			line-height: 16PX;
		}
		.middle {
			/*margin: 0.3rem;*/
			position: sticky;
			top: 1rem;
			z-index: 10;
			background: #fff;
			margin-top:0.2rem ;
			overflow: hidden;
			/*border-radius: 0.3rem 0.3rem;*/
			/*border-bottom: 1PX solid #999;*/
			.item {
				text-align: center;
				float: left;
				
				margin: 0.2rem 0.4rem;
				.icon {
					
					width: 1.5rem;
					height: 1.5rem;
					display: block;
					/*background: red;*/
					border-radius: 50%;
					color: #666;
					margin-bottom: 0.1rem;
					.iconfont{
						margin: 0.31rem 0.3rem 0.1rem 0.3rem;
					}
				}
			}
			
			.active-icon{
				background: red;
				.iconfont{
					color: #fff;
				}
				/*color: #000;*/
			}
		}
		.show {
			/*padding: 0.3rem;*/
			background:#fff;
			position: sticky;
			top: 1rem;
			overflow: hidden;
			z-index: 10;
			.item {
				text-align: center;
				/*float: left;*/
				margin: 0.1rem 0.2rem;
				padding: 0.2rem 0.1rem;
				
			}
			.active{
				border-top: 3PX solid red;
				background-color: #eee;
			}
		}
		.navbar {
			height: 100px;
			.content {
				height: 500px;
				background: #FCFCFC;
			}
		}
		.bottom {
			position: fixed;
			bottom: 0;
			right: 0;
			width: 1.5rem;
			height: 1.5rem;
			background: red;
			z-index: 10;
			border-radius: 50%;
		}
	}
</style>