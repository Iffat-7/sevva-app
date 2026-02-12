import foodBbq from "@/assets/food-bbq.jpg";
import foodKarahi from "@/assets/food-karahi.jpg";
import foodShawaya from "@/assets/food-shawaya.jpg";
import foodDesserts from "@/assets/food-desserts.jpg";
import foodBiryani from "@/assets/food-biryani.jpg";
import foodDrinks from "@/assets/food-drinks.jpg";
import foodHitea from "@/assets/food-hitea.jpg";

const imageMap: Record<string, string> = {
  bbq: foodBbq,
  karahi: foodKarahi,
  shawaya: foodShawaya,
  desserts: foodDesserts,
  biryani: foodBiryani,
  drinks: foodDrinks,
  hitea: foodHitea,
};

export const getMenuImage = (key: string): string => {
  return imageMap[key] || foodBbq;
};
