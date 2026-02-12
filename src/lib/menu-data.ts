export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  popular?: boolean;
}

export interface CartItem extends MenuItem {
  quantity: number;
}

export const categories = [
  "Tawa Special",
  "Boneless Handi",
  "Karahi",
  "Tandoor",
  "Mutton Section",
  "Appetizers",
  "BBQ",
  "Rice",
  "Signature Platters",
  "Signature Dishes",
  "Desserts",
  "Sides",
  "Special Offerings",
] as const;

export const menuItems: MenuItem[] = [
  // Tawa Special
  { id: "1", name: "Tawa Chicken", description: "Sizzling tawa chicken cooked with aromatic spices on hot iron plate", price: 950, category: "Tawa Special", image: "tawa", popular: true },
  { id: "2", name: "Champ Qeema (4 champs)", description: "Tender lamb champs served with rich qeema masala", price: 3299, category: "Tawa Special", image: "tawa" },
  { id: "3", name: "Taka Tak", description: "Traditional tawa-fried organ mix with spices and butter", price: 1999, category: "Tawa Special", image: "tawa", popular: true },
  { id: "4", name: "Shehzadi Raan Qeema", description: "Royal raan with minced meat in rich gravy", price: 2495, category: "Tawa Special", image: "tawa" },
  { id: "5", name: "Sevva's Brain Masala", description: "Creamy brain masala cooked in traditional spices", price: 1599, category: "Tawa Special", image: "tawa" },

  // Boneless Handi
  { id: "6", name: "Nawabi Butter Handi", description: "Rich buttery boneless chicken in creamy Nawabi gravy", price: 2100, category: "Boneless Handi", image: "handi", popular: true },
  { id: "7", name: "Mughlai Handi", description: "Royal Mughlai-style handi with aromatic spices and cream", price: 2500, category: "Boneless Handi", image: "handi" },
  { id: "8", name: "Chicken Jalfrezi Handi", description: "Spicy jalfrezi with bell peppers and onions in handi", price: 2100, category: "Boneless Handi", image: "handi" },
  { id: "9", name: "Achari Handi", description: "Tangy pickle-spiced boneless chicken in clay pot", price: 2100, category: "Boneless Handi", image: "handi" },

  // Karahi
  { id: "10", name: "Half Karahi", description: "Signature desi karahi cooked in pure desi ghee — half portion", price: 1300, category: "Karahi", image: "karahi", popular: true },
  { id: "11", name: "Full Karahi", description: "Full portion karahi with fresh tomatoes and green chilies", price: 2500, category: "Karahi", image: "karahi" },

  // Tandoor
  { id: "12", name: "Khameeri Roti", description: "Soft leavened bread baked in tandoor", price: 50, category: "Tandoor", image: "tandoor" },
  { id: "13", name: "Kalonji Naan", description: "Fluffy naan topped with nigella seeds", price: 199, category: "Tandoor", image: "tandoor" },
  { id: "14", name: "Garlic Naan", description: "Tandoori naan infused with roasted garlic butter", price: 199, category: "Tandoor", image: "tandoor", popular: true },
  { id: "15", name: "Roghni Naan", description: "Buttery glossy naan brushed with oil", price: 199, category: "Tandoor", image: "tandoor" },
  { id: "16", name: "Choopri Roti", description: "Layered flaky roti baked in tandoor", price: 120, category: "Tandoor", image: "tandoor" },
  { id: "17", name: "Chicken Naan", description: "Stuffed naan filled with spiced chicken", price: 749, category: "Tandoor", image: "tandoor" },
  { id: "18", name: "Beef Qeema Naan", description: "Naan stuffed with seasoned beef mince", price: 849, category: "Tandoor", image: "tandoor" },
  { id: "19", name: "Mutton Qeema Naan", description: "Premium naan filled with rich mutton mince", price: 1200, category: "Tandoor", image: "tandoor" },

  // Mutton Section
  { id: "20", name: "Desi Chicken Shorba (Qtr)", description: "Traditional quarter chicken in aromatic shorba broth", price: 1799, category: "Mutton Section", image: "mutton" },
  { id: "21", name: "Mutton Palak", description: "Tender mutton slow-cooked with fresh spinach", price: 1995, category: "Mutton Section", image: "mutton" },
  { id: "22", name: "Mutton Royal Qorma", description: "Premium mutton in rich, royal qorma gravy with nuts", price: 2499, category: "Mutton Section", image: "mutton", popular: true },

  // Appetizers
  { id: "23", name: "Prawns Tempura (6 pcs)", description: "Crispy battered prawns served with dipping sauce", price: 2158, category: "Appetizers", image: "appetizers" },
  { id: "24", name: "Dynamite Chicken (6 pcs)", description: "Spicy crispy chicken bites with dynamite sauce", price: 1149, category: "Appetizers", image: "appetizers", popular: true },
  { id: "25", name: "Finger Fish (6 pcs)", description: "Golden fried fish fingers with tartar sauce", price: 1799, category: "Appetizers", image: "appetizers" },

  // BBQ
  { id: "26", name: "Tikka Boti (12 pcs)", description: "Tender marinated meat cubes grilled on charcoal", price: 1300, category: "BBQ", image: "bbq", popular: true },
  { id: "27", name: "Chicken Seekh Kabab (4 pcs)", description: "Handcrafted minced chicken kebabs on skewers", price: 1250, category: "BBQ", image: "bbq" },
  { id: "28", name: "Beef Seekh Kabab (4 pcs)", description: "Premium beef mince kebabs grilled to perfection", price: 1399, category: "BBQ", image: "bbq" },
  { id: "29", name: "Mutton Kabab (4 pcs)", description: "Rich mutton seekh kababs with aromatic spices", price: 1999, category: "BBQ", image: "bbq" },
  { id: "30", name: "Malai Boti (12 pcs)", description: "Creamy marinated chicken boti, melt-in-mouth tender", price: 1699, category: "BBQ", image: "bbq", popular: true },
  { id: "31", name: "Classic Charcoal Chicken", description: "Whole chicken roasted over charcoal flames", price: 599, category: "BBQ", image: "bbq" },
  { id: "32", name: "Mutton Chops (6 pcs)", description: "Juicy mutton chops marinated overnight in desi spices", price: 2999, category: "BBQ", image: "bbq" },
  { id: "33", name: "Bosphorus Fish Tikka", description: "Turkish-style fish tikka with Mediterranean spices", price: 2499, category: "BBQ", image: "bbq" },

  // Rice
  { id: "34", name: "Mutton Pulao", description: "Fragrant rice cooked with tender mutton and whole spices", price: 1995, category: "Rice", image: "biryani" },

  // Signature Platters
  { id: "35", name: "Platter for 2", description: "Grand assorted platter perfect for two — includes BBQ, naan & sides", price: 3358, category: "Signature Platters", image: "platter", popular: true },
  { id: "36", name: "Platter for 4", description: "Feast platter for four with variety of grilled meats and sides", price: 6000, category: "Signature Platters", image: "platter" },

  // Signature Dishes
  { id: "37", name: "Sevva's Mutton Joints (2)", description: "Premium slow-cooked mutton joints — Sevva's signature", price: 2995, category: "Signature Dishes", image: "signature", popular: true },
  { id: "38", name: "Sevva Kuna Pot", description: "Traditional clay pot specialty — Sevva's pride", price: 2995, category: "Signature Dishes", image: "signature" },

  // Desserts
  { id: "39", name: "Hot Gulab Jamun (3 pcs)", description: "Deep-fried milk dumplings soaked in warm rose sugar syrup", price: 350, category: "Desserts", image: "desserts" },
  { id: "40", name: "Sheherzadi Shahi Kheer", description: "Royal rice pudding with cardamom, almonds & pistachios", price: 450, category: "Desserts", image: "desserts" },
  { id: "41", name: "Gajar Ka Halwa (250g)", description: "Traditional carrot dessert slow-cooked with milk and sugar", price: 500, category: "Desserts", image: "desserts", popular: true },

  // Sides
  { id: "42", name: "Salad Bar", description: "Fresh selection from our salad bar", price: 950, category: "Sides", image: "sides" },
  { id: "43", name: "Kachumber Salad", description: "Finely chopped onion, tomato and cucumber salad", price: 290, category: "Sides", image: "sides" },
  { id: "44", name: "Garden Fresh Salad", description: "Crisp garden vegetables with light dressing", price: 290, category: "Sides", image: "sides" },
  { id: "45", name: "Mint Raita", description: "Cool yogurt with fresh mint leaves", price: 220, category: "Sides", image: "sides" },
  { id: "46", name: "Zeera Raita", description: "Cumin-flavored yogurt — perfect with biryani", price: 220, category: "Sides", image: "sides" },

  // Special Offerings
  { id: "47", name: "Hi-Tea Buffet", description: "50+ items including snacks, main dishes, live counters & desserts", price: 2000, category: "Special Offerings", image: "hitea", popular: true },
  { id: "48", name: "Sunday Premium Brunch", description: "Wider menu selection — special Sunday offering", price: 1800, category: "Special Offerings", image: "hitea" },
];
