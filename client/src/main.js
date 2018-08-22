// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router';
import http from './plugins/http';
import store from './vuex'

import element from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(element, {
    size: 'mini'
});

Vue.use(http);

Vue.config.productionTip = false;

Vue.filter('date', function(secs) {
    let d = new Date(secs);
    return `${d.getFullYear()}-${d.getUTCMonth()+1}-${d.getDate()} ${d.getHours()}:${d.getUTCMinutes()}:${d.getUTCMinutes()}`;
});

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
});
