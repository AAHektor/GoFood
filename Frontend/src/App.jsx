import './index.css'
import React from 'react'
import { Routes, Route } from 'react-router-dom'
import RestaurantMenu from './components/RestaurantMenu'
import Discovery from './pages/Discovery'
import Orders from './pages/Orders'

function App() {

  return (
    
    <div>
        <main>
            <Routes>
                <Route path='/' element={<Discovery />} />
                <Route path='/restaurant/:id' element={<RestaurantMenu />} />
                <Route path='/orders' element={<Orders />} />
            </Routes>
        </main>
    </div>
    
  )
}

export default App
