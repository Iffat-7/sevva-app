import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TopBar from "@/components/TopBar";
import MobileNav from "@/components/MobileNav";
import { X } from "lucide-react";

import foodKarahi from "@/assets/food-karahi.jpg";
import foodBbq from "@/assets/food-bbq.jpg";
import foodHandi from "@/assets/food-handi.jpg";
import foodTawa from "@/assets/food-tawa.jpg";
import foodPlatter from "@/assets/food-platter.jpg";
import foodDesserts from "@/assets/food-desserts.jpg";
import foodTandoor from "@/assets/food-tandoor.jpg";
import foodShawaya from "@/assets/food-shawaya.jpg";
import foodSignature from "@/assets/food-signature.jpg";
import foodBiryani from "@/assets/food-biryani.jpg";
import foodDrinks from "@/assets/food-drinks.jpg";
import foodHitea from "@/assets/food-hitea.jpg";
import heroRestaurant from "@/assets/hero-restaurant.jpg";

const galleryItems = [
  { src: heroRestaurant, title: "Our Restaurant", category: "Ambiance", tall: true },
  { src: foodKarahi, title: "Signature Karahi", category: "Food" },
  { src: foodBbq, title: "Live BBQ Grill", category: "Food", tall: true },
  { src: foodHandi, title: "Nawabi Handi", category: "Food" },
  { src: foodTawa, title: "Tawa Specials", category: "Food" },
  { src: foodPlatter, title: "Grand Platter", category: "Food", tall: true },
  { src: foodDesserts, title: "Sweet Endings", category: "Food" },
  { src: foodTandoor, title: "Fresh Tandoor", category: "Food" },
  { src: foodShawaya, title: "Shawaya Grill", category: "Food", tall: true },
  { src: foodSignature, title: "Chef's Signature", category: "Food" },
  { src: foodBiryani, title: "Mutton Pulao", category: "Food" },
  { src: foodDrinks, title: "Refreshments", category: "Drinks" },
  { src: foodHitea, title: "Hi-Tea Spread", category: "Events", tall: true },
];

const categories = ["All", "Food", "Ambiance", "Events", "Drinks"];

const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightbox, setLightbox] = useState<number | null>(null);

  const filtered = activeCategory === "All"
    ? galleryItems
    : galleryItems.filter((item) => item.category === activeCategory);

  return (
    <div className="min-h-screen bg-background pt-16 pb-20">
      <TopBar />

      <div className="px-5 pt-4 pb-2">
        <h1 className="font-display text-3xl font-bold text-gold-gradient">Gallery</h1>
        <p className="text-xs text-muted-foreground mt-1">A glimpse into the SEVVA experience</p>
      </div>

      <div className="px-5 py-3 flex gap-2 overflow-x-auto scrollbar-hide">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`shrink-0 px-4 py-1.5 rounded-full text-xs font-medium transition-colors ${
              activeCategory === cat
                ? "bg-gold-gradient text-primary-foreground"
                : "bg-secondary text-muted-foreground hover:text-foreground"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="px-5 columns-2 gap-3 space-y-3">
        {filtered.map((item, idx) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            className="break-inside-avoid cursor-pointer group"
            onClick={() => setLightbox(idx)}
          >
            <div className={`relative rounded-xl overflow-hidden ${item.tall ? "aspect-[3/4]" : "aspect-square"}`}>
              <img
                src={item.src}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-0 left-0 right-0 p-2.5 opacity-0 group-hover:opacity-100 transition-opacity">
                <p className="font-display text-xs font-semibold text-foreground">{item.title}</p>
                <p className="text-[10px] text-muted-foreground">{item.category}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-md flex items-center justify-center p-5"
            onClick={() => setLightbox(null)}
          >
            <button
              onClick={() => setLightbox(null)}
              className="absolute top-5 right-5 w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-foreground z-10"
            >
              <X size={20} />
            </button>
            <motion.img
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              src={filtered[lightbox].src}
              alt={filtered[lightbox].title}
              className="max-w-full max-h-[80vh] rounded-2xl object-contain"
            />
            <div className="absolute bottom-8 text-center">
              <p className="font-display text-lg font-bold text-foreground">{filtered[lightbox].title}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <MobileNav />
    </div>
  );
};

export default Gallery;