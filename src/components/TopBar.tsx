import { Phone, MessageCircle, UserCircle, LogOut, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

const TopBar = () => {
  const [user, setUser] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        supabase.from("user_roles").select("role").eq("user_id", session.user.id).eq("role", "admin").then(({ data }) => {
          setIsAdmin(!!data && data.length > 0);
        });
      } else {
        setIsAdmin(false);
      }
    });
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        supabase.from("user_roles").select("role").eq("user_id", session.user.id).eq("role", "admin").then(({ data }) => {
          setIsAdmin(!!data && data.length > 0);
        });
      }
    });
    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-border/30">
      <div className="flex items-center justify-between px-4 py-3">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-xl font-display font-bold text-gold-gradient tracking-wide">SEVVA</span>
        </Link>
        <div className="flex items-center gap-2">
          {isAdmin && (
            <Link
              to="/admin"
              className="w-9 h-9 rounded-full flex items-center justify-center bg-primary/20 text-primary hover:bg-primary/30 transition-colors"
              aria-label="Admin"
            >
              <Shield size={16} />
            </Link>
          )}
          {user ? (
            <button
              onClick={handleLogout}
              className="w-9 h-9 rounded-full flex items-center justify-center bg-secondary text-muted-foreground hover:text-destructive transition-colors"
              aria-label="Sign out"
            >
              <LogOut size={16} />
            </button>
          ) : (
            <Link
              to="/auth"
              className="w-9 h-9 rounded-full flex items-center justify-center bg-secondary text-muted-foreground hover:text-primary transition-colors"
              aria-label="Account"
            >
              <UserCircle size={18} />
            </Link>
          )}
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
