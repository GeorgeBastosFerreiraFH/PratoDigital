import { Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import ProdutosPage from "./produtos/index";
import AdicionarProdutoPage from "./produtos/adicionar";
import EditarProdutoPage from "./produtos/editar/[id]";
import CategoriasPage from "./categorias";
import AdicionarCategoriaPage from "./categorias/adicionar";
import ConfiguracoesPage from "./configuracoes";
import PedidosPage from "../Admin/pedidos/index";
import PrivateRoute from "../../components/Admin/PrivateRoute";
import EditarPedido from "../Admin/pedidos/[id]";

function AdminRoutes() {
  return (
    <Routes>
      <Route
        path="/*"
        element={
          <PrivateRoute>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/produtos" element={<ProdutosPage />} />
              <Route
                path="/produtos/adicionar"
                element={<AdicionarProdutoPage />}
              />
              <Route
                path="/produtos/editar/:id"
                element={<EditarProdutoPage />}
              />
              <Route path="/categorias" element={<CategoriasPage />} />
              <Route
                path="/categorias/adicionar"
                element={<AdicionarCategoriaPage />}
              />
              <Route
                path="/categorias/editar/:id"
                element={<AdicionarCategoriaPage />}
              />
              <Route path="/pedidos" element={<PedidosPage />} />
              <Route path="/pedidos/:id" element={<EditarPedido />} />
              <Route path="/configuracoes" element={<ConfiguracoesPage />} />
            </Routes>
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

export default AdminRoutes;
