import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { AddProductForm } from '@/components/add-product-form'
import { ProductsTable } from '@/components/products-table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export const metadata: Metadata = {
  title: 'Adicionar novo produto',
}

export default async function ManagerPage() {
  const session = await getServerSession(authOptions)
  const user = session?.user

  if (!user || user.role !== 'ADMIN') {
    redirect('/')
  }

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Adicionar novo produto</h1>
      <Tabs defaultValue="add-product">
        <TabsList>
          <TabsTrigger value="add-product">Adicionar Produto</TabsTrigger>
          <TabsTrigger value="list-products">Listar Produtos</TabsTrigger>
        </TabsList>
        <TabsContent value="add-product">
          <AddProductForm />
        </TabsContent>
        <TabsContent value="list-products">
          <ProductsTable />
        </TabsContent>
      </Tabs>
    </div>
  )
}
