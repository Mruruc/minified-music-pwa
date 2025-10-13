import DefaultAppLayout from "@/layout/DefaultAppLayout";
import AlbumPage from "@/pages/AlbumPage";
import ArtistPage from "@/pages/ArtistPage";
import HomePage from "@/pages/HomePage";
import NotFound from "@/pages/NotFound";
import PlaylistPage from "@/pages/PlaylistPage";
import { createBrowserRouter, RouteObject } from "react-router";

const routes: RouteObject[] = [
  {
    path: "/",
    Component: DefaultAppLayout,
    children: [
      {
        index: true,
        Component: HomePage,
      },
      {
        path: "/artist/:id",
        Component: ArtistPage,
      },
      {
        path: "/album/:id",
        Component: AlbumPage,
      },
      {
        path: "/playlist/:id",
        Component: PlaylistPage,
      },
      {
        path: "*",
        Component: NotFound,
      },
    ],
  },
];

const router = createBrowserRouter(routes);

export default router;
