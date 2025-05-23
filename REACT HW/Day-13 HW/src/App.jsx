import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";
import AdminPage from "./pages/AdminPage";
import AdminHome from "./pages/AdminHome";
import { AuthProvider, AuthContext } from "./context/AuthContext";
import { useContext } from "react";
import { ProductProvider } from "./context/ProductContext";

function HomeRedirect() {
  const { user } = useContext(AuthContext);
  if (!user) return <Home />;
  return user.isAdmin || user.email === "admin@gmail.com" ? <Navigate to="/admin-home" replace /> : <Home />;
}
function PrivateRoute({ children }) {
  const { user } = useContext(AuthContext);
  return user ? children : <Navigate to="/login" replace />;
}

function AdminRoute({ children }) {
  const { user } = useContext(AuthContext);
  return user && (user.email === "admin@gmail.com" || user.isAdmin)
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
            <Route path="/cart" element={<PrivateRoute><CartPage /></PrivateRoute>} />
            <Route path="/checkout" element={<PrivateRoute><CheckoutPage /></PrivateRoute>} />
            <Route path="/profile" element={<PrivateRoute><ProfilePage /></PrivateRoute>} />
            <Route path="/admin-home" element={<AdminHome />} />
            <Route path="/admin" element={<AdminRoute><AdminPage /></AdminRoute>} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Routes>
        </Router>
      </ProductProvider>
    </AuthProvider >
  );
}
