import React from 'react'
import ReactDOM from 'react-dom/client'

import './debug'

import AppComponent from './component/App'

import Engine from './engine'

import './style'

const engine = new Engine()

window.engine = engine

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
    <React.StrictMode>
        <AppComponent ui={engine.ui} />
    </React.StrictMode>
)
