<template>
	<div class="register">
		<van-row>
			<van-col offset="2" span="20">
				<van-cell-group class="cell-groud">
					<van-field class="cell-field" label="手机号" placeholder="请输入手机号码" v-model="userInfo.phone" />
					<van-field class="cell-field" label="密码" type="password" placeholder="请输入密码" v-model="userInfo.pwd" />
					<van-field class="cell-field" label="确认密码" type="password" placeholder="请重新输入密码" v-model="userInfo.repwd" />
					<van-field class="cell-field" label="短信验证码" v-model="userInfo.validcode">
						<van-button slot="button" type="primary" size="small" @click="sendValidCode" :disabled="isDisabled">{{validCodeText}}</van-button>
					</van-field>

				</van-cell-group>
				<van-button class="register-btn" type="info" size="large" @click="register">注册</van-button>
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
		name: 'Register',
		data() {
			return {
				validCode: '',
				validCodeText: '发送验证码',
				isDisabled: false,
				users: null,
				//用户信息
				userInfo: {
					phone: '',
					pwd: '',
					repwd: '',
					validcode: ''
				}
			}
		},
		components: {
			[CellGroup.name]: CellGroup,
			[Field.name]: Field,
			[Button.name]: Button
		},
		methods: {

			register() {
				
				if(!validForm.validPhone(this.userInfo.phone)) {
					
					tip.dialogTip('手机号码不正确', true, this.userInfo, 'phone');

				} else if(!validForm.validPwd(this.userInfo.pwd, 8, 16)) {
					//验证密码
					
					tip.dialogTip('密码只支持!@._字母数字组合', true, this.userInfo, 'pwd');

				} else if(!validForm.validEqual(this.userInfo.pwd, this.userInfo.repwd)) {
					//验证密码
					
					tip.dialogTip('两次密码不一致', true, this.userInfo, 'repwd');

				} else if(!validForm.validEqual(this.userInfo.validcode, this.validCode) || this.userInfo.validcode.length < 6) {

					//验证密码
					console.log(this.validCode)
					tip.dialogTip('验证码不正确', true, this.userInfo, 'validcode');

				} else {
//					console.log(this.users)
//					console.log(this.users.length)
					for(var i = 0; i < this.users.length; i++) {
						if(this.users[i].phone == this.userInfo.phone) {
							tip.dialogTip('该手机号已被注册');
							return;
						}

					}

					var time = new Date();
					var uid = 'vue' + time.getTime();
					var phone = this.userInfo.phone;
					var pwd = this.userInfo.pwd;
					var registerTime = tool.format(time, 'yyyy-MM-dd hh:mm:ss');

					var user = {
						uid,
						phone,
						pwd,
						registerTime
					};

					this.users.push(user);
					var usersData = JSON.stringify(this.users);

					//写入本地存储users
					localStorage.setItem('users', usersData);
					this.$dialog.alert({
					  message: '注册成功'
					}).then(() => {
					  // on close
					  this.$router.push({name:'Login'})	
					});
							
				}

			},

			sendValidCode() {

				if(!validForm.validPhone(this.userInfo.phone)) {
					tip.dialogTip('手机号码不正确', true, this.userInfo, 'phone');
				} else {

					this.isDisabled = true;

					//60秒后自动恢复
					var time = 5;

					this.validCodeText = time + 's后重新发送';

					var timer = setInterval(() => {

						if(time <= 0) {

							this.isDisabled = false;

							this.validCodeText = '发送验证码';
							clearInterval(timer);
							time = null;

						} else {

							this.validCodeText = --time + 's后重新发送';

						}

					}, 1000)
					this.validCode = validForm.generateValidCode();
					console.log(this.validCode);
					//console.log(this.validCodeText)

				}

			}
		},
		created() {

			var usersData = localStorage.getItem('users')
			this.users = usersData == undefined ? []:  JSON.parse(usersData)
			//console.log(localStorage.users)
		}
	}
</script>
<style scoped lang="less">
	@navheight: 1.3333rem;
		
	
	.register{
		.cell-groud{
			background: none;
			
			.cell-field{
				color: #fff;
				background-color: transparent;
			}
		}
		
	}
</style>