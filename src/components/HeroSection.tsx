import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { UtensilsCrossed, CalendarDays, ShoppingBag, MapPin, Clock } from "lucide-react";
import heroImage from "@/assets/hero-restaurant.jpg";

const quickActions = [
  { to: "/menu", icon: UtensilsCrossed, label: "Menu", delay: 0.3 },
  { to: "/booking", icon: CalendarDays, label: "Book Table", delay: 0.4 },
  { to: "/cart", icon: ShoppingBag, label: "Order Now", delay: 0.5 },
];

const HeroSection = () => {
  return (
    <section className="relative min-h-[85vh] flex flex-col justify-end overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img src={heroImage} alt="SEVVA Restaurant interior" className="w-full h-full object-cover" />
        <div className="hero-overlay absolute inset-0" />
      </div>

      {/* Content */}
      <div className="relative z-10 px-5 pb-8 pt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="font-display text-5xl font-bold leading-tight mb-3">
            <span className="text-gold-gradient">SEVVA</span>
            <br />
            <span className="text-foreground text-3xl font-medium">Restaurant</span>
          </h1>
          <p className="text-muted-foreground text-sm max-w-xs mb-2">
            Casual Fine Dining — Lahore's finest desi, Arabic & Turkish cuisine
          </p>

          <div className="flex items-center gap-4 mb-6 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Clock size={12} className="text-primary" /> 12 PM – 12 AM
            </span>
            <span className="flex items-center gap-1">
              <MapPin size={12} className="text-primary" /> Raiwind Road
            </span>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <div className="grid grid-cols-3 gap-3">
          {quickActions.map(({ to, icon: Icon, label, delay }) => (
            <motion.div
              key={to}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay, duration: 0.5 }}
            >
              <Link
                to={to}
                className="glass-card rounded-xl p-4 flex flex-col items-center gap-2 text-center transition-all hover:shadow-gold active:scale-95"
              >
                <div className="w-10 h-10 rounded-full bg-gold-gradient flex items-center justify-center">
                  <Icon size={18} className="text-primary-foreground" />
                </div>
                <span className="text-xs font-medium text-foreground">{label}</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
