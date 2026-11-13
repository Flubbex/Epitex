import React from 'react'
import ReactDOM from 'react-dom/client'

import './debug'

import AppComponent from './component/App'

import contentPackList from './content'

import Engine from './engine'

import './style'

const engine = new Engine(contentPackList)

window.engine = engine

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
    <React.StrictMode>
        <AppComponent ui={engine.ui} />
    </React.StrictMode>
)
