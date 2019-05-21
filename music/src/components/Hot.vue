<template>
	<div class="hot">
		<!--<div class="top-img">
			<img src="../../public/home-01.jpg" />
		</div>-->
		<van-panel class="list">
			<div class="recommend-title" slot="header">
				<p>热歌榜</p>
			</div>
			<div>
				<van-row class="musicCart" ref="van" v-for="(item,index) in music" type="flex" justify="space-between" align="center">
					<van-col class="num" span="3">{{index+1}}</van-col>
					<van-col class="info" span="18">
						<div class="musicName">{{item.name}}</div>
						<div class="musicInfo">{{item.singer}}</div>
					</van-col>
					<van-col class="play" span="3">
						<van-icon @click="checkIcon(index)" name="play-circle-o" size="30px" />
					</van-col>
				</van-row>

			</div>
		</van-panel>

	</div>
</template>

<script>
	import { Panel } from 'vant'
	import qs from 'qs'
	export default {
		name: 'Hot',
		components: {
			
			[Panel.name]: Panel
		},
		data() {
			return {
				music: null,
				musicCart: null,
				data: null,
				startIndex: 0,
				endIndex: 15

			}
		},
		methods: {

			checkIcon(index) {
				var idx = {
					checkplay: index
				}
				var checkindex = JSON.stringify(idx)
				localStorage.setItem('checkIndex', checkindex)
				localStorage.setItem('playmusic',JSON.stringify(this.music))
				this.$router.push({
					name: 'Play'
				})
			}

		},
		mounted() {
			this.axios({
				method: 'POST',
				url: 'https://api.itooi.cn/music/netease/songList?key=579621905&id=3778678',
			}).then(result => {
				this.data = result.data.data.songs
				var datamusiccart = JSON.stringify(this.data)
				localStorage.setItem('Hotmusic', datamusiccart)
			})
			
			var timers = [];
			window.onscroll = () => {
				//滚屏的距离
				var scrollTop = document.documentElement.scrollTop

				//获取最后的节点
				var lastRef = this.$refs.van[this.music.length - 1].$el;
				var offsetTop = lastRef.offsetTop
				//console.log("scrollTop ---",scrollTop)
				var offsetHeight = lastRef.offsetHeight

				var h = offsetTop - offsetHeight - 500
				//console.log("h ---",h)

				if(scrollTop >= h) {
					var timer = setInterval(() => {

						this.music.push(...this.data.slice(this.startIndex, this.endIndex))
						this.startIndex = this.endIndex;
						this.endIndex += 3;
						/*if(this.endIndex >= this.data.length) {
							clearTimeout(timer)
							return
						}*/
						
						clearTimeout(timer);
						timer = null;
						timers = [];

					}, 500)
					
					timers.push(timer);

					for (var i = 1; i < timers.length; i++) {
						clearTimeout(timers[i]);
					}

				}
				//console.log(this.endIndex)
			}

		},
		created() {

			var ids = JSON.parse(localStorage.getItem('checkIndex'))
			this.i = ids.checklist

			var data = localStorage.getItem('Hotmusic')
			this.data = JSON.parse(data)
			this.music = this.data.slice(this.startIndex, this.endIndex)
			this.startIndex = this.endIndex;
			//console.log(this.music)
		},
		beforeRouteLeave(to, form, next) {
			window.onscroll = null;
			next();
		}

	}
</script>

<style scoped lang="less">
	.top-img {
		margin-top: 5px;
		img {
			display: block;
			width: 100%;
		}
	}
	.hot{
		padding: 0 0.3rem;
	}
	.list {
		.recommend-title {
			/*padding: 15px 0px;*/
			font-size: 18PX;
			background: #f1ecec;
			p {
				padding: 0px 10PX;
				border-left: 3PX solid red;
			}
		}
		.musicCart {
			padding: 0 0.2666rem;
			height: 1.6rem;
			vertical-align: middle;
			text-align: center;
			border-bottom: 1px solid #ccc;
			.num {
				height: 0.8rem;
				width: 0.8rem;
				line-height: 0.8rem;
				margin-right:0.2rem ;
				border: 1px solid #999;
				font-size: 14px;
			}
			.info {
				text-align: left;
				.musicName {
					font-size: 14PX;
				}
				.musicInfo {
					color: #666;
				}
			}
		}
	}
</style>