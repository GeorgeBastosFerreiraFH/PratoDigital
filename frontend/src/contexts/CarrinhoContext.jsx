"use client";

import { createContext, useContext, useState, useEffect } from "react";

const CarrinhoContext = createContext();

export function CarrinhoProvider({ children }) {
  const [itens, setItens] = useState(() => {
    if (typeof window !== "undefined") {
      try {
        const carrinhoSalvo = localStorage.getItem("carrinho");
        return carrinhoSalvo ? JSON.parse(carrinhoSalvo) : [];
      } catch (error) {
        console.error("Erro ao carregar carrinho:", error);
        return [];
      }
    }
    return [];
  });

  useEffect(() => {
    try {
      localStorage.setItem("carrinho", JSON.stringify(itens));
    } catch (error) {
      console.error("Erro ao salvar carrinho:", error);
    }
  }, [itens]);

  const adicionarItem = (item) => {
    setItens((itensAtuais) => {
      const itemExistente = itensAtuais.find((i) => i.id === item.id);

      if (itemExistente) {
        return itensAtuais.map((i) =>
          i.id === item.id ? { ...i, quantidade: i.quantidade + 1 } : i
        );
      }

      return [...itensAtuais, { ...item, quantidade: 1, observacoes: "" }];
    });
  };

  const removerItem = (itemId) => {
    setItens((itensAtuais) => {
      const itemExistente = itensAtuais.find((i) => i.id === itemId);

      if (itemExistente?.quantidade > 1) {
        return itensAtuais.map((i) =>
          i.id === itemId ? { ...i, quantidade: i.quantidade - 1 } : i
        );
      }

      return itensAtuais.filter((i) => i.id !== itemId);
    });
  };

  const limparCarrinho = () => {
    setItens([]);
  };

  const atualizarObservacoes = (itemId, observacoes) => {
    setItens((itensAtuais) =>
      itensAtuais.map((item) =>
        item.id === itemId ? { ...item, observacoes } : item
      )
    );
  };

  const calcularTotal = () => {
    return itens.reduce(
      (total, item) => total + item.preco * item.quantidade,
      0
    );
  };

  const getTotalItens = () => {
    return itens.reduce((total, item) => total + item.quantidade, 0);
  };

  const getQuantidadeItem = (itemId) => {
    const item = itens.find((i) => i.id === itemId);
    return item?.quantidade || 0;
  };

  return (
    <CarrinhoContext.Provider
      value={{
        itens,
        adicionarItem,
        removerItem,
        limparCarrinho,
        atualizarObservacoes,
        calcularTotal,
        getTotalItens,
        getQuantidadeItem, // Adicionada de volta a função
      }}
    >
      {children}
    </CarrinhoContext.Provider>
  );
}

export const useCarrinho = () => {
  const context = useContext(CarrinhoContext);
  if (!context) {
    throw new Error("useCarrinho deve ser usado dentro de um CarrinhoProvider");
  }
  return context;
};
