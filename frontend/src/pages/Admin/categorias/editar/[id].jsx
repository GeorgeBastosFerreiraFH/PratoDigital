import { useParams } from "react-router-dom";
import Layout from "../../../../components/Admin/Layout";
import CategoriaForm from "../../../../components/Admin/CategoriaForm";

function MyComponent() {
  const { id } = useParams();

  return (
    <Layout>
      <div>{id && <CategoriaForm id={id} />}</div>
    </Layout>
  );
}

export default MyComponent;
