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
import 'animate.css/animate.min.css';
import 'animate.css/animate.compat.css';
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'

import { getDicts } from "@/api/system/dict/data";
import { parseTime, resetForm, addDateRange, selectDictLabel, sselectDictLabelV2, selectDictLabels, handleTree, parseFlatMap } from "@/utils/ruoyi";
 


const app = createApp(App)
app.use(DataVVue3)
app.use(createPinia())
app.use(router) 
app.use(ElementPlus,{
    locale: zhCn,
})
app.component('v-chart', ECharts)

app.mount('#app')
app.config.globalProperties.parseTime= parseTime
app.config.globalProperties.$echarts = echarts
