/* eslint-disable import/no-extraneous-dependencies */
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';

// import pinDirective from './shared/pin-directive';

const pinia = createPinia();

createApp(App)
  .use(router)
  .use(pinia)
  .mount('#app');

// .directive('pin', pinDirective)
