'use client'
import { Star, Trash } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { toast } from 'sonner'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from './ui/alert-dialog'
import { Button } from './ui/button'

interface PauseButtonProps {
  id: string
  paused: boolean
  featured: boolean
  featured_count: number
}

export function ActionButtons({
  id,
  paused,
  featured,
  featured_count,
}: PauseButtonProps) {
  const router = useRouter()
  const session = useSession()

  async function handlePauseToggle() {
    try {
      const response = await fetch(
        `http://localhost:3333/product/${id}/pause`,
        {
          headers: {
            authorization: `Bearer ${session.data?.jwt}`,
          },
          method: 'PUT',
        }
      )
      if (response.status === 401) {
        toast.error('Não autorizado')
        return
      }
      toast.success(`Produto ${paused ? 'despausado' : 'pausado'} com sucesso!`)
      router.refresh()
      await fetch('/api/revalidate/products', { method: 'POST' })
    } catch (error) {
      toast.error('Ocorreu um erro. Tente novamente.')
    }
  }

  async function handleHighlightToggle() {
    try {
      const response = await fetch(
        `http://localhost:3333/product/${id}/highlight`,
        {
          headers: {
            authorization: `Bearer ${session.data?.jwt}`,
          },
          method: 'PUT',
        }
      )
      if (response.status === 401) {
        toast.error('Não autorizado')
      }

      toast.success(
        `Produto ${
          featured ? 'Destacado' : 'Removido do destaque'
        } com sucesso!`
      )
      router.refresh()
      await fetch('/api/revalidate/products', { method: 'POST' })
    } catch (error) {
      toast.error('Ocorreu um erro. Tente novamente.')
    }
  }

  async function handleDelete() {
    try {
      const response = await fetch(`http://localhost:3333/product/${id}`, {
        headers: {
          authorization: `Bearer ${session.data?.jwt}`,
        },
        method: 'DELETE',
      })

      if (response.status === 401) {
        toast.error('Não autorizado')
      }

      toast.success('Produto deletado com sucesso!')
      router.refresh()
      await fetch('/api/revalidate/products', { method: 'POST' })
    } catch (error) {
      toast.error('Ocorreu um erro. Tente novamente.')
    }
  }

  return (
    <div className="flex gap-1">
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            className="bg-amber-300 hover:bg-amber-400 hover:cursor-pointer disabled:bg-amber-500"
            variant="destructive"
            size="sm"
            disabled={paused}
          >
            {paused ? 'Pausado' : 'Pausar'}
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta ação irá pausar o produto.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="hover:cursor-pointer">
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction
              className="bg-rose-400 hover:bg-rose-500 hover:cursor-pointer"
              onClick={handlePauseToggle}
            >
              Pausar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            className="bg-emerald-400 hover:bg-emerald-500 hover:cursor-pointer disabled:hidden"
            variant="destructive"
            size="sm"
            disabled={paused === false}
          >
            Despausar
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta ação irá despausar o produto.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="hover:cursor-pointer">
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction
              className="bg-emerald-400 hover:bg-emerald-500 hover:cursor-pointer"
              onClick={handlePauseToggle}
            >
              Despausar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            className="bg-amber-500 hover:bg-amber-400  hover:cursor-pointer"
            hidden={featured_count >= 3 && !featured}
            variant="destructive"
            disabled={paused}
            size="sm"
          >
            {!featured && featured_count < 3 ? (
              <>
                <Star fill="black" className="text-black" />
                <p className="text-black">Destacar</p>
              </>
            ) : (
              <>
                <Star />
                Tirar dos destaques
              </>
            )}
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
            <AlertDialogDescription>
              {!featured && featured_count < 3
                ? 'Está ação ira destacar o produto'
                : 'Está ação ira remover o produto dos destaques'}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="hover:cursor-pointer">
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction
              className="bg-emerald-400 hover:bg-emerald-500 hover:cursor-pointer"
              onClick={handleHighlightToggle}
            >
              {featured === true ? 'Tirar dos destaques' : 'Destacar'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            className="bg-rose-500 hover:bg-rose-400  hover:cursor-pointer"
            variant="destructive"
            size="sm"
          >
            <Trash />
            Deletar
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta ação ira deletar permanentemente o produto
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="hover:cursor-pointer">
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction
              className="bg-rose-400 hover:bg-rose-500 hover:cursor-pointer"
              onClick={handleDelete}
            >
              Deletar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
