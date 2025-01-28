import { Button } from "@/components/ui/button";
import { TrashIcon } from "lucide-react";
import { Form } from "react-router";

export function DeleteQuotationButton() {
  return (
    <Form
      method="post"
      action="delete"
      onSubmit={(event) => {
        let response = confirm("¿Deseas Eliminar la cotización?");
        if (!response) event.preventDefault();
      }}
    >
      <Button variant={"outline"} size={"sm"}>
        <TrashIcon /> <span className="hidden lg:block">Eliminar</span>
      </Button>
    </Form>
  );
}
