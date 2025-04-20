import './App.css'
import Navbar from './components/Navbar.jsx'
import Sidebar from './components/Sidebar.jsx'
import { Routes, Route } from 'react-router-dom'
import AddProduct from './pages/AddProduct.jsx'
import ProductList from './pages/ProductList.jsx'
import Orders from './pages/Orders.jsx'
import { ToastContainer, toast } from 'react-toastify';

function App() {

  const url = "http://localhost:3000";

  return (
    <>
      <ToastContainer />
      <Navbar />
      <hr />
      <div className="app-content">
        <Sidebar />
        <Routes>
          <Route path='/addproduct' element={<AddProduct url={url}/>} />
          <Route path='/productlist' element={<ProductList url={url}/>} />
          <Route path='/orders' element={<Orders url={url}/>} />
        </Routes>
      </div>
    </>
  )
}

export default App
