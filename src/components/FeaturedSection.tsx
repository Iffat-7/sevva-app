import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Star } from "lucide-react";
import { menuItems } from "@/lib/menu-data";
import { useCart } from "@/lib/cart-context";
import { getMenuImage } from "@/lib/image-map";

const FeaturedSection = () => {
  const { addItem } = useCart();
  const featured = menuItems.filter((item) => item.popular);

  return (
    <section className="px-5 py-10">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="font-display text-2xl font-bold text-foreground">Popular Dishes</h2>
          <p className="text-xs text-muted-foreground mt-1">Chef's favorites & bestsellers</p>
        </div>
        <Link to="/menu" className="text-xs text-primary font-medium hover:underline">
          View All
        </Link>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-4 -mx-5 px-5 snap-x snap-mandatory scrollbar-hide">
        {featured.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            viewport={{ once: true }}
            className="min-w-[200px] snap-start"
          >
            <div className="glass-card rounded-xl overflow-hidden group">
              <div className="relative h-36 overflow-hidden">
                <img
                  src={getMenuImage(item.image)}
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-2 left-2 flex items-center gap-1 bg-background/80 backdrop-blur-sm rounded-full px-2 py-0.5">
                  <Star size={10} className="text-primary fill-primary" />
                  <span className="text-[10px] text-primary font-semibold">Popular</span>
                </div>
              </div>
              <div className="p-3">
                <h3 className="text-sm font-semibold text-foreground truncate">{item.name}</h3>
                <p className="text-[11px] text-muted-foreground mt-0.5 line-clamp-2">{item.description}</p>
                <div className="flex items-center justify-between mt-3">
                  <span className="text-primary font-bold text-sm">PKR {item.price.toLocaleString()}</span>
                  <button
                    onClick={() => addItem(item)}
                    className="w-7 h-7 rounded-full bg-gold-gradient flex items-center justify-center text-primary-foreground text-lg font-bold transition-transform active:scale-90"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedSection;
