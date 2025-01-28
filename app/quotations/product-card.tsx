import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  ChevronDown,
  ChevronUp,
  TrashIcon,
  EditIcon,
  FilesIcon,
} from "lucide-react";
import type { Product, QuotationItem } from "@/types";

interface Props {
  item: QuotationItem;
  moveUpItem: (index: number) => void;
  moveDownItem: (index: number) => void;
  duplicateItem: (item: QuotationItem) => void;
  onChangeValue: (
    e: React.ChangeEvent<HTMLInputElement>,
    item: QuotationItem
  ) => void;
  editItem: (id: string, item: Partial<Product>) => void;
  onEditItem: (id: string) => void;
  deleteItem: (id: string) => void;
  index: number;
}
export function ProductCard(props: Props) {
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const {
    item,
    moveUpItem,
    editItem,
    moveDownItem,
    index,
    duplicateItem,
    onChangeValue,
    onEditItem,
    deleteItem,
  } = props;

  return (
    <li>
      <Card className="border-border">
        <CardContent className="grid gap-4 p-4">
          <div className="flex items-center justify-between [&_button]:size-7 [&_button]:shrink-0 [&_button_svg]:size-4 ">
            <div className="flex items-center gap-1">
              <Button
                type="button"
                size="icon"
                onClick={() => moveUpItem(index)}
              >
                <ChevronUp />
              </Button>
              <Button size="icon" onClick={() => moveDownItem(index)}>
                <ChevronDown />
              </Button>
            </div>
            <div className="flex items-center space-x-2">
              <Button size="icon" onClick={() => duplicateItem(item)}>
                <FilesIcon />
              </Button>
              <Button size="icon" onClick={() => onEditItem(item.id)}>
                <EditIcon />
              </Button>
              <Button size="icon" onClick={() => deleteItem(item.id)}>
                <TrashIcon />
              </Button>
            </div>
          </div>

          <div className="flex items-center justify-between gap-4">
            <div className="relative flex min-h-[100px]  w-full flex-col gap-4">
              <textarea
                className={cn(
                  "absolute inset-0 z-20 resize-none border-none outline-none",
                  !isEditingDescription && "hidden"
                )}
                onChange={(event) => {
                  editItem(item.id, {
                    description: event.target.value,
                  });
                }}
                onBlur={() => {
                  setIsEditingDescription(false);
                }}
                name="description"
                value={item.description}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    setIsEditingDescription(false);
                  }
                }}
              />
              <p
                onClick={() => {
                  setIsEditingDescription(true);
                }}
                className={cn(
                  "absolute inset-0 z-10",
                  isEditingDescription && "hidden"
                )}
              >
                {item.description}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-12 gap-2">
            <input
              className="col-span-4 rounded  border border-transparent bg-zinc-800 px-2 py-1 text-xs outline-none focus:border-primary"
              type="text"
              onChange={(e) => onChangeValue(e, item)}
              name="unit_size"
              value={item.unitSize}
            />
            <input
              className="col-span-2 rounded border border-transparent bg-transparent bg-zinc-800 px-2 py-1 outline-none focus:border-primary"
              type="number"
              onChange={(e) => onChangeValue(e, item)}
              name="qty"
              value={item.qty}
            />
            <div className="col-span-3 flex items-center gap-1">
              <span>S/</span>
              <input
                className="w-full rounded border border-transparent bg-zinc-800 px-2 py-1 outline-none focus:border-primary"
                type="number"
                onChange={(e) => onChangeValue(e, item)}
                name="price"
                value={item.price}
              />
            </div>
            <span className="text-success col-span-3 rounded px-2 py-1">
              S/ {item.price * item.qty}
            </span>
          </div>
        </CardContent>
      </Card>
    </li>
  );
}
