import Home from "./pages/Home"
import Navbar from "./components/Navbar"
import Collection from "./pages/Collection"
import About from "./pages/About"
import Contact from "./pages/Contact"
import Product from "./pages/Product"
import Cart from "./pages/Cart"
import Login from "./pages/Login"
import PlaceOrder from "./pages/PlaceOrder"
import Orders from "./pages/Orders"
import Footer from './components/Footer'
import SearchBar from './components/SearchBar'
import ScrollToTop from './components/ScrollToTop'
import { Routes, Route } from "react-router";
import { ToastContainer } from 'react-toastify';
import Verify from './pages/Verify'
const App = () => {
  return (
    <>
      <ScrollToTop />
      <div className='px-4 sm:px-5[vw] md:px-[-7vw] lg:px-[9vw]'>
        <ToastContainer />
        <Navbar/>
        <SearchBar/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/collection" element={<Collection />}/>
          <Route path="/about" element={<About/>}/>
          <Route path="/contact" element={<Contact/>}/>
          <Route path="/product/:productId" element={<Product/>}/>
          <Route path="/cart" element={<Cart/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/place-order" element={<PlaceOrder/>}/>
          <Route path="/orders" element={<Orders/>}/>
          <Route path="/verify" element={<Verify/>}/>
        </Routes>
      </div>
      <Footer/>
    </>
  )
}

export default App
