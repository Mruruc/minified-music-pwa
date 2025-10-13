import AppFooter from "@/components/common/AppFooter";
import AppHeader from "@/components/common/AppHeader";
import MobileNavigation from "@/components/common/MobileNavigation";
import { Player } from "@/components/Player";
import { Outlet, ScrollRestoration } from "react-router";

const DefaultAppLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <ScrollRestoration />
      <AppHeader />
      <main className="flex flex-1 items-center justify-center">
        <Outlet />
      </main>
      <AppFooter />
      <Player />
      <MobileNavigation />
    </div>
  );
};
export default DefaultAppLayout;
