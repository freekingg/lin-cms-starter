import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'



const app = createApp(App)
app.use(DataVVue3)
app.use(createPinia())
app.use(router) 
app.use(ElementPlus,{
    locale: zhCn,
})



app.component('Pagination', Pagination)
app.component('DictTag', DictTag)
app.component('v-chart', ECharts)

app.mount('#app')

app.config.globalProperties.useDict = useDict
app.config.globalProperties.parseTime = parseTime

// app.config.globalProperties.getDicts =  (keys) => {
// console.log(keys)
// }
//  parseTime
app.config.globalProperties.$echarts = echarts
