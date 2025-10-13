import { NAV_LINKS } from "@/constants/navigation";
import { NavLink } from "react-router";

const MobileNavigation = () => {
  return (
    <nav className="md:hidden fixed bottom-20 left-0 right-0 z-40 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex items-center justify-around h-16 px-4">
        {NAV_LINKS.map(({ to, label, Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 transition-colors ${
                isActive ? "text-primary" : "text-muted-foreground"
              }`
            }>
            <Icon className="w-5 h-5" />
            <span className="text-xs">{label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default MobileNavigation;
