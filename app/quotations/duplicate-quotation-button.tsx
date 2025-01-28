import { Button } from "@/components/ui/button";
import { FilesIcon } from "lucide-react";
import { Form } from "react-router";

export function DuplicateQuotationButton() {
  return (
    <Form
      method="post"
      action="duplicate"
      onSubmit={(event) => {
        let response = confirm("¿Deseas duplicar la cotización?");
        if (!response) event.preventDefault();
      }}
    >
      <Button variant={"outline"} size={"sm"}>
        <FilesIcon /> <span className="hidden lg:block">Duplicar</span>
      </Button>
    </Form>
  );
}
