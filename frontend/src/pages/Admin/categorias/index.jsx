import Layout from "../../../components/Admin/Layout";
import CategoriaList from "../../../components/Admin/CategoriaList";
import React from "react";

const CategoriaPage = () => {
  return (
    <React.Fragment>
      <Layout>
        <CategoriaList />
      </Layout>
    </React.Fragment>
  );
};

export default CategoriaPage;
