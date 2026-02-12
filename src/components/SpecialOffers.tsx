import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Sparkles } from "lucide-react";
import hiteaImg from "@/assets/food-hitea.jpg";
import signatureImg from "@/assets/food-signature.jpg";

const offers = [
  {
    image: hiteaImg,
    badge: "Daily Special",
    title: "Hi-Tea Buffet",
    desc: "50+ items • Live counters • Desserts",
    price: "From PKR 2,000",
  },
  {
    image: signatureImg,
    badge: "Sunday Only",
    title: "Premium Brunch",
    desc: "Wider menu • Extended selection",
    price: "From PKR 1,800",
  },
];

const SpecialOffers = () => {
  return (
    <section className="px-5 py-6">
      <h2 className="font-display text-2xl font-bold text-foreground mb-4">Special Offerings</h2>

      <div className="space-y-4">
        {offers.map((offer, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.15 }}
          >
            <Link to="/menu" className="block relative rounded-2xl overflow-hidden group">
              <img src={offer.image} alt={offer.title} className="w-full h-44 object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <div className="flex items-center gap-1.5 mb-1">
                  <Sparkles size={14} className="text-primary" />
                  <span className="text-xs font-semibold text-primary uppercase tracking-wider">{offer.badge}</span>
                </div>
                <h3 className="font-display text-xl font-bold text-foreground">{offer.title}</h3>
                <p className="text-xs text-muted-foreground mt-1">{offer.desc}</p>
                <div className="flex items-center justify-between mt-3">
                  <span className="text-primary font-bold">{offer.price}</span>
                  <span className="text-[10px] bg-primary/20 text-primary px-2 py-1 rounded-full font-medium">+ tax</span>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default SpecialOffers;
