import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import Home from "./pages/Home";
import CartPage from "./pages/CartPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";
import AdminPage from "./pages/AdminPage";
import AdminProducts from "./pages/AdminProducts";
import AdminBanners from "./pages/AdminBanners";
import AdminHome from "./pages/AdminHome";
import OrderHistoryPage from "./pages/OrderHistoryPage";
import OrdersPage from "./pages/OrdersPage";
import CheckoutPage from "./pages/CheckoutPage";
import ThankYouPage from "./pages/ThankYouPage";
import { AuthProvider, AuthContext } from "./context/AuthContext";
import { ProductProvider } from "./context/ProductContext";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function HomeRedirect() {
  const { user } = useContext(AuthContext);
  if (!user) return <Home />;
  return user.isAdmin || user.email === "admin@gmail.com"
    ? <Navigate to="/admin-home" replace />
    : <Home />;
}

function PrivateRoute({ children }) {
  const { user } = useContext(AuthContext);
  return user ? children : <Navigate to="/login" replace />;
}

function AdminRoute({ children }) {
  const { user } = useContext(AuthContext);
  return user && (user.isAdmin || user.email === "admin@gmail.com")
    ? children
    : <Navigate to="/" replace />;
}

export default function App() {
  return (
    <AuthProvider>
      <ProductProvider>
        <Router>
          <Routes>
            <Route path="/" element={<HomeRedirect />} />
            <Route path="/home" element={<Navigate to="/" replace />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/thank-you" element={<ThankYouPage />} />

            <Route path="/cart" element={<PrivateRoute><CartPage /></PrivateRoute>} />
            <Route path="/checkout" element={<PrivateRoute><CheckoutPage /></PrivateRoute>} />
            <Route path="/profile" element={<PrivateRoute><ProfilePage /></PrivateRoute>} />

            <Route path="/admin-home" element={<Navigate to="/admin" replace />} />
            <Route path="/admin" element={<AdminRoute><AdminPage /></AdminRoute>} />
            <Route path="/admin/products" element={<AdminRoute><AdminProducts /></AdminRoute>} />
            <Route path="/admin/banners" element={<AdminRoute><AdminBanners /></AdminRoute>} />
            <Route path="/orders" element={<OrderHistoryPage />} />
            <Route path="/admin/orders-page" element={<AdminRoute><OrdersPage /></AdminRoute>} />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </ProductProvider>
    </AuthProvider >
  );
}
