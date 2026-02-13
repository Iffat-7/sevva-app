import { Home, UtensilsCrossed, CalendarDays, ShoppingBag, Image } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useCart } from "@/lib/cart-context";
import { motion } from "framer-motion";

const navItems = [
  { to: "/", icon: Home, label: "Home" },
  { to: "/menu", icon: UtensilsCrossed, label: "Menu" },
  { to: "/gallery", icon: Image, label: "Gallery" },
  { to: "/booking", icon: CalendarDays, label: "Book" },
  { to: "/cart", icon: ShoppingBag, label: "Order" },
];

const MobileNav = () => {
  const location = useLocation();
  const { totalItems } = useCart();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 glass-card border-t border-border/50 safe-area-bottom">
      <div className="flex items-center justify-around py-2 px-4">
        {navItems.map(({ to, icon: Icon, label }) => {
          const active = location.pathname === to;
          return (
            <Link key={to} to={to} className="relative flex flex-col items-center gap-0.5 px-3 py-1.5">
              {active && (
                <motion.div
                  layoutId="nav-indicator"
                  className="absolute -top-1 w-6 h-0.5 rounded-full bg-gold-gradient"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <div className="relative">
                <Icon
                  size={22}
                  className={active ? "text-primary" : "text-muted-foreground"}
                />
                {label === "Order" && totalItems > 0 && (
                  <span className="absolute -top-1.5 -right-2 w-4 h-4 rounded-full bg-gold-gradient text-primary-foreground text-[10px] font-bold flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </div>
              <span className={`text-[10px] font-medium ${active ? "text-primary" : "text-muted-foreground"}`}>
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default MobileNav;
