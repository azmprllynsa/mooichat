import Vue from 'vue';
import firebase from 'firebase';
import VueSweetalert2 from 'vue-sweetalert2';
import VueGeolocation from 'vue-browser-geolocation';
import * as VueGoogleMaps from 'vue2-google-maps';
import App from './App.vue';
import router from './router';
import './firebase';
import store from './store';

Vue.use(VueSweetalert2);

Vue.config.productionTip = false;
Vue.use(VueGeolocation);

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyCna-EFM36A7p6mtguO3kIFyRIcMSWrATs',
    libraries: 'places',
  },
});

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
