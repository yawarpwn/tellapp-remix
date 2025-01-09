import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";
import { Button } from "@/components/ui/button";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export function loader({ context }: Route.LoaderArgs) {
  return { message: context.VALUE_FROM_CLOUDFLARE };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  return (
    <div>
      <h1 className="text-yellonw-500 text-3xl font-extrabold">
        Start React Router
      </h1>
      <Button variant="secondary">Click me</Button>
    </div>
  );
}
