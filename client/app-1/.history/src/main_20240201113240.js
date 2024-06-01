import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import DataVVue3 from '@kjgl77/datav-vue3'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import '@/assets/base.scss'
import App from './App.vue'
import router from './router'
import  * as echarts from 'echarts'
import ECharts from 'vue-echarts'
// import 'animate.min.css';
import 'animate.compat.css';


const app = createApp(App)
app.use(DataVVue3)
app.use(createPinia())
app.use(router) 
app.use(ElementPlus)
app.component('v-chart', ECharts)

app.mount('#app')

app.config.globalProperties.$echarts = echarts