import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { MusicProvider } from "@/context/MusicContext";
import { RouterProvider } from "react-router";
import router from "./routes/app-routes";

const App = () => (
  <MusicProvider>
    <RouterProvider router={router} />
    <Toaster />
    <Sonner />
  </MusicProvider>
);

export default App;
