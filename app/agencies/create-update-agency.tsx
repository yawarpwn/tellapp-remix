import { FieldErrors as Errors } from '@/components/field-errors'
import { Textarea } from '@/components/ui/textarea'
import { BackTo } from '@/components/back-to'
import { Button } from '@/components/ui/button'
import { Link, useFetcher } from 'react-router'
import { Label } from '@radix-ui/react-label'
import { Loader2Icon } from 'lucide-react'
import { Input } from '@/components/ui/input'
import type { Agency } from '@/types'
import React, { useEffect } from 'react'
type Props = {
  agency: Agency | undefined
}

export function CreateUpdateAgency({ agency }: Props) {
  const fetcher = useFetcher()

  const [errors, setErrors] = React.useState([])

  useEffect(() => {
    if (fetcher.data) {
      setErrors(fetcher.data)
    } else {
      setErrors([])
    }
  }, [fetcher.data])

  return (
    <div className="pb-8">
      <div className="mb-4">
        <BackTo to="/products" />
      </div>
      <fetcher.Form method="post">
        <div className="flex flex-col gap-4">
          <div className="grid gap-2">
            <Label className="text-muted-foreground" htmlFor="description">
              Razón Social
            </Label>
            <Input
              required
              name="name"
              id="name"
              defaultValue={agency?.name || ''}
              placeholder="Nombre de cliente"
            />
            {/* <Errors errors={errors} name="name" /> */}
          </div>

          <div className="grid gap-2">
            <Label className="text-muted-foreground" htmlFor="description">
              Ruc
            </Label>
            <Input
              required
              name="ruc"
              id="ruc"
              defaultValue={agency?.ruc || ''}
              placeholder="20610555536"
            />
            {/* <Errors errors={errors} name="ruc" /> */}
          </div>

          <div className="grid gap-2">
            <Label className="text-muted-foreground" htmlFor="description">
              Direccion
            </Label>
            <Input
              required
              name="address"
              id="address"
              defaultValue={agency?.address || ''}
              placeholder="Av. Maquinarias 325 - Urb. Los Eucaliptos"
            />
            {/* <Errors errors={errors} name="address" /> */}
          </div>

          <div className="grid gap-2">
            <Label className="text-muted-foreground" htmlFor="description">
              Teléfono
            </Label>
            <Input
              required
              name="phone"
              id="phone"
              defaultValue={agency?.phone || ''}
              placeholder="992536019"
            />
            {/* <Errors errors={errors} name="address" /> */}
          </div>

          <footer className="flex items-center justify-between mt-4">
            <Link to="/products">Cancelar</Link>
            <Button type="submit">
              {fetcher.state !== 'idle' && <Loader2Icon />}
              <span>{agency ? 'Actualizar' : 'Crear'}</span>
            </Button>
          </footer>
        </div>
      </fetcher.Form>
    </div>
  )
}
