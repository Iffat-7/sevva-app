import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TopBar from "@/components/TopBar";
import MobileNav from "@/components/MobileNav";
import { useCart } from "@/lib/cart-context";
import { getMenuImage } from "@/lib/image-map";
import { Plus, Minus, Trash2, ShoppingBag, MessageCircle, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

type OrderType = "pickup" | "delivery" | null;

const Cart = () => {
  const { items, updateQuantity, removeItem, clearCart, totalPrice, totalItems } = useCart();
  const [orderType, setOrderType] = useState<OrderType>(null);
  const [submitted, setSubmitted] = useState(false);

  const buildWhatsAppMessage = () => {
    const itemList = items
      .map((i) => `• ${i.name} x${i.quantity} — PKR ${(i.price * i.quantity).toLocaleString()}`)
      .join("%0A");
    return `Hi SEVVA! I'd like to place an order for ${orderType}.%0A%0A${itemList}%0A%0ATotal: PKR ${totalPrice.toLocaleString()}`;
  };

  const handleOrder = () => {
    if (!orderType) {
      toast.error("Please select Pickup or Delivery");
      return;
    }
    setSubmitted(true);
    toast.success("Order placed! Confirm via WhatsApp for faster processing.");
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-background pt-16 pb-20">
        <TopBar />
        <div className="flex flex-col items-center justify-center px-5 py-20 text-center">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200 }}>
            <CheckCircle2 size={64} className="text-primary mx-auto mb-4" />
          </motion.div>
          <h2 className="font-display text-2xl font-bold text-foreground mb-2">Order Placed!</h2>
          <p className="text-sm text-muted-foreground mb-6 max-w-xs">
            Confirm your order via WhatsApp for faster processing.
          </p>
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
            onClick={() => { setSubmitted(false); clearCart(); }}
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
          <ShoppingBag size={48} className="text-muted-foreground mb-4" />
          <h2 className="font-display text-xl font-bold text-foreground mb-2">Your cart is empty</h2>
          <p className="text-sm text-muted-foreground mb-6">Browse our menu to add delicious items</p>
          <Link
            to="/menu"
            className="px-6 py-3 rounded-xl bg-gold-gradient text-primary-foreground font-semibold text-sm active:scale-95 transition-transform"
          >
            Browse Menu
          </Link>
        </div>
        <MobileNav />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-16 pb-44">
      <TopBar />

      <div className="px-5 pt-4 pb-2">
        <h1 className="font-display text-3xl font-bold text-foreground">Your Order</h1>
        <p className="text-xs text-muted-foreground mt-1">{totalItems} items in cart</p>
      </div>

      {/* Order Type */}
      <div className="px-5 py-3 flex gap-3">
        {(["pickup", "delivery"] as const).map((type) => (
          <button
            key={type}
            onClick={() => setOrderType(type)}
            className={`flex-1 py-3 rounded-xl text-sm font-semibold capitalize transition-all ${
              orderType === type
                ? "bg-gold-gradient text-primary-foreground shadow-gold"
                : "bg-secondary text-secondary-foreground"
            }`}
          >
            {type}
          </button>
        ))}
      </div>

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
              <img src={getMenuImage(item.image)} alt={item.name} className="w-20 h-20 object-cover shrink-0" />
              <div className="flex-1 p-3 flex flex-col justify-between">
                <div className="flex items-start justify-between">
                  <h3 className="text-sm font-semibold text-foreground">{item.name}</h3>
                  <button onClick={() => removeItem(item.id)} className="text-muted-foreground hover:text-destructive">
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
                      className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center active:scale-90"
                    >
                      <Minus size={12} />
                    </button>
                    <span className="text-xs font-semibold w-4 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-6 h-6 rounded-full bg-gold-gradient flex items-center justify-center text-primary-foreground active:scale-90"
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
      <div className="fixed bottom-16 left-0 right-0 glass-card border-t border-border/50 p-5 z-40">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm text-muted-foreground">Total</span>
          <span className="text-xl font-bold text-primary">PKR {totalPrice.toLocaleString()}</span>
        </div>
        <button
          onClick={handleOrder}
          className="w-full py-4 rounded-xl bg-gold-gradient text-primary-foreground font-bold text-sm transition-transform active:scale-[0.98] shadow-gold"
        >
          Place Order via WhatsApp
        </button>
      </div>

      <MobileNav />
    </div>
  );
};

export default Cart;
