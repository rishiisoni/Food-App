import { Route, Routes } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Cart from './pages/Cart'
import PlaceOrder from './pages/PlaceOrder'
import Footer from './components/Footer'
import { useState } from 'react'
import Login from './components/Login'
import OrderSummary from './pages/OrderSummary'
import Myorders from './pages/Myorders'

function App() {

  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      {
        showLogin ? <Login setShowLogin={setShowLogin} /> : <></>
      }
      <div className="app">
        <Navbar setShowLogin={setShowLogin} />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/placeorder' element={<PlaceOrder />} />
          <Route path='/ordersummary' element={<OrderSummary/>} />
          <Route path='/myorders' element={<Myorders/>} />
        </Routes>
      </div>
      <Footer />
    </>
  )
}

export default App
