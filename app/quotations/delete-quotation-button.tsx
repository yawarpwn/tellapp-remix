import { Button } from "@/components/ui/button";
import { TrashIcon } from "lucide-react";
import { Form, useFetcher } from "react-router";

export function DeleteQuotationButton({
  quotationNumber,
}: {
  quotationNumber: number;
}) {
  const deleteFetcher = useFetcher();
  console.log(deleteFetcher.data);

  return (
    <deleteFetcher.Form
      method="post"
      action={`/quotations/${quotationNumber}/delete`}
      onSubmit={(event) => {
        let response = confirm("¿Deseas Eliminar la cotización?");
        if (!response) event.preventDefault();
      }}
    >
      <Button variant={"outline"} size={"sm"}>
        <TrashIcon /> <span className="hidden lg:block">Eliminar</span>
      </Button>
    </deleteFetcher.Form>
  );
}
