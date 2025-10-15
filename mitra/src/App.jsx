import './App.css'
import './index.css';
import Home from './pages/Home';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import Login from './Auth/login';
import Signup from './Auth/Signup';
import Navbar from './Components/Navbar';
import Shop from './pages/Shop';
import ProductDetailsPage from './pages/ProductDetails';
import FarmNavbar from './Components/FarmNavbar';
import MyProducts from './pages/MyProducts';

function AppContent() {
  const location = useLocation();
  const hideNavbar = location.pathname === '/login' || location.pathname === '/signup';
const email = localStorage.getItem("email");
const role = localStorage.getItem("role");
console.log(email);
console.log(role)
  return (
    <>
      {!hideNavbar && (
        <>
          {role === "farmer" ? <FarmNavbar /> : <Navbar />}
        </>
      )}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/shop' element={<Shop />} />
        <Route path='/farmproducts' element={<MyProducts />} />
        <Route path="/product/:id" element={<ProductDetailsPage />} />
        <Route path='/backup' element={<Backup />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;