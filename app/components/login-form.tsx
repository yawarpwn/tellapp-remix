import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Form, Link } from "react-router";
import { Button } from "@/components/ui/button";

export function LoginForm({ message }: { message: string }) {
  return (
    <>
      <Form method="post">
        <div className="flex flex-col gap-6">
          <div className="grid gap-4">
            <Label htmlFor="email" className="label">
              Correo
            </Label>
            <Input
              type="email"
              name="email"
              id="email"
              className=""
              placeholder="correo@dominio.com"
              required
            />
            {/* {state?.errors?.email && ( */}
            {/*   <p className="text-xs text-destructive">{state?.errors?.email[0]}</p> */}
            {/* )} */}
          </div>
          <div className="grid gap-4">
            <Label htmlFor="password" className="label">
              <span className="label-text">Constraseña</span>
            </Label>
            <Input
              type="password"
              name="password"
              id="password"
              className="input"
              placeholder="********"
              required
            />

            {/* {state?.errors?.password && ( */}
            {/*   <p className=" text-xs text-destructive">{state?.errors?.password[0]}</p> */}
            {/* )} */}
            {/* {state?.message && <p className=" text-xs text-destructive">*{state.message}</p>} */}
            <p className="text-xs text-primary">
              <a href="#">Olvidates tu contraseña ?</a>
            </p>
          </div>
          <Button asChild type="submit">
            <Link to="/quotations">Ingresar</Link>
          </Button>
          {/* <SubmitButton /> */}
          <p className="text-center text-xs">
            Necesitas una cuenta?{" "}
            <a href="#" className="text-primary ">
              Registrate
            </a>
          </p>
          {message && (
            <div className="rounded-sm border border-destructive p-2 text-destructive">
              <p className="text-center text-xs">{message}</p>
            </div>
          )}
        </div>
      </Form>
    </>
  );
}
