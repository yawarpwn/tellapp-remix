import { Button } from "./ui/button";
import { TrashIcon } from "lucide-react";

export function DeleteButton({
  quotationNumber,
  id,
}: {
  quotationNumber: number;
  id: string;
}) {
  return (
    <form method="post">
      <input name="id" type="hidden" value={id} />
      <Button variant="outline" size="sm">
        <TrashIcon /> <span className="hidden lg:block">Eliminar</span>
      </Button>
    </form>
  );
}
