<template>
<div class="Login">
		<van-row>
			<van-col offset="2" span="20">
				<van-cell-group class="cell-groud">
					<van-field class="cell-field" label="手机号" placeholder="请输入手机号码" v-model="userInfo.phone" />
					<van-field class="cell-field" label="密码" type="password" placeholder="请输入密码" v-model="userInfo.pwd"/>
				</van-cell-group>
				<van-button class="register-btn" type="info" size="large" @click="login">登录</van-button>
			</van-col>
		</van-row>

	</div>
</template>

<script>
	import { CellGroup, Field, Button } from 'vant'
	import validForm from '../utils/validForm.js'
	import tip from '../utils/tip.js'
	import tool from '../utils/tool.js'
	
	
	export default {
		name:'Login',
		data(){
			return {
				users:[],
				userInfo: {
					phone: '',
					pwd: ''
				},
				info:[]
			}
		},
		components: {
			[CellGroup.name]: CellGroup,
			[Field.name]: Field,
			[Button.name]: Button
		},
		methods:{
			login(){
				var id = this.userInfo.phone
				if (!validForm.validPhone(this.userInfo.phone)) {

					tip.dialogTip('手机号码不正确', true, this.userInfo, 'phone');

				} else if (!validForm.validPwd(this.userInfo.pwd, 8, 16)) {
					tip.dialogTip('密码只支持!@._字母数字组合', true, this.userInfo, 'pwd');
				} else{
					var userData = localStorage.getItem('users')
					this.users = JSON.parse(userData)
					
					for (var i = 0; i < this.users.length;i++) {
						if (this.users[i].phone == this.userInfo.phone) {
							if (this.users[i].pwd == this.userInfo.pwd) {
								var login = this.userInfo.phone
								var datalogin = JSON.stringify(login)
								localStorage.setItem('userlogin',datalogin)
								
								var infodata = this.info[login] == undefined ? login :this.info[login]
								
								this.info[login] = infodata
								localStorage.setItem('userinfo',JSON.stringify(this.info))
								console.log(this.info)
								
								
								//
								
								this.$router.push({name:'Home'})
								return 
								
							} else{
								return tip.dialogTip('手机号或者密码不正确');
							}
							
							
						}
					}
					
					tip.dialogTip('该用户不存在');
					
					
				}
				
				
			}
		},
		created(){
			//localStorage.setItem('userinfo',JSON.stringify(this.info))
			var data = JSON.parse(localStorage.getItem("userinfo"))
			
			this.info = data == undefined ? {}:data
			
			
			//
		}
	}
</script>

<style scoped lang="less">
	.Login{
		.cell-groud{
			background: none;
			
			.cell-field{
				color: #fff;
				background-color: transparent;
			}
		}
	}
</style>