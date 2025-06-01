import { createApp } from "vue";
import "./assets/css/reset.css";
import ElementPlus from "element-plus";
import * as ELIcons from '@element-plus/icons-vue'
import "element-plus/dist/index.css";
// axios.defaults.baseURL = '/apii' 
// 使用Element Plus内置图标

import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "./utils/axios";
import qs from "qs";
import oss from "./utils/oss"; /* 上传文件 */

import echarts from 'echarts'
// Vue.prototype.$echarts = echarts // 全局注册 ECharts 组件

// axios.defaults.baseURL = '/checkNews'        //关键代码

const app = createApp(App);

app.config.globalProperties.$axios = axios;
app.config.globalProperties.$qs = qs;
app.config.globalProperties.$oss = oss;

// 全部加载
app.use(ElementPlus);
// 注册Element Plus图标
for (const [key, component] of Object.entries(ELIcons)) {
  app.component(key, component);
}

// 添加全局错误处理
app.config.errorHandler = (err, vm, info) => {
  console.error('Vue错误:', err);
  console.error('错误信息:', info);
};

// 添加全局警告处理
app.config.warnHandler = (msg, vm, trace) => {
  console.warn('Vue警告:', msg);
  console.warn('警告追踪:', trace);
};

// 挂载应用
try {
  app.use(router).use(store).mount("#app");
  console.log('应用已成功挂载');
} catch (error) {
  console.error('应用挂载失败:', error);
}
