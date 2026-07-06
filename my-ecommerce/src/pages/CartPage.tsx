import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  ShoppingCart,
  Plus,
  Minus,
  X,
  ChevronLeft,
  Tag,
  ShieldCheck,
  Clock,
  Trash2,
} from "lucide-react";

// --- TYPES ---
interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
}

interface CartItem extends Product {
  quantity: number;
}

// --- SAMPLE CART ITEMS ---
const sampleCart: CartItem[] = [
  {
    id: 1,
    name: "Party Jollof Rice",
    price: 2500,
    originalPrice: 3200,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZOyyOFLpEBq8WlvlMIIRtkBEAQdO6zOYozhlerIxRQg&s=10",
    category: "Food",
    quantity: 2,
  },
  {
    id: 9,
    name: "Shawarma (Chicken)",
    price: 2200,
    originalPrice: 2500,
    image:
      "https://images.unsplash.com/photo-1561651823-34feb02250e4?w=400&q=80",
    category: "Snacks",
    quantity: 1,
  },
  {
    id: 51,
    name: "Milo (400g tin)",
    price: 2800,
    originalPrice: 3200,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAjUFHyHPtJeMyM_NI-HNHgVk2j9KUTR6jfpialjxvjg&s=10",
    category: "Provisions",
    quantity: 1,
  },
  {
    id: 61,
    name: "Coca-Cola (50cl)",
    price: 300,
    originalPrice: 400,
    image:
      "https://images.unsplash.com/photo-1554866585-cd94860890b7?w=400&q=80",
    category: "Drinks",
    quantity: 3,
  },
];

const suggestedItems: Product[] = [
  {
    id: 15,
    name: "Puff Puff (10 pcs)",
    price: 400,
    originalPrice: 500,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVcCHRfPEZ_sotb6ICDy54KmEqPbeXc2jO6H_NtOpeMw&s=10",
    category: "Snacks",
  },
  {
    id: 63,
    name: "Fanta Orange (50cl)",
    price: 300,
    originalPrice: 400,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLcwDJhBGL5-l1jSemxD9oA25QyqyELXYqlUSiiFIBfw&s=10",
    category: "Drinks",
  },
  {
    id: 49,
    name: "Golden Morn (900g)",
    price: 2500,
    originalPrice: 3000,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNAsy4swVdx8qdm8jUjqESTuwL4PSgaeQ5n1uGyRschg&s=10",
    category: "Provisions",
  },
  {
    id: 45,
    name: "Eggs (crate of 30)",
    price: 3500,
    originalPrice: 4000,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDMqQcCKrIYCrQLDk1GqkLsmqt1BXQrDSdT_geDB4uXg&s=10",
    category: "Groceries",
  },
];

// --- PROMO CODES ---
const validCodes: Record<string, number> = {
  NEW500: 500,
  CHOPFAST10: 0.1,
  LAGOS200: 200,
};

export default function CartPage() {
  const navigate = useNavigate();
  const [cart, setCart] = useState<CartItem[]>(sampleCart);
  const [promoCode, setPromoCode] = useState("");
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [promoError, setPromoError] = useState("");
  const [promoSuccess, setPromoSuccess] = useState("");

  // Cart operations
  const updateQty = (id: number, delta: number) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item,
      ),
    );
  };

  const removeItem = (id: number) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const addSuggested = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing)
        return prev.map((i) =>
          i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i,
        );
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  // Promo code
  const applyPromo = () => {
    const code = promoCode.trim().toUpperCase();
    if (!code) {
      setPromoError("Please enter a promo code");
      return;
    }
    if (appliedPromo) {
      setPromoError("A promo code is already applied");
      return;
    }
    if (validCodes[code] !== undefined) {
      setAppliedPromo(code);
      setPromoError("");
      setPromoSuccess(`Promo code "${code}" applied successfully!`);
    } else {
      setPromoError("Invalid promo code. Try NEW500, CHOPFAST10, or LAGOS200");
      setPromoSuccess("");
    }
  };

  const removePromo = () => {
    setAppliedPromo(null);
    setPromoCode("");
    setPromoError("");
    setPromoSuccess("");
  };

  // Totals
  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const deliveryFee = 800;

  const promoDiscount = appliedPromo
    ? validCodes[appliedPromo] < 1
      ? Math.round(subtotal * validCodes[appliedPromo])
      : validCodes[appliedPromo]
    : 0;

  const total = subtotal + deliveryFee - promoDiscount;
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalSavings = cart.reduce(
    (sum, item) =>
      sum + ((item.originalPrice ?? item.price) - item.price) * item.quantity,
    0,
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* NAVBAR */}
      <nav className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button className="p-2 rounded-xl hover:bg-gray-100 transition-colors">
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>
            <div className="flex items-center gap-2">
              <span className="text-2xl">🛵</span>
              <span className="font-bold text-lg text-gray-900">
                Chop<span className="text-orange-500">Fast</span>
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <ShoppingCart className="w-5 h-5 text-gray-600" />
            <span className="font-semibold text-gray-900">Your Cart</span>
            {totalItems > 0 && (
              <span className="w-6 h-6 bg-orange-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
                {totalItems}
              </span>
            )}
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {cart.length === 0 ? (
          // EMPTY CART STATE
          <div className="flex flex-col items-center justify-center py-32 text-center">
            <span className="text-7xl mb-6">🛒</span>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Your cart is empty
            </h2>
            <p className="text-gray-400 mb-8">
              Looks like you haven't added anything yet. Go explore our menu!
            </p>
            <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-4 rounded-2xl transition-colors">
              Browse Menu
            </button>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* LEFT — Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {/* Savings banner */}
              {totalSavings > 0 && (
                <div className="flex items-center gap-3 bg-green-50 border border-green-200 rounded-2xl px-4 py-3">
                  <span className="text-xl">🎉</span>
                  <p className="text-sm text-green-700 font-medium">
                    You're saving{" "}
                    <span className="font-bold">
                      ₦{totalSavings.toLocaleString()}
                    </span>{" "}
                    on this order!
                  </p>
                </div>
              )}

              {/* Cart Items */}
              <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden">
                <div className="p-5 border-b border-gray-100">
                  <h2 className="font-bold text-gray-900">
                    Order Items ({totalItems})
                  </h2>
                </div>
                <div className="divide-y divide-gray-50">
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="p-5 flex gap-4 items-center hover:bg-gray-50/50 transition-colors"
                    >
                      {/* Image */}
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 rounded-2xl object-cover shrink-0"
                      />

                      {/* Details */}
                      <div className="flex-1 min-w-0">
                        <span className="text-xs text-orange-500 font-medium">
                          {item.category}
                        </span>
                        <h3 className="font-semibold text-gray-900 text-sm mt-0.5 mb-1">
                          {item.name}
                        </h3>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-gray-900">
                            ₦{item.price.toLocaleString()}
                          </span>
                          {item.originalPrice && (
                            <span className="text-xs text-gray-400 line-through">
                              ₦{item.originalPrice.toLocaleString()}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Quantity + Remove */}
                      <div className="flex flex-col items-end gap-3 shrink-0">
                        <button
                          onClick={() => removeItem(item.id)}
                          className="p-1.5 rounded-xl hover:bg-red-50 text-gray-300 hover:text-red-400 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                        <div className="flex items-center gap-2 bg-gray-100 rounded-xl px-1 py-1">
                          <button
                            onClick={() => updateQty(item.id, -1)}
                            className="w-7 h-7 bg-white rounded-lg shadow-sm flex items-center justify-center hover:bg-orange-50 transition-colors"
                          >
                            <Minus className="w-3 h-3 text-gray-700" />
                          </button>
                          <span className="w-6 text-center text-sm font-bold text-gray-900">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQty(item.id, 1)}
                            className="w-7 h-7 bg-orange-500 rounded-lg flex items-center justify-center hover:bg-orange-600 transition-colors"
                          >
                            <Plus className="w-3 h-3 text-white" />
                          </button>
                        </div>
                        <span className="text-sm font-bold text-orange-500">
                          ₦{(item.price * item.quantity).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Promo Code */}
              <div className="bg-white rounded-3xl border border-gray-100 p-5">
                <div className="flex items-center gap-2 mb-4">
                  <Tag className="w-4 h-4 text-orange-500" />
                  <h3 className="font-semibold text-gray-900">Promo Code</h3>
                </div>
                {appliedPromo ? (
                  <div className="flex items-center justify-between bg-green-50 border border-green-200 rounded-2xl px-4 py-3">
                    <div>
                      <p className="text-sm font-bold text-green-700">
                        {appliedPromo}
                      </p>
                      <p className="text-xs text-green-600">
                        -₦{promoDiscount.toLocaleString()} discount applied
                      </p>
                    </div>
                    <button
                      onClick={removePromo}
                      className="p-1.5 hover:bg-green-100 rounded-xl transition-colors"
                    >
                      <X className="w-4 h-4 text-green-600" />
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="flex gap-2">
                      <input
                        value={promoCode}
                        onChange={(e) =>
                          setPromoCode(e.target.value.toUpperCase())
                        }
                        onKeyDown={(e) => e.key === "Enter" && applyPromo()}
                        placeholder="Enter promo code"
                        className="flex-1 border border-gray-200 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:border-orange-400 uppercase"
                      />
                      <button
                        onClick={applyPromo}
                        className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-5 py-3 rounded-2xl text-sm transition-colors"
                      >
                        Apply
                      </button>
                    </div>
                    {promoError && (
                      <p className="text-xs text-red-500">{promoError}</p>
                    )}
                    {promoSuccess && (
                      <p className="text-xs text-green-600">{promoSuccess}</p>
                    )}
                    <p className="text-xs text-gray-400">
                      Try: NEW500 · CHOPFAST10 · LAGOS200
                    </p>
                  </div>
                )}
              </div>

              {/* Delivery Info */}
              <div className="bg-white rounded-3xl border border-gray-100 p-5">
                <div className="flex items-center gap-2 mb-4">
                  <Clock className="w-4 h-4 text-orange-500" />
                  <h3 className="font-semibold text-gray-900">
                    Delivery Details
                  </h3>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-gray-50">
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Lagos Island
                    </p>
                    <p className="text-xs text-gray-400">
                      Standard delivery · 30–45 min
                    </p>
                  </div>
                  <span className="text-sm font-semibold text-gray-900">
                    ₦{deliveryFee.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center gap-2 mt-3">
                  <ShieldCheck className="w-4 h-4 text-green-500 shrink-0" />
                  <p className="text-xs text-gray-500">
                    Your order is insured and handled with care
                  </p>
                </div>
              </div>
            </div>

            {/* RIGHT — Order Summary */}
            <div className="space-y-4">
              <div className="bg-white rounded-3xl border border-gray-100 p-6 sticky top-24">
                <h2 className="font-bold text-gray-900 mb-5">Order Summary</h2>

                <div className="space-y-3 mb-5">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">
                      Subtotal ({totalItems} items)
                    </span>
                    <span className="font-medium text-gray-900">
                      ₦{subtotal.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Delivery fee</span>
                    <span className="font-medium text-gray-900">
                      ₦{deliveryFee.toLocaleString()}
                    </span>
                  </div>
                  {totalSavings > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Item discounts</span>
                      <span className="font-medium text-green-600">
                        -₦{totalSavings.toLocaleString()}
                      </span>
                    </div>
                  )}
                  {promoDiscount > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">
                        Promo ({appliedPromo})
                      </span>
                      <span className="font-medium text-green-600">
                        -₦{promoDiscount.toLocaleString()}
                      </span>
                    </div>
                  )}
                </div>

                <div className="border-t border-gray-100 pt-4 mb-6">
                  <div className="flex justify-between">
                    <span className="font-bold text-gray-900">Total</span>
                    <span className="font-bold text-xl text-gray-900">
                      ₦{total.toLocaleString()}
                    </span>
                  </div>
                  {totalSavings + promoDiscount > 0 && (
                    <p className="text-xs text-green-600 mt-1 text-right">
                      Total savings: ₦
                      {(totalSavings + promoDiscount).toLocaleString()}
                    </p>
                  )}
                </div>

                <button
                  onClick={() => navigate("/checkout")}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-4 rounded-2xl transition-colors mb-3"
                >
                  Proceed to Checkout →
                </button>
                <button
                  onClick={() => navigate("/menu")}
                  className="w-full border border-gray-200 text-gray-600 hover:bg-gray-50 font-medium py-3 rounded-2xl transition-colors text-sm"
                >
                  ← Continue Shopping
                </button>

                <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-400">
                  <ShieldCheck className="w-3.5 h-3.5 text-green-500" />
                  <span>Secure checkout · 100% safe payment</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SUGGESTED ITEMS */}
        {cart.length > 0 && (
          <section className="mt-12">
            <h2 className="text-xl font-bold text-gray-900 mb-5">
              Add to your order
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {suggestedItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-3xl overflow-hidden border border-gray-100 hover:shadow-md transition-all flex flex-col"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-36 object-cover"
                  />
                  <div className="p-3 flex flex-col flex-1">
                    <p className="text-xs text-orange-500 font-medium mb-1">
                      {item.category}
                    </p>
                    <h3 className="text-sm font-semibold text-gray-900 mb-2 flex-1">
                      {item.name}
                    </h3>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-gray-900">
                        ₦{item.price.toLocaleString()}
                      </span>
                      <button
                        onClick={() => addSuggested(item)}
                        className="w-8 h-8 bg-orange-500 hover:bg-orange-600 text-white rounded-xl flex items-center justify-center transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>

      {/* FOOTER */}
      <footer className="mt-16 border-t border-gray-100 bg-white py-8 px-4 text-center text-sm text-gray-400">
        <div className="flex items-center justify-center gap-2 mb-2">
          <span className="text-xl">🛵</span>
          <span className="font-bold text-gray-700">
            Chop<span className="text-orange-500">Fast</span>
          </span>
        </div>
        <p>Delivering fresh food & groceries across Lagos © 2026</p>
      </footer>
    </div>
  );
}
