import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  Phone,
  MapPin,
  ChevronRight,
  Package,
  Clock,
  CheckCircle2,
  XCircle,
  Edit3,
  Save,
  X,
} from "lucide-react";

interface Order {
  id: string;
  date: string;
  time: string;
  items: { name: string; quantity: number; price: number; image: string }[];
  total: number;
  status: "Delivered" | "On the Way" | "Preparing" | "Cancelled";
  deliveryArea: string;
}

const userInfo = {
  firstName: "Emeka",
  lastName: "Okafor",
  email: "emeka.okafor@gmail.com",
  phone: "08012345678",
  address: "14 Admiralty Way, Lekki Phase 1, Lagos",
  avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  joinDate: "March 2026",
};

const orders: Order[] = [
  {
    id: "CF-20260628-4821",
    date: "Sun, June 28, 2026",
    time: "4:45 PM",
    items: [
      {
        name: "Party Jollof Rice",
        quantity: 2,
        price: 2500,
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZOyyOFLpEBq8WlvlMIIRtkBEAQdO6zOYozhlerIxRQg&s=10",
      },
      {
        name: "Shawarma (Chicken)",
        quantity: 1,
        price: 2200,
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVXePza36cD87SK-ZMHzcQwNYLVOX-G0YOGre0CHk9Lg&s=10",
      },
      {
        name: "Coca-Cola (50cl)",
        quantity: 3,
        price: 300,
        image:
          "https://images.unsplash.com/photo-1554866585-cd94860890b7?w=400&q=80",
      },
    ],
    total: 8100,
    status: "Delivered",
    deliveryArea: "Lekki Phase 1",
  },
  {
    id: "CF-20260621-3317",
    date: "Sun, June 21, 2026",
    time: "1:20 PM",
    items: [
      {
        name: "Egusi Soup + Eba",
        quantity: 1,
        price: 1800,
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSE44D50I9UIsR3cGboYedgEAfGMdmWdkQbiB4oKYi1Ow&s=10",
      },
      {
        name: "Zobo Drink (1 litre)",
        quantity: 2,
        price: 800,
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNAsy4swVdx8qdm8jUjqESTuwL4PSgaeQ5n1uGyRschg&s=10",
      },
    ],
    total: 4200,
    status: "Delivered",
    deliveryArea: "Lekki Phase 1",
  },
  {
    id: "CF-20260615-2209",
    date: "Sun, June 15, 2026",
    time: "7:05 PM",
    items: [
      {
        name: "Golden Morn (900g)",
        quantity: 1,
        price: 2500,
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2FLRbZiTLMk05wZTLjcLSZ3Oatmm9agq1RVWtmoSqTQ&s=10",
      },
      {
        name: "Peak Milk (400g)",
        quantity: 2,
        price: 2200,
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAjUFHyHPtJeMyM_NI-HNHgVk2j9KUTR6jfpialjxvjg&s=10",
      },
      {
        name: "Milo (400g tin)",
        quantity: 1,
        price: 2800,
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVmfV2HPQrB8LYBHJHZrVYUnKX2_QTusxLaZ5VAuEbYA&s=10",
      },
    ],
    total: 9700,
    status: "Delivered",
    deliveryArea: "Lekki Phase 1",
  },
  {
    id: "CF-20260610-1105",
    date: "Tue, June 10, 2026",
    time: "12:30 PM",
    items: [
      {
        name: "Suya Platter (10 sticks)",
        quantity: 1,
        price: 3500,
        image:
          "https://images.unsplash.com/photo-1499638673689-79a0b5115d87?w=400&q=80",
      },
      {
        name: "Chapman Cocktail",
        quantity: 2,
        price: 1000,
        image:
          "https://images.unsplash.com/photo-1499638673689-79a0b5115d87?w=400&q=80",
      },
    ],
    total: 6300,
    status: "Cancelled",
    deliveryArea: "Lekki Phase 1",
  },
];

const StatusBadge = ({ status }: { status: Order["status"] }) => {
  const styles = {
    Delivered: "bg-green-50 text-green-600 border-green-200",
    "On the Way": "bg-blue-50 text-blue-600 border-blue-200",
    Preparing: "bg-orange-50 text-orange-600 border-orange-200",
    Cancelled: "bg-red-50 text-red-500 border-red-200",
  };
  const icons = {
    Delivered: <CheckCircle2 className="w-3.5 h-3.5" />,
    "On the Way": <Clock className="w-3.5 h-3.5" />,
    Preparing: <Clock className="w-3.5 h-3.5" />,
    Cancelled: <XCircle className="w-3.5 h-3.5" />,
  };
  return (
    <span
      className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border ${styles[status]}`}
    >
      {icons[status]}
      {status}
    </span>
  );
};

const OrderCard = ({ order }: { order: Order }) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden hover:shadow-md transition-all">
      <div
        className="p-5 flex items-center justify-between gap-4 cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center gap-3">
          <div className="relative shrink-0">
            <img
              src={order.items[0].image}
              alt={order.items[0].name}
              className="w-14 h-14 rounded-2xl object-cover"
            />
            {order.items.length > 1 && (
              <span className="absolute -bottom-1 -right-1 w-5 h-5 bg-orange-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
                +{order.items.length - 1}
              </span>
            )}
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-900 truncate max-w-[180px]">
              {order.items[0].name}
              {order.items.length > 1
                ? ` & ${order.items.length - 1} more`
                : ""}
            </p>
            <p className="text-xs text-gray-400 mt-0.5">
              {order.date} · {order.time}
            </p>
            <p className="text-xs text-gray-400">{order.id}</p>
          </div>
        </div>
        <div className="flex flex-col items-end gap-2 shrink-0">
          <StatusBadge status={order.status} />
          <p className="text-sm font-bold text-gray-900">
            ₦{order.total.toLocaleString()}
          </p>
          <ChevronRight
            className={`w-4 h-4 text-gray-400 transition-transform ${expanded ? "rotate-90" : ""}`}
          />
        </div>
      </div>
      {expanded && (
        <div className="border-t border-gray-50 px-5 pb-5">
          <div className="space-y-3 mt-4">
            {order.items.map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-10 h-10 rounded-xl object-cover shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {item.name}
                  </p>
                  <p className="text-xs text-gray-400">x{item.quantity}</p>
                </div>
                <p className="text-sm font-semibold text-gray-900 shrink-0">
                  ₦{(item.price * item.quantity).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-gray-50 flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-400">Delivered to</p>
              <p className="text-sm font-medium text-gray-700">
                {order.deliveryArea}, Lagos
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-400">Total</p>
              <p className="text-sm font-bold text-orange-500">
                ₦{order.total.toLocaleString()}
              </p>
            </div>
          </div>
          {order.status === "Delivered" && (
            <button className="mt-4 w-full border border-orange-300 text-orange-500 hover:bg-orange-50 font-medium py-2.5 rounded-2xl text-sm transition-colors">
              🔁 Reorder
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default function UserProfilePage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"profile" | "orders">("profile");
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState(userInfo);
  const [saved, setSaved] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string>("All");

  const statusFilters = [
    "All",
    "Delivered",
    "On the Way",
    "Preparing",
    "Cancelled",
  ];
  const filteredOrders = orders.filter(
    (o) => filterStatus === "All" || o.status === filterStatus,
  );
  const totalSpent = orders
    .filter((o) => o.status !== "Cancelled")
    .reduce((sum, o) => sum + o.total, 0);

  const handleSave = () => {
    setSaved(true);
    setEditing(false);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleSignOut = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* NAVBAR */}
      <nav className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
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

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* PROFILE HEADER */}
        <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-3xl p-6 md:p-8 mb-6 text-white">
          <div className="flex items-center gap-5">
            <div className="relative shrink-0">
              <img
                src={form.avatar}
                alt="avatar"
                className="w-20 h-20 rounded-3xl object-cover border-4 border-white/30"
              />
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-400 rounded-full border-2 border-white" />
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="text-xl md:text-2xl font-bold">
                {form.firstName} {form.lastName}
              </h1>
              <p className="text-orange-100 text-sm mt-0.5">{form.email}</p>
              <p className="text-orange-200 text-xs mt-1">
                Member since {userInfo.joinDate}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mt-6">
            <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-3 text-center">
              <p className="text-xl font-bold">
                {orders.filter((o) => o.status !== "Cancelled").length}
              </p>
              <p className="text-xs text-orange-100">Total Orders</p>
            </div>
            <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-3 text-center">
              <p className="text-xl font-bold">
                ₦{(totalSpent / 1000).toFixed(1)}k
              </p>
              <p className="text-xs text-orange-100">Total Spent</p>
            </div>
            <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-3 text-center">
              <p className="text-xl font-bold">
                {orders.filter((o) => o.status === "Cancelled").length}
              </p>
              <p className="text-xs text-orange-100">Cancelled</p>
            </div>
          </div>
        </div>

        {/* TABS */}
        <div className="flex gap-2 mb-6">
          {[
            { id: "profile", label: "Profile Info", icon: User },
            { id: "orders", label: "Order History", icon: Package },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as "profile" | "orders")}
              className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-sm font-medium transition-all border ${activeTab === tab.id ? "bg-orange-500 text-white border-orange-500 shadow-sm" : "bg-white text-gray-600 border-gray-200 hover:border-orange-300"}`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* PROFILE INFO TAB */}
        {activeTab === "profile" && (
          <div className="bg-white rounded-3xl border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-bold text-gray-900">Personal Information</h2>
              {!editing ? (
                <button
                  onClick={() => setEditing(true)}
                  className="flex items-center gap-2 text-sm text-orange-500 font-medium hover:underline"
                >
                  <Edit3 className="w-4 h-4" /> Edit Profile
                </button>
              ) : (
                <div className="flex gap-2">
                  <button
                    onClick={() => setEditing(false)}
                    className="flex items-center gap-1.5 text-sm text-gray-500 px-3 py-2 rounded-xl hover:bg-gray-100 transition-colors"
                  >
                    <X className="w-4 h-4" /> Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="flex items-center gap-1.5 text-sm text-white bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded-xl transition-colors font-medium"
                  >
                    <Save className="w-4 h-4" /> Save
                  </button>
                </div>
              )}
            </div>

            {saved && (
              <div className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-2xl px-4 py-3 mb-5">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                <p className="text-sm text-green-700 font-medium">
                  Profile updated successfully!
                </p>
              </div>
            )}

            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label className="text-xs font-semibold text-gray-500 mb-1.5 block flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5" /> First Name
                </label>
                {editing ? (
                  <input
                    value={form.firstName}
                    onChange={(e) =>
                      setForm({ ...form, firstName: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-2xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:border-orange-400"
                  />
                ) : (
                  <p className="text-sm font-medium text-gray-900 px-4 py-3 bg-gray-50 rounded-2xl">
                    {form.firstName}
                  </p>
                )}
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-500 mb-1.5 block flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5" /> Last Name
                </label>
                {editing ? (
                  <input
                    value={form.lastName}
                    onChange={(e) =>
                      setForm({ ...form, lastName: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-2xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:border-orange-400"
                  />
                ) : (
                  <p className="text-sm font-medium text-gray-900 px-4 py-3 bg-gray-50 rounded-2xl">
                    {form.lastName}
                  </p>
                )}
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-500 mb-1.5 block flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5" /> Email Address
                </label>
                {editing ? (
                  <input
                    value={form.email}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-2xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:border-orange-400"
                  />
                ) : (
                  <p className="text-sm font-medium text-gray-900 px-4 py-3 bg-gray-50 rounded-2xl">
                    {form.email}
                  </p>
                )}
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-500 mb-1.5 block flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5" /> Phone Number
                </label>
                {editing ? (
                  <input
                    value={form.phone}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        phone: e.target.value.replace(/\D/g, "").slice(0, 11),
                      })
                    }
                    className="w-full px-4 py-3 rounded-2xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:border-orange-400"
                  />
                ) : (
                  <p className="text-sm font-medium text-gray-900 px-4 py-3 bg-gray-50 rounded-2xl">
                    {form.phone}
                  </p>
                )}
              </div>

              <div className="md:col-span-2">
                <label className="text-xs font-semibold text-gray-500 mb-1.5 block flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5" /> Delivery Address
                </label>
                {editing ? (
                  <input
                    value={form.address}
                    onChange={(e) =>
                      setForm({ ...form, address: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-2xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:border-orange-400"
                  />
                ) : (
                  <p className="text-sm font-medium text-gray-900 px-4 py-3 bg-gray-50 rounded-2xl">
                    {form.address}
                  </p>
                )}
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-100">
              <button
                onClick={handleSignOut}
                className="text-sm text-red-500 hover:text-red-600 font-medium hover:underline transition-colors"
              >
                Sign Out
              </button>
            </div>
          </div>
        )}

        {/* ORDER HISTORY TAB */}
        {activeTab === "orders" && (
          <div className="space-y-4">
            <div className="flex gap-2 overflow-x-auto pb-1">
              {statusFilters.map((f) => (
                <button
                  key={f}
                  onClick={() => setFilterStatus(f)}
                  className={`px-4 py-2 rounded-2xl text-sm font-medium whitespace-nowrap transition-all border ${filterStatus === f ? "bg-orange-500 text-white border-orange-500" : "bg-white text-gray-600 border-gray-200 hover:border-orange-300"}`}
                >
                  {f}
                  {f === "All" && (
                    <span className="ml-1.5 text-xs opacity-70">
                      ({orders.length})
                    </span>
                  )}
                </button>
              ))}
            </div>

            {filteredOrders.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-3xl border border-gray-100">
                <p className="text-4xl mb-3">📦</p>
                <p className="font-medium text-gray-600">
                  No {filterStatus.toLowerCase()} orders
                </p>
                <p className="text-sm text-gray-400 mt-1">
                  Try a different filter
                </p>
              </div>
            ) : (
              filteredOrders.map((order) => (
                <OrderCard key={order.id} order={order} />
              ))
            )}
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
    </div>
  );
}
