import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ShoppingCart,
  Search,
  Star,
  Clock,
  Plus,
  Minus,
  X,
  ChevronDown,
} from "lucide-react";

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  time: string;
  tag?: string;
  category: string;
  description: string;
}

interface CartItem extends Product {
  quantity: number;
}

const categoryTabs = [
  { id: "all", label: "All Items", emoji: "🍽️" },
  { id: "food", label: "Food", emoji: "🍱" },
  { id: "groceries", label: "Groceries", emoji: "🛒" },
  { id: "provisions", label: "Provisions", emoji: "🥣" },
  { id: "drinks", label: "Drinks", emoji: "🥤" },
  { id: "snacks", label: "Snacks", emoji: "🥪" },
];

const sortOptions = [
  "Popular",
  "Price: Low to High",
  "Price: High to Low",
  "Rating",
  "Fastest Delivery",
];

const products: Product[] = [
  // ─── FOOD ───
  {
    id: 1,
    name: "Party Jollof Rice",
    price: 2500,
    originalPrice: 3200,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZOyyOFLpEBq8WlvlMIIRtkBEAQdO6zOYozhlerIxRQg&s=10",
    rating: 4.8,
    time: "25 min",
    tag: "🔥 Best Seller",
    category: "food",
    description: "Smoky Nigerian party jollof with assorted meat",
  },
  {
    id: 2,
    name: "Egusi Soup + Eba",
    price: 1800,
    originalPrice: 2200,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVXePza36cD87SK-ZMHzcQwNYLVOX-G0YOGre0CHk9Lg&s=10",
    rating: 4.6,
    time: "30 min",
    tag: "20% OFF",
    category: "food",
    description: "Rich egusi soup served with freshly made eba",
  },
  {
    id: 3,
    name: "Amala & Ewedu",
    price: 1500,
    originalPrice: 1800,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRo-8ejq3tUY1u9UgxhIRddltxCDy0IhUB7jO608Ep1VQ&s=10",
    rating: 4.7,
    time: "20 min",
    tag: "Local Favourite",
    category: "food",
    description: "Smooth amala paired with fresh ewedu and gbegiri",
  },
  {
    id: 4,
    name: "Ewa Goyin + Agege Bread",
    price: 800,
    originalPrice: 1000,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5isodY_MPv59GR3wPF0jDupJGXpVM_7Q-bUW6zbPhbw&s=10",
    rating: 4.5,
    time: "15 min",
    tag: "Street Food",
    category: "food",
    description: "Spicy mashed beans with soft agege bread and fried plantain",
  },
  {
    id: 5,
    name: "Yam Porridge (Asaro)",
    price: 1200,
    originalPrice: 1500,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQA-LkJgXTa6Hb_zgHHuB_FdDTVyrfwqi2vpgBFDJcG2w&s=10",
    rating: 4.4,
    time: "35 min",
    tag: "Comfort Food",
    category: "food",
    description: "Creamy yam porridge cooked with palm oil and vegetables",
  },
  {
    id: 6,
    name: "Spaghetti & Meatballs",
    price: 2000,
    originalPrice: 2400,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBezw37M4fZ0kXhatNgY1HZD3Ckwn5aZb-TXIbhh8ODg&s=10",
    rating: 4.3,
    time: "30 min",
    tag: "Family Size",
    category: "food",
    description: "Nigerian-style spicy spaghetti with seasoned beef meatballs",
  },
  {
    id: 7,
    name: "Pepper Soup (Goat Meat)",
    price: 3000,
    originalPrice: 3500,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRER2BluH-enqGFO4CFm6mUihMWqIQUaSWIjtfbpL_VXw&s=10",
    rating: 4.9,
    time: "25 min",
    tag: "🌶 Spicy",
    category: "food",
    description: "Hot and spicy native pepper soup with tender goat meat",
  },
  {
    id: 8,
    name: "Fried Rice + Chicken",
    price: 2800,
    originalPrice: 3200,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScuUoMiS4Zi8ZJI2lvuJIk1ZU225NiDw4yv9voyY0CKw&s=10",
    rating: 4.6,
    time: "30 min",
    tag: "Popular",
    category: "food",
    description: "Colourful Nigerian fried rice served with grilled chicken",
  },

  // ─── SNACKS ───
  {
    id: 9,
    name: "Shawarma (Chicken)",
    price: 2200,
    originalPrice: 2500,
    image:
      "https://images.unsplash.com/photo-1561651823-34feb02250e4?w=400&q=80",
    rating: 4.7,
    time: "20 min",
    tag: "Street Fave",
    category: "snacks",
    description: "Stuffed chicken shawarma with coleslaw and spicy sauce",
  },
  {
    id: 10,
    name: "Burger (Beef)",
    price: 2500,
    originalPrice: 2800,
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=80",
    rating: 4.5,
    time: "25 min",
    tag: "Juicy",
    category: "snacks",
    description: "Double beef patty burger with fresh veggies and sauce",
  },
  {
    id: 11,
    name: "Pizza (Pepperoni)",
    price: 4500,
    originalPrice: 5000,
    image:
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&q=80",
    rating: 4.4,
    time: "40 min",
    tag: "10% OFF",
    category: "snacks",
    description: "Crispy crust pepperoni pizza with extra mozzarella",
  },
  {
    id: 12,
    name: "Meat Pie (2 pcs)",
    price: 600,
    originalPrice: 800,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQz2mH-Bx35v8kiC9Uh2-MFBWEVQcPF-svfXW3MGUHluQ&s=10",
    rating: 4.6,
    time: "10 min",
    tag: "Bakery Fresh",
    category: "snacks",
    description: "Freshly baked meat pie filled with minced beef and potatoes",
  },
  {
    id: 13,
    name: "Egg Roll (3 pcs)",
    price: 500,
    originalPrice: 700,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvXfqwSVH7utd3NOMoMQdLrl0niUleCyErW5r1JZrJ5w&s=10",
    rating: 4.3,
    time: "10 min",
    tag: "Snack Time",
    category: "snacks",
    description: "Nigerian-style egg roll, golden and crispy on the outside",
  },
  {
    id: 14,
    name: "Suya Platter (10 sticks)",
    price: 3500,
    originalPrice: 4000,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVmfV2HPQrB8LYBHJHZrVYUnKX2_QTusxLaZ5VAuEbYA&s=10",
    rating: 4.9,
    time: "20 min",
    tag: "🌶 Spicy",
    category: "snacks",
    description: "Spiced grilled beef suya served with onions and tomatoes",
  },
  {
    id: 15,
    name: "Puff Puff (10 pcs)",
    price: 400,
    originalPrice: 500,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVcCHRfPEZ_sotb6ICDy54KmEqPbeXc2jO6H_NtOpeMw&s=10",
    rating: 4.5,
    time: "10 min",
    tag: "Sweet Treat",
    category: "snacks",
    description: "Soft and fluffy deep-fried Nigerian puff puff",
  },

  // ─── GROCERIES ───
  {
    id: 16,
    name: "Fresh Tomatoes (1kg)",
    price: 600,
    originalPrice: 900,
    image:
      "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=400&q=80",
    rating: 4.5,
    time: "45 min",
    tag: "Fresh Today",
    category: "groceries",
    description: "Ripe, firm Nigerian tomatoes perfect for stews and sauces",
  },
  {
    id: 17,
    name: "Onions (1kg)",
    price: 500,
    originalPrice: 700,
    image:
      "https://images.unsplash.com/photo-1518977956812-cd3dbadaaf31?w=400&q=80",
    rating: 4.2,
    time: "45 min",
    tag: "Fresh",
    category: "groceries",
    description: "Fresh onions, a kitchen essential for every Nigerian home",
  },
  {
    id: 18,
    name: "Ofada Rice (2kg)",
    price: 2200,
    originalPrice: 2800,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCF5APyWRqx4K0IDLUpB4aMQN-ndKo__zG2nm0ZT-LyA&s=10",
    rating: 4.4,
    time: "50 min",
    tag: "Local Farm",
    category: "groceries",
    description: "Locally grown unpolished ofada rice from Ogun State",
  },
  {
    id: 19,
    name: "Plantain (bunch)",
    price: 1200,
    originalPrice: 1500,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTw7CICfIy-dfBWcjpqhjS6Pi6TvKSr22HMD2pbvZkP_g&s=10",
    rating: 4.6,
    time: "45 min",
    tag: "Ripe & Ready",
    category: "groceries",
    description: "Sweet ripe plantains, perfect for dodo or boli",
  },
  {
    id: 20,
    name: "Palm Oil (1 litre)",
    price: 1500,
    originalPrice: 1800,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2df2F8x3jJRS-s3qalvaw8LMC7KLfAQPBbeDuUSjVUw&s=10",
    rating: 4.7,
    time: "50 min",
    tag: "Pure & Natural",
    category: "groceries",
    description: "Pure unrefined red palm oil from local producers",
  },
  {
    id: 21,
    name: "Garri (Yellow, 2kg)",
    price: 800,
    originalPrice: 1000,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8OdAKKxDlkj3R-Obnvmhc3bMUDb3TPs70jPcTElTfVA&s=10",
    rating: 4.3,
    time: "50 min",
    tag: "Staple",
    category: "groceries",
    description: "Coarse yellow garri for eba or soaking",
  },
  {
    id: 22,
    name: "Stockfish (medium)",
    price: 2500,
    originalPrice: 3000,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyXLslGoH6Kyg-FZbT1mUPZDalH0PsqphKJT47At41-Q&s=10",
    rating: 4.5,
    time: "50 min",
    tag: "Dried & Ready",
    category: "groceries",
    description: "Quality dried stockfish for soups and stews",
  },
  {
    id: 23,
    name: "Seasoning Cubes (pack)",
    price: 300,
    originalPrice: 400,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbrJ6HMHw71hx9PIw4KhIxFtZKXp824ZvN9XQJ8aVaIw&s=10",
    rating: 4.4,
    time: "45 min",
    tag: "Must Have",
    category: "groceries",
    description: "Popular Nigerian seasoning cubes for all your cooking",
  },
  {
    id: 29,
    name: "Scotch Bonnet Pepper (500g)",
    price: 400,
    originalPrice: 600,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzWGbEyrqoByGRWwgf-hSdNI8lMx-fWfgoGVLFtle_Aw&s=10",
    rating: 4.5,
    time: "45 min",
    tag: "🌶 Hot",
    category: "groceries",
    description: "Fresh tatashe and rodo peppers for blending",
  },
  {
    id: 30,
    name: "Crayfish (100g)",
    price: 700,
    originalPrice: 900,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6_hh1QjEpqPZjC5PX7h0uUrY0UThsGIaoc41-ilmKmw&s=10",
    rating: 4.6,
    time: "45 min",
    tag: "Ground & Ready",
    category: "groceries",
    description: "Dried and ground crayfish, essential for soups and stews",
  },
  {
    id: 31,
    name: "Iru / Locust Beans (pack)",
    price: 300,
    originalPrice: 450,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmUCZlxKalfwD6yhmjevo16qPbfQtUxW4uAYo05X0g6g&s=10",
    rating: 4.3,
    time: "45 min",
    tag: "Flavour Booster",
    category: "groceries",
    description: "Fermented locust beans for egusi, efo, and other soups",
  },
  {
    id: 32,
    name: "Fresh Spinach / Efo Tete (bunch)",
    price: 200,
    originalPrice: 350,
    image:
      "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400&q=80",
    rating: 4.4,
    time: "40 min",
    tag: "Farm Fresh",
    category: "groceries",
    description: "Fresh leafy vegetable for efo riro and stews",
  },
  {
    id: 33,
    name: "Ugwu Leaves (bunch)",
    price: 250,
    originalPrice: 400,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbULMQrQi5TwUJ4_PKXpnsmMVPAKrEQWS1XT9EjunA8A&s=10",
    rating: 4.5,
    time: "40 min",
    tag: "Nutritious",
    category: "groceries",
    description: "Fresh fluted pumpkin leaves, great for soups and ofe akwu",
  },
  {
    id: 34,
    name: "Yam (tuber, medium)",
    price: 1500,
    originalPrice: 2000,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLB7yb2JGiJTtl9_EryWzXm-j9glxktni6TuGB6OtntQ&s=10",
    rating: 4.4,
    time: "50 min",
    tag: "Farm Fresh",
    category: "groceries",
    description:
      "Fresh medium-sized yam tuber, perfect for porridge or boiling",
  },
  {
    id: 35,
    name: "Sweet Potatoes (1kg)",
    price: 600,
    originalPrice: 800,
    image:
      "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=400&q=80",
    rating: 4.3,
    time: "45 min",
    tag: "Healthy",
    category: "groceries",
    description:
      "Fresh orange-fleshed sweet potatoes, great for porridge or frying",
  },
  {
    id: 36,
    name: "Groundnut Oil (1 litre)",
    price: 1800,
    originalPrice: 2200,
    image:
      "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&q=80",
    rating: 4.4,
    time: "50 min",
    tag: "Pure",
    category: "groceries",
    description: "Cold-pressed groundnut oil for frying and cooking",
  },
  {
    id: 37,
    name: "Semovita (1kg)",
    price: 900,
    originalPrice: 1100,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToPn77wUILasoIInnL1GQN-4yNRuk09oatRCUICcnzYw&s=10",
    rating: 4.5,
    time: "45 min",
    tag: "Swallow",
    category: "groceries",
    description: "Semovita flour for making smooth, stretchy swallow",
  },
  {
    id: 38,
    name: "Beans (Black-eyed, 1kg)",
    price: 1000,
    originalPrice: 1300,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpyAURNP6-3ZLFJfgL6CDblUonEJ63o-uhe1eshulYlw&s=10",
    rating: 4.4,
    time: "50 min",
    tag: "Protein Rich",
    category: "groceries",
    description: "Dried black-eyed beans for moi moi, akara, or ewa goyin",
  },
  {
    id: 39,
    name: "Oats (500g)",
    price: 800,
    originalPrice: 1000,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWBtJxayIG2tImREiIk6DY3bn3HpMK0QUl3Q9_ojZutQ&s=10",
    rating: 4.3,
    time: "45 min",
    tag: "Healthy",
    category: "groceries",
    description: "Quick-cook rolled oats for a healthy Nigerian breakfast",
  },
  {
    id: 40,
    name: "Ground Egusi (200g)",
    price: 800,
    originalPrice: 1000,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQT-Wxjist8IcLtNySbIqGagyV29WGwffxUjSlhgM1tig&s=10",
    rating: 4.6,
    time: "45 min",
    tag: "Soup Ready",
    category: "groceries",
    description: "Pre-ground egusi melon seeds for making egusi soup",
  },
  {
    id: 41,
    name: "Tomato Paste (tin)",
    price: 350,
    originalPrice: 500,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMvRFmVV2fQrhq82uZcmrm6XviunEBUTQuT1C1jAvtHA&s=10",
    rating: 4.3,
    time: "45 min",
    tag: "Everyday",
    category: "groceries",
    description: "Rich tomato paste for stews, jollof, and sauces",
  },
  {
    id: 42,
    name: "Salt (500g)",
    price: 150,
    originalPrice: 200,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSViN2FF2yfl56eMlbX0z0W6EN9yVQvg5cfI4_jHA7STw&s=10",
    rating: 4.2,
    time: "45 min",
    tag: "Basic",
    category: "groceries",
    description: "Iodised table salt for everyday cooking",
  },
  {
    id: 43,
    name: "Curry & Thyme (pack)",
    price: 250,
    originalPrice: 350,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-kSGUg9hX9q8nNYJeVq_T0SRxbhQ6y7o8kEGEvYzarg&s=10",
    rating: 4.4,
    time: "45 min",
    tag: "Spice Pack",
    category: "groceries",
    description: "Nigerian curry powder and thyme combo pack",
  },
  {
    id: 44,
    name: "Mackerel Fish / Titus (frozen)",
    price: 2000,
    originalPrice: 2500,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGiRM8cScqt1-ReS7cMQLhD2adli4CQDGL-oN_V1yY6Q&s=10",
    rating: 4.5,
    time: "50 min",
    tag: "Frozen Fresh",
    category: "groceries",
    description: "Frozen titus fish, great for pepper soup, stew, or grilling",
  },
  {
    id: 45,
    name: "Eggs (crate of 30)",
    price: 3500,
    originalPrice: 4000,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDMqQcCKrIYCrQLDk1GqkLsmqt1BXQrDSdT_geDB4uXg&s=10",
    rating: 4.7,
    time: "45 min",
    tag: "Farm Fresh",
    category: "groceries",
    description: "Fresh large eggs from local poultry farms",
  },

  // ─── PROVISIONS ───
  // Cereals
  {
    id: 46,
    name: "Corn Flakes (500g)",
    price: 1800,
    originalPrice: 2200,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaaqWgATZHClHwD_s3N8GHaMl99kkAL-F6AIPFFx-T3A&s=10",
    rating: 4.4,
    time: "45 min",
    tag: "Breakfast",
    category: "provisions",
    description: "Crispy golden corn flakes, great with cold or warm milk",
  },
  {
    id: 47,
    name: "Coco Pops (350g)",
    price: 2000,
    originalPrice: 2400,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2gb505HSbAWoqNivUCKIj1_tkLFaQ2zgN1eUaEb0ZdQ&s=10",
    rating: 4.5,
    time: "45 min",
    tag: "Kids Fave",
    category: "provisions",
    description: "Chocolate-flavoured puffed rice cereal loved by kids",
  },
  {
    id: 48,
    name: "Rice Krispies (340g)",
    price: 2100,
    originalPrice: 2500,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSp_5KnWLj1wKs9XtNfLDqObAoUVTFw5fCfcZwgZRPhvA&s=10",
    rating: 4.3,
    time: "45 min",
    tag: "Light & Crispy",
    category: "provisions",
    description: "Snap, crackle, pop! Classic rice cereal for breakfast",
  },
  {
    id: 49,
    name: "Golden Morn (900g)",
    price: 2500,
    originalPrice: 3000,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNAsy4swVdx8qdm8jUjqESTuwL4PSgaeQ5n1uGyRschg&s=10",
    rating: 4.8,
    time: "45 min",
    tag: "🇳🇬 Nigerian Fave",
    category: "provisions",
    description: "Nestlé Nigeria's popular instant maize and soya cereal blend",
  },
  {
    id: 50,
    name: "Nutrend (900g)",
    price: 2200,
    originalPrice: 2600,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_UvHNE5XpYgbkw1dYC96RldF1F29S4ZwKhnIUdKnH5Q&s=10",
    rating: 4.5,
    time: "45 min",
    tag: "Nutritious",
    category: "provisions",
    description: "Fortified cereal blend rich in vitamins and minerals",
  },
  // Beverages
  {
    id: 51,
    name: "Milo (400g tin)",
    price: 2800,
    originalPrice: 3200,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAjUFHyHPtJeMyM_NI-HNHgVk2j9KUTR6jfpialjxvjg&s=10",
    rating: 4.9,
    time: "45 min",
    tag: "⚡ Energy",
    category: "provisions",
    description:
      "Nestlé Milo chocolate malt drink, Nigeria's number one beverage",
  },
  {
    id: 52,
    name: "Bournvita (500g)",
    price: 2600,
    originalPrice: 3000,
    image:
      "data:image/jpeg;base64,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",
    rating: 4.7,
    time: "45 min",
    tag: "Classic",
    category: "provisions",
    description: "Cadbury Bournvita cocoa-based chocolate drink for all ages",
  },
  {
    id: 53,
    name: "Ovaltine (400g)",
    price: 2400,
    originalPrice: 2800,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTeYu8FgUOJ--NTg25toQY3P91-18OqRTnqYAMI1xt-zg&s=10",
    rating: 4.5,
    time: "45 min",
    tag: "Malty",
    category: "provisions",
    description: "Malted milk chocolate drink mix, great hot or cold",
  },
  // Milks
  {
    id: 54,
    name: "Peak Milk (powdered, 400g)",
    price: 2200,
    originalPrice: 2600,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2FLRbZiTLMk05wZTLjcLSZ3Oatmm9agq1RVWtmoSqTQ&s=10",
    rating: 4.8,
    time: "45 min",
    tag: "🇳🇬 No. 1 Milk",
    category: "provisions",
    description:
      "Peak full-cream powdered milk, Nigeria's most trusted milk brand",
  },
  {
    id: 55,
    name: "Three Crowns Milk (powdered, 360g)",
    price: 2000,
    originalPrice: 2400,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHjhU0hq3Hb-QDPvy9DpGN06Q1llP01iqRvQJov6BH_g&s=10",
    rating: 4.6,
    time: "45 min",
    tag: "Creamy",
    category: "provisions",
    description: "Full-cream powdered milk for beverages, cereals, and cooking",
  },
  {
    id: 56,
    name: "Dano Milk (powdered, 360g)",
    price: 1900,
    originalPrice: 2300,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKqAUzkGq8yQXxhrSDvYgSnqqVWlussvkIrnmPXy_jWQ&s=10",
    rating: 4.5,
    time: "45 min",
    tag: "Smooth",
    category: "provisions",
    description: "Dano instant full-cream milk powder, great for hot drinks",
  },
  {
    id: 57,
    name: "Peak Evaporated Milk (tin)",
    price: 600,
    originalPrice: 750,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRsUCRQ4NWEoYGi8CQMSo-zpr82-gSPPlRM608PCqCaw&s=10",
    rating: 4.6,
    time: "45 min",
    tag: "Rich & Creamy",
    category: "provisions",
    description: "Peak evaporated milk tin for tea, beverages, and cooking",
  },
  {
    id: 58,
    name: "Carnation Evaporated Milk (tin)",
    price: 650,
    originalPrice: 800,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTg2_gI3qM5xTGqwaYTcqWPRFsMgvMsAjlpGfJfUBaEIQ&s=100",
    rating: 4.4,
    time: "45 min",
    tag: "Imported",
    category: "provisions",
    description: "Nestlé Carnation evaporated milk for hot drinks and desserts",
  },

  // ─── DRINKS ───
  {
    id: 59,
    name: "Zobo Drink (1 litre)",
    price: 800,
    originalPrice: 1000,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSE44D50I9UIsR3cGboYedgEAfGMdmWdkQbiB4oKYi1Ow&s=10",
    rating: 4.7,
    time: "35 min",
    tag: "Homemade",
    category: "drinks",
    description:
      "Chilled hibiscus zobo drink with ginger and pineapple flavour",
  },
  {
    id: 60,
    name: "Kunu (500ml)",
    price: 500,
    originalPrice: 700,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdPWjuS0izlKHtCnREr41Lk2pQJpepX2p3U0rxEA9AYA&s=10",
    rating: 4.5,
    time: "35 min",
    tag: "Northern Fave",
    category: "drinks",
    description: "Refreshing millet-based kunu drink, lightly spiced",
  },
  {
    id: 61,
    name: "Coca-Cola (50cl)",
    price: 300,
    originalPrice: 400,
    image:
      "https://images.unsplash.com/photo-1554866585-cd94860890b7?w=400&q=80",
    rating: 4.7,
    time: "20 min",
    tag: "Ice Cold",
    category: "drinks",
    description: "Classic Coca-Cola, chilled and ready to drink",
  },
  {
    id: 62,
    name: "Pepsi (50cl)",
    price: 300,
    originalPrice: 400,
    image:
      "https://images.unsplash.com/photo-1629203851122-3726ecdf080e?w=400&q=80",
    rating: 4.5,
    time: "20 min",
    tag: "Ice Cold",
    category: "drinks",
    description: "Chilled Pepsi cola, bold and refreshing",
  },
  {
    id: 63,
    name: "Fanta Orange (50cl)",
    price: 300,
    originalPrice: 400,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLcwDJhBGL5-l1jSemxD9oA25QyqyELXYqlUSiiFIBfw&s=10",
    rating: 4.6,
    time: "20 min",
    tag: "Fruity",
    category: "drinks",
    description: "Fizzy orange Fanta, a Nigerian party staple",
  },
  {
    id: 64,
    name: "Miranda (50cl)",
    price: 300,
    originalPrice: 400,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSYslXta6nFyUoZ5UMqLP8gwQMUskdO0PUThCQqkaamA&s=10",
    rating: 4.4,
    time: "20 min",
    tag: "Fruity",
    category: "drinks",
    description: "Chilled Miranda fruit soda — orange or strawberry flavour",
  },
  {
    id: 65,
    name: "La Casera Apple (50cl)",
    price: 350,
    originalPrice: 450,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9baG0gFJVmAd0vZoJFtmOCfV_Ua9Nfgl6nRL8b-XgBQ&s=10",
    rating: 4.6,
    time: "20 min",
    tag: "Apple Crisp",
    category: "drinks",
    description: "Sparkling apple-flavoured drink, light and refreshing",
  },
  {
    id: 66,
    name: "Chivita Active Juice (50cl)",
    price: 400,
    originalPrice: 550,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtCl1z1bnl_fEes6EQ3-Cg8cGCNXxa99uisQUZqOtCLQ&s=10",
    rating: 4.5,
    time: "25 min",
    tag: "Fruit Juice",
    category: "drinks",
    description: "Chivita mixed fruit juice, no preservatives added",
  },
  {
    id: 67,
    name: "Five Alive Citrus (50cl)",
    price: 400,
    originalPrice: 550,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHyhGC_Gqp99ABlcBy4q8Rpl4TQPR9DzoLTfae01Ug_g&s=10",
    rating: 4.4,
    time: "25 min",
    tag: "Citrus Blend",
    category: "drinks",
    description: "Five Alive pulpy citrus fruit drink, refreshing and tangy",
  },
  {
    id: 68,
    name: "Ribena (30cl)",
    price: 350,
    originalPrice: 450,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCODoCy1khOSdvnYJRhO7R8n8O94J5t74CF-9eVT-NAQ&s=10",
    rating: 4.5,
    time: "25 min",
    tag: "Blackcurrant",
    category: "drinks",
    description: "Ribena blackcurrant drink with natural fruit goodness",
  },
  {
    id: 69,
    name: "Lucozade Boost (33cl)",
    price: 500,
    originalPrice: 650,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTunShpYda2TSB6cRplvDs8Yzu5AjtgcgKpKfgNp3rquQ&s=10",
    rating: 4.6,
    time: "20 min",
    tag: "⚡ Energy",
    category: "drinks",
    description: "Lucozade energy drink to boost your day — glucose powered",
  },
  {
    id: 70,
    name: "Nutri Milk (30cl)",
    price: 400,
    originalPrice: 500,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2GMXDd6Gij9EXaIdco1TYFtVxWvIhZumaqG4hqWlSiA&s=10",
    rating: 4.4,
    time: "25 min",
    tag: "Milk Drink",
    category: "drinks",
    description:
      "Nutri Milk flavoured milk drink, great for breakfast on the go",
  },
  {
    id: 71,
    name: "Viju Milk Drink",
    price: 350,
    originalPrice: 450,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUO0f-wyIy4fMOxUWxv-Nq5jAAxj1RbsWPML46tb3rmA&s=10",
    rating: 4.4,
    time: "25 min",
    tag: "Nigerian Made",
    category: "drinks",
    description: "Viju flavoured milk drink, a popular Nigerian favourite",
  },
  {
    id: 72,
    name: "Hollandia Yoghurt (500ml)",
    price: 900,
    originalPrice: 1100,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCTYBoQQydD0kMOMTF8igam1FCN1sX9yXOMDlhO-Jd8g&s=10",
    rating: 4.7,
    time: "30 min",
    tag: "Probiotic",
    category: "drinks",
    description: "Creamy Hollandia yoghurt drink, strawberry or plain flavour",
  },
  {
    id: 73,
    name: "Chapman Cocktail",
    price: 1000,
    originalPrice: 1300,
    image:
      "https://images.unsplash.com/photo-1499638673689-79a0b5115d87?w=400&q=80",
    rating: 4.8,
    time: "20 min",
    tag: "Party Drink",
    category: "drinks",
    description: "Classic Nigerian chapman with grenadine and fruit slices",
  },
  {
    id: 74,
    name: "Bottled Water (75cl)",
    price: 200,
    originalPrice: 300,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEMw0VLredn2qyf3W_7z2lSINu-Jz29wKhsegvF2FX9A&s=10",
    rating: 4.3,
    time: "20 min",
    tag: "Pure",
    category: "drinks",
    description: "Chilled bottled pure water, essential everyday",
  },
];

const CartDrawer = ({
  cart,
  onClose,
  onAdd,
  onRemove,
  onGoToCart,
}: {
  cart: CartItem[];
  onClose: () => void;
  onAdd: (item: Product) => void;
  onRemove: (id: number) => void;
  onGoToCart: () => void;
}) => {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative w-full max-w-sm bg-white h-full shadow-2xl flex flex-col">
        <div className="flex items-center justify-between p-5 border-b">
          <h2 className="text-lg font-semibold">Your Cart</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        {cart.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-gray-400 gap-3">
            <span className="text-5xl">🛒</span>
            <p className="text-sm">Your cart is empty</p>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {cart.map((item) => (
                <div key={item.id} className="flex gap-3 items-center">
                  <img
                    src={item.image}
                    className="w-14 h-14 rounded-xl object-cover"
                    alt={item.name}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{item.name}</p>
                    <p className="text-sm text-orange-500 font-semibold">
                      ₦{item.price.toLocaleString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onRemove(item.id)}
                      className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center hover:bg-orange-100"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="w-5 text-center text-sm font-semibold">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => onAdd(item)}
                      className="w-7 h-7 rounded-full bg-orange-500 flex items-center justify-center hover:bg-orange-600"
                    >
                      <Plus className="w-3 h-3 text-white" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-5 border-t space-y-3">
              <div className="flex justify-between text-sm text-gray-500">
                <span>Subtotal</span>
                <span>₦{total.toLocaleString()}</span>
              </div>
              <div className="flex justify-between font-semibold text-base border-t pt-3">
                <span>Total</span>
                <span>₦{total.toLocaleString()}</span>
              </div>
              <button
                onClick={onGoToCart}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white rounded-2xl py-4 font-semibold transition-colors"
              >
                View Cart →
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
const ProductCard = ({
  product,
  onAdd,
  onView,
}: {
  product: Product;
  onAdd: (p: Product) => void;
  onView: (id: number) => void;
}) => {
  const discount = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100,
      )
    : 0;
  return (
    <div className="bg-white rounded-3xl overflow-hidden border border-gray-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col">
      <div
        className="relative cursor-pointer"
        onClick={() => onView(product.id)}
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-40 object-cover"
        />
        {product.tag && (
          <span className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm text-xs font-semibold px-2 py-1 rounded-full text-gray-800">
            {product.tag}
          </span>
        )}
        {discount > 0 && (
          <span className="absolute top-2 right-2 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full">
            -{discount}%
          </span>
        )}
      </div>
      <div className="p-3 flex flex-col flex-1">
        <h3
          className="font-semibold text-gray-900 text-sm leading-snug mb-1 cursor-pointer hover:text-orange-500"
          onClick={() => onView(product.id)}
        >
          {product.name}
        </h3>
        <p className="text-xs text-gray-400 mb-2 line-clamp-1">
          {product.description}
        </p>
        <div className="flex items-center gap-3 text-xs text-gray-400 mb-3">
          <span className="flex items-center gap-1">
            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
            {product.rating}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {product.time}
          </span>
        </div>
        <div className="flex items-center justify-between mt-auto">
          <div>
            <span className="text-sm font-bold text-gray-900">
              ₦{product.price.toLocaleString()}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-gray-400 line-through ml-1">
                ₦{product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>
          <button
            onClick={() => onAdd(product)}
            className="w-8 h-8 bg-orange-500 hover:bg-orange-600 text-white rounded-xl flex items-center justify-center transition-colors"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default function ProductListingPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("all");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("Popular");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);

  const cartCount = cart.reduce((sum, i) => sum + i.quantity, 0);

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing)
        return prev.map((i) =>
          i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i,
        );
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id: number) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === id);
      if (existing && existing.quantity === 1)
        return prev.filter((i) => i.id !== id);
      return prev.map((i) =>
        i.id === id ? { ...i, quantity: i.quantity - 1 } : i,
      );
    });
  };

  const filtered = products
    .filter((p) => activeTab === "all" || p.category === activeTab)
    .filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sort === "Price: Low to High") return a.price - b.price;
      if (sort === "Price: High to Low") return b.price - a.price;
      if (sort === "Rating") return b.rating - a.rating;
      if (sort === "Fastest Delivery")
        return parseInt(a.time) - parseInt(b.time);
      return 0;
    });

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => navigate("/home")}
          >
            <span className="text-2xl">🛵</span>
            <span className="font-bold text-lg text-gray-900">
              Chop<span className="text-orange-500">Fast</span>
            </span>
          </div>
          <div className="flex-1 max-w-md hidden md:flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-2xl px-4 py-2.5">
            <Search className="w-4 h-4 text-gray-400 shrink-0" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search meals, groceries, drinks..."
              className="flex-1 bg-transparent text-sm focus:outline-none text-gray-700 placeholder:text-gray-400"
            />
          </div>
          <button
            onClick={() => setCartOpen(true)}
            className="relative flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2.5 rounded-2xl text-sm font-medium transition-colors"
          >
            <ShoppingCart className="w-4 h-4" />
            <span className="hidden sm:inline">Cart</span>
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 w-5 h-5 bg-green-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Our Menu</h1>
          <p className="text-sm text-gray-400 mt-1">
            Fresh food & groceries delivered to your door
          </p>
        </div>

        <div className="md:hidden flex items-center gap-2 bg-white border border-gray-200 rounded-2xl px-4 py-3 mb-4">
          <Search className="w-4 h-4 text-gray-400 shrink-0" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search anything..."
            className="flex-1 bg-transparent text-sm focus:outline-none text-gray-700 placeholder:text-gray-400"
          />
        </div>

        <div className="flex items-center justify-between gap-4 mb-6 flex-wrap">
          <div className="flex gap-2 overflow-x-auto pb-1">
            {categoryTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 px-4 py-2.5 rounded-2xl text-sm font-medium whitespace-nowrap transition-all border ${activeTab === tab.id ? "bg-orange-500 text-white border-orange-500 shadow-sm" : "bg-white text-gray-600 border-gray-200 hover:border-orange-300"}`}
              >
                <span>{tab.emoji}</span>
                {tab.label}
              </button>
            ))}
          </div>
          <div className="relative">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="appearance-none bg-white border border-gray-200 rounded-2xl px-4 py-2.5 pr-8 text-sm text-gray-700 focus:outline-none focus:border-orange-400 cursor-pointer"
            >
              {sortOptions.map((opt) => (
                <option key={opt}>{opt}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
        </div>

        <p className="text-sm text-gray-400 mb-4">
          Showing{" "}
          <span className="font-semibold text-gray-700">{filtered.length}</span>{" "}
          items
          {activeTab !== "all" && (
            <span>
              {" "}
              in{" "}
              <span className="text-orange-500 font-medium">
                {categoryTabs.find((t) => t.id === activeTab)?.label}
              </span>
            </span>
          )}
        </p>

        {filtered.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <p className="text-4xl mb-3">🔍</p>
            <p className="font-medium text-gray-600">No items found</p>
            <p className="text-sm mt-1">Try a different search or category</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filtered.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAdd={addToCart}
                onView={(id) => navigate(`/product/${id}`)}
              />
            ))}
          </div>
        )}
      </main>

      <footer className="mt-16 border-t border-gray-100 bg-white py-8 px-4 text-center text-sm text-gray-400">
        <div
          className="flex items-center justify-center gap-2 mb-2 cursor-pointer"
          onClick={() => navigate("/home")}
        >
          <span className="text-xl">🛵</span>
          <span className="font-bold text-gray-700">
            Chop<span className="text-orange-500">Fast</span>
          </span>
        </div>
        <p>Delivering fresh food & groceries across Lagos © 2026</p>
      </footer>

      {cartOpen && (
        <CartDrawer
          cart={cart}
          onClose={() => setCartOpen(false)}
          onAdd={addToCart}
          onRemove={removeFromCart}
          onGoToCart={() => {
            setCartOpen(false);
            navigate("/cart");
          }}
        />
      )}
    </div>
  );
}
