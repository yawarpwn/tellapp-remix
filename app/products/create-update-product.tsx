import { SchemaForm } from '@/components/schema-form'
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
type Props = {
  schema: typeof updateProductSchema | typeof insertProductSchema
  product: Product | undefined
  productCategories: ProductCategory[]
}
export default function CreateUpdateProduct({
  schema,
  product,
  productCategories,
}: Props) {
  const fetcher = useFetcher()

  return (
    <div className="pb-8">
      <div className="mb-4">
        <BackTo to="/products" />
      </div>
      <SchemaForm fetcher={fetcher} schema={schema}>
        {({ Field, Errors, register, setValue }) => (
          <div className="flex flex-col gap-4">
            <Field
              name="description"
              label="description"
              value={product?.description || ''}
            >
              {({ Errors }) => (
                <div className="grid gap-2">
                  <Label
                    className="text-muted-foreground"
                    htmlFor="description"
                  >
                    Descripcion
                  </Label>
                  <Textarea
                    id="description"
                    placeholder="Señal fotoluminiscente 20x30cm con soporte pvc celtex 3mm"
                    {...register('description')}
                  />
                  <Errors />
                </div>
              )}
            </Field>

            <div className="grid gap-4 md:grid-cols-2">
              <Field
                name="unitSize"
                label="unitSize"
                value={product?.unitSize || ''}
              >
                {({ Errors }) => (
                  <div className="grid gap-2">
                    <Label className="text-muted-foreground">
                      Unidad/Medida
                    </Label>
                    <Input placeholder="20x30cm" {...register('unitSize')} />
                    <Errors />
                  </div>
                )}
              </Field>
              <Field name="code" label="code" value={product?.code || ''}>
                {({ Errors }) => (
                  <div className="grid gap-2">
                    <Label className="text-muted-foreground" htmlFor="code">
                      Código
                    </Label>
                    <Input
                      id="code"
                      placeholder="FHP-50"
                      minLength={3}
                      {...register('code')}
                    />
                    <Errors />
                  </div>
                )}
              </Field>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <Field name="cost" label="cost" value={product?.cost || ''}>
                {({ Errors }) => (
                  <div className="grid gap-2">
                    <Label className="text-muted-foreground" htmlFor="code">
                      Costo
                    </Label>
                    <Input
                      id="cost"
                      placeholder="100"
                      type="number"
                      defaultValue={product?.cost || ''}
                      {...register('cost')}
                    />
                    <Errors />
                  </div>
                )}
              </Field>
              <Field name="price" label="price" value={product?.price || ''}>
                {({ Errors }) => (
                  <div className="grid gap-2">
                    <Label className="text-muted-foreground" htmlFor="price">
                      Price
                    </Label>
                    <Input
                      id="price"
                      placeholder="100"
                      type="number"
                      {...register('price')}
                    />
                    <Errors />
                  </div>
                )}
              </Field>
            </div>

            <Field name="link" label="link" value={product?.link ?? ''}>
              {({ Errors }) => (
                <div className="grid gap-2">
                  <Label className="text-muted-foreground" htmlFor="link">
                    Link
                  </Label>
                  <Input
                    defaultValue={product?.link || ''}
                    placeholder="http://tellsenales.com/products/product-link"
                    {...register('link')}
                  />
                  <Errors />
                </div>
              )}
            </Field>
            <Field name="categoryId" label="categoryId">
              {({ Errors, value }) => (
                <div className="grid gap-2">
                  <Label className="text-muted-foreground" htmlFor="categoryId">
                    Categoria
                  </Label>
                  <Select
                    onValueChange={(value) => {
                      setValue('categoryId', value)
                    }}
                    defaultValue={product?.categoryId ?? ''}
                    {...register('categoryId')}
                  >
                    <SelectTrigger className="capitalize">
                      <SelectValue placeholder="Seleciona una categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Categorias</SelectLabel>
                        {productCategories.map((category) => (
                          <SelectItem
                            key={category.id}
                            value={category.id}
                            className="capitalize"
                          >
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <Errors />
                </div>
              )}
            </Field>
            <Errors />
            <footer className="flex items-center justify-between mt-4">
              <Link to="/products">Cancelar</Link>
              <Button type="submit">
                {fetcher.state !== 'idle' && <Loader2Icon />}
                <span>{product ? 'Actualizar' : 'Crear'}</span>
              </Button>
            </footer>
          </div>
        )}
      </SchemaForm>
    </div>
  )
}
