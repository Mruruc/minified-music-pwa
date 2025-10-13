import { Home, ListMusic, Search, User, type LucideProps } from "lucide-react";
import { type ForwardRefExoticComponent, type RefAttributes } from "react";

type IconComponent = ForwardRefExoticComponent<
  Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
>;

export interface NavLinkItem {
  to: string;
  label: string;
  Icon: IconComponent;
}

export const NAV_LINKS: NavLinkItem[] = [
  { to: "/", label: "Home", Icon: Home },
  { to: "/browse", label: "Browse", Icon: Search },
  { to: "/playlists", label: "Playlists", Icon: ListMusic },
  { to: "/artists", label: "Artists", Icon: User },
];

export const FOOTER_LINKS = [
  {
    title: "Company",
    links: [
      { to: "/about", label: "About" },
      { to: "/careers", label: "Careers" },
      { to: "/press", label: "Press" },
    ],
  },
  {
    title: "Support",
    links: [
      { to: "/help", label: "Help Center" },
      { to: "/contact", label: "Contact" },
      { to: "/privacy", label: "Privacy" },
    ],
  },
  {
    title: "Legal",
    links: [
      { to: "/terms", label: "Terms" },
      { to: "/cookies", label: "Cookies" },
      { to: "/licenses", label: "Licenses" },
    ],
  },
];
