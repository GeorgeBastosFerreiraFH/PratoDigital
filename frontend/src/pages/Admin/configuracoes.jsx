import Layout from "../../components/Admin/Layout"
import ConfiguracoesForm from "../../components/Admin/ConfiguracoesForm"

const ConfiguracoesPage = () => {
  return (
    <Layout>
      <h1 className="text-2xl font-semibold text-gray-900">Configurações</h1>
      <ConfiguracoesForm />
    </Layout>
  )
}

export default ConfiguracoesPage
