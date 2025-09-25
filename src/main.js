import { createApp } from 'vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import Highcharts from 'highcharts'
import HighchartsMore from 'highcharts/highcharts-more.js'
import Exporting from 'highcharts/modules/exporting.js'
import ExportData from 'highcharts/modules/export-data.js'
import Accessibility from 'highcharts/modules/accessibility.js'
import HighchartsVue from 'highcharts-vue'
import App from './App.vue'



// Initialize Highcharts modules globally so components can use chart types
// like 'gauge' without having to import modules in individual components.
// helper to call module initializer regardless of export shape
// 這是一開始確定可以的 initModule 寫法
// const initModule = (mod, hc) => {
// 	if (!mod) return
// 	if (typeof mod === 'function') return mod(hc)
// 	if (mod && typeof mod.default === 'function') return mod.default(hc)
// }

// 這是 chatgpt 給的較簡單的 initModule 寫法，不確定行不行
// 因為發現根本有 import HighchartsMore 那行就夠了
// 用一個 helper，確保不管是 default export 還是 function 都能正確執行
// function initModule(module, hc) {
//   (module.default || module)(hc)
// }

// 這些不確定還需不需要
// initModule(HighchartsMore, Highcharts)
// initModule(Exporting, Highcharts)
// initModule(ExportData, Highcharts)
// initModule(Accessibility, Highcharts)


const app = createApp(App)

app.use(HighchartsVue)

app.mount('#app')
