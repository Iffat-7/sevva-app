import { MapPin, Clock, Phone, MessageCircle } from "lucide-react";

const InfoFooter = () => {
  return (
    <footer className="px-5 py-10 pb-24 border-t border-border/30">
      <h2 className="font-display text-xl font-bold text-gold-gradient mb-5">Visit Us</h2>

      <div className="space-y-4 text-sm">
        <div className="flex items-start gap-3">
          <MapPin size={16} className="text-primary mt-0.5 shrink-0" />
          <p className="text-muted-foreground">
            Adda Plot Roundabout, Raiwind Road, opposite GO Pump, near Lake City, Lahore, Punjab 54790
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Clock size={16} className="text-primary shrink-0" />
          <p className="text-muted-foreground">Open Daily: 12:00 PM – 12:00 AM</p>
        </div>
        <div className="flex items-center gap-3">
          <Phone size={16} className="text-primary shrink-0" />
          <a href="tel:+923151773177" className="text-foreground hover:text-primary transition-colors">
            +92 315 177 3177
          </a>
        </div>
      </div>

      <div className="mt-6 flex gap-3">
        <a
          href="https://wa.me/923151773177"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-gold-gradient text-primary-foreground font-semibold text-sm transition-transform active:scale-95"
        >
          <MessageCircle size={16} />
          WhatsApp
        </a>
        <a
          href="tel:+923151773177"
          className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-secondary text-secondary-foreground font-semibold text-sm transition-transform active:scale-95"
        >
          <Phone size={16} />
          Call Now
        </a>
      </div>

      <div className="mt-8 text-center">
        <p className="text-[10px] text-muted-foreground">
          © 2026 SEVVA Restaurant. All rights reserved.
        </p>
        <div className="flex items-center justify-center gap-4 mt-2">
          <a href="https://facebook.com/sevvarestaurant" target="_blank" rel="noopener noreferrer" className="text-xs text-muted-foreground hover:text-primary">Facebook</a>
          <a href="https://instagram.com/sevvarestaurant" target="_blank" rel="noopener noreferrer" className="text-xs text-muted-foreground hover:text-primary">Instagram</a>
          <a href="https://sevva.pk" target="_blank" rel="noopener noreferrer" className="text-xs text-muted-foreground hover:text-primary">Website</a>
        </div>
      </div>
    </footer>
  );
};

export default InfoFooter;
