import Layout from "../../../components/Admin/Layout";
import ProdutoList from "../../../components/Admin/ProdutoList";
import React from "react";

const ProdutosPage = () => {
  return (
    <React.Fragment>
      <Layout>
        <ProdutoList />
      </Layout>
    </React.Fragment>
  );
};

export default ProdutosPage;
