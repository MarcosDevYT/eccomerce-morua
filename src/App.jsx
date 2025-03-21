import { BrowserRouter, Route, Routes } from "react-router"
import { CartContextProvider } from "./provider/CartProvider"
import { ToastContainer } from "react-toastify"

import Home from "./pages/Home"
import Category from "./pages/Category"
import NotFound from "./pages/NotFound"
import NavBar from "./components/NavBar/NavBar"
import Footer from "./components/Layout/Footer"
import ItemDetailContainer from "./containers/ItemDetailContainer"
import { CartPage } from "./pages/CartPage"

function App() {
  return (
    <BrowserRouter>
      <CartContextProvider>
        <NavBar />
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={true}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/category" element={<Category />} />
          <Route path="/category/:categoryId" element={<Category />} />
          <Route path="/detalle-producto/:id" element={<ItemDetailContainer />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="*" element={<NotFound />} /> 
        </Routes>
        <Footer />
      </CartContextProvider>
    </BrowserRouter>
  )
}

export default App
