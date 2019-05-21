<template>
	<div class="collmusic">
		<div class="nav">
			<div class="top">
				<van-nav-bar left-arrow left-text="返回" @click-left="back"></van-nav-bar>
			</div>
			<div class="middle">
				<van-row class="middle-row">
					<van-col span="8" offset="2">
						<div class="img">
							<img src="../../public/list-music-bg.jpg" />
						</div>
						<div class="middle-icon">
							<van-icon class="iconfont icon-aixin" size="100px"></van-icon>
						</div>
					</van-col>
					<van-col span="12">
						<div class="middle-col-title">
							<div>{{txt}}</div>
							<div class="title-username">{{userlogin}}</div>
						</div>

					</van-col>
					<van-col class="item-icons" span="24">
						<van-row>
							<van-col span="6">
								<van-icon class="iconfont icon-pinglun1" size="30px" /></van-col>
							<van-col span="6">
								<van-icon class="iconfont icon-share-hole" size="30px" /></van-col>
							<van-col span="6">
								<van-icon class="iconfont icon-xiazai" size="30px" /></van-col>
							<van-col span="6">
								<van-icon class="iconfont icon-duoxuan" size="30px" /></van-col>
						</van-row>
					</van-col>
				</van-row>

			</div>
		</div>

		<div class="listmusics">
			<div class="none" v-show="isShow">
				<h3>{{txt}}列表没有音乐</h3>
			</div>

			<div class="items" v-show="!isShow">
				<van-row class="items-title" type="flex" align="center">
					<van-col span="2" offset="1">
						<van-icon name="play-circle-o" size="30px" /></van-col>
					<van-col span="5">播放全部</van-col>
				</van-row>
				<van-collapse v-model="activeName" accordion>
					<van-collapse-item :name="index+1" v-for="(item,index) in music">
						<van-row class="title musicitem" slot="title" type="flex" align="center">
							<van-col class="num" span="2">{{index+1}}</van-col>
							<van-col class="info" span="18" offset="1">
								<div class="musicName">{{item.name}}</div>
								<div class="musicInfo">{{item.singer}}</div>
							</van-col>
						</van-row>
						<div class="value">
							<van-icon class="icon" name="play-circle-o" size="32px" @click="clickplay(index)"></van-icon>
							<van-icon class="icon" name="delete" size="32px" @click="deletemusic(index)"></van-icon>
						</div>
						<van-icon class="right-icon" slot="right-icon"></van-icon>
					</van-collapse-item>

				</van-collapse>

			</div>

		</div>
	</div>
</template>

<script>
	import { NavBar, Collapse, CollapseItem } from 'vant'
	export default {
		name: 'CollMusic',
		components: {
			[NavBar.name]: NavBar,
			[Collapse.name]: Collapse,
			[CollapseItem.name]: CollapseItem
		},
		data() {
			return {
				activeName: '',
				user: null,
				music: null,
				isShow: true,
				txt: null,
				userlogin: null
			}
		},
		methods: {
			back() {
				this.$router.push({
					name: 'MyHome'
				})
			},
			clickplay(index) {
				var idx = {
					checkplay: index
				}
				var checkindex = JSON.stringify(idx)
				localStorage.setItem('checkIndex', checkindex)
				localStorage.setItem('playmusic', JSON.stringify(this.music))
				this.$router.push({
					name: 'Play'
				})

			},
			deletemusic(index) {
				var id = JSON.parse(localStorage.getItem('userlogin'))
				var collmusic = JSON.parse(localStorage.getItem('userinfo'))

				var i = index

				this.$dialog.confirm({
					title: '删除',
					message: '是否删除该音乐'
				}).then(() => {
					this.music.splice(i, i + 1)
					this.activeName = ''
					collmusic[id].music = this.music
					localStorage.setItem('userinfo', JSON.stringify(collmusic))
					if(this.music.length == 0) {
						this.isShow = true
					} else {
						this.isShow = false
					}

				}).catch(() => {
					//this.activeName=''
				});

			}

		},
		mounted() {
			//			console.log(this.music)
			if(this.music == undefined) {
				this.isShow = true

			} else {
				if(this.music.length == 0) {
					this.isShow = true
				} else {
					this.isShow = false
				}

			}
		},
		created() {
			var id = JSON.parse(localStorage.getItem('userlogin'))
			var collmusic = JSON.parse(localStorage.getItem('userinfo'))
			var i = this.$route.params.i
			if(i == 1) {
				this.music = collmusic[id].music
			} else if(i == 0) {
				this.music = collmusic[id].Lovemusic
			}
			this.txt = this.$route.params.title
			this.userlogin = this.$route.params.userlogin
		}
	}
</script>

<style scoped lang="less">
	.collmusic {
		background: rgba(0, 0, 0, 0.7);
		.nav {
			.middle {
				/*position: relative;*/
				/*z-index: 10;*/
				.middle-row {
					margin-top: 1.5rem;
					color: #fff;
					position: relative;
					.middle-col-title {
						margin-left: 0.5rem;
						font-size: 20PX;
						.title-username {
							font-size: 14PX;
							margin-top: 0.3rem;
						}
					}
					.img {
						img {
							z-index: -1;
							position: relative;
						}
					}
					.middle-icon {
						position: absolute;
						top: 0rem;
						margin-top: 0.4rem;
						margin-left: 0.4rem;
					}
					.item-icons {
						text-align: center;
						margin-top: 0.5rem;
					}
				}
			}
		}
		.listmusics {
			/*padding-top:0.5rem ;*/
			background-color: #fff;
			margin-top: 0.5rem;
			border-radius: 0.5rem 0.5rem 0 0;
			.none {
				padding: 0.001rem 0.5rem;
			}
			.list-title {
				color: #fff;
				/*padding: 0.2rem 0;*/
			}
			.items {
				.items-title {
					padding: 0.3rem 0;
					font-size: 16PX;
				}
				.musicitem {
					vertical-align: middle;
					text-align: center;
					/*border-bottom: 1px solid #ccc;*/
					.num {
						height: 0.8rem;
						width: 0.8rem;
						line-height: 0.8rem;
						border: 1px solid #999;
						font-size: 14px;
					}
					.info {
						text-align: left;
						.musicName {
							font-size: 10PX;
							overflow: hidden;
							max-width: 7rem;
							white-space: nowrap;
							text-overflow: ellipsis;
							/*max-width: 5rem;*/
						}
						.musicInfo {
							color: #666;
						}
					}
				}
				.value {
					padding: 0;
					background: #ddd;
					.icon {
						margin: 0.2rem 1.5rem;
					}
				}
			}
		}
	}
</style>