import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { CarrinhoProvider } from "./contexts/CarrinhoContext";
import ClienteRoutes from "./pages/Cliente";
import AdminRoutes from "./pages/Admin";
import Login from "./components/Admin/Login";

function App() {
  return (
    <AuthProvider>
      <CarrinhoProvider>
        <Router>
          <Routes>
            <Route path="/*" element={<ClienteRoutes />} />
            <Route path="/admin/login" element={<Login />} />
            <Route path="/admin/*" element={<AdminRoutes />} />
          </Routes>
        </Router>
      </CarrinhoProvider>
    </AuthProvider>
  );
}

export default App;
