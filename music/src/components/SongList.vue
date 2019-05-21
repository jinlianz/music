<template>
	<div class="SongList">
		<div class="top">
			<van-nav-bar left-arrow left-text="返回" @click-left="back"></van-nav-bar>
			<div class="content">
				<div class="content-bg" ref="contentBg">
				</div>
				<div class="content-top">
					<span class="img">
						<van-tag class="top-tag" mark type="danger">歌单</van-tag>
						<img :src="playlist[i].coverImgUrl"/>
					</span>
					<span class="title">
						<p>{{playlist[i].title}}</p>
						<p>{{playlist[i].creator}}</p>
					</span>
				</div>

				<div class="intro">
					<div class="tag">标签:
						<van-tag style="margin: 0.1rem;" plain>{{playlist[i].tag}}</van-tag>
					</div>
					<div class="txt">
						简介:{{playlist[i].description}}

					</div>

				</div>

			</div>

		</div>
		<van-panel class="list" title="歌曲信息" icon="arrow-down">

			<van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
				<van-cell v-for="(item,index) in list" :key="index">
					<van-row class="musicCart" ref="van" type="flex" justify="space-between" align="center">
						<van-col class="num" span="3">{{index+1}}</van-col>
						<van-col class="info" span="18">
							<div class="musicName">{{item.name}}</div>
							<div class="musicInfo">{{item.singer}}</div>
						</van-col>
						<van-col class="play" span="3">
							<van-icon @click="checkIcon(index)" name="play-circle-o" size="30px"></van-icon>
						</van-col>
					</van-row>

				</van-cell>
			</van-list>
			
		</van-panel>

	</div>
</template>

<script>
	import { NavBar, Tag, Panel, Button, List, Cell } from 'vant'
	export default {
		name: 'SongList',
		data() {
			return {
				playlist: null,
				idx: null,
				musiccart: null,
				palyidx: null,
				i: null,
				loading: false,
				finished: false,
				list: []
			}
		},
		components: {
			[NavBar.name]: NavBar,
			[Tag.name]: Tag,
			[Panel.name]: Panel,
			[Button.name]: Button,
			[List.name]: List,
			[Cell.name]: Cell

		},
		methods: {
			back() {
				this.$router.push({
					name: 'Home'
				})
			},
			checkIcon(index) {
				this.idx = {
					checklist: this.i,
					checkplay: index
				}
				var checkindex = JSON.stringify(this.idx)
				localStorage.setItem('checkIndex', checkindex)
				localStorage.setItem('playmusic', JSON.stringify(this.musiccart))
				this.$router.push({
					name: 'Play'
				})
			},
			onLoad(){
//				console.log("333")
//				console.log(this.list.length)
				if (this.list.length >= 6) {
					setTimeout(() => {
//							console.log("000")
							this.list.push(...this.musiccart.slice(this.list.length, this.list.length + 6))
							// 加载状态结束
							this.loading = false;
							
							// 数据全部加载完成
							//					this.finished = true;
							if(this.list.length >= this.musiccart.length) {
								this.finished = true;
							}
						}, 500);
				}
			}

		},
		mounted() {
			var ids = JSON.parse(localStorage.getItem('checkIndex'))
			var i = ids.checklist
			var idstr = this.playlist[i].id
			this.axios
				.post('https://api.itooi.cn/music/netease/songList?key=579621905&id=' + idstr)
				.then(result => {
					var data = result.data.data.songs
//					this.musiccart.length = 40
					//this.musiccart = JSON.parse(localStorage.getItem('musiccart'))


					if(this.list.length == 0) {
						this.list.push(...data.slice(0, 6))
						this.loading = false;
					} 
					var datamusiccart = JSON.stringify(data)
					localStorage.setItem('musiccart', datamusiccart)
					this.musiccart = data

				})

			var contentBg = this.$refs.contentBg
			contentBg.style.backgroundImage = 'url(' + this.playlist[this.i].coverImgUrl + ')'

		},
		created() {
			this.playlist = JSON.parse(localStorage.getItem('datamusic'))
			var ids = JSON.parse(localStorage.getItem('checkIndex'))
			this.i = ids.checklist

		}

	}
</script>

<style scoped lang="less">
	.top {
		position: sticky;
		top: 0;
		z-index: 10;
		overflow: hidden;
		.content-top {
			/*position: relative;*/
			background-color: #fff;
			/*position: absolute;*/
			padding: 0.8rem 0.5333rem;
			overflow: hidden;
			font-size: 16PX;
			color: #fff;
			z-index: 10;
			.img {
				position: relative;
				width: 40%;
				float: left;
				display: block;
				.top-tag {
					position: absolute;
					top: 0.1555rem;
					left: -0.1rem;
				}
				img {
					width: 100%;
					display: block;
				}
			}
			.title {
				position: relative;
				box-sizing: border-box;
				display: block;
				float: left;
				padding: 0.2666rem;
				width: 60%;
			}
		}
		.content-bg:after,
		.content-bg {
			content: "";
			position: absolute;
			top: 0;
			bottom: 0;
			left: 0;
			right: 0;
			background-repeat: no-repeat;
			background-size: cover;
			background-position: 50%;
			filter: blur(20px);
			transform: scale(1.5);
		}
	}
	
	.intro {
		position: relative;
		background: #fff;
		.tag {
			padding-bottom: 0.15rem;
			/*margin-bottom: 0.2666rem;*/
		}
		padding:0.2rem 0.3rem;
		font-size:14PX;
		color: #666;
		height: 2.1333rem;
		overflow-y: auto;
	}
	
	.list {
		background: #fff;
		padding: 0 0.3rem;
		/*position: relative;*/
		.musicCart {
			padding: 0 0.2666rem;
			height: 1.6rem;
			background: #fff;
			vertical-align: middle;
			text-align: center;
			border-bottom: 1px solid #ccc;
			.num {
				height: 0.8rem;
				width: 0.8rem;
				margin-right: 0.2rem;
				line-height: 0.8rem;
				border: 1px solid #999;
				font-size: 14px;
			}
			.info {
				text-align: left;
				.musicName {
					max-width: 200px;
					text-overflow: ellipsis;
					white-space: nowrap;
					overflow: hidden;
					font-size: 14PX;
				}
				.musicInfo {
					color: #666;
				}
			}
		}
	}
</style>