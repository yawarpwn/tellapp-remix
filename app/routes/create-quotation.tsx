import { Form, Link, redirect, useFetcher } from "react-router";
import { useSubmit } from "react-router";

//ui components
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";

//Icons
import { Loader2, Loader2Icon, SearchIcon } from "lucide-react";
import { StarIcon } from "lucide-react";

//hooks
import React, { useEffect, useState } from "react";

//types
import type { CreateQuotationClient, Customer, QuotationItem } from "@/types";
import type { Route } from "./+types/create-quotation";

//utils
import { fetchCustomers, fetchProducts } from "@/lib/data";

//components
import { CustomerPickerDialog } from "@/quotations/customer-pick-dialog";
import { ItemsQuotationTable } from "@/quotations/items-quotation-table";
import { createQuotationAction } from "@/lib/actions";
import { toast } from "sonner";
import { HTTPRequestError } from "@/lib/errors";

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const quotation = JSON.parse(formData.get("quotation") as string);
  try {
    await createQuotationAction(quotation);
    return redirect("/quotations");
  } catch (error) {
    if (error instanceof HTTPRequestError) {
      return { error: error.message };
    }

    return {
      error: "Error creating quotation",
    };
  }
}
export async function loader(_: Route.LoaderArgs) {
  return {
    productsPromise: fetchProducts(),
    customersPromise: fetchCustomers(),
  };
}

export default function CreateQuotation({ loaderData }: Route.ComponentProps) {
  const { productsPromise, customersPromise } = loaderData;

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
      phone: undefined,
      address: "",
      email: undefined,
      isRegular: false,
    },
  });

  const [showCreditOption, setShowCreditOption] = useState(false);
  const pendingRuc = false;

  const submit = useSubmit();

  const fetcher = useFetcher();
  let pending = fetcher.state !== "idle";

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append("quotation", JSON.stringify(quo));
    submit(formData, {
      method: "post",
      action: "/quotations/search-by-ruc",
    });
  };

  const handleadditem = (item: QuotationItem) => {
    setQuo({
      ...quo,
      items: [...quo.items, item],
    });
  };

  const handleDeleteItem = (id: string) => {
    setQuo({
      ...quo,
      items: quo.items.filter((item) => item.id !== id),
    });
  };

  const handleEditItem = (itemToEdit: QuotationItem) => {
    setQuo({
      ...quo,
      items: quo.items.map((item) => {
        if (item.id === itemToEdit.id) {
          return itemToEdit;
        }
        return item;
      }),
    });
  };

  const handleDuplicateItem = (item: QuotationItem) => {
    setQuo({
      ...quo,
      items: [...quo.items, { ...item, id: crypto.randomUUID() }],
    });
  };

  const handlePickCustomer = (customer: Customer) => {
    setQuo({
      ...quo,
      customerId: customer.id,
      customer,
    });
  };

  const move = (currentIndex: number, nextIndex: number) => {
    const newItems = [...quo.items];
    newItems[currentIndex] = quo.items[nextIndex];
    newItems[nextIndex] = quo.items[currentIndex];
    setQuo({
      ...quo,
      items: newItems,
    });
  };

  const moveUpItem = (index: number) => {
    if (index > 0) {
      move(index, index - 1);
    }
  };

  const moveDownItem = (index: number) => {
    if (index < quo.items.length - 1) {
      move(index, index + 1);
    }
  };

  useEffect(() => {
    if (fetcher.data) {
      if (fetcher.data.success) {
        toast("Cliente encontrado", {
          description: <div>Que fueee</div>,
        });

        setQuo({
          ...quo,
          customer: {
            ...quo.customer,
            ruc: fetcher.data.data.ruc,
            name: fetcher.data.data.name,
            address: fetcher.data.data.address,
          },
          customerId: fetcher.data.data.id,
        });
      } else {
        toast.error(fetcher.data.error);
      }
    }
  }, [fetcher.data]);

  const hasItems = quo.items.length !== 0;

  return (
    <>
      <header className="flex justify-end">
        <div className="flex justify-end">
          <React.Suspense fallback="cargando...">
            <CustomerPickerDialog
              customersPromise={customersPromise}
              onCustomerPick={handlePickCustomer}
              customerId={quo.customerId}
            />
          </React.Suspense>
        </div>
      </header>
      <article className="mt-4 flex flex-col gap-4 ">
        <div className="grid grid-cols-6 gap-3 md:gap-4">
          {/* Ruc  */}
          <div className="col-span-4 grid flex-grow gap-2 md:col-span-3">
            <Label htmlFor="ruc">Ruc</Label>
            <div className="relative">
              <fetcher.Form method="post" action="/quotations/search-by-ruc">
                <Input
                  required
                  id="ruc"
                  autoComplete=""
                  value={quo?.customer?.ruc ?? ""}
                  type="number"
                  name="ruc"
                  disabled={pendingRuc}
                  onChange={(e) =>
                    setQuo({
                      ...quo,
                      customer: { ...quo?.customer, ruc: e.target.value },
                    })
                  }
                />
                <Button
                  size="icon"
                  type="submit"
                  disabled={pending}
                  className="absolute right-1.5 top-1 size-7"
                  variant="outline"
                >
                  {pending ? (
                    <Loader2Icon className="size-4 animate-spin" />
                  ) : (
                    <span>
                      <SearchIcon className="size-4 " />
                    </span>
                  )}
                </Button>
              </fetcher.Form>
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
              value={quo?.customer?.name ?? ""}
              disabled={pendingRuc}
              onChange={(e) => {
                setQuo({
                  ...quo,
                  customer: { ...quo?.customer, name: e.target.value },
                });
              }}
            />
          </div>
          {/* Address */}
          <div className="col-span-6 grid gap-2 md:col-span-3">
            <Label htmlFor="company">Dirección</Label>
            <Input
              id="address"
              name="address"
              type="text"
              value={quo?.customer?.address ?? ""}
              disabled={pendingRuc}
              onChange={(e) => {
                setQuo({
                  ...quo,
                  customer: { ...quo.customer, address: e.target.value },
                });
              }}
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

        <React.Suspense fallback="...cargando">
          <ItemsQuotationTable
            productsPromise={productsPromise}
            onAddItem={handleadditem}
            items={quo.items}
            onEditItem={handleEditItem}
            onDeleteItem={handleDeleteItem}
            onDuplicateItem={handleDuplicateItem}
            onMoveDownItem={moveDownItem}
            onMoveUpItem={moveUpItem}
          />
        </React.Suspense>
        <footer className="flex items-center justify-between">
          <Button
            variant="outline"
            disabled={false}
            type="button"
            className="px-12"
            asChild
          >
            <Link to="/quotations">Cancelar</Link>
          </Button>
          <Button
            onClick={handleSubmit}
            className="px-12"
            disabled={pending || !hasItems || quo.deadline === 0}
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
