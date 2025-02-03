import { Textarea } from '@/components/ui/textarea'
import { BackTo } from '@/components/back-to'
import { Button } from '@/components/ui/button'
import { Link, useFetcher } from 'react-router'
import { Label } from '@radix-ui/react-label'
import { Loader2Icon } from 'lucide-react'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { insertProductSchema, updateProductSchema } from '@/lib/schemas'
import type { Product, ProductCategory } from '@/types'
import React, { useEffect } from 'react'
type Props = {
  product: Product | undefined
  productCategories: ProductCategory[]
}

function Errors({ errors, name }) {
  if (!errors[name]) {
    return null
  }
  return <div className="text-destructive ">{errors[name][0]}</div>
}

export default function CreateUpdateProduct({
  product,
  productCategories,
}: Props) {
  const fetcher = useFetcher()

  const [errors, setErrors] = React.useState([])

  useEffect(() => {
    if (fetcher.data) {
      setErrors(fetcher.data)
    } else {
      setErrors([])
    }
  }, [fetcher.data])

  console.log(errors)

  return (
    <div className="pb-8">
      <div className="mb-4">
        <BackTo to="/products" />
      </div>
      <fetcher.Form method="post">
        <div className="flex flex-col gap-4">
          <div className="grid gap-2">
            <Label className="text-muted-foreground" htmlFor="description">
              Descripcion
            </Label>
            <Textarea
              name="description"
              id="description"
              placeholder="Señal fotoluminiscente 20x30cm con soporte pvc celtex 3mm"
            />
            <Errors errors={errors} name="description" />
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="grid gap-2">
              <Label className="text-muted-foreground">Unidad/Medida</Label>
              <Input name="unitSize" id="unitSize" placeholder="20x30cm" />
              <Errors errors={errors} name="unitSize" />
            </div>
            <div className="grid gap-2">
              <Label className="text-muted-foreground" htmlFor="code">
                Código
              </Label>
              <Input id="code" placeholder="FHP-50" name="code" minLength={3} />
              <Errors errors={errors} name="code" />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="grid gap-2">
              <Label className="text-muted-foreground" htmlFor="code">
                Costo
              </Label>
              <Input
                name="cost"
                id="cost"
                placeholder="100"
                type="number"
                defaultValue={product?.cost || ''}
              />
              <Errors errors={errors} name="cost" />
            </div>
            <div className="grid gap-2">
              <Label className="text-muted-foreground" htmlFor="price">
                Price
              </Label>
              <Input id="price" name="price" placeholder="100" type="number" />
              <Errors errors={errors} name="price" />
            </div>
          </div>

          <div className="grid gap-2">
            <Label
              className="text-muted-foreground"
              htmlFor="link"
              defaultValue={product?.link || undefined}
            >
              Link
            </Label>
            <Input
              name="link"
              id="link"
              placeholder="http://tellsenales.com/products/product-link"
            />
            <Errors errors={errors} name="link" />
          </div>
          <div className="grid gap-2">
            <Label className="text-muted-foreground" htmlFor="categoryId">
              Categoria
            </Label>
            <Select name="categoryId">
              <SelectTrigger className="capitalize">
                <SelectValue placeholder="Seleciona una categoria" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Categorias</SelectLabel>
                  {productCategories.map((category) => (
                    <SelectItem
                      key={category.id}
                      value={String(category.id)}
                      className="capitalize"
                    >
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            <Errors errors={errors} name="categoryId" />
          </div>
          <footer className="flex items-center justify-between mt-4">
            <Link to="/products">Cancelar</Link>
            <Button type="submit">
              {fetcher.state !== 'idle' && <Loader2Icon />}
              <span>{product ? 'Actualizar' : 'Crear'}</span>
            </Button>
          </footer>
        </div>
      </fetcher.Form>
    </div>
  )
}
