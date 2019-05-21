<template>
	<div class="myhome">

		<div class="info">
			<div class="img">
				<img src="http://p1.music.126.net/hpE-RKzPjSrZNYcHjFXLTw==/1413971965193316.jpg?param=400y400" />
			</div>
			<div class="name">{{userdata.uname}}</div>
		</div>

		<div class="content">
			<div class="list">
				<van-list>
					<van-cell class="cell-coll" title="修改资料" @click="modifi">
						<van-icon name="arrow" />
					</van-cell>
					<van-cell v-for="(item,index) in list" :key="index" class="cell-coll" :title="item.title" @click="coll(item.title,index)">
						<van-icon name="arrow" />
					</van-cell>

				</van-list>
				<!--<van-list >
					
				</van-list>-->
			</div>
			<van-col class="logout" span="24">
				<van-button type="danger" size="large" @click="LogOff">退出</van-button>
			</van-col>
		</div>

		<van-popup class="modifi1" v-model="show1" position="right" :close-on-click-overlay="false">
			<van-nav-bar title="修改资料" left-text="我的资料" left-arrow @click-left="back1" />
			<div class="popup-lists">
				<van-list>
					<van-cell class="cell-coll" v-for="(item,index) in items" :title="item.title" @click="CheckModifi(item,index)">
						<div>{{item.content}}
							<van-icon class="cell-coll-icon" name="arrow"></van-icon>
						</div>
					</van-cell>
				</van-list>
			</div>
		</van-popup>

		<van-popup class="modifi2" v-model="show2" position="bottom">
			<van-nav-bar title="修改昵称" left-text="返回" left-arrow right-text="确定" @click-left="back2" @click-right="onClickName" />
			<van-cell-group>
				<van-field v-model="revise.uname" label="昵称" />
			</van-cell-group>
		</van-popup>

		<van-popup class="modifi1" v-model="show3" position="right">
			<van-nav-bar title="修改密码" left-text="返回" left-arrow right-text="确定" @click-left="back2" @click-right="onClickPwd" />
			<van-cell-group>
				<van-field v-model="userdata.pwd" type="password" label="原密码" />
				<van-field v-model="revise.pwd" type="password" label="修改密码" />
				<van-field v-model="revise.repwd" type="password" label="确认密码" />

				<van-field v-model="revise.validcode" center clearable label="短信验证码" placeholder="请输入短信验证码">
					<van-button slot="button" size="small" type="primary" @click="sendValidCode" :disabled="isDisabled">{{validCodeText}}</van-button>
				</van-field>

			</van-cell-group>
		</van-popup>

	</div>

</template>

<script>
	import { List, Cell, Button, Popup, NavBar, Field, CellGroup } from 'vant'

	import validForm from '../utils/validForm.js'
	import tip from '../utils/tip.js'
	export default {
		name: 'MyHome',
		components: {
			[List.name]: List,
			[Cell.name]: Cell,
			[Button.name]: Button,
			[Popup.name]: Popup,
			[NavBar.name]: NavBar,
			[Field.name]: Field,
			[CellGroup.name]: CellGroup
		},
		data() {
			return {
				user: null,
				uid: null,
				isShow: true,
				show1: false,
				show2: false,
				show3: false,
				list: [{
						title: '喜欢的音乐'
					},
					{
						title: '我的收藏'
					}
				],
				userdata: null,
				items: null,
				itemsIndex: null,
				revise: {
					uname: null,
					pwd: null,
					repwd: null,
					validcode: null
				},
				validCode: '',
				validCodeText: '发送验证码',
				isDisabled: false

				//				modifiuser:null
			}
		},
		methods: {
			LogOff() {

				localStorage.removeItem('userlogin')
				this.login = null
				//localStorage.setItem()
				this.$router.push({
					name: 'Index'
				})
			},
			coll(title, index) {
				//this.$router.push({name:'CollMusic'})
				this.$router.push({
					name: 'CollMusic',
					params: {
						title,
						i: index,
						userlogin: this.userdata.uname
					}
				})
			},
			clickLay() {
				this.show1 = true
				this.show2 = false
			},
			modifi() {
				this.show1 = true
			},
			back1() {
				this.show1 = false
			},
			back2() {
				this.show2 = false
			},
			onClickName() {
				
				this.$dialog.confirm({
					message: '是否修改昵称'
				}).then(() =>
					this.CheckGetInfo(this.userdata.uname, this.revise.uname)

				).catch(() => {

				})
				this.userdata.uname = this.revise.uname
			},
			onClickPwd() {
				//				console.log('this.revise.validcode -->',this.revise.validcode)
				//				console.log('this.validCode -->',this.validCode)
				if(this.revise.validcode != this.validCode) {
					this.$dialog.alert({
						message: '验证码不正确'
					}).then(() => {
						this.revise.validcode = ''
					})
				} else {
					this.$dialog.confirm({
						message: '是否修改密码'
					}).then(() => {
						this.userdata.pwd = this.revise.pwd
						data[id].userdata = this.userdata
						localStorage.setItem('userinfo', JSON.stringify(data))
						this.show3 = false
						this.items[this.itemsIndex].content = this.revise.pwd

					})
				}

			},
			sendValidCode() {
				if(this.revise.pwd == null && this.revise.repwd == null) {
					this.$dialog.alert({
						message: '修改密码和确认密码不能为空'
					}).then(() => {

					})
				} else if(!validForm.validPwd(this.revise.pwd, 8, 16)) {
					//验证密码

					tip.dialogTip('密码只支持!@._字母数字组合', true, this.revise, 'pwd');

				} else if(!validForm.validEqual(this.revise.pwd, this.revise.repwd)) {

					tip.dialogTip('两次密码不一致', true, this.revise, 'repwd');

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
				}

			},
			CheckModifi(v, i) {
				if(v.isUname) {
					this.show2 = true
					this.revise.uname = this.userdata.uname
					this.itemsIndex = i
				} else if(v.isPwd) {
					this.show3 = true

				}

			},
			CheckGetInfo(u, o) {
				/*
				 o:输入框的值
				 i:弹出层关闭
				 u:出入存储的值
				 */
				var id = JSON.parse(localStorage.getItem('userlogin'))
				var data = JSON.parse(localStorage.getItem('userinfo'))
				u = o
				data[id].userdata = this.userdata
				localStorage.setItem('userinfo', JSON.stringify(data))
				this.items[this.itemsIndex].content = o
				this.show2 = false
				this.show3 = false
			},
			focusFn() {

			}

		},
		mounted() {
		},
		created() {

			var id = JSON.parse(localStorage.getItem('userlogin'))
			var users = JSON.parse(localStorage.getItem('users'))
			users.forEach((v, i) => {
				if(id == v.phone) {
					this.user = v
					//					this.uid = v.uid
				}
			})

			var data = JSON.parse(localStorage.getItem('userinfo'))
			/*data[id].userdata)*/
			/*data[id].userdata = data[id].userdata == undefined ? this.user : data[id].userdata*/
			if (!data[id].userdata) {
				data[id] ={
					userdata :this.user
				} 
			}else{
				data[id].userdata = data[id].userdata
			}
			
			if(data[id].userdata.uname == undefined) {
/*				data[id].userdata = {
					uname:this.user.uid,
					sex:null,
					address:null,
					img:null
					
				}*/
				data[id].userdata.uname = this.user.uid
				data[id].userdata.sex = null
				data[id].userdata.address = null
				data[id].userdata.img = null
//				localStorage.setItem('userinfo', JSON.stringify(data))
			}
			this.userdata = data[id].userdata
//			console.log(this.userdata)
			var match = new RegExp('(' + this.userdata.pwd + ')', 'img')
			var pwd = this.userdata.pwd.replace(match, '*******')

			this.items = [{
					content: this.userdata.img,
					title: '头像',
					isCheck: true
				},
				{
					content: this.userdata.uid,
					title: '用户id',
					isCheck: false
				},
				{
					content: this.userdata.phone,
					title: '手机号码',
					isCheck: false
				},
				{
					content: this.userdata.uname,
					title: '昵称',
					isUname: true
				},
				{
					content: pwd,
					title: '密码',
					isPwd: true
				},
				{
					content: this.userdata.sex,
					title: '性别',
					isSex: true
				},
				{
					content: this.userdata.address,
					title: '地区',
					isAddress: true
				}
			]

		}
	}
</script>

<style scoped lang="less">
	.myhome {
		position: relative;
		/*top: 10rem;
		right: 0;
		left: 0;
		bottom:0;
		/*overflow: hidden;*/
		.info {
			padding-top: 1em;
			margin: 0.5rem auto;
			width: 6rem;
			/*border-radius: 50%;*/
			/*overflow: hidden;*/
			text-align: center;
			.img {
				width: 5rem;
				height: 5rem;
				border-radius: 50%;
				overflow: hidden;
				/*background: #0077AA;*/
				border: 15PX solid #ddd;
				img {
					width: 100%;
					display: block;
				}
			}
			.name {
				padding-top: 0.4rem;
				font-size: 16PX;
			}
		}
		.content {
			.list {
				padding: 0.5rem 0;
				.cell-coll {
					color: #999;
					font-size: 16PX;
				}
			}
		}
		.modifi1 {
			width: 100%;
			height: 100%;
			left: auto;
			right: 0;
			.cell-coll-icon {
				margin-left: 0.1rem;
			}
		}
		.modifi2 {
			/*position: absolute;*/
			/*top: 50%;*/
			bottom: 0;
			height: 60%;
			top: auto;
		}
	}
</style>