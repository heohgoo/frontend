import { createApp } from 'vue'
import App from './App.vue'

const KAKAO_API_KEY = '385c9e43222e0c0b03514e087d72299a';
window.Kakao.init(KAKAO_API_KEY);

createApp(App).mount('#app')
