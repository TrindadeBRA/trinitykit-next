import { ProductsTableProps } from "..";

interface TemplateFormProps {
  selectedProduct: ProductsTableProps;
}

export default function TemplateForm({ selectedProduct }: TemplateFormProps) {
    return (
        <div className="space-y-4">
        <div>
          <h4 className="font-medium text-gray-700">Detalhes do Produto</h4>
          <p className="mt-1"><span className="font-semibold">Nome:</span> {selectedProduct.title}</p>
          <p><span className="font-semibold">CAS Number:</span> {selectedProduct.cas_number || 'N/A'}</p>
          <p><span className="font-semibold">Segmentos:</span> {selectedProduct.segments?.map(s => s.name).join(', ') || 'N/A'}</p>
          <p><span className="font-semibold">Descrição:</span> {selectedProduct.product_lines?.flatMap(l => l.children?.map(c => c.name) || []).join(', ') || 'N/A'}</p>
        </div>
        
        <div className="pt-4 border-t border-gray-200">
          <h4 className="font-medium text-gray-700">Formulário de Solicitação</h4>
          <form className="mt-2 space-y-3">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nome</label>
              <input 
                type="text" 
                id="name" 
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" 
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input 
                type="email" 
                id="email" 
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" 
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">Mensagem</label>
              <textarea 
                id="message" 
                rows={3}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" 
              />
            </div>
            <div className="pt-3">
              <button 
                type="button" 
                className="w-full px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-md cursor-pointer"
              >
                Enviar Solicitação
              </button>
            </div>
          </form>
        </div>
      </div>
    )
}