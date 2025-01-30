import { useParams } from "react-router-dom"
import Layout from "../../../../components/Admin/Layout"
import ProdutoForm from "../../../../components/Admin/ProdutoForm"

function MyComponent() {
    const { id } = useParams()

  return (
    <Layout>
        <div>
            {id && <ProdutoForm produtoId={id} />}
        </div>
    </Layout>
  )
}

export default MyComponent


