import 'lib-flexible/flexible.js'
import Vue from 'vue'
import App from './App.vue'

import router from './router/index.js'


import axios from 'axios'
import VueAxios from 'vue-axios'
import './fonticon/iconfont.css'

import {Row,Col,Icon,Toast,Dialog} from 'vant'
Vue.use(Row).use(Col)
Vue.use(Icon)
Vue.use(Toast)
Vue.use(Dialog)

Vue.use(VueAxios, axios)


Vue.config.productionTip = false

new Vue({
	router,
  render: h => h(App),
}).$mount('#app')
