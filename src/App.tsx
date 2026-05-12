import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { ProtectedRoute } from './components/ProtectedRoute'
import { AuthProvider } from './context/AuthContext'
import { CartProvider } from './context/CartContext'
import { OrderProvider } from './context/OrderContext'
import { AboutPage } from './pages/About'
import { CartPage } from './pages/Cart'
import { CheckoutPage } from './pages/Checkout'
import { ContactPage } from './pages/Contact'
import { HomePage } from './pages/Home'
import { LandingPage } from './pages/Landing'
import { LoginPage } from './pages/Login'
import { OrderHistoryPage } from './pages/OrderHistory'
import { OrderSuccessPage } from './pages/OrderSuccess'
import { ProductDetailPage } from './pages/ProductDetail'
import { ProfilePage } from './pages/Porfile'
import { RegisterPage } from './pages/Register'
import { ShopCollectionPage } from './pages/ShopCollection'

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <OrderProvider>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route element={<ProtectedRoute />}>
                <Route path="/home" element={<HomePage />} />
                <Route path="/shop" element={<ShopCollectionPage />} />
                <Route path="/shop/:productId" element={<ProductDetailPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/order-success" element={<OrderSuccessPage />} />
                <Route path="/orders" element={<OrderHistoryPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />
              </Route>
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </OrderProvider>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}
