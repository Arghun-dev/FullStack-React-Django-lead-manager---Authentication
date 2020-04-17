import React from 'react'
import ReactDOM from 'react-dom'

import Navbar from './layout/Navbar/Navbar'
import Dashboard from './leads/Dashboard'

const App = () => {
    return (
        <div>
            <Navbar />
            <Dashboard />
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('app'))