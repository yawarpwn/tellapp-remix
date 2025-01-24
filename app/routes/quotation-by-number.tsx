import { fetchQuotaitonByNumber } from "@/lib/data";
import { deleteQuotation } from "@/lib/actions";
import { CopyText } from "@/components/quotations/copy-text";
import type { Route } from "./+types/quotation-by-number";
import { Link, redirect } from "react-router";
import { buttonVariants } from "@/components/ui/button";
import { EditIcon, ExternalLinkIcon } from "lucide-react";
import { formatDateToLocal, formatNumberToLocal, getIgv } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DownloadAndShareButtons } from "@/components/quotations/download-and-share-buttons";
import { DuplicateQuotationButton } from "@/components/quotations/duplicate-quotation-button";
import { DeleteQuotationButton } from "@/components/quotations/delete-quotation-button";

export async function loader({ params }: Route.LoaderArgs) {
  const quotation = await fetchQuotaitonByNumber(+params.number);

  return {
    quotation,
  };
}

export default function quotationByNumberPage({
  loaderData,
}: Route.ComponentProps) {
  const { quotation } = loaderData;

  const { formatedIgv, formatedTotal, formatedSubTotal } = getIgv(
    quotation.items
  );

  return (
    <div className="container mx-auto">
      <header className="flex justify-end gap-x-2">
        <div className="flex gap-2">
          <Link
            to={`/new-quos/${quotation.number}/update`}
            className={buttonVariants({ size: "sm", variant: "outline" })}
          >
            <EditIcon size={18} />
            <span className="hidden lg:block">Editar</span>
          </Link>
          <DownloadAndShareButtons quotation={quotation} />
          <DuplicateQuotationButton />
          <DeleteQuotationButton />
          {/* {quotation.customerId && ( */}
          {/*   <IsRegularButton */}
          {/*     id={quotation.customerId} */}
          {/*     isRegular={Boolean(quotation.isRegularCustomer)} */}
          {/*     quotationNumber={quotation.number} */}
          {/*   /> */}
          {/* )} */}
        </div>
      </header>

      <div className="flex justify-end">
        <div className="text-right">
          <h2 className="text-2xl font-semibold md:text-3xl">Cotización</h2>
          <div className="mt-1 flex justify-end gap-1 text-xl text-yellow-500">
            <span>#</span>
            <span className="font-bold">{quotation.number}</span>
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <div>
          <h3 className="text-lg font-semibold ">
            {quotation?.customer?.name ?? "SIN NOMBRE"}
          </h3>
          <address className="mt-2 not-italic text-muted-foreground ">
            {quotation?.customer?.address ?? ""}
          </address>
          <p className="mt-2 text-muted-foreground">
            {quotation.customer.ruc ?? "SIN RUC"}
          </p>
        </div>
        <div className="space-y-2 sm:text-right">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-1 sm:gap-2">
            <dl className="grid gap-x-3 sm:grid-cols-6">
              <dt className="col-span-3 font-semibold ">Fecha:</dt>
              <dd className="col-span-3 ">
                {formatDateToLocal(new Date(quotation.createdAt))}
              </dd>
            </dl>
            <dl className="grid gap-x-3 sm:grid-cols-6">
              <dt className="col-span-3 font-semibold ">Actualizado:</dt>
              <dd className="col-span-3 ">
                {quotation.updatedAt && formatDateToLocal(quotation.updatedAt)}
              </dd>
            </dl>

            <dl className="grid gap-x-3 sm:grid-cols-6">
              <dt className="col-span-3 font-semibold ">Tiempo de entrega:</dt>
              <dd className="col-span-3 ">{quotation.deadline} día(s)</dd>
            </dl>
            <dl className="grid gap-x-3 sm:grid-cols-6">
              <dt className="col-span-3 font-semibold ">Codición de Pago</dt>
              <dd className="col-span-3 ">
                {quotation.credit
                  ? `${quotation.credit} días`
                  : "50% Adelanto "}
              </dd>
            </dl>
          </div>
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>DESCRIPCION</TableHead>
            <TableHead className="text-center">LINK</TableHead>
            <TableHead className="text-center">U/M</TableHead>
            <TableHead className="text-center">CANT</TableHead>
            <TableHead className="text-center">P.BASE</TableHead>
            <TableHead className="text-center">P.UNIT</TableHead>
            <TableHead className="text-center">MONTO</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {quotation.items.map((item) => (
            <TableRow key={item.id}>
              <TableCell>
                <div className="min-w-[250px]">
                  <CopyText unitSize={item.unitSize} text={item.description} />
                </div>
              </TableCell>
              <TableCell className="text-center">
                {item.link && (
                  <a
                    target="_blank"
                    className="flex justify-center"
                    href={item.link}
                  >
                    <ExternalLinkIcon size={18} className="text-primary" />
                  </a>
                )}
              </TableCell>
              <TableCell className="text-center">{item.unitSize}</TableCell>
              <TableCell className="text-center">
                {item.qty.toString().padStart(2, "0")}
              </TableCell>
              <TableCell className="text-center">
                {(item.price / 1.18).toFixed(4)}
              </TableCell>
              <TableCell className="text-center">
                {formatNumberToLocal(item.price)}
              </TableCell>
              <TableCell className="text-center">
                {formatNumberToLocal(item.price * item.qty)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter className="justify-end" aria-colspan={7}>
          <TableRow>
            <TableCell colSpan={6}>
              <div className="flex justify-end">
                <span>SUBTOTAL</span>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex justify-center ">
                <span>{formatedSubTotal}</span>
              </div>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={6}>
              <div className="flex justify-end">
                <span>IGV</span>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex justify-center">
                <span>{formatedIgv}</span>
              </div>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={6}>
              <div className="flex justify-end">
                <span>TOTAL</span>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex justify-center">
                <span>{formatedTotal}</span>
              </div>
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}
