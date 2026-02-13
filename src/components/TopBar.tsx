import { Phone, MessageCircle, UserCircle } from "lucide-react";
import { Link } from "react-router-dom";

const TopBar = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-border/30">
      <div className="flex items-center justify-between px-4 py-3">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-xl font-display font-bold text-gold-gradient tracking-wide">SEVVA</span>
        </Link>
        <div className="flex items-center gap-2">
          <Link
            to="/auth"
            className="w-9 h-9 rounded-full flex items-center justify-center bg-secondary text-muted-foreground hover:text-primary transition-colors"
            aria-label="Account"
          >
            <UserCircle size={18} />
          </Link>
          <a
            href="tel:+923151773177"
            className="w-9 h-9 rounded-full flex items-center justify-center bg-secondary text-muted-foreground hover:text-primary transition-colors"
            aria-label="Call"
          >
            <Phone size={16} />
          </a>
          <a
            href="https://wa.me/923151773177"
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-full flex items-center justify-center bg-gold-gradient text-primary-foreground transition-transform hover:scale-105"
            aria-label="WhatsApp"
          >
            <MessageCircle size={16} />
          </a>
        </div>
      </div>
    </header>
  );
};

export default TopBar;
