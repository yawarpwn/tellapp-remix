// import { FieldErrors as Errors } from '@/components/field-errors'
import { Textarea } from '@/components/ui/textarea'
import { BackTo } from '@/components/back-to'
import { Button } from '@/components/ui/button'
import { Link, useFetcher } from 'react-router'
import { Label } from '@radix-ui/react-label'
import { Loader2Icon, SearchIcon } from 'lucide-react'
import { Input } from '@/components/ui/input'
import type { Agency, CreateLabel, LabelType, UpdateLabel } from '@/types'
import React, { useEffect } from 'react'
import { PickAgencyDialog } from '@/components/pick-agency-dialog'
type Props = {
  label: UpdateLabel | undefined
  agencies: Agency[]
}

export function CreateUpdateLabel({ label: labelToUpdate, agencies }: Props) {
  const [label, setLabel] = React.useState<CreateLabel | UpdateLabel>(
    labelToUpdate || {
      dniRuc: '',
      recipient: '',
      destination: '',
      address: '',
      phone: '',
      observations: '',
      agencyId: undefined,
    }
  )

  const fetcher = useFetcher()
  const searchFetcher = useFetcher()

  const [errors, setErrors] = React.useState([])

  const handleSearchCustomerByDniOrRuc = () => {
    const formData = new FormData()
    if (!label.dniRuc) return
    formData.append('ruc', label.dniRuc)
    searchFetcher.submit(formData, {
      method: 'post',
      action: '/quotations/search-by-ruc',
    })
  }

  const handleChange = (
    ev:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = ev.target
    setLabel((prev) => ({ ...prev, [name]: value }))
  }

  const handlePickAgency = (agencyId: string) => {
    setLabel((prev) => ({ ...prev, agencyId }))
  }

  const handleSubmit = (ev: React.FormEvent) => {
    ev.preventDefault()
    fetcher.submit(label, {
      method: 'post',
    })
  }

  const pending = fetcher.state !== 'idle' || searchFetcher.state !== 'idle'

  React.useEffect(() => {
    console.log(searchFetcher.data)
    if (searchFetcher.data) {
      const customer = searchFetcher.data.customer
      setLabel((prev) => ({
        ...prev,
        dniRuc: customer.ruc,
        recipient: customer.name,
      }))
    }
  }, [searchFetcher.data])

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
        <BackTo to="/labels" />
      </div>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4">
          <div className="grid gap-2 ">
            <Label className="text-muted-foreground" htmlFor="description">
              Dni / Ruc
            </Label>
            <div className="relative">
              <Input
                disabled={pending}
                required
                minLength={8}
                maxLength={11}
                name="dniRuc"
                typeof="number"
                id="dniRuc"
                value={label?.dniRuc || ''}
                onChange={handleChange}
                placeholder="66226428"
              />

              <Button
                size="icon"
                type="submit"
                disabled={pending}
                className="absolute right-1.5 top-1 size-7"
                variant="outline"
                onClick={handleSearchCustomerByDniOrRuc}
              >
                {pending ? (
                  <Loader2Icon className="size-4 animate-spin" />
                ) : (
                  <span>
                    <SearchIcon className="size-4 " />
                  </span>
                )}
              </Button>
            </div>
            {/* <Errors errors={errors} name="name" /> */}
          </div>
          <div className="grid gap-2">
            <Label className="text-muted-foreground" htmlFor="description">
              Razón Social
            </Label>
            <Input
              disabled={pending}
              required
              name="recipient"
              id="recipient"
              value={label?.recipient || ''}
              onChange={handleChange}
              placeholder="Nombre de cliente"
            />
            {/* <Errors errors={errors} name="name" /> */}
          </div>

          <div className="grid gap-2">
            <Label className="text-muted-foreground" htmlFor="description">
              Destino
            </Label>
            <Input
              required
              disabled={pending}
              name="destination"
              id="destination"
              value={label?.destination || ''}
              onChange={handleChange}
              placeholder="Cajatambo - Cajamarca"
            />
            {/* <Errors errors={errors} name="address" /> */}
          </div>
          <div className="grid gap-2">
            <Label className="text-muted-foreground" htmlFor="description">
              Direccion
            </Label>
            <Input
              name="address"
              disabled={pending}
              id="address"
              value={label?.address || ''}
              onChange={handleChange}
              placeholder="Av. Maquinarias 325 - Urb. Los Eucaliptos"
            />
            {/* <Errors errors={errors} name="address" /> */}
          </div>

          <div className="grid gap-2">
            <Label className="text-muted-foreground" htmlFor="description">
              Teléfono
            </Label>
            <Input
              typeof="number"
              name="phone"
              disabled={pending}
              minLength={9}
              id="phone"
              value={label?.phone || ''}
              onChange={handleChange}
              placeholder="992536019"
            />
            {/* <Errors errors={errors} name="address" /> */}
          </div>

          <div className="grid gap-2">
            <Label className="text-muted-foreground" htmlFor="description">
              Observaciones
            </Label>
            <Textarea
              name="observations"
              id="observations"
              disabled={pending}
              value={label?.observations || ''}
              onChange={handleChange}
              placeholder="Atención: Juan Roman Riquelme con DNI: 344323908"
            />
            {/* <Errors errors={errors} name="address" /> */}
          </div>
          <PickAgencyDialog
            onPickAgency={handlePickAgency}
            agencies={agencies}
            agencyId={label?.agencyId}
          />

          <footer className="flex items-center justify-between mt-4">
            <Link to="/labels">Cancelar</Link>
            <Button disabled={pending} type="submit">
              {fetcher.state !== 'idle' && <Loader2Icon />}
              <span>{labelToUpdate ? 'Actualizar' : 'Crear'}</span>
            </Button>
          </footer>
        </div>
      </form>
    </div>
  )
}
