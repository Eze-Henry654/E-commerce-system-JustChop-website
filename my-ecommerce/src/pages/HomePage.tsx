import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ShoppingCart,
  Search,
  MapPin,
  ChevronRight,
  Star,
  Clock,
  Zap,
  X,
  Plus,
  Minus,
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
}

interface CartItem extends Product {
  quantity: number;
}

const categories = [
  {
    id: 1,
    name: "Jollof & Rice",
    emoji: "🍚",
    color: "bg-orange-50 border-orange-200",
  },
  {
    id: 2,
    name: "Soups & Stews",
    emoji: "🍲",
    color: "bg-red-50 border-red-200",
  },
  {
    id: 3,
    name: "Snacks",
    emoji: "🥪",
    color: "bg-yellow-50 border-yellow-200",
  },
  {
    id: 4,
    name: "Fresh Produce",
    emoji: "🥬",
    color: "bg-green-50 border-green-200",
  },
  { id: 5, name: "Drinks", emoji: "🥤", color: "bg-blue-50 border-blue-200" },
  {
    id: 6,
    name: "Grains & Staples",
    emoji: "🌾",
    color: "bg-amber-50 border-amber-200",
  },
];
const deals: Product[] = [
  {
    id: 4,
    name: "Suya Platter (10 sticks)",
    price: 3500,
    originalPrice: 4000,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVmfV2HPQrB8LYBHJHZrVYUnKX2_QTusxLaZ5VAuEbYA&s=10",
    rating: 4.9,
    time: "20 min",
    tag: "🌶 Spicy",
    category: "Snacks",
  },
  {
    id: 5,
    name: "Zobo Drink ",
    price: 800,
    originalPrice: 1000,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSE44D50I9UIsR3cGboYedgEAfGMdmWdkQbiB4oKYi1Ow&s=10",
    rating: 4.7,
    time: "35 min",
    tag: "Homemade",
    category: "Drinks",
  },
  {
    id: 6,
    name: "Ofada Rice (2kg)",
    price: 2200,
    originalPrice: 2800,
    image:
      "data:image/jpeg;base64,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",
    rating: 4.4,
    time: "50 min",
    tag: "Local Farm",
    category: "Grains & Staples",
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
          className="w-full h-44 object-cover"
        />
        {product.tag && (
          <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-xs font-semibold px-2.5 py-1 rounded-full text-gray-800">
            {product.tag}
          </span>
        )}
        {discount > 0 && (
          <span className="absolute top-3 right-3 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full">
            -{discount}%
          </span>
        )}
      </div>
      <div className="p-4 flex flex-col flex-1">
        <p className="text-xs text-orange-500 font-medium mb-1">
          {product.category}
        </p>
        <h3
          className="font-semibold text-gray-900 text-sm leading-snug mb-2 cursor-pointer hover:text-orange-500"
          onClick={() => onView(product.id)}
        >
          {product.name}
        </h3>
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
            <span className="text-base font-bold text-gray-900">
              ₦{product.price.toLocaleString()}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-gray-400 line-through ml-1.5">
                ₦{product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>
          <button
            onClick={() => onAdd(product)}
            className="w-9 h-9 bg-orange-500 hover:bg-orange-600 text-white rounded-2xl flex items-center justify-center transition-colors shadow-sm shadow-orange-200"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default function HomePage() {
  const navigate = useNavigate();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");

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

  const filteredDeals = deals.filter((d) => {
    const matchCategory =
      activeCategory === "All" || d.category === activeCategory;
    const matchSearch = d.name.toLowerCase().includes(search.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* NAVBAR */}
      <nav className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => navigate("/home")}
          >
            <span className="text-2xl">🛵</span>
            <span className="font-bold text-lg text-gray-900">
              Chop<span className="text-orange-500">Fast</span>
            </span>
          </div>
          <div className="hidden md:flex items-center gap-1.5 text-sm text-gray-500 bg-gray-50 px-3 py-2 rounded-xl border border-gray-200">
            <MapPin className="w-4 h-4 text-orange-500" />
            <span>
              Deliver to:{" "}
              <span className="font-semibold text-gray-800">Lagos Island</span>
            </span>
            <ChevronRight className="w-3 h-3" />
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

      <main className="max-w-6xl mx-auto px-4 py-8 space-y-12">
        {/* HERO */}
        <section className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-orange-500 to-red-500 min-h-[340px] flex items-center">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-20"
            style={{
              backgroundImage:
                "url(https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&q=80)",
            }}
          />
          <div className="relative z-10 px-8 py-12 md:px-14 max-w-xl">
            <span className="inline-flex items-center gap-1.5 bg-white/20 text-white text-xs font-semibold px-3 py-1.5 rounded-full mb-4">
              <Zap className="w-3 h-3" /> Express delivery in Lagos
            </span>
            <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight mb-3">
              Fresh food &<br />
              groceries, fast.
            </h1>
            <p className="text-white/80 text-sm md:text-base mb-6">
              Order your favourite Nigerian meals and groceries — delivered hot
              and fresh to your door.
            </p>
            <div className="flex items-center gap-3 bg-white rounded-2xl px-4 py-3 shadow-lg">
              <Search className="w-4 h-4 text-gray-400 shrink-0" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search jollof rice, tomatoes, suya..."
                className="flex-1 text-sm bg-transparent focus:outline-none text-gray-700 placeholder:text-gray-400"
              />
              <button
                onClick={() => navigate("/menu")}
                className="bg-orange-500 text-white text-xs font-semibold px-4 py-2 rounded-xl hover:bg-orange-600 transition-colors shrink-0"
              >
                Search
              </button>
            </div>
          </div>
        </section>

        {/* CATEGORIES */}
        <section>
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-bold text-gray-900">
              Browse Categories
            </h2>
            <button
              onClick={() => navigate("/menu")}
              className="text-sm text-orange-500 hover:underline flex items-center gap-1"
            >
              See all <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
            <button
              onClick={() => setActiveCategory("All")}
              className={`flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all text-sm font-medium ${activeCategory === "All" ? "border-orange-400 bg-orange-50 text-orange-600" : "border-gray-100 bg-white text-gray-600 hover:border-orange-200"}`}
            >
              <span className="text-2xl">🍽️</span>
              <span className="text-xs leading-tight text-center">
                All Items
              </span>
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.name);
                  navigate("/menu");
                }}
                className={`flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all ${activeCategory === cat.name ? "border-orange-400 bg-orange-50 text-orange-600" : `${cat.color} text-gray-700 hover:border-orange-200`}`}
              >
                <span className="text-2xl">{cat.emoji}</span>
                <span className="text-xs font-medium leading-tight text-center">
                  {cat.name}
                </span>
              </button>
            ))}
          </div>
        </section>

        {/* DEALS */}
        <section>
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                {activeCategory === "All" ? "Today's Deals 🔥" : activeCategory}
              </h2>
              <p className="text-sm text-gray-400 mt-0.5">
                Limited time offers — order before they run out
              </p>
            </div>
            <span className="hidden sm:flex items-center gap-1.5 text-xs bg-orange-50 text-orange-600 font-semibold px-3 py-1.5 rounded-full border border-orange-200">
              <Clock className="w-3 h-3" /> Ends midnight
            </span>
          </div>
          {filteredDeals.length === 0 ? (
            <div className="text-center py-16 text-gray-400">
              <p className="text-4xl mb-3">🔍</p>
              <p className="font-medium">No items found</p>
              <p className="text-sm mt-1">Try a different search or category</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
              {filteredDeals.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAdd={addToCart}
                  onView={(id) => navigate(`/product/${id}`)}
                />
              ))}
            </div>
          )}
        </section>

        {/* PROMO BANNERS */}
        <section className="grid md:grid-cols-2 gap-4">
          <div className="rounded-3xl bg-gradient-to-br from-green-500 to-emerald-600 p-7 flex items-center justify-between overflow-hidden relative">
            <div className="relative z-10">
              <p className="text-white/80 text-sm mb-1">New customers</p>
              <h3 className="text-white font-bold text-xl mb-3">
                Get ₦500 off
                <br />
                your first order
              </h3>
              <button className="bg-white text-green-600 text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-green-50 transition-colors">
                Use code: NEW500
              </button>
            </div>
            <span className="text-7xl opacity-30 absolute right-4">🎁</span>
          </div>
          <div className="rounded-3xl bg-gradient-to-br from-purple-500 to-indigo-600 p-7 flex items-center justify-between overflow-hidden relative">
            <div className="relative z-10">
              <p className="text-white/80 text-sm mb-1">Weekend special</p>
              <h3 className="text-white font-bold text-xl mb-3">
                Buy 2 meals,
                <br />
                get 1 free item
              </h3>
              <button
                onClick={() => navigate("/menu")}
                className="bg-white text-purple-600 text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-purple-50 transition-colors"
              >
                Order now
              </button>
            </div>
            <span className="text-7xl opacity-30 absolute right-4">🎉</span>
          </div>
        </section>
      </main>

      {/* FOOTER */}
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
