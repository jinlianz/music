<template>
	<div class="play">

		<div class="top">
			<!--<span @click="back"><van-icon name="arrow-left" size="16px"/>返回</span>-->
			<van-nav-bar left-arrow left-text="返回" @click-left="back"></van-nav-bar>
		</div>
		<div class="midle">
			<div class="midle-bg" ref="midleBg"></div>
			<div class="content">

				<transition name="move">
					<div class="imgIcon" id="imgIcon" :class="[ischeck ? 'move1': 'move2']">

						<div class="Iconmr">
							<img :src="musicInfo.img" />
						</div>
					</div>
				</transition>

				<div class="musicinfo">
					<span class="name">{{musicdata.name}}</span>
					<span class="singer">{{musicdata.singer}}</span>
				</div>
			</div>

		</div>
		<div class="bottom">
			<div class="audio-music">
				<audio id="Ado" ref="Ado" autoplay loop :src="musicInfo.Url">
				</audio>
			</div>
			<van-row class="icons">
				<van-col span="4" offset="2">
					<van-icon class="iconfont icon-aixin" :class="[toggleicon ? 'icon-aixin':'icon-xinxing2']" size="28px" @click="lovesong"></van-icon>
				</van-col>
				<van-col span="4">
					<van-icon class="iconfont icon-xiazai" size="28px" @click="notfn('下载')"></van-icon>
				</van-col>
				<van-col span="4">
					<van-icon class="iconfont icon-jingyunyinxiaopt" size="28px" @click="notfn('鲸鱼音效')"></van-icon>
				</van-col>
				<van-col span="4">
					<van-icon class="iconfont icon-pinglun1" size="28px"></van-icon>
				</van-col>
				<van-col span="4">
					<van-icon class="iconfont icon-xinxi1" size="28px" @click="popup"></van-icon>
				</van-col>
			</van-row>

			<div class="playbtn">
				<div class="rang">

					<van-slider v-model="musicInfo.value" active-color="#f44" @change="change(musicInfo.value)" bar-height="3px">
						<div class="custom-button" slot="button"></div>
					</van-slider>

				</div>
				<van-row class="time">
					<van-col span="4">{{musicInfo.changtime}}</van-col>
					<van-col span="4" offset="16">{{musicInfo.lasttime}}</van-col>
				</van-row>

				<van-row class="btn" type="flex" align="center">
					<van-col span="4">
						<van-icon class="iconfont icon-xunhuan" size="22px"></van-icon>
					</van-col>
					<van-col span="5">
						<van-icon @click="pre" size="22px" class="iconfont icon-pre-music"></van-icon>
					</van-col>
					<van-col span="5">
						<van-icon :name="iconName" size="48px" @click="pause" /></van-col>
					<van-col span="5">
						<van-icon @click="next" size="22px" class="iconfont icon-next-music"></van-icon>
					</van-col>
					<!--<van-col span="4">
						<van-icon @click="collect" size="22px" class="iconfont icon-tianjiashoucang"></van-icon>
					</van-col>-->
					<!--播放排序-->
					<van-col span="5">
						<van-icon class="iconfont icon-paixu" size="22px" @click="sort"></van-icon>
					</van-col>
				</van-row>

			</div>
		</div>

		<van-popup class="popup" v-model="showone" position="bottom" :overlay="true" click-overlay="clicklay">
			<div class="popup-content">
				<div class="popup-top">
					<van-row>
						<van-col span="4">
							<img :src="musicInfo.img" />
						</van-col>
						<van-col class="popup-top-text" span="19" offset="1">
							<div>歌曲：{{musicdata.name}}</div>
							<div style="color:#666">{{musicdata.singer}}</div>
						</van-col>
					</van-row>
				</div>
				<div class="popup-bottom">
					<div @click="collect">
						<van-row class="popup-bottom-item" type="flex" align="center">

							<van-col span="3" class="popup-bottom-icon">
								<van-icon size="28px" class="iconfont icon-tianjiashoucang" />
							</van-col>
							<van-col span="20" offset="1">添加收藏</van-col>
						</van-row>
					</div>

					<van-row class="popup-bottom-item" type="flex" align="center">
						<van-col span="3" class="popup-bottom-icon">
							<van-icon size="28px" class="iconfont icon-yonghu" />
						</van-col>
						<van-col span="20" offset="1">歌手：{{musicdata.singer}}</van-col>
					</van-row>

					<div @click="notfn('鲸鱼音效')">
						<van-row class="popup-bottom-item" type="flex" align="center">
							<van-col span="3" class="popup-bottom-icon">
								<van-icon size="28px" class="iconfont icon-jingyunyinxiaopt" />
							</van-col>
							<van-col span="20" offset="1">鲸鱼音效</van-col>
						</van-row>
					</div>
				</div>
			</div>
		</van-popup>

		<van-popup class="popup" v-model="showtow" position="bottom" :overlay="true" click-overlay="clicklay">
			<div class="popup-content">
				<van-row>
					<van-col span="8">
						播放列表
					</van-col>
					<van-col span="6" offset="10">
						<van-icon class="iconfont icon-tianjiashoucang"></van-icon>
						收藏全部
					</van-col>
				</van-row>
				<van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
					<van-cell v-for="(item,index) in list" :key="index" @click="popupPlay(index)">
						<!--<div >-->
						<van-row slot="title">
							<van-col span="1">{{index+1}}</van-col>
							<van-col class="musicName" span="10" offset="1"> {{item.name}}</van-col>
							<van-col offset="10">
								<van-icon name="cross" @click="deleta(index)"></van-icon>
							</van-col>
						</van-row>
						<!--</div>-->

					</van-cell>
				</van-list>
			</div>
		</van-popup>

	</div>
</template>

<script>
	import { Dialog, Slider, NavBar, Popup, List, Cell } from 'vant'
	import VueAplayer from 'vue-aplayer'
	import tip from '../utils/tip.js'
	export default {
		name: "Play",
		components: {
			[Dialog.name]: Dialog,
			[Slider.name]: Slider,
			[NavBar.name]: NavBar,
			[Popup.name]: Popup,
			[List.name]: List,
			[Cell.name]: Cell
		},
		data() {
			return {
				showone: false,
				showtow: false,
				ischeck: true,
				toggleicon: true,
				list: [],
				loading: false,
				finished: false,
				musicInfo: {
					img: null,
					musicdata: null,
					Url: null,
					//进度条走的百分比
					rate: 0,
					//总时间显示
					lasttime: null,
					changtime: "00:00",

					//重做播放器
					//time1:null,
					//timer1:null,
					value: 0

				},
				time1: null,
				timer1: null,

				//添加收藏
				collectmusic: null,
				musicdata: null,
				iconName: 'pause-circle-o',

				//当前音乐的index
				i: null,
				//获取audio元素
				adio: null,
				//获取当前用户
				userId: null,
				userInfo: null,
				midleBg: null

			}
		},
		methods: {
			back() {
				this.$router.push({
					name: 'Home'
				})
			},
			pause() {
				clearInterval(this.timer1)
				this.ischeck = !this.ischeck
				if(this.adio.paused) {
					this.iconName = 'pause-circle-o'
					this.adio.play()
					this.timer1 = setInterval(this.get1, 10)

				} else {
					this.iconName = 'play-circle-o'
					this.adio.pause()
					clearInterval(this.timer1)
				}

			},
			pre() {
				var idx = {
					checklist: this.i.checklist,
					checkplay: this.i.checkplay = --this.i.checkplay < 0 ? 0 : this.i.checkplay
				}
				this.getInfo(idx)
			},
			next() {
				var music = JSON.parse(localStorage.getItem('playmusic'))
				var len = music.length
				var idx = {
					checklist: this.i.checklist,
					checkplay: this.i.checkplay = ++this.i.checkplay > len ? 0 : this.i.checkplay
				}
				this.getInfo(idx)
			},
			//弹出层
			popup() {
				this.showone = true
			},
			//点击蒙层
			clicklay() {
				this.showone = false
				this.showtow = false
			},
			notfn(txt) {
				tip.notfn(txt)
			},
			getInfo(idx) {
				//this.time = 0
				this.time1 = 0
				localStorage.setItem('checkIndex', JSON.stringify(idx))
				this.i = JSON.parse(localStorage.getItem('checkIndex'))
				var music = JSON.parse(localStorage.getItem('playmusic'))
				this.musicdata = music[idx.checkplay]
				var ltime = this.musicdata.time
				var ss = ltime % 60
				var mm = parseInt(ltime / 60)
				if(ss < 10) {
					ss = "0" + ss
				}
				if(mm < 10) {
					mm = "0" + mm
				}
					
				
				
				this.musicInfo.lasttime = mm + ":" + ss
				this.musicInfo.img = this.musicdata.pic
				this.musicInfo.Url = this.musicdata.url
				this.midleBg.style.backgroundImage = 'url(' + this.musicInfo.img + ')'
				this.togglelove()

			},
			//添加收藏
			collect() {

				var iddata = this.userInfo[this.userId]
				
				if(typeof iddata == 'string') {
					iddata = {
						music: []
					}
					iddata.music.push(this.musicdata)
					this.userInfo[this.userId] = iddata
					localStorage.setItem('userinfo', JSON.stringify(this.userInfo))
					/*this.$dialog.alert({
						message: '成功收藏音乐'
					});*/
					this.$toast('成功收藏音乐')
				} else {
					if(iddata.music == undefined) {
						iddata = {
							searchhistory: iddata.searchhistory,
							music: []
						}
					} else {
						for(var i = 0; i < iddata.music.length; i++) {
							if(this.musicdata.id == this.userInfo[this.userId].music[i].id) {
								//this.$toast('音乐已被收藏')
								this.$dialog.alert({
									message: '音乐已被收藏'
								});
								return

							}
						}
					}

					iddata.music.push(this.musicdata)
					this.userInfo[this.userId] = iddata
					localStorage.setItem('userinfo', JSON.stringify(this.userInfo))
					//					this.$dialog.alert({
					//						message: '成功收藏音乐'
					//					});
					this.$toast('成功收藏音乐')
				}

			},
			lovesong() {
				var iddata = this.userInfo[this.userId]
				if(this.toggleicon) {

					if(typeof iddata == 'string') {
						iddata = {
							Lovemusic: []
						}
						iddata.Lovemusic.push(this.musicdata)
						this.userInfo[this.userId] = iddata
						localStorage.setItem('userinfo', JSON.stringify(this.userInfo))
						this.toggleicon = false
					} else {
						if(iddata.Lovemusic == undefined) {
							iddata = {
								searchhistory: iddata.searchhistory,
								music: iddata.music,
								Lovemusic: []
							}
						}
						iddata.Lovemusic.push(this.musicdata)
						this.userInfo[this.userId] = iddata
						localStorage.setItem('userinfo', JSON.stringify(this.userInfo))
						this.toggleicon = false

					}
				} else {
					this.toggleicon = true
					for(var i = 0; i < iddata.Lovemusic.length; i++) {
						if(this.musicdata.id == iddata.Lovemusic[i].id) {
							iddata.Lovemusic.splice(i, i + 1)
							this.userInfo[this.userId] = iddata
							localStorage.setItem('userinfo', JSON.stringify(this.userInfo))
							return
						}
					}
				}

			},
			//播放列表
			onLoad() {
				var music = JSON.parse(localStorage.getItem('playmusic'))
				var id = this.musicdata.id
				
				// 异步更新数据
				
				if (this.list.length == 0) {
//					console.log("111")
					for(var i = 0; i < music.length; i++) {
						if(id == music[i].id) {
							this.list.push(...music.slice(i, i + 6))
						}
					}
					this.loading = false;
				} else{
					setTimeout(() => {
						this.list.push(...music.slice(this.list.length, this.list.length + 6))
						// 加载状态结束
						this.loading = false;
//						console.log("000")
						// 数据全部加载完成
	//					this.finished = true;
						if(this.list.length >= music.length) {
							this.finished = true;
						}
					}, 500);
				}
				

			},

			sort() {
				this.showtow = true
			},
			//删除排序
			deleta(index) {
				this.list.splice(index, index + 1)
				localStorage.setItem('playmusic', JSON.stringify(this.list))
				//阻止事件
				event.stopPropagation()
			},
			//排序点击播放
			popupPlay(i) {

				this.musicdata = this.list[i]
				this.i.checkplay = i
				this.getInfo(this.i)

			},
			//重做播放器
			get1() {
				this.time1 = this.adio.currentTime
				var ss = parseInt(this.time1 % 60)
				var mm = parseInt(this.time1 / 60)
				if(ss < 10) {
					ss = "0" + ss
				}
				if(mm < 10) {
					mm = "0" + mm
				}

				if(this.adio.currentTime >= this.musicdata.time) {
					clearInterval(this.timer1)
					this.adio.pause()
						++this.i.checkplay
					this.timer1 = setInterval(this.get1, 10)
					this.getInfo(this.i)

				}
				this.musicInfo.value = (this.time1 / this.musicdata.time) * 100
				this.musicInfo.changtime = mm + ":" + ss

			},
			change(value) {
				clearInterval(this.timer1)
				this.musicInfo.value = value
				this.time1 = (value / 100) * this.musicdata.time
				this.adio.currentTime = this.time1
				this.timer1 = setInterval(this.get1, 10)
			},
			togglelove() {
				//				console.log("12345")
				//				console.log(iddata)
				var iddata = this.userInfo[this.userId]

				if(typeof iddata == 'string') {

					this.toggleicon = true
				} else {
					if(iddata.Lovemusic == undefined) {
						this.toggleicon = true
					} else {
						for(var i = 0; i < iddata.Lovemusic.length; i++) {
							if(this.musicdata.id == this.userInfo[this.userId].Lovemusic[i].id) {

								this.toggleicon = false
								return
							}
						}
						this.toggleicon = true
					}

				}
			}

		},

		mounted() {
			//this.timer = setInterval(this.get,1000)

			this.adio = this.$refs.Ado
			//			console.log(this.adio.duration)
			//			console.log(this.adio.src)
			if(this.adio.paused) {
				this.iconName = 'pause-circle-o'
				this.showIcon = false
				this.ischeck = true

				this.timer1 = setInterval(this.get1, 10)
			} else {
				this.iconName = 'play-circle-o'
				this.showIcon = true
				this.ischeck = false
				clearInterval(this.timer1)
			}

			this.midleBg = this.$refs.midleBg

			this.getInfo(this.i)

		},
		beforeDestroy() {
			//clearInterval(this.timer)
			clearInterval(this.timer1)
		},
		created() {
			this.i = JSON.parse(localStorage.getItem('checkIndex'))
			var music = JSON.parse(localStorage.getItem('playmusic'))
			var idx1 = this.i.checklist
			var idx2 = this.i.checkplay

			this.musicdata = music[idx2]
			//this.time = 0

			var data = JSON.parse(localStorage.getItem('coltmusic'))
			this.collectmusic = data == null ? {} : data

			this.userId = JSON.parse(localStorage.getItem('userlogin'))
			this.userInfo = JSON.parse(localStorage.getItem('userinfo'))

		}

	}
</script>

<style scoped lang="less">
	/*动画样式*/
	
	@keyframes rotate {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}
	
	.move1 {
		animation: rotate 5s linear 0.2s infinite running;
	}
	
	.move2 {
		animation: rotate 5s linear 0.2s infinite paused;
	}
	
	.play {
		position: relative;
		width: 10rem;
		height: 17.78666rem;
		overflow: hidden;
		.top {
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			z-index: 10;
			background: rgba(0, 0, 0, 0.3);
			/*padding: 0.2666rem;*/
			/*height: 1.0666rem;*/
			font-size: 16PX;
			line-height: 16PX;
		}
		.midle {
			color: #fff;
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			padding-top: 1rem;
			/*left: 0;
			right: 0;
			top: 3rem;
			bottom:3rem*/
			.midle-bg {
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
			.midle-bg:after,
			.midle-bg {
				content: "";
			}
			/*position: relative;*/
			/*height: 14rem;*/
			/*background-color: #484848;*/
			.content {
				position: relative;
				width: 6.6666rem;
				/*height: 8rem;*/
				/*padding-top: 3rem;*/
				margin: 2.5rem auto;
				.musicinfo {
					/*height: 1.3333rem;*/
					text-align: center;
					/*position: relative;*/
					padding-top: 0.2666rem;
					.name {
						font-size: 20px;
						margin-bottom: 0.6rem;
					}
					span {
						display: block;
						font-size: 16PX;
					}
				}
				.imgIcon {
					width: 6.6666rem;
					height: 6.6666rem;
					background-size: cover;
					background-image: url(../../public/disc_light-ip6.png);
					.Iconmr {
						width: 5.8666rem;
						height: 5.8666rem;
						padding: 0.4rem;
						img {
							width: 100%;
							border-radius: 50%;
						}
					}
					.Iconmr:before {
						content: "";
						width: 5.8666rem;
						height: 5.8666rem;
						position: absolute;
						top: 0;
						bottom: 0;
						left: 0;
						right: 0;
						padding: 0.4rem;
						background-image: url(../../public/disc-ip6.png);
						background-size: cover;
					}
				}
			}
		}
		.bottom {
			position: absolute;
			left: 0;
			right: 0;
			bottom: 0;
			background: rgba(0,0,0,0.2);
			color: #fff;
			/*background: #fff;*/
			/*height: 2.1333rem;*/
			.icons {
				/*color: red;*/
				text-align: center;
				margin: 0.2rem 0 0.1rem;
			}
			.playbtn {
				padding: 0.2666rem;
				
				.time {
					margin-top: 0.2rem;
					text-align: center;
					text-shadow: 0PX 0PX 2PX red;
				}
				.rang {
					/*margin-top: 0.2666rem;*/
					.progress {
						display: inline-block;
						width: 6.6666rem;
						margin-right: 0.53333rem;
					}
					.custom-button {
						width: 0.3rem;
						height: 0.3rem;
						background: red;
						border-radius: 50%;
					}
				}
				.btn {
					text-align: center;
					/*margin-top: 0.2rem;*/
					span {
						width: 32px;
						height: 32px;
						display: inline-block;
						margin: 0 0.4rem;
					}
				}
			}
		}
		.popup {
			/*margin-left:-0.5PX;*/
			/*background: red;*/
			max-height: 8rem;
			border-radius: 0.5rem 0.5rem 0 0;
			font-size: 14PX;
			.popup-content {
				margin: 0.5rem 0.5rem 0 0.5rem;
				img {
					width: 100%;
				}
				.musicName {
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
					max-width: 8rem;
					/*vertical-align: middle;*/
				}
				.popup-top-text {
					/*max-width: ;*/
				}
				.popup-bottom {
					.popup-bottom-item {
						margin: 0.3rem 0.1rem;
						.popup-bottom-icon {
							text-align: center;
						}
					}
				}
			}
		}
		.audio-music {
			position: absolute;
			bottom: 2.13333rem;
		}
	}
</style>