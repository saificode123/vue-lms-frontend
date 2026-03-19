// 1. Import Tailwind CSS (Must be at the top)
import './assets/main.css'

// 2. Import Vue core and plugins
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router' // Points to src/router/index.js

// 3. Import the root component
import App from './App.vue'

// 4. Create the Vue application instance
const app = createApp(App)

// 5. Register the plugins
app.use(createPinia()) // Enables global state management (Auth Store)
app.use(router)        // Enables page navigation and route protection

// 6. Mount the app to the <div id="app"> in your index.html
app.mount('#app')