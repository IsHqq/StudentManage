import Vue from 'vue';
import App from './App.vue';
import router from './router';
import ElementUI from 'element-ui';
import VueI18n from 'vue-i18n';//实现国际化
import { messages } from './components/common/i18n';//两种版本字符
import 'element-ui/lib/theme-chalk/index.css'; // 默认主题
// import './assets/css/theme-green/index.css'; // 浅绿色主题
import './assets/css/icon.css';
import './components/common/directives';
import 'babel-polyfill';
import axios from 'axios';

Vue.config.productionTip = false;
Vue.use(VueI18n);//中英文字符
Vue.use(ElementUI, {
    size: 'small'
});
const i18n = new VueI18n({
    locale: 'zh',
    messages
});

//拦截器
axios.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            // eslint-disable-next-line no-param-reassign
            config.headers.Authorization = token;
        }
        //this.$message.error('erororo')
        return config;
    },
    (error) => Promise.reject(error),
);

Vue.prototype.$axios = axios;

new Vue({
    router,
    i18n,
    render: h => h(App)
}).$mount('#app');
