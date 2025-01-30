"use client";

import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  Menu,
  X,
  Home,
  ShoppingBag,
  List,
  Settings,
  LogOut,
  FileText,
} from "lucide-react";
import { Button } from "../ui/button";

const Layout = ({ children }) => {
  const [sidebarAberta, setSidebarAberta] = useState(false);
  const { usuario, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  const menuItems = [
    { href: "/admin", icon: Home, text: "Dashboard" },
    { href: "/admin/produtos", icon: ShoppingBag, text: "Produtos" },
    { href: "/admin/categorias", icon: List, text: "Categorias" },
    { href: "/admin/pedidos", icon: FileText, text: "Pedidos" },
    { href: "/admin/configuracoes", icon: Settings, text: "Configurações" },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar para desktop */}
      <aside className="hidden md:flex md:flex-shrink-0">
        <div className="flex flex-col w-64">
          <div className="flex flex-col flex-grow pt-5 pb-4 overflow-y-auto bg-indigo-700">
            <div className="flex items-center flex-shrink-0 px-4">
              <span className="text-lg font-semibold text-white">
                Painel Admin
              </span>
            </div>
            <nav className="mt-5 flex-1 px-2 space-y-1">
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-white hover:bg-indigo-600"
                >
                  <item.icon className="mr-3 flex-shrink-0 h-6 w-6" />
                  {item.text}
                </Link>
              ))}
            </nav>
            <div className="mt-auto pb-4 px-4">
              <div className="flex items-center">
                <img
                  className="inline-block h-10 w-10 rounded-full"
                  src={`https://ui-avatars.com/api/?name=${usuario?.nome}&background=random`}
                  alt=""
                />
                <div className="ml-3">
                  <p className="text-sm font-medium text-white">
                    {usuario?.nome}
                  </p>
                </div>
              </div>
              <Button
                onClick={handleLogout}
                className="mt-2 w-full flex items-center justify-center text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Sair
              </Button>
            </div>
          </div>
        </div>
      </aside>

      {/* Conteúdo principal */}
      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        <div className="md:hidden pl-1 pt-1 sm:pl-3 sm:pt-3">
          <button
            className="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            onClick={() => setSidebarAberta(true)}
          >
            <span className="sr-only">Abrir sidebar</span>
            <Menu className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <main className="flex-1 relative z-0 overflow-y-auto focus:outline-none">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              {children}
            </div>
          </div>
        </main>
      </div>

      {/* Sidebar móvel */}
      {sidebarAberta && (
        <div className="fixed inset-0 flex z-40 md:hidden">
          <div
            className="fixed inset-0 bg-gray-600 bg-opacity-75"
            aria-hidden="true"
            onClick={() => setSidebarAberta(false)}
          ></div>
          <div className="relative flex-1 flex flex-col max-w-xs w-full bg-indigo-700">
            <div className="absolute top-0 right-0 -mr-12 pt-2">
              <button
                className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                onClick={() => setSidebarAberta(false)}
              >
                <span className="sr-only">Fechar sidebar</span>
                <X className="h-6 w-6 text-white" aria-hidden="true" />
              </button>
            </div>
            <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
              <div className="flex-shrink-0 flex items-center px-4">
                <span className="text-lg font-semibold text-white">
                  Painel Admin
                </span>
              </div>
              <nav className="mt-5 px-2 space-y-1">
                {menuItems.map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    className="group flex items-center px-2 py-2 text-base font-medium rounded-md text-white hover:bg-indigo-600"
                  >
                    <item.icon className="mr-3 flex-shrink-0 h-6 w-6" />
                    {item.text}
                  </Link>
                ))}
              </nav>
            </div>
            <div className="flex-shrink-0 flex border-t border-indigo-800 p-4">
              <div className="flex items-center">
                <div>
                  <img
                    className="inline-block h-10 w-10 rounded-full"
                    src={`https://ui-avatars.com/api/?name=${usuario?.nome}&background=random`}
                    alt=""
                  />
                </div>
                <div className="ml-3">
                  <p className="text-base font-medium text-white">
                    {usuario?.nome}
                  </p>
                  <Button
                    onClick={handleLogout}
                    className="mt-2 w-full flex items-center justify-center text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Sair
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Layout;
