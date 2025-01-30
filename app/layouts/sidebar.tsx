import { Form, Link, Outlet } from "react-router";

export default function SidebarLayout() {
  return (
    <>
      <div className="flex w-screen justify-between max-w-full flex-1">
        <div className="w-[4.5rem] shrink-0">
          <div className="w-[4.5rem] h-screen border-r"></div>
        </div>
        <main>
          <Outlet />
        </main>
      </div>
    </>
  );
}
