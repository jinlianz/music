<template>
	<div class="index">
		<div class="top">
			<van-nav-bar v-show="!isShow" class="bar" title="" left-text="返回" right-arrow @click-left="clickReturn" @click-right="clickRight">
				<van-icon slot="right">{{msg}}</van-icon>
			</van-nav-bar>
		</div>

		<div class="content">
			<!--<div class="logo">
				<img src="../../public/logo.jpg" />
			</div>-->

			<van-row v-show="isShow">
				<van-col span="12" class="register-login">
					<van-button type="info" size="small" @click="clickEnroll">注册</van-button>
				</van-col>
				<van-col span="12" class="register-login">
					<van-button type="info" size="small" @click="clickLogin">登录</van-button>
				</van-col>
			</van-row>
			<router-view></router-view>
		</div>

	</div>
</template>
<script>
	import { CellGroup, Field, Button, Icon, NavBar } from 'vant'

	export default {
		name: 'Index',
		data() {
			return {
				isShow: true,
				msg: '登录',
				isRegister: true,
				tabs: [{
					flag: 'register'
				}, {
					flag: 'login'
				}]

			}
		},
		components: {
			[CellGroup.name]: CellGroup,
			[Field.name]: Field,
			[Button.name]: Button,
			[Icon.name]: Icon,
			[NavBar.name]: NavBar
		},
		methods: {
			clickEnroll() {
				this.isShow = false
				this.msg = '登录'
				this.isRegister = true
				this.$router.push({
					name: 'Register'
				})
			},
			clickLogin() {
				this.isShow = false
				this.msg = '注册'
				this.isRegister = false
				this.$router.push({
					name: 'Login'
				})
			},
			clickReturn() {
				this.isShow = true
				this.$router.push({
					name: 'Index'
				})
			},
			clickRight() {
				if(this.isRegister) {

					this.$router.push({
						name: 'Login'
					})
					this.msg = '注册'
					this.isRegister = false
				} else {
					this.msg = '登录'
					this.isRegister = true
					this.$router.push({
						name: 'Register'
					})
				}

			}
		},
		created() {

			var hash = location.hash
			for(var i = 0; i < this.tabs.length; i++) {
				if(hash.indexOf(this.tabs[i].flag) > -1) {
					this.isShow = false
				}
			}
			console.log(hash)

		}

	}
</script>
<style scoped lang="less">
	@navheight: 1rem;
	.index{
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		background: url(../../public/home-bg.jpg) no-repeat center;
		background-size: cover;
		max-width: 10rem;
		margin: auto;
		/*width: 3.5rem;*/
		.top{
			height: 46PX;
		}
	}
	.content {
		padding-top: 8rem;
		background: none;
		.logo {
			margin:0.5rem;
			img {
				width: 100%;
			}
		}
		.bar {
			text-align: center;
		}
		.register-login {
			text-align: center;
		}
	}
</style>