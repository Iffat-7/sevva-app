import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { UtensilsCrossed, CalendarDays, ShoppingBag, MapPin, Clock, Phone, Star } from "lucide-react";
import heroImage from "@/assets/hero-restaurant.jpg";

const quickActions = [
  { to: "/menu", icon: UtensilsCrossed, label: "Menu", desc: "Browse dishes" },
  { to: "/booking", icon: CalendarDays, label: "Book Table", desc: "Reserve now" },
  { to: "/cart", icon: ShoppingBag, label: "Order", desc: "Pickup & delivery" },
  { to: "tel:+923151773177", icon: Phone, label: "Call Us", desc: "Direct line", external: true },
];

const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] flex flex-col justify-end overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img src={heroImage} alt="SEVVA Restaurant interior" className="w-full h-full object-cover" />
        <div className="hero-overlay absolute inset-0" />
      </div>

      {/* Content */}
      <div className="relative z-10 px-5 pb-6 pt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="flex items-center gap-1.5 mb-3">
            {[1,2,3,4,5].map(i => (
              <Star key={i} size={12} className="text-primary fill-primary" />
            ))}
            <span className="text-[10px] text-muted-foreground ml-1">Casual Fine Dining</span>
          </div>

          <h1 className="font-display text-6xl font-bold leading-none mb-1">
            <span className="text-gold-gradient">SEVVA</span>
          </h1>
          <p className="font-display text-2xl font-medium text-foreground/90 mb-3">Restaurant, Lahore</p>
          <p className="text-muted-foreground text-sm max-w-xs mb-4 leading-relaxed">
            Authentic Desi, Arabic & Turkish cuisine — premium ingredients, traditional recipes passed through generations.
          </p>

          <div className="flex items-center gap-5 mb-6 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Clock size={12} className="text-primary" /> 12 PM – 12 AM
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin size={12} className="text-primary" /> Raiwind Road, Lahore
            </span>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <div className="grid grid-cols-4 gap-2">
          {quickActions.map(({ to, icon: Icon, label, desc, external }, i) => {
            const Wrapper = external ? "a" : Link;
            const wrapperProps = external ? { href: to } : { to };
            return (
              <motion.div
                key={to}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
              >
                <Wrapper
                  {...(wrapperProps as any)}
                  className="glass-card rounded-xl p-3 flex flex-col items-center gap-1.5 text-center transition-all hover:shadow-gold active:scale-95"
                >
                  <div className="w-9 h-9 rounded-full bg-gold-gradient flex items-center justify-center">
                    <Icon size={16} className="text-primary-foreground" />
                  </div>
                  <span className="text-[10px] font-semibold text-foreground">{label}</span>
                  <span className="text-[8px] text-muted-foreground">{desc}</span>
                </Wrapper>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
