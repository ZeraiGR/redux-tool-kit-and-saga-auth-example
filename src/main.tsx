import '@gravity-ui/uikit/styles/fonts.css'
import '@gravity-ui/uikit/styles/styles.css'
import './index.css'

import { BrowserRouter as Router } from 'react-router-dom'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { store } from './redux/main.ts'
import { Provider } from 'react-redux'

import { ThemeProvider } from '@gravity-ui/uikit'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Router>
            <Provider store={store}>
                <ThemeProvider theme="light">
                    <App />
                </ThemeProvider>
            </Provider>
        </Router>
    </React.StrictMode>
)
