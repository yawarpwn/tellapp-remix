import { Link } from "react-router";

//ui components
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";

//Icons
import { Loader2, SearchIcon } from "lucide-react";
import { StarIcon } from "lucide-react";

//hooks
import { useState } from "react";

//types
import type { CreateQuotationClient, Customer } from "@/types";
import type { Route } from "./+types/create-quotation";

//utils
import { fetchCustomers, fetchProducts } from "@/lib/data";

//components
import { CustomerPickerDialog } from "@/quotations/customer-pick-dialog";
import { ItemsQuotationTable } from "@/quotations/items-quotation-table";

export async function loader({ context }: Route.LoaderArgs) {
  const products = await fetchProducts();
  const customers = await fetchCustomers();

  if (!products || !customers) {
    return new Response("Error loading data", { status: 500 });
  }

  return {
    products,
    customers,
  };
}

export default function CreateQuotation({ loaderData }: Route.ComponentProps) {
  const { products, customers } = loaderData;

  const [quo, setQuo] = useState<CreateQuotationClient>({
    deadline: 1,
    includeIgv: true,
    credit: null,
    customerId: null,
    isPaymentPending: false,
    items: [],
    customer: {
      id: "",
      name: "",
      ruc: "",
      address: "",
      phone: "",
      isRegular: false,
    },
  });

  const [showCreditOption, setShowCreditOption] = useState(false);
  const [pending, setPending] = useState(false);
  const pendingRuc = false;

  const handleInputChange = () => {};

  const handleRucBlur = () => {};

  const handleSubmit = () => {};

  const addItem = () => {};

  const deleteItem = () => {};

  const editItem = () => {};

  const duplicateItem = () => {};

  const setItems = () => {};

  const onPickCustomer = (customer: Customer) => {
    setQuo({
      ...quo,
      customerId: customer.id,
      customer,
    });
  };

  return (
    <>
      <header className="flex justify-end">
        <div className="flex justify-end">
          <CustomerPickerDialog
            customers={customers}
            onCustomerPick={onPickCustomer}
            customerId={quo.customerId}
          />
        </div>
      </header>
      <article className="mt-4 flex flex-col gap-4 ">
        <div className="grid grid-cols-6 gap-3 md:gap-4">
          {/* Ruc  */}
          <div className="col-span-4 grid flex-grow gap-2 md:col-span-3">
            <Label htmlFor="ruc">Ruc</Label>
            <div className="relative">
              <Input
                required
                id="ruc"
                value={quo.customer?.ruc ?? ""}
                type="number"
                name="ruc"
                disabled={pendingRuc}
                onChange={handleInputChange}
              />
              <Button
                size="icon"
                type="button"
                onClick={handleRucBlur}
                className="absolute right-1.5 top-1 size-7"
                variant="secondary"
              >
                <SearchIcon className="size-4" />
              </Button>
            </div>
          </div>
          {/* Deadline  */}
          <div className="col-span-2 grid gap-2 md:col-span-3">
            <Label htmlFor="deadline">Entrega</Label>
            <Input
              className={quo?.deadline === 0 ? "border border-destructive" : ""}
              required
              type="number"
              id="deadline"
              value={quo.deadline}
              disabled={pendingRuc}
              onChange={(e) =>
                setQuo({ ...quo, deadline: Number(e.target.value) })
              }
            />
          </div>
          {/* Customer */}
          <div className="col-span-6 grid gap-2 md:col-span-3">
            <Label htmlFor="company">Cliente</Label>
            <Input
              id="company"
              name="company"
              type="text"
              value={quo.customer?.name ?? ""}
              disabled={pendingRuc}
              onChange={() => {}}
            />
          </div>
          {/* Address */}
          <div className="col-span-6 grid gap-2 md:col-span-3">
            <Label htmlFor="company">Dirección</Label>
            <Input
              id="address"
              name="address"
              type="text"
              value={""}
              disabled={pendingRuc}
              onChange={() => {}}
            />
          </div>

          {/* Include IGV */}
          <div className="col-span-3 flex items-center gap-2">
            <Checkbox
              id="includeIgv"
              onCheckedChange={(e) =>
                setQuo({ ...quo, includeIgv: Boolean(e) })
              }
              checked={quo.includeIgv}
            />
            <Label htmlFor="includeIgv">Incluir IGV</Label>
          </div>

          {/* is Regular Customer */}
          <div className="col-span-3 flex w-full items-center justify-between">
            {quo.customerId && (
              <div
                className="flex 
                  items-center gap-2"
              >
                <StarIcon />
                <span className="text-sm">Cliente Atendido</span>
              </div>
            )}
          </div>

          {/*Credit */}
          <div className="col-span-3 flex h-9 items-center gap-2">
            <Switch
              checked={showCreditOption}
              onCheckedChange={(checked) => setShowCreditOption(checked)}
            />
            <Label htmlFor="credit">Pago a Credito?</Label>
          </div>
          {showCreditOption && (
            <div className="flex items-center gap-2">
              <Input
                id="credit"
                name="credit"
                type="number"
                className="w-32 grow"
                value={quo.credit ?? ""}
                placeholder="30"
                onChange={(e) => {
                  const { value } = e.target;
                  const credit = value ? Number(value) : null;
                  setQuo({ ...quo, credit });
                }}
              />
              <span>Días</span>
            </div>
          )}
        </div>

        <ItemsQuotationTable
          products={products}
          addItem={addItem}
          items={quo.items}
          editItem={editItem}
          deleteItem={deleteItem}
          duplicateItem={duplicateItem}
          setItems={setItems}
        />
        <footer className="flex items-center justify-between">
          <Button disabled={false} type="button" className="px-12" asChild>
            <Link to="/quotations">Cancelar</Link>
          </Button>
          <Button
            onClick={handleSubmit}
            className="px-12"
            // disabled={pending || !hastItems || quo.deadline === 0}
            type="submit"
          >
            {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Crear
          </Button>
        </footer>
      </article>
    </>
  );
}
