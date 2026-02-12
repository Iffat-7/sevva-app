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
  "BBQ & Kebabs",
  "Karahi & Desi",
  "Rice & Biryani",
  "Arabic & Turkish",
  "Hi-Tea & Buffet",
  "Desserts",
  "Drinks",
] as const;

export const menuItems: MenuItem[] = [
  // BBQ & Kebabs
  { id: "1", name: "BBQ Platter", description: "Assorted grilled kebabs, seekh kebab, tikka boti with mint chutney", price: 2500, category: "BBQ & Kebabs", image: "bbq", popular: true },
  { id: "2", name: "Seekh Kebab", description: "Handcrafted minced meat kebabs grilled over charcoal", price: 800, category: "BBQ & Kebabs", image: "bbq" },
  { id: "3", name: "Chicken Tikka", description: "Tender chicken pieces marinated in traditional spices", price: 950, category: "BBQ & Kebabs", image: "bbq" },
  { id: "4", name: "Mutton Chops", description: "Juicy mutton chops marinated overnight in desi spices", price: 1800, category: "BBQ & Kebabs", image: "bbq" },

  // Karahi & Desi
  { id: "5", name: "Chicken Karahi", description: "Signature desi style karahi cooked in pure desi ghee", price: 1600, category: "Karahi & Desi", image: "karahi", popular: true },
  { id: "6", name: "Mutton Karahi", description: "Premium mutton karahi with fresh tomatoes and green chilies", price: 2800, category: "Karahi & Desi", image: "karahi" },
  { id: "7", name: "Desi Ghee Special", description: "Chef's special dish cooked in pure desi ghee", price: 1400, category: "Karahi & Desi", image: "karahi" },
  { id: "8", name: "Paya", description: "Traditional slow-cooked trotters in rich spiced broth", price: 1200, category: "Karahi & Desi", image: "karahi" },

  // Rice & Biryani
  { id: "9", name: "Chicken Biryani", description: "Fragrant saffron rice layered with spiced chicken", price: 700, category: "Rice & Biryani", image: "biryani", popular: true },
  { id: "10", name: "Mutton Biryani", description: "Rich mutton biryani with aromatic basmati rice", price: 900, category: "Rice & Biryani", image: "biryani" },
  { id: "11", name: "Arabic Rice", description: "Seasoned Arabic-style rice with nuts and raisins", price: 600, category: "Rice & Biryani", image: "biryani" },

  // Arabic & Turkish
  { id: "12", name: "Shawaya Chicken", description: "Whole roasted chicken with Arabic rice and garlic sauce", price: 2200, category: "Arabic & Turkish", image: "shawaya", popular: true },
  { id: "13", name: "Turkish Platter", description: "Mixed grill platter with hummus, pita, and grilled vegetables", price: 2800, category: "Arabic & Turkish", image: "shawaya" },
  { id: "14", name: "Falafel Wrap", description: "Crispy falafel with tahini sauce in fresh pita", price: 550, category: "Arabic & Turkish", image: "shawaya" },

  // Hi-Tea & Buffet
  { id: "15", name: "Hi-Tea Buffet", description: "50+ items including snacks, mains, live counters & desserts", price: 2000, category: "Hi-Tea & Buffet", image: "hitea", popular: true },
  { id: "16", name: "Sunday Premium Brunch", description: "Special weekend brunch with extended menu selection", price: 1800, category: "Hi-Tea & Buffet", image: "hitea" },

  // Desserts
  { id: "17", name: "Gulab Jamun", description: "Classic deep-fried milk dumplings in rose sugar syrup", price: 350, category: "Desserts", image: "desserts" },
  { id: "18", name: "Kunafa", description: "Crispy shredded pastry with sweet cheese filling", price: 650, category: "Desserts", image: "desserts", popular: true },
  { id: "19", name: "Kheer", description: "Creamy rice pudding with cardamom, almonds and pistachios", price: 400, category: "Desserts", image: "desserts" },

  // Drinks
  { id: "20", name: "Mint Lemonade", description: "Freshly squeezed lemonade with garden mint", price: 300, category: "Drinks", image: "drinks" },
  { id: "21", name: "Lassi", description: "Traditional churned yogurt drink, sweet or salty", price: 250, category: "Drinks", image: "drinks" },
  { id: "22", name: "Doodh Patti Chai", description: "Rich Pakistani milk tea brewed to perfection", price: 200, category: "Drinks", image: "drinks" },
];
