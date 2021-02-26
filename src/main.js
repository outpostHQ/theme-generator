import { createApp } from 'vue';
import { FocusTrap } from 'focus-trap-vue';
import App from './App.vue';

const app = createApp(App);

app.component('FocusTrap', FocusTrap);

app.mount('#app');
