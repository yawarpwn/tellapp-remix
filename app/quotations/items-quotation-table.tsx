//utils
import { getIgv } from "@/lib/utils";

//ui
import { Button } from "@/components/ui/button";

//icons
import { Plus, CircleOffIcon } from "lucide-react";

//types
import type { Product, QuotationItem } from "@/types";

//react
import React, { useState } from "react";

//components
import { CreateEditItemModal } from "./create-edit-item-modal";
import { ProductCard } from "./product-card";

interface Props {
  items: QuotationItem[];
  products: Product[];
  duplicateItem: (item: QuotationItem) => void;
  setItems: (item: QuotationItem[]) => void;
  editItem: (id: string, item: Partial<QuotationItem>) => void;
  deleteItem: (id: string) => void;
  addItem: (item: Omit<QuotationItem, "id">) => void;
}

export function ItemsQuotationTable(props: Props) {
  const {
    products,
    items,
    duplicateItem,
    setItems,
    editItem,
    deleteItem,
    addItem,
  } = props;

  //Estados
  const [seletedProductId, setSelectedProductId] = useState<string | null>(
    null
  );
  const productItem = items.find((item) => item.id == seletedProductId);
  const [open, setOpen] = useState(false);

  //functions
  const closeItemModal = () => setOpen(false);
  const move = (currentIndex: number, nextIndex: number) => {
    const newItems = [...items];
    newItems[currentIndex] = items[nextIndex];
    newItems[nextIndex] = items[currentIndex];
    setItems(newItems);
  };

  const moveUpItem = (index: number) => {
    if (index > 0) {
      move(index, index - 1);
    }
  };

  const moveDownItem = (index: number) => {
    if (index < items.length - 1) {
      move(index, index + 1);
    }
  };

  const onChangeValue = (
    event: React.ChangeEvent<HTMLInputElement>,
    item: QuotationItem
  ) => {
    const { name, value } = event.target;
    if (name == "price" || name == "qty") {
      editItem(item.id, {
        [name]: Number(value),
      });
    } else {
      editItem(item.id, {
        [name]: value,
      });
    }
  };

  const onEditItem = (id: string) => {
    setOpen(true);
    setSelectedProductId(id);
  };

  const { formatedIgv, formatedTotal, formatedSubTotal, totalItems } =
    getIgv(items);

  return (
    <section>
      {open && (
        <CreateEditItemModal
          open={open}
          onClose={closeItemModal}
          products={products}
          addItem={addItem}
          editItem={editItem}
          item={productItem}
        />
      )}

      <header className="flex items-center justify-between py-4">
        <h2 className="text-xl font-bold ">Productos</h2>
        <div>
          <span className="text-muted-foreground">Items: </span>
          <span className="font-bold text-primary">{totalItems}</span>
        </div>
        <div className="flex items-center gap-2">
          <Button
            type="button"
            onClick={() => {
              setOpen(true);
              setSelectedProductId(null);
            }}
            variant={"secondary"}
          >
            <Plus size={20} />
            <span className="ml-2 hidden md:block">Agregar Item</span>
          </Button>
        </div>
      </header>
      {items.length > 0 ? (
        <div>
          <ul className="flex flex-col gap-4">
            {items.map((item, index) => (
              <ProductCard
                duplicateItem={duplicateItem}
                item={item}
                key={item.id}
                editItem={editItem}
                index={index}
                onEditItem={onEditItem}
                moveUpItem={moveUpItem}
                moveDownItem={moveDownItem}
                deleteItem={deleteItem}
                onChangeValue={onChangeValue}
              />
            ))}
          </ul>

          <div className="mt-2 flex justify-start sm:flex sm:justify-end">
            <div className="w-full space-y-2 sm:w-auto sm:text-right">
              <div className="grid grid-cols-3 gap-3 sm:grid-cols-1 sm:gap-2">
                <dl className="grid gap-x-3 sm:grid-cols-5">
                  <dt className="col-span-3 font-semibold ">Subtotal:</dt>
                  <dd className="col-span-2 ">{formatedSubTotal}</dd>
                </dl>
                <dl className="grid gap-x-3 sm:grid-cols-5">
                  <dt className="col-span-3 font-semibold ">Igv:</dt>
                  <dd className="col-span-2 ">{formatedIgv}</dd>
                </dl>
                <dl className="grid gap-x-3 sm:grid-cols-5">
                  <dt className="col-span-3 font-semibold ">Total:</dt>
                  <dd className="col-span-2 ">{formatedTotal}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-4">
          <CircleOffIcon className="mt-16 h-20 w-20" />
          <h2 className="py-8 text-xl">Sin Produtos agregados</h2>
        </div>
      )}
    </section>
  );
}
