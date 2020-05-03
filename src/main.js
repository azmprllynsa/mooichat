import Vue from 'vue';
import firebase from 'firebase';
import VueSweetalert2 from 'vue-sweetalert2';
import App from './App.vue';
import router from './router';
import './firebase';
import store from './store';

Vue.config.productionTip = false;
Vue.use(VueSweetalert2);

let app;
firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: (h) => h(App),
    }).$mount('#app');
  }
});
