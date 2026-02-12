import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TopBar from "@/components/TopBar";
import MobileNav from "@/components/MobileNav";
import { useCart } from "@/lib/cart-context";
import { getMenuImage } from "@/lib/image-map";
import { Plus, Minus, Trash2, ShoppingBag, MessageCircle, CheckCircle2, MapPin, Truck, Store, Navigation } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

type OrderType = "pickup" | "delivery" | null;

const Cart = () => {
  const { items, updateQuantity, removeItem, clearCart, totalPrice, totalItems } = useCart();
  const [orderType, setOrderType] = useState<OrderType>(null);
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [trackingActive, setTrackingActive] = useState(false);

  const buildWhatsAppMessage = () => {
    const itemList = items
      .map((i) => `• ${i.name} x${i.quantity} — PKR ${(i.price * i.quantity).toLocaleString()}`)
      .join("%0A");
    const addressLine = orderType === "delivery" ? `%0ADelivery Address: ${encodeURIComponent(deliveryAddress)}` : "";
    return `Hi SEVVA! I'd like to place an order for ${orderType}.%0A%0A${itemList}%0A%0ATotal: PKR ${totalPrice.toLocaleString()}${addressLine}`;
  };

  const handleOrder = () => {
    if (!orderType) {
      toast.error("Please select Pickup or Delivery");
      return;
    }
    if (orderType === "delivery" && !deliveryAddress.trim()) {
      toast.error("Please enter your delivery address");
      return;
    }
    setSubmitted(true);
    if (orderType === "delivery") setTrackingActive(true);
    toast.success("Order placed! Confirm via WhatsApp for faster processing.");
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-background pt-16 pb-20">
        <TopBar />
        <div className="flex flex-col items-center justify-center px-5 py-10 text-center">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200 }}>
            <CheckCircle2 size={64} className="text-primary mx-auto mb-4" />
          </motion.div>
          <h2 className="font-display text-2xl font-bold text-foreground mb-2">Order Placed!</h2>
          <p className="text-sm text-muted-foreground mb-6 max-w-xs">
            {orderType === "delivery" ? "Your delivery is being prepared. Track your order below." : "Your pickup order is being prepared!"}
          </p>

          {/* Live Tracking Section for Delivery */}
          {trackingActive && orderType === "delivery" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full max-w-sm mb-6"
            >
              <div className="glass-card rounded-2xl overflow-hidden">
                <div className="bg-secondary p-3 flex items-center gap-2">
                  <Navigation size={16} className="text-primary animate-pulse" />
                  <span className="text-xs font-semibold text-foreground">Live Delivery Tracking</span>
                </div>
                {/* Map placeholder */}
                <div className="relative h-48 bg-muted flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 opacity-20">
                    <div className="w-full h-full" style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23C8A97E' fill-opacity='0.3'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    }} />
                  </div>
                  <div className="relative z-10 text-center">
                    <motion.div
                      animate={{ y: [0, -8, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <MapPin size={32} className="text-primary mx-auto" />
                    </motion.div>
                    <p className="text-xs text-muted-foreground mt-2">Preparing your order...</p>
                    <p className="text-[10px] text-muted-foreground mt-1">Estimated: 30-45 mins</p>
                  </div>
                </div>

                {/* Tracking steps */}
                <div className="p-4 space-y-3">
                  {[
                    { label: "Order Confirmed", done: true, icon: CheckCircle2 },
                    { label: "Preparing Food", done: true, icon: Store },
                    { label: "Out for Delivery", done: false, icon: Truck },
                    { label: "Delivered", done: false, icon: MapPin },
                  ].map((step, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${step.done ? "bg-primary/20" : "bg-secondary"}`}>
                        <step.icon size={14} className={step.done ? "text-primary" : "text-muted-foreground"} />
                      </div>
                      <div className="flex-1">
                        <span className={`text-xs font-medium ${step.done ? "text-foreground" : "text-muted-foreground"}`}>{step.label}</span>
                      </div>
                      {step.done && (
                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                          <CheckCircle2 size={14} className="text-primary" />
                        </motion.div>
                      )}
                    </div>
                  ))}
                </div>

                <div className="px-4 pb-4">
                  <p className="text-[10px] text-muted-foreground">
                    Delivering to: <span className="text-foreground">{deliveryAddress}</span>
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          <a
            href={`https://wa.me/923151773177?text=${buildWhatsAppMessage()}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gold-gradient text-primary-foreground font-semibold text-sm active:scale-95 transition-transform"
          >
            <MessageCircle size={18} />
            Confirm on WhatsApp
          </a>
          <button
            onClick={() => { setSubmitted(false); setTrackingActive(false); clearCart(); }}
            className="mt-4 text-sm text-primary hover:underline"
          >
            Start New Order
          </button>
        </div>
        <MobileNav />
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background pt-16 pb-20">
        <TopBar />
        <div className="flex flex-col items-center justify-center px-5 py-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <ShoppingBag size={56} className="text-muted-foreground/40 mb-4 mx-auto" />
            <h2 className="font-display text-2xl font-bold text-foreground mb-2">Your cart is empty</h2>
            <p className="text-sm text-muted-foreground mb-6">Browse our menu to add delicious items</p>
            <Link
              to="/menu"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gold-gradient text-primary-foreground font-semibold text-sm active:scale-95 transition-transform shadow-gold"
            >
              Browse Menu
            </Link>
          </motion.div>
        </div>
        <MobileNav />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-16 pb-48">
      <TopBar />

      <div className="px-5 pt-4 pb-2">
        <h1 className="font-display text-3xl font-bold text-foreground">Your Order</h1>
        <p className="text-xs text-muted-foreground mt-1">{totalItems} item{totalItems > 1 ? "s" : ""} in cart</p>
      </div>

      {/* Order Type */}
      <div className="px-5 py-3 flex gap-3">
        {([
          { type: "pickup" as const, icon: Store, label: "Pickup" },
          { type: "delivery" as const, icon: Truck, label: "Delivery" },
        ]).map(({ type, icon: Icon, label }) => (
          <button
            key={type}
            onClick={() => setOrderType(type)}
            className={`flex-1 py-3.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all ${
              orderType === type
                ? "bg-gold-gradient text-primary-foreground shadow-gold"
                : "bg-secondary text-secondary-foreground"
            }`}
          >
            <Icon size={16} />
            {label}
          </button>
        ))}
      </div>

      {/* Delivery Address */}
      <AnimatePresence>
        {orderType === "delivery" && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="px-5 overflow-hidden"
          >
            <div className="glass-card rounded-xl p-4 space-y-3">
              <label className="text-xs font-medium text-muted-foreground flex items-center gap-1">
                <MapPin size={12} className="text-primary" /> Delivery Address *
              </label>
              <input
                type="text"
                value={deliveryAddress}
                onChange={(e) => setDeliveryAddress(e.target.value)}
                className="w-full bg-secondary rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-1 focus:ring-primary transition-all"
                placeholder="Enter your full delivery address"
                maxLength={200}
              />
              <p className="text-[10px] text-muted-foreground flex items-center gap-1">
                <Navigation size={10} /> Live tracking will be available after order confirmation
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cart Items */}
      <div className="px-5 py-3 space-y-3">
        <AnimatePresence>
          {items.map((item) => (
            <motion.div
              key={item.id}
              layout
              exit={{ opacity: 0, x: -100 }}
              className="glass-card rounded-xl overflow-hidden flex"
            >
              <img src={getMenuImage(item.image)} alt={item.name} className="w-20 h-20 object-cover shrink-0" loading="lazy" />
              <div className="flex-1 p-3 flex flex-col justify-between min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-sm font-semibold text-foreground truncate">{item.name}</h3>
                  <button onClick={() => removeItem(item.id)} className="text-muted-foreground hover:text-destructive shrink-0">
                    <Trash2 size={14} />
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-primary font-bold text-sm">
                    PKR {(item.price * item.quantity).toLocaleString()}
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-7 h-7 rounded-full bg-secondary flex items-center justify-center active:scale-90 transition-transform"
                    >
                      <Minus size={12} />
                    </button>
                    <span className="text-xs font-semibold w-4 text-center text-foreground">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-7 h-7 rounded-full bg-gold-gradient flex items-center justify-center text-primary-foreground active:scale-90 transition-transform"
                    >
                      <Plus size={12} />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Order Summary - Fixed bottom */}
      <div className="fixed bottom-16 left-0 right-0 glass-card border-t border-border/50 p-4 z-40">
        <div className="flex items-center justify-between mb-3">
          <div>
            <span className="text-xs text-muted-foreground block">Total ({totalItems} items)</span>
            <span className="text-xl font-bold text-primary">PKR {totalPrice.toLocaleString()}</span>
          </div>
          {orderType && (
            <span className="text-[10px] bg-primary/10 text-primary px-3 py-1 rounded-full font-medium capitalize flex items-center gap-1">
              {orderType === "pickup" ? <Store size={10} /> : <Truck size={10} />}
              {orderType}
            </span>
          )}
        </div>
        <button
          onClick={handleOrder}
          className="w-full py-4 rounded-xl bg-gold-gradient text-primary-foreground font-bold text-sm transition-transform active:scale-[0.98] shadow-gold flex items-center justify-center gap-2"
        >
          <MessageCircle size={16} />
          Place Order via WhatsApp
        </button>
      </div>

      <MobileNav />
    </div>
  );
};

export default Cart;
