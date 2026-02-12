import foodBbq from "@/assets/food-bbq.jpg";
import foodKarahi from "@/assets/food-karahi.jpg";
import foodShawaya from "@/assets/food-shawaya.jpg";
import foodDesserts from "@/assets/food-desserts.jpg";
import foodBiryani from "@/assets/food-biryani.jpg";
import foodDrinks from "@/assets/food-drinks.jpg";
import foodHitea from "@/assets/food-hitea.jpg";
import foodTawa from "@/assets/food-tawa.jpg";
import foodHandi from "@/assets/food-handi.jpg";
import foodTandoor from "@/assets/food-tandoor.jpg";
import foodMutton from "@/assets/food-mutton.jpg";
import foodAppetizers from "@/assets/food-appetizers.jpg";
import foodPlatter from "@/assets/food-platter.jpg";
import foodSides from "@/assets/food-sides.jpg";
import foodSignature from "@/assets/food-signature.jpg";

const imageMap: Record<string, string> = {
  bbq: foodBbq,
  karahi: foodKarahi,
  shawaya: foodShawaya,
  desserts: foodDesserts,
  biryani: foodBiryani,
  drinks: foodDrinks,
  hitea: foodHitea,
  tawa: foodTawa,
  handi: foodHandi,
  tandoor: foodTandoor,
  mutton: foodMutton,
  appetizers: foodAppetizers,
  platter: foodPlatter,
  sides: foodSides,
  signature: foodSignature,
};

export const getMenuImage = (key: string): string => {
  return imageMap[key] || foodBbq;
};
