import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  CheckCircle2,
  MapPin,
  CreditCard,
  Clock,
  ChevronRight,
  Copy,
  Phone,
  Package,
  Star,
} from "lucide-react";

interface OrderItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
  category: string;
}

const orderItems: OrderItem[] = [
  {
    id: 1,
    name: "Party Jollof Rice",
    price: 2500,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZOyyOFLpEBq8WlvlMIIRtkBEAQdO6zOYozhlerIxRQg&s=10",
    quantity: 2,
    category: "Food",
  },
  {
    id: 9,
    name: "Shawarma (Chicken)",
    price: 2200,
    image:
      "https://images.unsplash.com/photo-1561651823-34feb02250e4?w=400&q=80",
    quantity: 1,
    category: "Snacks",
  },
  {
    id: 51,
    name: "Milo (400g tin)",
    price: 2800,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAjUFHyHPtJeMyM_NI-HNHgVk2j9KUTR6jfpialjxvjg&s=10",
    quantity: 1,
    category: "Provisions",
  },
  {
    id: 61,
    name: "Coca-Cola (50cl)",
    price: 300,
    image:
      "https://images.unsplash.com/photo-1554866585-cd94860890b7?w=400&q=80",
    quantity: 3,
    category: "Drinks",
  },
];

const orderDetails = {
  orderNumber: "CF-20260628-4821",
  date: "Sunday, June 28, 2026",
  time: "4:45 PM",
  estimatedDelivery: "5:15 – 5:30 PM",
  customer: { name: "Emeka Okafor", phone: "08012345678" },
  address: {
    street: "14 Admiralty Way",
    area: "Lekki Phase 1",
    landmark: "Behind Shoprite",
  },
  payment: { method: "Debit Card", last4: "4821", status: "Paid" },
};

const suggestedItems = [
  {
    id: 15,
    name: "Puff Puff (10 pcs)",
    price: 400,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVcCHRfPEZ_sotb6ICDy54KmEqPbeXc2jO6H_NtOpeMw&s=10",
    category: "Snacks",
  },
  {
    id: 63,
    name: "Fanta Orange (50cl)",
    price: 300,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLcwDJhBGL5-l1jSemxD9oA25QyqyELXYqlUSiiFIBfw&s=10",
    category: "Drinks",
  },
  {
    id: 49,
    name: "Golden Morn (900g)",
    price: 2500,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNAsy4swVdx8qdm8jUjqESTuwL4PSgaeQ5n1uGyRschg&s=10",
    category: "Provisions",
  },
  {
    id: 8,
    name: "Fried Rice + Chicken",
    price: 2800,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScuUoMiS4Zi8ZJI2lvuJIk1ZU225NiDw4yv9voyY0CKw&s=10",
    category: "Food",
  },
];

export default function OrderConfirmationPage() {
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [rated, setRated] = useState(false);
  const [addedItems, setAddedItems] = useState<number[]>([]);

  const subtotal = orderItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const deliveryFee = 800;
  const total = subtotal + deliveryFee;
  const totalItems = orderItems.reduce((sum, item) => sum + item.quantity, 0);

  const copyOrderNumber = () => {
    navigator.clipboard.writeText(orderDetails.orderNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRate = (star: number) => {
    setRating(star);
    setRated(true);
  };

  const handleAddSuggested = (id: number) => {
    setAddedItems((prev) => [...prev, id]);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* NAVBAR */}
      <nav className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => navigate("/home")}
          >
            <span className="text-2xl">🛵</span>
            <span className="font-bold text-lg text-gray-900">
              Chop<span className="text-orange-500">Fast</span>
            </span>
          </div>
          <button
            onClick={() => navigate("/home")}
            className="text-sm text-orange-500 font-semibold hover:underline flex items-center gap-1"
          >
            Back to Home <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </nav>

      {/* PROGRESS STEPS */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-center gap-2 text-sm">
            {["Cart", "Checkout", "Confirmation"].map((step, i) => (
              <div key={step} className="flex items-center gap-2">
                <div
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full font-medium ${i === 2 ? "bg-green-500 text-white" : "text-gray-400"}`}
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  {step}
                </div>
                {i < 2 && <div className="w-8 h-px bg-green-300" />}
              </div>
            ))}
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 py-8 space-y-6">
        {/* SUCCESS BANNER */}
        <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-3xl p-8 text-white text-center">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-9 h-9 text-white" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold mb-2">
            Order Confirmed! 🎉
          </h1>
          <p className="text-green-100 mb-5">
            Thank you, {orderDetails.customer.name.split(" ")[0]}! Your order
            has been placed successfully.
          </p>
          <div className="inline-flex items-center gap-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-2xl px-5 py-3">
            <div>
              <p className="text-xs text-green-100">Order Number</p>
              <p className="font-bold tracking-wide">
                {orderDetails.orderNumber}
              </p>
            </div>
            <button
              onClick={copyOrderNumber}
              className="w-8 h-8 bg-white/20 hover:bg-white/30 rounded-xl flex items-center justify-center transition-colors"
            >
              {copied ? (
                <CheckCircle2 className="w-4 h-4" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </button>
          </div>
          <p className="text-xs text-green-100 mt-3">
            {orderDetails.date} · {orderDetails.time}
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* DELIVERY INFORMATION */}
            <div className="bg-white rounded-3xl border border-gray-100 p-6">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-8 h-8 bg-orange-500 rounded-xl flex items-center justify-center">
                  <Clock className="w-4 h-4 text-white" />
                </div>
                <h2 className="font-bold text-gray-900">
                  Delivery Information
                </h2>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b border-gray-50">
                  <span className="text-sm text-gray-500">
                    Estimated Delivery Time
                  </span>
                  <span className="text-sm font-bold text-orange-500">
                    {orderDetails.estimatedDelivery}
                  </span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-gray-50">
                  <span className="text-sm text-gray-500">Delivery Area</span>
                  <span className="text-sm font-semibold text-gray-900">
                    {orderDetails.address.area}, Lagos
                  </span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-gray-50">
                  <span className="text-sm text-gray-500">Order Date</span>
                  <span className="text-sm font-semibold text-gray-900">
                    {orderDetails.date}
                  </span>
                </div>
                <div className="flex items-center justify-between py-3">
                  <span className="text-sm text-gray-500">Order Time</span>
                  <span className="text-sm font-semibold text-gray-900">
                    {orderDetails.time}
                  </span>
                </div>
              </div>
            </div>

            {/* ORDER ITEMS */}
            <div className="bg-white rounded-3xl border border-gray-100 p-6">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-8 h-8 bg-orange-500 rounded-xl flex items-center justify-center">
                  <Package className="w-4 h-4 text-white" />
                </div>
                <h2 className="font-bold text-gray-900">
                  Order Items ({totalItems})
                </h2>
              </div>
              <div className="divide-y divide-gray-50">
                {orderItems.map((item) => (
                  <div key={item.id} className="flex gap-4 items-center py-4">
                    <div className="relative shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 rounded-2xl object-cover"
                      />
                      <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-orange-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-orange-500 font-medium">
                        {item.category}
                      </p>
                      <p className="text-sm font-semibold text-gray-900 truncate">
                        {item.name}
                      </p>
                      <p className="text-xs text-gray-400">
                        ₦{item.price.toLocaleString()} each
                      </p>
                    </div>
                    <p className="text-sm font-bold text-gray-900 shrink-0">
                      ₦{(item.price * item.quantity).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
              <div className="border-t border-gray-100 pt-4 mt-2 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Subtotal</span>
                  <span className="font-medium">
                    ₦{subtotal.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Delivery fee</span>
                  <span className="font-medium">
                    ₦{deliveryFee.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between font-bold text-base border-t border-gray-100 pt-3 mt-1">
                  <span>Total Paid</span>
                  <span className="text-orange-500">
                    ₦{total.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            {/* RATE YOUR ORDER */}
            <div className="bg-white rounded-3xl border border-gray-100 p-6 text-center">
              <h2 className="font-bold text-gray-900 mb-1">
                How was your experience?
              </h2>
              <p className="text-sm text-gray-400 mb-5">
                Rate this order to help us serve you better
              </p>
              {rated ? (
                <div className="flex flex-col items-center gap-2">
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star
                        key={s}
                        className={`w-8 h-8 ${s <= rating ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200"}`}
                      />
                    ))}
                  </div>
                  <p className="text-sm font-semibold text-green-600 mt-2">
                    Thank you for your feedback! 🙏
                  </p>
                </div>
              ) : (
                <div className="flex gap-2 justify-center">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <button
                      key={s}
                      onClick={() => handleRate(s)}
                      onMouseEnter={() => setHoverRating(s)}
                      onMouseLeave={() => setHoverRating(0)}
                    >
                      <Star
                        className={`w-9 h-9 transition-colors ${s <= (hoverRating || rating) ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200"}`}
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="space-y-5">
            <div className="bg-white rounded-3xl border border-gray-100 p-5">
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="w-4 h-4 text-orange-500" />
                <h3 className="font-bold text-gray-900">Delivery Address</h3>
              </div>
              <p className="text-sm font-semibold text-gray-900">
                {orderDetails.customer.name}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                {orderDetails.address.street}
              </p>
              <p className="text-sm text-gray-500">
                {orderDetails.address.area}, Lagos
              </p>
              <p className="text-sm text-gray-400 text-xs mt-1">
                Landmark: {orderDetails.address.landmark}
              </p>
              <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-50">
                <Phone className="w-3.5 h-3.5 text-gray-400" />
                <p className="text-sm text-gray-500">
                  {orderDetails.customer.phone}
                </p>
              </div>
            </div>

            <div className="bg-white rounded-3xl border border-gray-100 p-5">
              <div className="flex items-center gap-2 mb-4">
                <CreditCard className="w-4 h-4 text-orange-500" />
                <h3 className="font-bold text-gray-900">Payment</h3>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    {orderDetails.payment.method}
                  </p>
                  <p className="text-xs text-gray-400">
                    Card ending in {orderDetails.payment.last4}
                  </p>
                </div>
                <span className="text-xs font-semibold text-green-600 bg-green-50 border border-green-200 px-3 py-1 rounded-full">
                  ✓ {orderDetails.payment.status}
                </span>
              </div>
              <div className="mt-3 pt-3 border-t border-gray-50 flex justify-between">
                <span className="text-sm text-gray-500">Amount charged</span>
                <span className="text-sm font-bold text-gray-900">
                  ₦{total.toLocaleString()}
                </span>
              </div>
            </div>

            <div className="bg-orange-50 border border-orange-200 rounded-3xl p-5">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-4 h-4 text-orange-500" />
                <h3 className="font-bold text-orange-700">
                  Estimated Delivery
                </h3>
              </div>
              <p className="text-2xl font-bold text-orange-600">
                {orderDetails.estimatedDelivery}
              </p>
              <p className="text-xs text-orange-400 mt-1">
                Your rider is on the way!
              </p>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => navigate("/profile")}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-4 rounded-2xl transition-colors"
              >
                Track My Order
              </button>
              <button
                onClick={() => navigate("/menu")}
                className="w-full border border-gray-200 text-gray-600 hover:bg-gray-50 font-medium py-3 rounded-2xl transition-colors text-sm"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>

        {/* ORDER AGAIN */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-5">
            Order again next time 👇
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {suggestedItems.map((item) => {
              const added = addedItems.includes(item.id);
              return (
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
                        onClick={() => handleAddSuggested(item.id)}
                        className={`text-xs px-3 py-1.5 rounded-xl transition-colors font-medium ${added ? "bg-green-500 text-white" : "bg-orange-500 hover:bg-orange-600 text-white"}`}
                      >
                        {added ? "✓ Added" : "Add"}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
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
    </div>
  );
}
