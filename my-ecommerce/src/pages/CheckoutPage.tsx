import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  ShieldCheck,
  CreditCard,
  Banknote,
  Truck,
  MapPin,
  Phone,
  User,
  ChevronDown,
  Clock,
  CheckCircle2,
} from "lucide-react";

interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
  category: string;
}

const lagosAreas = [
  "Lagos Island",
  "Victoria Island",
  "Lekki Phase 1",
  "Lekki Phase 2",
  "Ajah",
  "Ikoyi",
  "Surulere",
  "Yaba",
  "Ikeja",
  "Maryland",
  "Gbagada",
  "Magodo",
  "Ojodu Berger",
  "Agege",
  "Alimosho",
  "Ikorodu",
  "Badagry",
  "Apapa",
  "Ojo",
  "Festac Town",
];

const paymentMethods = [
  {
    id: "card",
    label: "Debit / Credit Card",
    icon: CreditCard,
    description: "Visa, Mastercard, Verve",
  },
  {
    id: "transfer",
    label: "Bank Transfer",
    icon: Banknote,
    description: "Transfer to our account",
  },
  {
    id: "pod",
    label: "Pay on Delivery",
    icon: Truck,
    description: "Pay cash when your order arrives",
  },
];

export default function CheckoutPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    address: "",
    area: "",
    landmark: "",
    notes: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCVV, setCardCVV] = useState("");
  const [cardName, setCardName] = useState("");
  const [saveCard, setSaveCard] = useState(false);
  const [placing, setPlacing] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const subtotal = orderItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const deliveryFee = 800;
  const total = subtotal + deliveryFee;
  const totalItems = orderItems.reduce((sum, item) => sum + item.quantity, 0);

  const update = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field])
      setErrors((prev) => {
        const e = { ...prev };
        delete e[field];
        return e;
      });
  };

  const formatCard = (val: string) => {
    const digits = val.replace(/\D/g, "").slice(0, 16);
    return digits.replace(/(.{4})/g, "$1 ").trim();
  };

  const formatExpiry = (val: string) => {
    const digits = val.replace(/\D/g, "").slice(0, 4);
    if (digits.length >= 3) return digits.slice(0, 2) + "/" + digits.slice(2);
    return digits;
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.firstName.trim()) e.firstName = "First name is required";
    if (!form.lastName.trim()) e.lastName = "Last name is required";
    if (!form.phone.trim() || form.phone.length < 11)
      e.phone = "Enter a valid 11-digit phone number";
    if (!form.address.trim()) e.address = "Delivery address is required";
    if (!form.area) e.area = "Please select your area";
    if (paymentMethod === "card") {
      if (cardNumber.replace(/\s/g, "").length < 16)
        e.cardNumber = "Enter a valid 16-digit card number";
      if (cardExpiry.length < 5) e.cardExpiry = "Enter a valid expiry date";
      if (cardCVV.length < 3) e.cardCVV = "Enter a valid CVV";
      if (!cardName.trim()) e.cardName = "Enter the name on your card";
    }
    return e;
  };

  const handlePlaceOrder = () => {
    const e = validate();
    if (Object.keys(e).length > 0) {
      setErrors(e);
      return;
    }
    setPlacing(true);
    setTimeout(() => {
      navigate("/order-confirmation");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* NAVBAR */}
      <nav className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/cart")}
              className="p-2 rounded-xl hover:bg-gray-100 transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => navigate("/home")}
            >
              <span className="text-2xl">🛵</span>
              <span className="font-bold text-lg text-gray-900">
                Chop<span className="text-orange-500">Fast</span>
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <ShieldCheck className="w-4 h-4 text-green-500" />
            <span>Secure Checkout</span>
          </div>
        </div>
      </nav>

      {/* PROGRESS STEPS */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-center gap-2 text-sm">
            {["Cart", "Checkout", "Confirmation"].map((step, i) => (
              <div key={step} className="flex items-center gap-2">
                <div
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full font-medium ${i === 1 ? "bg-orange-500 text-white" : i === 0 ? "text-gray-400" : "text-gray-300"}`}
                >
                  {i === 0 ? (
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  ) : (
                    <span className="w-4 h-4 rounded-full border-2 flex items-center justify-center text-xs">
                      {i + 1}
                    </span>
                  )}
                  {step}
                </div>
                {i < 2 && (
                  <div
                    className={`w-8 h-px ${i === 0 ? "bg-orange-300" : "bg-gray-200"}`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* DELIVERY ADDRESS */}
            <div className="bg-white rounded-3xl border border-gray-100 p-6">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-orange-500 rounded-xl flex items-center justify-center">
                  <MapPin className="w-4 h-4 text-white" />
                </div>
                <h2 className="font-bold text-gray-900">Delivery Address</h2>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-gray-600 mb-1.5 block">
                    First Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      value={form.firstName}
                      onChange={(e) => update("firstName", e.target.value)}
                      placeholder="e.g. Emeka"
                      className={`w-full pl-10 pr-4 py-3 rounded-2xl border text-sm focus:outline-none focus:border-orange-400 transition-colors ${errors.firstName ? "border-red-400 bg-red-50" : "border-gray-200 bg-gray-50"}`}
                    />
                  </div>
                  {errors.firstName && (
                    <p className="text-xs text-red-500 mt-1">
                      {errors.firstName}
                    </p>
                  )}
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-600 mb-1.5 block">
                    Last Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      value={form.lastName}
                      onChange={(e) => update("lastName", e.target.value)}
                      placeholder="e.g. Okafor"
                      className={`w-full pl-10 pr-4 py-3 rounded-2xl border text-sm focus:outline-none focus:border-orange-400 transition-colors ${errors.lastName ? "border-red-400 bg-red-50" : "border-gray-200 bg-gray-50"}`}
                    />
                  </div>
                  {errors.lastName && (
                    <p className="text-xs text-red-500 mt-1">
                      {errors.lastName}
                    </p>
                  )}
                </div>

                <div className="col-span-2">
                  <label className="text-xs font-semibold text-gray-600 mb-1.5 block">
                    Phone Number
                  </label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
                      <span className="text-sm">🇳🇬</span>
                      <span className="text-xs text-gray-400 font-medium">
                        +234
                      </span>
                      <div className="w-px h-4 bg-gray-300" />
                    </div>
                    <Phone className="absolute left-24 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      value={form.phone}
                      onChange={(e) =>
                        update(
                          "phone",
                          e.target.value.replace(/\D/g, "").slice(0, 11),
                        )
                      }
                      placeholder="08012345678"
                      className={`w-full pl-32 pr-4 py-3 rounded-2xl border text-sm focus:outline-none focus:border-orange-400 transition-colors ${errors.phone ? "border-red-400 bg-red-50" : "border-gray-200 bg-gray-50"}`}
                    />
                  </div>
                  {errors.phone && (
                    <p className="text-xs text-red-500 mt-1">{errors.phone}</p>
                  )}
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-600 mb-1.5 block">
                    Area / LGA
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <select
                      value={form.area}
                      onChange={(e) => update("area", e.target.value)}
                      className={`w-full pl-10 pr-8 py-3 rounded-2xl border text-sm focus:outline-none focus:border-orange-400 appearance-none transition-colors ${errors.area ? "border-red-400 bg-red-50" : "border-gray-200 bg-gray-50"}`}
                    >
                      <option value="">Select area</option>
                      {lagosAreas.map((a) => (
                        <option key={a}>{a}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  </div>
                  {errors.area && (
                    <p className="text-xs text-red-500 mt-1">{errors.area}</p>
                  )}
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-600 mb-1.5 block">
                    Street Address
                  </label>
                  <input
                    value={form.address}
                    onChange={(e) => update("address", e.target.value)}
                    placeholder="e.g. 14 Admiralty Way"
                    className={`w-full px-4 py-3 rounded-2xl border text-sm focus:outline-none focus:border-orange-400 transition-colors ${errors.address ? "border-red-400 bg-red-50" : "border-gray-200 bg-gray-50"}`}
                  />
                  {errors.address && (
                    <p className="text-xs text-red-500 mt-1">
                      {errors.address}
                    </p>
                  )}
                </div>

                <div className="col-span-2">
                  <label className="text-xs font-semibold text-gray-600 mb-1.5 block">
                    Closest Landmark{" "}
                    <span className="text-gray-400 font-normal">
                      (optional)
                    </span>
                  </label>
                  <input
                    value={form.landmark}
                    onChange={(e) => update("landmark", e.target.value)}
                    placeholder="e.g. Behind Shoprite, near Total petrol station"
                    className="w-full px-4 py-3 rounded-2xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:border-orange-400 transition-colors"
                  />
                </div>

                <div className="col-span-2">
                  <label className="text-xs font-semibold text-gray-600 mb-1.5 block">
                    Order Notes{" "}
                    <span className="text-gray-400 font-normal">
                      (optional)
                    </span>
                  </label>
                  <textarea
                    value={form.notes}
                    onChange={(e) => update("notes", e.target.value)}
                    placeholder="Any special instructions for your order or rider..."
                    rows={3}
                    className="w-full px-4 py-3 rounded-2xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:border-orange-400 transition-colors resize-none"
                  />
                </div>
              </div>
            </div>

            {/* PAYMENT METHOD */}
            <div className="bg-white rounded-3xl border border-gray-100 p-6">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-orange-500 rounded-xl flex items-center justify-center">
                  <CreditCard className="w-4 h-4 text-white" />
                </div>
                <h2 className="font-bold text-gray-900">Payment Method</h2>
              </div>

              <div className="grid grid-cols-3 gap-3 mb-6">
                {paymentMethods.map((method) => (
                  <button
                    key={method.id}
                    onClick={() => setPaymentMethod(method.id)}
                    className={`flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all text-center ${paymentMethod === method.id ? "border-orange-500 bg-orange-50" : "border-gray-200 hover:border-orange-300"}`}
                  >
                    <method.icon
                      className={`w-5 h-5 ${paymentMethod === method.id ? "text-orange-500" : "text-gray-400"}`}
                    />
                    <span
                      className={`text-xs font-semibold leading-tight ${paymentMethod === method.id ? "text-orange-600" : "text-gray-600"}`}
                    >
                      {method.label}
                    </span>
                  </button>
                ))}
              </div>

              {paymentMethod === "card" && (
                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-semibold text-gray-600 mb-1.5 block">
                      Card Number
                    </label>
                    <div className="relative">
                      <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        value={cardNumber}
                        onChange={(e) =>
                          setCardNumber(formatCard(e.target.value))
                        }
                        placeholder="0000 0000 0000 0000"
                        className={`w-full pl-10 pr-4 py-3 rounded-2xl border text-sm focus:outline-none focus:border-orange-400 tracking-widest ${errors.cardNumber ? "border-red-400 bg-red-50" : "border-gray-200 bg-gray-50"}`}
                      />
                    </div>
                    {errors.cardNumber && (
                      <p className="text-xs text-red-500 mt-1">
                        {errors.cardNumber}
                      </p>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-gray-600 mb-1.5 block">
                        Expiry Date
                      </label>
                      <input
                        value={cardExpiry}
                        onChange={(e) =>
                          setCardExpiry(formatExpiry(e.target.value))
                        }
                        placeholder="MM/YY"
                        className={`w-full px-4 py-3 rounded-2xl border text-sm focus:outline-none focus:border-orange-400 ${errors.cardExpiry ? "border-red-400 bg-red-50" : "border-gray-200 bg-gray-50"}`}
                      />
                      {errors.cardExpiry && (
                        <p className="text-xs text-red-500 mt-1">
                          {errors.cardExpiry}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-gray-600 mb-1.5 block">
                        CVV
                      </label>
                      <input
                        value={cardCVV}
                        onChange={(e) =>
                          setCardCVV(
                            e.target.value.replace(/\D/g, "").slice(0, 4),
                          )
                        }
                        placeholder="123"
                        type="password"
                        className={`w-full px-4 py-3 rounded-2xl border text-sm focus:outline-none focus:border-orange-400 ${errors.cardCVV ? "border-red-400 bg-red-50" : "border-gray-200 bg-gray-50"}`}
                      />
                      {errors.cardCVV && (
                        <p className="text-xs text-red-500 mt-1">
                          {errors.cardCVV}
                        </p>
                      )}
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-600 mb-1.5 block">
                      Name on Card
                    </label>
                    <input
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                      placeholder="e.g. EMEKA OKAFOR"
                      className={`w-full px-4 py-3 rounded-2xl border text-sm focus:outline-none focus:border-orange-400 uppercase ${errors.cardName ? "border-red-400 bg-red-50" : "border-gray-200 bg-gray-50"}`}
                    />
                    {errors.cardName && (
                      <p className="text-xs text-red-500 mt-1">
                        {errors.cardName}
                      </p>
                    )}
                  </div>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={saveCard}
                      onChange={(e) => setSaveCard(e.target.checked)}
                      className="w-4 h-4 accent-orange-500"
                    />
                    <span className="text-sm text-gray-600">
                      Save this card for future orders
                    </span>
                  </label>
                </div>
              )}

              {paymentMethod === "transfer" && (
                <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5 space-y-3">
                  <p className="text-sm font-semibold text-blue-800">
                    Transfer to this account:
                  </p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Bank</span>
                      <span className="font-semibold text-gray-900">
                        GTBank
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Account Number</span>
                      <span className="font-bold text-gray-900 tracking-wider">
                        0123456789
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Account Name</span>
                      <span className="font-semibold text-gray-900">
                        ChopFast Nigeria Ltd
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Amount</span>
                      <span className="font-bold text-orange-500">
                        ₦{total.toLocaleString()}
                      </span>
                    </div>
                  </div>
                  <p className="text-xs text-blue-600">
                    Use your phone number as the transfer reference. Your order
                    will be confirmed once payment is received.
                  </p>
                </div>
              )}

              {paymentMethod === "pod" && (
                <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 flex gap-3">
                  <Truck className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-amber-800 mb-1">
                      Pay on Delivery
                    </p>
                    <p className="text-sm text-amber-700">
                      Have{" "}
                      <span className="font-bold">
                        ₦{total.toLocaleString()}
                      </span>{" "}
                      ready in cash when your rider arrives.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT — Order Summary */}
          <div>
            <div className="bg-white rounded-3xl border border-gray-100 p-6 sticky top-24 space-y-5">
              <h2 className="font-bold text-gray-900">Order Summary</h2>
              <div className="space-y-3 max-h-56 overflow-y-auto pr-1">
                {orderItems.map((item) => (
                  <div key={item.id} className="flex gap-3 items-center">
                    <div className="relative shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 rounded-xl object-cover"
                      />
                      <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-orange-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {item.name}
                      </p>
                      <p className="text-xs text-gray-400">{item.category}</p>
                    </div>
                    <span className="text-sm font-semibold text-gray-900 shrink-0">
                      ₦{(item.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
              <div className="border-t border-gray-100 pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">
                    Subtotal ({totalItems} items)
                  </span>
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
              </div>
              <div className="border-t border-gray-100 pt-4">
                <div className="flex justify-between mb-1">
                  <span className="font-bold text-gray-900">Total</span>
                  <span className="font-bold text-xl text-gray-900">
                    ₦{total.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-gray-400">
                  <Clock className="w-3.5 h-3.5 text-orange-500" />
                  <span>Estimated delivery: 30–45 minutes</span>
                </div>
              </div>
              <button
                onClick={handlePlaceOrder}
                className={`w-full py-4 rounded-2xl font-semibold text-sm transition-all ${placing ? "bg-green-500 text-white scale-95" : "bg-orange-500 hover:bg-orange-600 text-white"}`}
              >
                {placing
                  ? "✓ Placing your order..."
                  : `Place Order — ₦${total.toLocaleString()}`}
              </button>
              <div className="flex items-center justify-center gap-2 text-xs text-gray-400">
                <ShieldCheck className="w-3.5 h-3.5 text-green-500" />
                <span>256-bit SSL secured payment</span>
              </div>
            </div>
          </div>
        </div>
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
