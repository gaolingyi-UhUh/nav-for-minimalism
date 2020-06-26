import Vue from 'vue'
import App from './App.vue'
import { Button, Input, Dialog, Form, FormItem, Icon, MessageBox } from "element-ui";
import 'element-ui/lib/theme-chalk/index.css';
import '@/assets/css/base.css'
Vue.use(Button);
Vue.use(Input);
Vue.use(Dialog);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Icon);
Vue.prototype.$confirm = MessageBox.confirm;
Vue.config.productionTip = false

new Vue({
  render: function (h) { return h(App) },
}).$mount('#app')
