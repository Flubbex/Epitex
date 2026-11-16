import React from "react"
import ReactDOM from "react-dom/client"

import "./debug"

import UI from "./UI"

import Engine from "./engine"

import "./style"

const engine = new Engine()

window.engine = engine

const root = ReactDOM.createRoot(document.getElementById("root"))

root.render(
    <React.StrictMode>
        <UI ui={engine.ui} />
    </React.StrictMode>
)
