import './index.css'
import React from 'react'
import { Routes, Route } from 'react-router-dom'
import RestaurantMenu from './components/RestaurantMenu'
import Discovery from './pages/Discovery'

function App() {

  return (
    
    <div>
        <main>
            <Routes>
                <Route path='/' element={<Discovery />} />
                <Route path='/restaurant/:id' element={<RestaurantMenu />} />
            </Routes>
        </main>
    </div>
    
  )
}

export default App
