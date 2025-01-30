BackEnd
├── .env
├── package-lock.json
├── package.json
├── server.js
└── src
    ├── controllers
    │   ├── AuthController.js
    │   ├── CategoriaController.js
    │   ├── ConfiguracaoController.js
    │   ├── PedidoController.js
    │   └── ProdutoController.js
    ├── middlewares
    │   └── auth.js
    ├── models
    │   ├── Categoria.js
    │   ├── Configuracoes.js
    │   ├── Pedido.js
    │   ├── Produto.js
    │   └── Usuario.js
    └── routes
        ├── auth.js
        ├── categorias.js
        ├── configuracoes.js
        ├── pedidos.js
        └── produtos.js

FrontEnd
├── package-lock.json
├── package.json
├── postcss.config.js
├── public
│   └── assets
│       └── images
│           ├── bebida (1).jpg
│           ├── bebida (2).jpg
│           ├── bebida (3).jpg
│           ├── bebida (4).jpg
│           ├── bebida (5).jpg
│           ├── bebidasCapa.jpg
│           ├── calzone (1).jpg
│           ├── calzone (2).jpg
│           ├── calzone (3).jpg
│           ├── calzoneCapa.jpg
│           ├── carro-de-entrega.png
│           ├── hambuguerCapa.jpg
│           ├── hamburguer (1).jpg
│           ├── hamburguer (2).jpg
│           ├── hamburguer (3).jpg
│           ├── hamburguer (4).jpg
│           ├── hamburguerCapa1.jpg
│           ├── pastel1.jpg
│           ├── pastel2.jpg
│           ├── pastel3.jpg
│           ├── pastel4.jpg
│           ├── pastelCapa.jpg
│           ├── pizza1.jpg
│           ├── pizza2.jpg
│           ├── pizza3.jpg
│           ├── pizza4.jpg
│           ├── pizza5.jpg
│           ├── pizza6.jpg
│           └── pizzaCapa.jpg
├── index.html
└── src
    ├── App.jsx
    ├── components
    │   ├── Admin
    │   │   ├── CashFlowChart.jsx
    │   │   ├── CategoriaForm.jsx
    │   │   ├── CategoriaList.jsx
    │   │   ├── ConfiguracoesForm.jsx
    │   │   ├── Layout.jsx
    │   │   ├── Login.jsx
    │   │   ├── OrdersList.jsx
    │   │   ├── PaymentMethodsChart.jsx
    │   │   ├── PedidoCard.jsx
    │   │   ├── PedidoForm.jsx
    │   │   ├── PedidoList.jsx
    │   │   ├── PrivateRoute.jsx
    │   │   ├── ProdutoForm.jsx
    │   │   ├── ProdutoList.jsx
    │   │   ├── Registrar.jsx
    │   │   └── SearchBar.jsx
    │   ├── Cliente
    │   │   ├── CardapioPrincipal.jsx
    │   │   ├── Carrinho.jsx
    │   │   ├── Checkout.jsx
    │   │   ├── ConfirmacaoPedido.jsx
    │   │   └── Layout
    │   │       ├── ClienteLayout.jsx
    │   │       ├── Footer.jsx
    │   │       ├── Header.jsx
    │   │       └── TabletFrame.jsx
    │   └── ui
    │       ├── badge.jsx
    │       ├── button.jsx
    │       ├── card.jsx
    │       ├── dialog.jsx
    │       ├── input.jsx
    │       ├── select.jsx
    │       └── table.jsx
    ├── contexts
    │   ├── AuthContext.jsx
    │   └── CarrinhoContext.jsx
    ├── index.css
    ├── index.js
    ├── lib
    │   └── utils.js
    ├── pages
    │   ├── Admin
    │   │   ├── categorias
    │   │   │   ├── adicionar.jsx
    │   │   │   ├── editar
    │   │   │   │   └── [id].jsx
    │   │   │   └── index.jsx
    │   │   ├── configuracoes.jsx
    │   │   ├── Dashboard.jsx
    │   │   ├── index.jsx
    │   │   ├── pedidos
    │   │   │   ├── index.jsx
    │   │   │   └── [id].jsx
    │   │   └── produtos
    │   │       ├── adicionar.jsx
    │   │       ├── editar
    │   │       │   └── [id].jsx
    │   │       └── index.jsx
    │   └── Cliente
    │       └── index.jsx
    └── reportWebVitals.js
└── tailwind.config.js
