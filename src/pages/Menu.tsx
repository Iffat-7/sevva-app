import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TopBar from "@/components/TopBar";
import MobileNav from "@/components/MobileNav";
import { categories, menuItems } from "@/lib/menu-data";
import { useCart } from "@/lib/cart-context";
import { getMenuImage } from "@/lib/image-map";
import { Plus, Minus } from "lucide-react";

const Menu = () => {
  const [activeCategory, setActiveCategory] = useState<string>(categories[0]);
  const { items: cartItems, addItem, updateQuantity } = useCart();

  const filteredItems = menuItems.filter((item) => item.category === activeCategory);

  const getCartQuantity = (id: string) => {
    const cartItem = cartItems.find((i) => i.id === id);
    return cartItem?.quantity || 0;
  };

  return (
    <div className="min-h-screen bg-background pt-16 pb-20">
      <TopBar />

      <div className="px-5 pt-4 pb-2">
        <h1 className="font-display text-3xl font-bold text-foreground">Our Menu</h1>
        <p className="text-xs text-muted-foreground mt-1">Authentic flavors, crafted with love</p>
      </div>

      {/* Category Tabs */}
      <div className="flex gap-2 overflow-x-auto px-5 py-3 scrollbar-hide">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`shrink-0 px-4 py-2 rounded-full text-xs font-medium transition-all ${
              activeCategory === cat
                ? "bg-gold-gradient text-primary-foreground shadow-gold"
                : "bg-secondary text-secondary-foreground"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Menu Items */}
      <div className="px-5 py-4 space-y-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="space-y-3"
          >
            {filteredItems.map((item) => {
              const qty = getCartQuantity(item.id);
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="glass-card rounded-xl overflow-hidden flex"
                >
                  <img
                    src={getMenuImage(item.image)}
                    alt={item.name}
                    className="w-28 h-28 object-cover shrink-0"
                  />
                  <div className="flex-1 p-3 flex flex-col justify-between">
                    <div>
                      <h3 className="text-sm font-semibold text-foreground">{item.name}</h3>
                      <p className="text-[11px] text-muted-foreground mt-0.5 line-clamp-2">{item.description}</p>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-primary font-bold text-sm">PKR {item.price.toLocaleString()}</span>
                      {qty === 0 ? (
                        <button
                          onClick={() => addItem(item)}
                          className="px-3 py-1.5 rounded-full bg-gold-gradient text-primary-foreground text-xs font-semibold transition-transform active:scale-90"
                        >
                          Add
                        </button>
                      ) : (
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQuantity(item.id, qty - 1)}
                            className="w-7 h-7 rounded-full bg-secondary flex items-center justify-center text-foreground active:scale-90"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="text-sm font-semibold text-foreground w-5 text-center">{qty}</span>
                          <button
                            onClick={() => updateQuantity(item.id, qty + 1)}
                            className="w-7 h-7 rounded-full bg-gold-gradient flex items-center justify-center text-primary-foreground active:scale-90"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>

      <MobileNav />
    </div>
  );
};

export default Menu;
