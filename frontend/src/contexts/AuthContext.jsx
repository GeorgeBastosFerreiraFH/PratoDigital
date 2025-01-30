"use client";

import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      setUsuario(JSON.parse(localStorage.getItem("usuario")));
    }
    setCarregando(false);

    axios.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem("token");
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }, []);

  const login = async (email, senha) => {
    try {
      const resposta = await axios.post(
        "http://localhost:5000/api/auth/login",
        { email, senha }
      );
      const { usuario, token } = resposta.data;
      const decodedToken = jwtDecode(token);
      const jwtSecret = decodedToken.jwtSecret;

      setUsuario(usuario);
      localStorage.setItem("token", token);
      localStorage.setItem("jwtSecret", jwtSecret);
      localStorage.setItem("usuario", JSON.stringify(usuario));
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      return true;
    } catch (erro) {
      console.error("Erro ao fazer login:", erro);
      return false;
    }
  };

  const logout = () => {
    setUsuario(null);
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    delete axios.defaults.headers.common["Authorization"];
  };

  return (
    <AuthContext.Provider value={{ usuario, login, logout, carregando }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
