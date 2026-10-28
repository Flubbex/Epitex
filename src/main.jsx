import React from 'react'
import ReactDOM from 'react-dom/client'

import './debug'

import AppComponent from './component/App'

import contentPackList from './content'

import Engine from './engine'

import './style'

const game = new Engine(contentPackList)

window.game = game

game.start()

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
    <React.StrictMode>
        <AppComponent game={game} />
    </React.StrictMode>
)
