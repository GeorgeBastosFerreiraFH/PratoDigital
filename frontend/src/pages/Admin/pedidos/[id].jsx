import { useParams } from "react-router-dom";
import Layout from "../../../components/Admin/Layout";
import PedidoForm from "../../../components/Admin/PedidoForm";

function MyComponent() {
  const { id } = useParams();

  return (
    <Layout>
      <div>{id && <PedidoForm id={id} />}</div>
    </Layout>
  );
}

export default MyComponent;
