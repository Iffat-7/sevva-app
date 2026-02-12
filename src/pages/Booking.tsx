import { useState } from "react";
import { motion } from "framer-motion";
import TopBar from "@/components/TopBar";
import MobileNav from "@/components/MobileNav";
import { CalendarDays, Users, Clock, CheckCircle2, MessageCircle } from "lucide-react";
import { toast } from "sonner";

const Booking = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    date: "",
    time: "",
    guests: "2",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.date || !formData.time) {
      toast.error("Please fill in all required fields");
      return;
    }
    setSubmitted(true);
    toast.success("Booking request submitted!");
  };

  const whatsappMessage = `Hi SEVVA! I'd like to book a table.%0AName: ${formData.name}%0APhone: ${formData.phone}%0ADate: ${formData.date}%0ATime: ${formData.time}%0AGuests: ${formData.guests}`;

  if (submitted) {
    return (
      <div className="min-h-screen bg-background pt-16 pb-20">
        <TopBar />
        <div className="flex flex-col items-center justify-center px-5 py-20 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <CheckCircle2 size={64} className="text-primary mx-auto mb-4" />
          </motion.div>
          <h2 className="font-display text-2xl font-bold text-foreground mb-2">Booking Submitted!</h2>
          <p className="text-sm text-muted-foreground mb-6 max-w-xs">
            We'll confirm your reservation shortly. You can also confirm instantly via WhatsApp.
          </p>
          <a
            href={`https://wa.me/923151773177?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gold-gradient text-primary-foreground font-semibold text-sm transition-transform active:scale-95"
          >
            <MessageCircle size={18} />
            Confirm on WhatsApp
          </a>
          <button
            onClick={() => { setSubmitted(false); setFormData({ name: "", phone: "", date: "", time: "", guests: "2" }); }}
            className="mt-4 text-sm text-primary hover:underline"
          >
            Make Another Booking
          </button>
        </div>
        <MobileNav />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-16 pb-20">
      <TopBar />

      <div className="px-5 pt-4 pb-2">
        <h1 className="font-display text-3xl font-bold text-foreground">Book a Table</h1>
        <p className="text-xs text-muted-foreground mt-1">Reserve your dining experience</p>
      </div>

      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="px-5 py-6 space-y-4"
      >
        <div className="glass-card rounded-xl p-4 space-y-4">
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Full Name *</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-secondary rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-1 focus:ring-primary transition-all"
              placeholder="Your name"
              maxLength={100}
            />
          </div>

          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Phone Number *</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full bg-secondary rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-1 focus:ring-primary transition-all"
              placeholder="+92 3XX XXXXXXX"
              maxLength={20}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1.5 flex items-center gap-1">
                <CalendarDays size={12} /> Date *
              </label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full bg-secondary rounded-lg px-4 py-3 text-sm text-foreground outline-none focus:ring-1 focus:ring-primary transition-all"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1.5 flex items-center gap-1">
                <Clock size={12} /> Time *
              </label>
              <input
                type="time"
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                className="w-full bg-secondary rounded-lg px-4 py-3 text-sm text-foreground outline-none focus:ring-1 focus:ring-primary transition-all"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1.5 flex items-center gap-1">
              <Users size={12} /> Number of Guests
            </label>
            <select
              value={formData.guests}
              onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
              className="w-full bg-secondary rounded-lg px-4 py-3 text-sm text-foreground outline-none focus:ring-1 focus:ring-primary transition-all"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 10, 12, 15, 20].map((n) => (
                <option key={n} value={n}>{n} {n === 1 ? "Guest" : "Guests"}</option>
              ))}
            </select>
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-4 rounded-xl bg-gold-gradient text-primary-foreground font-bold text-sm transition-transform active:scale-[0.98] shadow-gold"
        >
          Reserve Table
        </button>

        <p className="text-center text-[10px] text-muted-foreground">
          Or book directly via{" "}
          <a href="https://wa.me/923151773177" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
            WhatsApp
          </a>{" "}
          or call{" "}
          <a href="tel:+923151773177" className="text-primary hover:underline">
            +92 315 177 3177
          </a>
        </p>
      </motion.form>

      <MobileNav />
    </div>
  );
};

export default Booking;
