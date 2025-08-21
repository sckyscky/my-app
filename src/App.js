import  Navbar from './Components/Navbar/Navbar.jsx'; 
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './Pages/Main.jsx';
import Cart from './Pages/Cart.jsx';
import Account from './Pages/Account.jsx';
import Footer from './Components/Footer/Footer.jsx';
import ShopContextProvider from './Context/ShopContext.jsx';


function App() {
  return (
    <ShopContextProvider>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Main/>} />
        <Route path="/cart" element={<Cart/>} />
        <Route path="/account" element={<Account/>} />
      </Routes>
      <Footer />
    </BrowserRouter>
    </ShopContextProvider>
    
  );
}

export default App;
