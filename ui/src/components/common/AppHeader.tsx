import { NAV_LINKS } from "@/constants/navigation";

import { Moon, Music, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { NavLink } from "react-router";

const AppHeader = () => {
  const { theme, setTheme } = useTheme();

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 md:px-8">
        <NavLink to="/" className="flex items-center gap-2 font-bold text-xl">
          <Music className="w-6 h-6 text-primary" />
          <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Minify Music
          </span>
        </NavLink>

        <nav className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map(({ to, label, Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary ${
                  isActive ? "text-primary" : "text-muted-foreground"
                }`
              }>
              <Icon className="w-4 h-4" />
              {label}
            </NavLink>
          ))}
        </nav>

        {/* 🌙 Theme Toggle */}
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="p-2 rounded-full hover:bg-muted transition-colors"
          aria-label="Toggle theme">
          {theme === "dark" ? (
            <Sun className="w-5 h-5" />
          ) : (
            <Moon className="w-5 h-5" />
          )}
        </button>
      </div>
    </header>
  );
};

export default AppHeader;
