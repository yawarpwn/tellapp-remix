import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { InsertProductSchema } from '@/lib/schemas'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { PRODUCT_CATEGORIES } from '@/lib/constants'
import type { InsertProduct } from '@/types'
import { BackTo } from '@/components/back-to'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router'

export default function CreateProduct() {
  const form = useForm<InsertProduct>({
    resolver: zodResolver(InsertProductSchema),
    defaultValues: {
      description: '',
      price: '',
      link: '',
      category: '',
      cost: '',
      unitSize: '',
    },
  })

  const onSubmit = (data: InsertProduct) => {
    console.log(data)
  }

  return (
    <div>
      <div className="mb-6">
        <BackTo to="/products" />
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descripcion</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Descripcion de producto..."
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="code"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Codigo</FormLabel>
                <FormControl>
                  <Input
                    className="uppercase"
                    placeholder="FHIP-123"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="unitSize"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Unidad / Medida</FormLabel>
                <FormControl>
                  <Input placeholder="120x60cm" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="link"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Enlace de producto</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="https://tellsenales.com/enlace-producto"
                    value={field.value ?? ''}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="cost"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Costo</FormLabel>
                  <FormControl>
                    <Input placeholder="90" {...field} type="number" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Precio</FormLabel>
                  <FormControl>
                    <Input placeholder="100" {...field} type="number" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Categoria</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="capitalize">
                      <SelectValue placeholder="Seleciona una categoria" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup>
                      {Object.values(PRODUCT_CATEGORIES).map((item) => (
                        <SelectItem
                          key={item}
                          value={item}
                          className="capitalize"
                        >
                          {item}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <footer className="flex items-center justify-between mt-4">
            <Button variant="secondary" asChild>
              <Link to="/products">Cancelar</Link>
            </Button>
            <Button type="submit">Crear</Button>
          </footer>
        </form>
      </Form>
    </div>
  )
}
