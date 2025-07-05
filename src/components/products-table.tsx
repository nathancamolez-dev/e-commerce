import { api } from '@/data/api'
import type { Product } from '@/data/types/product'
import { ActionButtons } from './pause-button'

async function getProducts(): Promise<Product[]> {
  const response = await api('/products')
  const products = await response.json()
  return products
}

export async function ProductsTable() {
  const products: Product[] = await getProducts()
  const featured_count = products.filter(product => product.featured).length

  return (
    <div className="rounded-md border">
      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="p-4 text-left">Produto</th>
            <th className="p-4 text-left">Data de registro</th>
            <th className="p-4 text-left" />
          </tr>
        </thead>
        <tbody>
          {products?.map(product => (
            <tr key={product.id} className="border-b">
              <td className="p-4">{product.title}</td>
              <td className="p-4">
                {new Date(product.created_at).toLocaleDateString('pt-BR')}
              </td>
              <td className="p-4">
                <ActionButtons
                  id={product.id}
                  paused={product.paused}
                  featured={product.featured}
                  featured_count={featured_count}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
