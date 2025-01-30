import Layout from "../../../components/Admin/Layout";
import PedidoList from "../../../components/Admin/PedidoList";
import React from "react";

const PedidosPage = () => {
  return (
    <React.Fragment>
      <Layout>
        <PedidoList />
      </Layout>
    </React.Fragment>
  );
};

export default PedidosPage;
