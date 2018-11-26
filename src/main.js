import Vue from 'vue'
import App from './App.vue'
import VeeValidate from 'vee-validate';
Vue.use(VeeValidate);

Vue.use(require('vue-shortkey'))

Vue.config.productionTip = false

new Vue({
  
  render: h => h(App),
}).$mount('#app')
