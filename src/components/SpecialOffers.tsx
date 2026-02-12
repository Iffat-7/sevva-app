import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Sparkles } from "lucide-react";
import hiteaImg from "@/assets/food-hitea.jpg";

const SpecialOffers = () => {
  return (
    <section className="px-5 py-6">
      <h2 className="font-display text-2xl font-bold text-foreground mb-4">Special Offers</h2>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <Link to="/menu" className="block relative rounded-2xl overflow-hidden group">
          <img src={hiteaImg} alt="Hi-Tea Buffet" className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-5">
            <div className="flex items-center gap-1.5 mb-1">
              <Sparkles size={14} className="text-primary" />
              <span className="text-xs font-semibold text-primary uppercase tracking-wider">Daily Special</span>
            </div>
            <h3 className="font-display text-xl font-bold text-foreground">Hi-Tea Buffet</h3>
            <p className="text-xs text-muted-foreground mt-1">50+ items • Live counters • Desserts</p>
            <div className="flex items-center justify-between mt-3">
              <span className="text-primary font-bold">From PKR 2,000</span>
              <span className="text-[10px] bg-primary/20 text-primary px-2 py-1 rounded-full font-medium">+ tax</span>
            </div>
          </div>
        </Link>
      </motion.div>
    </section>
  );
};

export default SpecialOffers;
