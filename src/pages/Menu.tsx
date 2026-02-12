import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TopBar from "@/components/TopBar";
import MobileNav from "@/components/MobileNav";
import { categories, menuItems } from "@/lib/menu-data";
import { useCart } from "@/lib/cart-context";
import { getMenuImage } from "@/lib/image-map";
import { Plus, Minus, Search, Star, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";

const Menu = () => {
  const [activeCategory, setActiveCategory] = useState<string>(categories[0]);
  const [searchQuery, setSearchQuery] = useState("");
  const { items: cartItems, addItem, updateQuantity, totalItems, totalPrice } = useCart();

  const filteredItems = searchQuery
    ? menuItems.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : menuItems.filter((item) => item.category === activeCategory);

  const getCartQuantity = (id: string) => {
    const cartItem = cartItems.find((i) => i.id === id);
    return cartItem?.quantity || 0;
  };

  return (
    <div className="min-h-screen bg-background pt-16 pb-20">
      <TopBar />

      <div className="px-5 pt-4 pb-2">
        <h1 className="font-display text-3xl font-bold text-foreground">Our Menu</h1>
        <p className="text-xs text-muted-foreground mt-1">Authentic Pakistani cuisine crafted with premium ingredients</p>
      </div>

      {/* Search */}
      <div className="px-5 py-2">
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search dishes..."
            className="w-full bg-secondary rounded-xl pl-10 pr-4 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-1 focus:ring-primary transition-all"
            maxLength={100}
          />
        </div>
      </div>

      {/* Category Tabs */}
      {!searchQuery && (
        <div className="flex gap-2 overflow-x-auto px-5 py-3 scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`shrink-0 px-4 py-2 rounded-full text-xs font-medium transition-all ${
                activeCategory === cat
                  ? "bg-gold-gradient text-primary-foreground shadow-gold"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {/* Search results label */}
      {searchQuery && (
        <div className="px-5 py-2">
          <p className="text-xs text-muted-foreground">
            {filteredItems.length} result{filteredItems.length !== 1 ? "s" : ""} for "{searchQuery}"
          </p>
        </div>
      )}

      {/* Menu Items */}
      <div className="px-5 py-3 space-y-3">
        <AnimatePresence mode="wait">
          <motion.div
            key={searchQuery || activeCategory}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="space-y-3"
          >
            {filteredItems.map((item, i) => {
              const qty = getCartQuantity(item.id);
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.03 }}
                  className="glass-card rounded-xl overflow-hidden flex group"
                >
                  <div className="relative w-28 h-28 shrink-0 overflow-hidden">
                    <img
                      src={getMenuImage(item.image)}
                      alt={item.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                    />
                    {item.popular && (
                      <div className="absolute top-1.5 left-1.5 flex items-center gap-0.5 bg-background/80 backdrop-blur-sm rounded-full px-1.5 py-0.5">
                        <Star size={8} className="text-primary fill-primary" />
                        <span className="text-[8px] text-primary font-bold">HIT</span>
                      </div>
                    )}
                  </div>
                  <div className="flex-1 p-3 flex flex-col justify-between min-w-0">
                    <div>
                      <h3 className="text-sm font-semibold text-foreground truncate">{item.name}</h3>
                      <p className="text-[11px] text-muted-foreground mt-0.5 line-clamp-2">{item.description}</p>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-primary font-bold text-sm">PKR {item.price.toLocaleString()}</span>
                      {qty === 0 ? (
                        <button
                          onClick={() => addItem(item)}
                          className="px-3.5 py-1.5 rounded-full bg-gold-gradient text-primary-foreground text-xs font-semibold transition-transform active:scale-90"
                        >
                          Add
                        </button>
                      ) : (
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQuantity(item.id, qty - 1)}
                            className="w-7 h-7 rounded-full bg-secondary flex items-center justify-center text-foreground active:scale-90 transition-transform"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="text-sm font-semibold text-foreground w-5 text-center">{qty}</span>
                          <button
                            onClick={() => updateQuantity(item.id, qty + 1)}
                            className="w-7 h-7 rounded-full bg-gold-gradient flex items-center justify-center text-primary-foreground active:scale-90 transition-transform"
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

      {/* Floating Cart Button */}
      <AnimatePresence>
        {totalItems > 0 && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-20 left-5 right-5 z-40"
          >
            <Link
              to="/cart"
              className="flex items-center justify-between bg-gold-gradient rounded-xl px-5 py-3.5 shadow-gold-lg transition-transform active:scale-[0.98]"
            >
              <div className="flex items-center gap-2 text-primary-foreground">
                <ShoppingBag size={18} />
                <span className="font-semibold text-sm">{totalItems} item{totalItems > 1 ? "s" : ""}</span>
              </div>
              <span className="font-bold text-sm text-primary-foreground">PKR {totalPrice.toLocaleString()} →</span>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>

      <MobileNav />
    </div>
  );
};

export default Menu;
