import { FOOTER_LINKS } from "@/constants/navigation";
import { Music } from "lucide-react";
import { useMemo } from "react";
import { Link } from "react-router";

const AppFooter = () => {
  const currentYear = useMemo(() => new Date().getFullYear(), []);

  return (
    <footer className="hidden md:block border-t bg-background/95 backdrop-blur pb-24">
      <div className="container px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-3">
            <h3 className="font-bold text-lg flex items-center gap-2">
              <Music className="w-5 h-5 text-primary" />
              Minify Music
            </h3>
            <p className="text-sm text-muted-foreground">
              Your ultimate music streaming experience. Discover, stream, and
              enjoy.
            </p>
          </div>

          {FOOTER_LINKS.map((item) => (
            <div key={item.title} className="space-y-3">
              <h4 className="font-semibold">{item.title}</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {item.links.map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className="hover:text-primary transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>© {currentYear} Minify Music. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default AppFooter;
