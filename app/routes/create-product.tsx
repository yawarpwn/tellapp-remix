import type { Route } from './+types/create-product'
import { insertProductSchema } from '@/lib/schemas'
import { applySchema } from 'composable-functions'
import { formAction, performMutation } from 'remix-forms'
import { SchemaForm } from '@/components/schema-form'
import { Textarea } from '@/components/ui/textarea'
import { PRODUCT_CATEGORIES } from '@/lib/constants'
import { BackTo } from '@/components/back-to'
import { Button } from '@/components/ui/button'
import type { InsertProduct } from '@/types'
import { Link, redirect, useFetcher } from 'react-router'
import { Label } from '@radix-ui/react-label'
import { Loader2Icon } from 'lucide-react'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useEffect, useState } from 'react'
import React from 'react'

const mutation = applySchema(insertProductSchema)(async (values) => values)

export async function action({ request }: Route.ActionArgs) {
  const result = await performMutation({
    request,
    schema: insertProductSchema,
    mutation,
  })

  console.log(result)
  if (!result.success) {
    return {
      data: 'mu',
    }
  }

  return redirect('/products')
}
//   formAction({
//     request,
//     schema: insertProductSchema,
//     mutation,
//     successPath: '/products' /* path to redirect on success */,
//   })
// }

// function ErrorMessage({
//   errors,
//   name,
// }: {
//   errors?: {
//     [key: string]: string[]
//   }
//   name: keyof InsertProduct
// }) {
//   if (!errors?.[name]) return null
//
//   return <p className="text-destructive">{errors[name][0]}</p>
// }
//
// type ValidErrors<T> = {
//   [key in keyof T]: string[]
// }

export default function CreateProduct() {
  return (
    <div className="pb-8">
      <div>
        <BackTo to="/products" />
      </div>
      <SchemaForm schema={insertProductSchema}>
        {({ Field, Errors, register }) => (
          <div className="flex flex-col gap-4">
            <Field name="description" label="description">
              {({ Errors }) => (
                <div className="grid gap-2">
                  <Label
                    className="text-muted-foreground"
                    htmlFor="description"
                  >
                    Descripcion
                  </Label>
                  <Textarea
                    defaultValue={undefined}
                    id="description"
                    placeholder="Señal fotoluminiscente 20x30cm con soporte pvc celtex 3mm"
                    {...register('description')}
                  />
                  <Errors />
                </div>
              )}
            </Field>

            <Field name="unitSize" label="unitSize">
              {({ Errors }) => (
                <div className="grid gap-2">
                  <Label className="text-muted-foreground">Unidad/Medida</Label>
                  <Input placeholder="20x30cm" {...register('unitSize')} />
                  <Errors />
                </div>
              )}
            </Field>
            <Field name="code" label="code">
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

            <div className="grid grid-cols-2 gap-4">
              <Field name="cost" label="cost">
                {({ Errors }) => (
                  <div className="grid gap-2">
                    <Label className="text-muted-foreground" htmlFor="code">
                      Costo
                    </Label>
                    <Input
                      id="cost"
                      placeholder="100"
                      type="number"
                      {...register('cost')}
                    />
                    <Errors />
                  </div>
                )}
              </Field>
              <Field name="price" label="price">
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

            <Field name="link" label="link">
              {({ Errors }) => (
                <div className="grid gap-2">
                  <Label className="text-muted-foreground" htmlFor="link">
                    Link
                  </Label>
                  <Input
                    placeholder="http://tellsenales.com/products/product-link"
                    {...register('link')}
                  />
                  <Errors />
                </div>
              )}
            </Field>
            <Field name="categoryId" label="categoryId">
              {({ Errors }) => (
                <div className="grid gap-2">
                  <Label className="text-muted-foreground" htmlFor="categoryId">
                    Categoria
                  </Label>
                  <Select {...register('categoryId')}>
                    <SelectTrigger className="capitalize">
                      <SelectValue placeholder="Seleciona una categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {Object.entries(PRODUCT_CATEGORIES).map(
                          ([id, category]) => (
                            <SelectItem
                              key={id}
                              value={id}
                              className="capitalize"
                            >
                              {category}
                            </SelectItem>
                          )
                        )}
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
                <span>Crear</span>
              </Button>
            </footer>
          </div>
        )}
      </SchemaForm>
    </div>
  )
}
