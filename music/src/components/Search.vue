<template>
	<div class="search">
		<div class="top">
			<van-nav-bar left-arrow left-text="返回" @click-left="back"></van-nav-bar>

			<div ref="search">
				<van-search class="seh" v-model="keyword" placeholder="请输入搜索关键词" show-action shape="round" @focus="fouseFn">
					<div slot="action" @click="onSearch">搜索</div>
				</van-search>
			</div>

			<div class="tags" v-show="isFouse">
				<p>搜索历史</p>
				<ul class="tag">
					<li class="tag-col" v-for="item in userinfo[loginid].searchhistory" @click="clickhistory(item)">{{item}}</li>
				</ul>
				<!--<van-icon name="delete" size="16px" color="#ddd">清空搜索历史</van-icon>-->
			</div>
		</div>

		<div class="content" v-show="!isFouse">
			<van-row class="conttent-top">
				<van-col span="5" offset="1">搜索结果</van-col>
			</van-row>

			<!--<van-row class="musicCart" ref="van" v-for="(item,index) in searchmusic" type="flex" justify="space-between" align="center">
				<van-col class="num" span="3">{{index+1}}</van-col>
				<van-col class="info" span="18">
					<div class="musicName">{{item.name}}</div>
					<div class="musicInfo">{{item.singer}}</div>
				</van-col>
				<van-col class="play" span="3">
					<van-icon @click="checkIcon(index)" name="play-circle-o" size="30px" />
				</van-col>
			</van-row>-->

			<van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
				<van-cell v-for="(item,index) in list" :key="index">
					<van-row class="musicCart" ref="van" type="flex" justify="space-between" align="center">
						<van-col class="num" span="3">{{index+1}}</van-col>
						<van-col class="info" span="18">
							<div class="musicName">{{item.name}}</div>
							<div class="musicInfo">{{item.singer}}</div>
						</van-col>
						<van-col class="play" span="3">
							<van-icon @click="checkIcon(index)" name="play-circle-o" size="30px" />
						</van-col>
					</van-row>
				</van-cell>
			</van-list>

		</div>

	</div>
</template>

<script>
	import { Search, Tag, NavBar, List, Cell } from 'vant'
	export default {
		name: 'Search',
		components: {
			[Search.name]: Search,
			[Tag.name]: Tag,
			[NavBar.name]: NavBar,
			[List.name]: List,
			[Cell.name]: Cell
		},
		data() {
			return {
				keyword: '',
				isFouse: true,
				music: [],
				searchmusic: [],
				//登录用户的信息
				userinfo: null,
				loginid: null,

				loading: false,
				finished: false,
				list: []

			}
		},

		methods: {
			back() {
				this.$router.push({
					name: 'Home'
				})
			},
			clickhistory(item) {
				this.keyword = item
				this.onSearch()
			},
			onSearch() {
				this.searchmusic = []
				this.list = []
				this.isFouse = false
				if(this.keyword == '' || this.keyword == undefined) {
					this.$toast('搜索关键字不能为空');
					return
				}
				var match = new RegExp('(' + this.keyword + ')', 'img')

				this.music.forEach(v => {
					if(match.test(v.name)) {
						this.searchmusic.push(v)
						localStorage.setItem('playmusic', JSON.stringify(this.searchmusic))
						if(this.list.length < 20) {
							this.list.push(...this.searchmusic)
						}

					}
				})

				//将搜索历史存到存储中

				var iddata = this.userinfo[this.loginid]
				if(typeof iddata == 'string') {
					iddata = {
						searchhistory: []
					}
					iddata.searchhistory.push(this.keyword)
				} else {
					if(iddata.searchhistory == undefined) {
						iddata = {
							music: iddata.music,
							searchhistory: []
						}
					} else {
						for(var i = 0; i < iddata.searchhistory.length; i++) {
							if(this.keyword == iddata.searchhistory[i]) {
								return

							}
						}
					}

					if(iddata.searchhistory.length >= 10) {
						iddata.searchhistory.shift()
						//iddata.searchhistory.push(this.keyword)
					}

					iddata.searchhistory.push(this.keyword)
					this.userinfo[this.loginid] = iddata
					localStorage.setItem('userinfo', JSON.stringify(this.userinfo))
				}

			},
			fouseFn() {
				this.isFouse = true
			},
			checkIcon(index) {
				var idx = {
					checkplay: index
				}
				var checkindex = JSON.stringify(idx)
				localStorage.setItem('checkIndex', checkindex)

				this.$router.push({
					name: 'Play'
				})
			},
			onLoad() {
				if(this.list.length >= 20) {
					setTimeout(() => {
						//							console.log("000")
						this.list.push(...this.searchmusic.slice(this.list.length, this.list.length + 6))
						// 加载状态结束
						this.loading = false;

						// 数据全部加载完成
						//					this.finished = true;
						if(this.list.length >= this.searchmusic.length) {
							this.finished = true;
						}
					}, 500);
				}
			}

		},
		mounted() {
			var search = this.$refs.search.querySelector('input')
			search.focus()

		},
		created() {
			var hotmusic = JSON.parse(localStorage.getItem('Hotmusic'))
			var newmusic = JSON.parse(localStorage.getItem('Newestmusic'))
			var listmusic = JSON.parse(localStorage.getItem('musiccart'))
			this.music.push(...hotmusic)
			this.music.push(...newmusic)
			this.music.push(...listmusic)

			//获取登录用户的信息
			this.loginid = JSON.parse(localStorage.getItem('userlogin'))
			this.userinfo = JSON.parse(localStorage.getItem('userinfo'))
		}

	}
</script>

<style scoped lang="less">
	.search {
		/*position: absolute;*/
		top: 0;
		bottom: 0;
		right: 0;
		left: 0;
		.top {
			/*padding-top: 0.2666rem;*/
			/*height: 0.8rem;*/
			position: sticky;
			top: 0;
			z-index: 10;
			font-size: 16PX;
			line-height: 16PX;
		}
		.seh {
			background-color: red;
		}
		.tags {
			padding: 0.2666rem;
			p {
				font-size: 17PX;
				margin: 0;
			}
			.tag {
				overflow: hidden;
			}
			.tag-col {
				float: left;
				padding: 0.1rem;
				white-space: nowrap;
				text-overflow: ellipsis;
				background-color: #f2f2f2;
				margin-right: 0.4rem;
				margin-top: 0.2rem;
				max-width: 3rem;
				overflow: hidden;
			}
		}
		.content {
			padding: 0 0.3rem;
			.conttent-top {
				margin: 0.1rem 0;
				font-size: 14PX;
			}
			.musicCart {
				padding: 0 0.2666rem;
				margin: 0 0.3rem;
				height: 1.6rem;
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
						font-size: 14PX;
					}
					.musicInfo {
						color: #666;
					}
				}
			}
		}
	}
</style>