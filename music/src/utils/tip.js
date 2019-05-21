import Vue from 'vue'

import { Dialog,Toast } from 'vant'

Vue.use(Dialog)
Vue.use(Toast)

export default {

	//对话框提示
	dialogTip(title, isClear, o, property) {

		//title: 提示信息
		//isClear: 是否清空对象的属性值
		//o: 清空属性值得对象
		//property: 对象o的属性

		Dialog.alert({
			title,
		}).then(() => {

			if (typeof isClear === 'boolean' && isClear) {
				o[property] = '';
			}

		})
	},
	notfn(txt){
//		Dialog.alert({
//			title:'暂无'+txt+'功能'
//		})
		Toast('暂无'+txt+'功能');
	}

}