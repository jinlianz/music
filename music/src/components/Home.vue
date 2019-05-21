<template>
	<div class="Home">
		<!--<div class="top-img">
			<img src="../../public/home-01.jpg"/>
		</div>-->

		<van-panel class="recommendList">
			<div class="recommend-title" slot="header">
				<p>推荐歌单</p>
			</div>
			<van-row class="recommend-content">
				<van-col class="content-icon" span="8" ref="van" v-for="(item,index) in music" :key="index">
					<div @click="clickList(index)">
						<div class="img">
							<img :src="item.coverImgUrl" />
						</div>
						<div class="title">{{item.title}}</div>
					</div>
				</van-col>
			</van-row>

		</van-panel>
		<!--<router-view></router-view>-->

	</div>
</template>

<script>
	import qs from 'qs'
	import { Panel, Row, Col, CellGroup, Cell, Tag, Icon } from 'vant'
	export default {
		name: 'Home',
		data() {
			return {
				idx: {
					checklist: 11
				},

				dataMusic: null,
				music: [],
				startIndex: 0,
				endIndex: 15

			}
		},
		components: {
			[Panel.name]: Panel,
			[Row.name]: Row,
			[Col.name]: Col,
			[Cell.name]: Cell,
			[Tag.name]: Tag,
			[CellGroup.name]: CellGroup,
			[Icon.name]: Icon
		},
		methods: {
			clickList(index) {
				this.idx.checklist = index
				var cidx = JSON.stringify(this.idx)
				localStorage.setItem("checkIndex", cidx)
				this.$router.push({
					name: 'SongList'
				})

			}
		},
		mounted() {
			var timers = [];
			window.onscroll = () => {
				//滚屏的距离
				//console.log("home")

				var scrollTop = document.documentElement.scrollTop

				//获取最后的节点
				var lastRef = this.$refs.van[this.music.length - 1].$el;
				//console.log(lastRef)
				var offsetTop = lastRef.offsetTop
				//console.log("scrollTop ---",scrollTop)
				var offsetHeight = lastRef.offsetHeight

				var h = offsetTop - offsetHeight - 405
				//console.log("h ---",h)

				if(scrollTop >= h) {
					var timer = setInterval(() => {

						this.music.push(...this.dataMusic.slice(this.startIndex, this.endIndex))
						this.startIndex = this.endIndex;
						this.endIndex += 3;
						clearTimeout(timer);
						timer = null;
						timers = [];

					}, 500)

					timers.push(timer);

					for(var i = 1; i < timers.length; i++) {
						clearTimeout(timers[i]);
					}

				}

			}

		},
		created() {
			this.axios
				.post('https://api.itooi.cn/music/netease/highQualitySongList?key=579621905')
				.then(result => {
					var dataMusic = result.data.data.playlists
					
					var data = JSON.stringify(dataMusic)
					localStorage.setItem('datamusic', data)

				})
			var data = localStorage.getItem('datamusic')
			this.dataMusic = JSON.parse(data)
			this.music = this.dataMusic.slice(this.startIndex,this.endIndex)
			this.startIndex = this.endIndex

		},
		beforeRouteLeave(to, form, next) {
			window.onscroll = null;
			next();
		}

	}
</script>

<style scoped lang="less">
	p {
		margin: 0;
	}
	
	.top-img {
		margin-top: 5px;
		img {
			display: block;
			width: 100%;
		}
	}
	
	.Home {
		.recommendList {
			margin: 0 0.3rem;
			.recommend-title {
				margin: 0.3rem 0px;
				background-color: #f1ecec;
				font-size: 18PX;
				p {
					padding: 0px 10PX;
					border-left: 3PX solid red;
				}
			}
			.recommend-content {
				padding: 0 5px;
				.content-icon {}
				.img {
					border-radius: 0.2rem;
					margin: 0.1rem;
					overflow: hidden;
					img {
						display: block;
						width: 100%;
					}
				}
				.title {
					padding: 5px;
					color: #333333;
					height: 50px;
				}
			}
		}
	}
</style>