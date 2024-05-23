import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
// 引入vuex
import store from './store/store'

import ElementPlus from 'element-plus'
import * as ElIcons from '@element-plus/icons-vue'
import locale from 'element-plus/es/locale/lang/zh-cn'
import 'element-plus/dist/index.css'
import 'animate.css/animate.min.css'
// import SvgIcon from './icons'

const app = createApp(App)
for (const name in ElIcons) {
    app.component(name, ElIcons[name])
}


app.use(store)
    .use(router)
    .use(ElementPlus, {locale})
    .mount('#app')
