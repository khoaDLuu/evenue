import Vue from 'vue'
import Amplify from 'aws-amplify';
import aws_exports from './aws-exports';
import {
  applyPolyfills,
  defineCustomElements,
} from '@aws-amplify/ui-components/loader';
import "@storefront-ui/vue/styles.scss";
import router from './router'
import App from './App'
import './main.css'

Amplify.configure(aws_exports);

applyPolyfills().then(() => {
  defineCustomElements(window);
});

Vue.config.productionTip = false
Vue.config.ignoredElements = [/amplify-\w*/];

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
