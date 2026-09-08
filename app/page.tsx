"use client";

import { useMemo, useState } from "react";

type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  oldPrice?: number;
  image: string;
  badge?: string;
};

type CartItem = {
  id: number;
  quantity: number;
};

type User = {
  name: string;
  email: string;
};

const products: Product[] = [
  {
    id: 1,
    name: "Oversized Basic T-Shirt",
    category: "เสื้อยืด",
    price: 490,
    oldPrice: 590,
    badge: "ขายดี",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 2,
    name: "Premium White Shirt",
    category: "เสื้อเชิ้ต",
    price: 790,
    image: "https://images.unsplash.com/photo-1603252110481-7ba873bf42ab?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 3,
    name: "Classic Denim Jacket",
    category: "แจ็กเก็ต",
    price: 1290,
    oldPrice: 1490,
    badge: "ลดราคา",
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 4,
    name: "Minimal Black T-Shirt",
    category: "เสื้อยืด",
    price: 450,
    image: "https://images.unsplash.com/photo-1503341504253-dff4815485f1?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 5,
    name: "Relaxed Fit Pants",
    category: "กางเกง",
    price: 890,
    image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 6,
    name: "Oversized Hoodie",
    category: "เสื้อฮู้ด",
    price: 990,
    oldPrice: 1190,
    badge: "New",
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 7,
    name: "Beige Casual Shirt",
    category: "เสื้อเชิ้ต",
    price: 690,
    image: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 8,
    name: "Straight Denim Jeans",
    category: "กางเกง",
    price: 1090,
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 9,
    name: "Vintage Graphic Tee",
    category: "เสื้อยืด",
    price: 520,
    badge: "New",
    image: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 10,
    name: "Linen Long Sleeve Shirt",
    category: "เสื้อเชิ้ต",
    price: 850,
    oldPrice: 990,
    badge: "ลดราคา",
    image: "https://images.unsplash.com/photo-1588359348347-9bc6cbbb689e?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 11,
    name: "Cargo Pants Olive",
    category: "กางเกง",
    price: 950,
    image: "https://images.unsplash.com/photo-1517445312882-bc9910d016b7?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 12,
    name: "Zip-Up Fleece Jacket",
    category: "แจ็กเก็ต",
    price: 1390,
    image: "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 13,
    name: "Essential Pullover Hoodie",
    category: "เสื้อฮู้ด",
    price: 890,
    image: "https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 14,
    name: "Striped Cotton T-Shirt",
    category: "เสื้อยืด",
    price: 420,
    image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 15,
    name: "Chino Shorts Navy",
    category: "กางเกง",
    price: 590,
    image: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 16,
    name: "Corduroy Overshirt",
    category: "เสื้อเชิ้ต",
    price: 1190,
    badge: "ขายดี",
    image: "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 17,
    name: "Biker Leather Jacket",
    category: "แจ็กเก็ต",
    price: 2490,
    oldPrice: 2890,
    badge: "ลดราคา",
    image: "https://images.unsplash.com/photo-1520975954732-35dd22299614?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 18,
    name: "Streetwear Crop Hoodie",
    category: "เสื้อฮู้ด",
    price: 790,
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 19,
    name: "Slim Fit Black Jeans",
    category: "กางเกง",
    price: 990,
    image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 20,
    name: "Heavyweight Boxy Tee",
    category: "เสื้อยืด",
    price: 590,
    badge: "New",
    image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=900&q=80",
  },
];

const categories = [
  "ทั้งหมด",
  "เสื้อยืด",
  "เสื้อเชิ้ต",
  "กางเกง",
  "แจ็กเก็ต",
  "เสื้อฮู้ด",
];

// Icons
function SearchIcon() {
  return (
    <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-4-4" />
    </svg>
  );
}

function ShoppingBagIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M6 8h12l1 13H5L6 8Z" />
      <path d="M9 8V6a3 3 0 0 1 6 0v2" />
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M20.8 8.8c0 5.5-8.8 10-8.8 10s-8.8-4.5-8.8-10A4.8 4.8 0 0 1 12 6.2a4.8 4.8 0 0 1 8.8 2.6Z" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M18 6L6 18M6 6l12 12" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function SunIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="5" />
      <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("ทั้งหมด");
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [liked, setLiked] = useState<number[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // State สำหรับระบบสมัครสมาชิก/เข้าสู่ระบบ
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "register">("register");

  // Form State
  const [authName, setAuthName] = useState("");
  const [authEmail, setAuthEmail] = useState("");
  const [authPassword, setAuthPassword] = useState("");

  const toggleTheme = () => setIsDarkMode((prev) => !prev);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const categoryMatch =
        selectedCategory === "ทั้งหมด" || product.category === selectedCategory;

      const searchMatch =
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.category.toLowerCase().includes(search.toLowerCase());

      return categoryMatch && searchMatch;
    });
  }, [selectedCategory, search]);

  const addToCart = (id: number) => {
    setCart((currentCart) => {
      const existingItem = currentCart.find((item) => item.id === id);
      if (existingItem) {
        return currentCart.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...currentCart, { id, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (id: number, delta: number) => {
    setCart((current) =>
      current
        .map((item) => {
          if (item.id === id) {
            const newQuantity = item.quantity + delta;
            return { ...item, quantity: Math.max(0, newQuantity) };
          }
          return item;
        })
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (id: number) => {
    setCart((current) => current.filter((item) => item.id !== id));
  };

  const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0);

  const cartTotal = cart.reduce((total, item) => {
    const product = products.find((p) => p.id === item.id);
    return total + (product ? product.price * item.quantity : 0);
  }, 0);

  const handleCheckout = () => {
    if (cart.length === 0) return;
    alert(`สั่งซื้อสำเร็จ! ยอดชำระทั้งหมด ฿${cartTotal.toLocaleString()}`);
    setCart([]);
    setIsCartOpen(false);
  };

  const toggleLike = (id: number) => {
    setLiked((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  };

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (authMode === "register") {
      if (!authName || !authEmail) return;
      setCurrentUser({ name: authName, email: authEmail });
      alert(`สมัครสมาชิกสำเร็จ! ยินดีต้อนรับคุณ ${authName}`);
    } else {
      if (!authEmail) return;
      setCurrentUser({ name: authEmail.split("@")[0], email: authEmail });
      alert(`เข้าสู่ระบบสำเร็จ!`);
    }
    setAuthName("");
    setAuthEmail("");
    setAuthPassword("");
    setIsAuthOpen(false);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    alert("ออกจากระบบเรียบร้อยแล้ว");
  };

  return (
    <main
      className={`min-h-screen transition-colors duration-300 ${
        isDarkMode ? "dark bg-zinc-950 text-zinc-100" : "bg-white text-zinc-900"
      }`}
    >
      {/* TOP PROMOTION */}
      <div className="bg-black px-4 py-2 text-center text-xs font-medium tracking-wide text-white border-b border-zinc-800">
        FREE SHIPPING ON ORDERS OVER ฿1,500
      </div>

      {/* HEADER */}
      <header
        className={`sticky top-0 z-40 border-b backdrop-blur transition-colors ${
          isDarkMode
            ? "border-zinc-800 bg-zinc-950/90"
            : "border-zinc-100 bg-white/95"
        }`}
      >
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8">
          {/* LOGO */}
          <div className="text-2xl font-black tracking-[0.2em]">MODA</div>

          {/* DESKTOP MENU */}
          <nav className="hidden items-center gap-8 text-sm font-medium md:flex">
            <a href="#" className="transition hover:opacity-60">
              หน้าแรก
            </a>
            <a href="#shop" className="transition hover:opacity-60">
              สินค้า
            </a>
            <a href="#categories" className="transition hover:opacity-60">
              หมวดหมู่
            </a>
            <a href="#about" className="transition hover:opacity-60">
              เกี่ยวกับเรา
            </a>
          </nav>

          {/* HEADER ACTIONS */}
          <div className="flex items-center gap-4">
            {/* DARK MODE TOGGLE */}
            <button
              onClick={toggleTheme}
              className={`p-2 transition hover:scale-110 rounded-full ${
                isDarkMode ? "hover:bg-zinc-800" : "hover:bg-zinc-100"
              }`}
              aria-label="Toggle Theme"
            >
              {isDarkMode ? <SunIcon /> : <MoonIcon />}
            </button>

            {/* SEARCH */}
            <div
              className={`hidden items-center gap-2 border-b pb-1 sm:flex ${
                isDarkMode ? "border-zinc-700" : "border-zinc-300"
              }`}
            >
              <SearchIcon />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="ค้นหาสินค้า..."
                className="w-36 bg-transparent text-sm outline-none placeholder:text-zinc-400"
              />
            </div>

            {/* USER / AUTH ACTION */}
            {currentUser ? (
              <div className="flex items-center gap-2">
                <span className="hidden text-xs font-semibold sm:inline">
                  สวัสดี, {currentUser.name}
                </span>
                <button
                  onClick={handleLogout}
                  className="text-xs text-zinc-400 underline hover:text-zinc-200"
                >
                  ออกจากระบบ
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsAuthOpen(true)}
                className="flex items-center gap-1 text-sm font-medium transition hover:opacity-75"
                aria-label="เข้าสู่ระบบ/สมัครสมาชิก"
              >
                <UserIcon />
                <span className="hidden sm:inline">เข้าสู่ระบบ</span>
              </button>
            )}

            {/* LIKED ITEMS */}
            <button
              onClick={() => setLiked([])}
              className="relative transition hover:scale-105"
              aria-label="รายการโปรด"
            >
              <HeartIcon />
              {liked.length > 0 && (
                <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-black dark:bg-white text-[9px] text-white dark:text-black font-bold px-1">
                  {liked.length}
                </span>
              )}
            </button>

            {/* CART */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative transition hover:scale-105"
              aria-label="ตะกร้าสินค้า"
            >
              <ShoppingBagIcon />
              {cartItemsCount > 0 && (
                <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-black dark:bg-white text-[9px] text-white dark:text-black font-bold px-1">
                  {cartItemsCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE SEARCH */}
      <div
        className={`border-b px-5 py-3 sm:hidden ${
          isDarkMode ? "border-zinc-800" : "border-zinc-100"
        }`}
      >
        <div
          className={`flex items-center gap-2 rounded-lg px-3 py-2.5 ${
            isDarkMode ? "bg-zinc-900" : "bg-zinc-100"
          }`}
        >
          <SearchIcon />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="ค้นหาสินค้า..."
            className="w-full bg-transparent text-sm outline-none"
          />
        </div>
      </div>

      {/* AUTH MODAL */}
      {isAuthOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div
            className={`relative w-full max-w-md rounded-lg p-6 shadow-xl transition-colors ${
              isDarkMode ? "bg-zinc-900 text-white" : "bg-white text-black"
            }`}
          >
            <button
              onClick={() => setIsAuthOpen(false)}
              className="absolute right-4 top-4 text-zinc-400 hover:text-black dark:hover:text-white"
            >
              <CloseIcon />
            </button>

            <div className="mb-6 text-center">
              <h2 className="text-2xl font-bold">
                {authMode === "register" ? "สมัครสมาชิก" : "เข้าสู่ระบบ"}
              </h2>
              <p className="mt-1 text-xs text-zinc-400">
                {authMode === "register"
                  ? "สร้างบัญชีใหม่เพื่อรับข้อเสนอพิเศษ"
                  : "เข้าสู่ระบบเพื่อดำเนินการสั่งซื้อ"}
              </p>
            </div>

            <form onSubmit={handleAuthSubmit} className="space-y-4">
              {authMode === "register" && (
                <div>
                  <label className="block text-xs font-semibold text-zinc-400">
                    ชื่อ-นามสกุล
                  </label>
                  <input
                    type="text"
                    required
                    value={authName}
                    onChange={(e) => setAuthName(e.target.value)}
                    placeholder="กรอกชื่อของคุณ"
                    className={`mt-1 w-full rounded-md border px-3 py-2 text-sm outline-none ${
                      isDarkMode
                        ? "border-zinc-700 bg-zinc-800 text-white"
                        : "border-zinc-300 bg-white text-black"
                    }`}
                  />
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-zinc-400">
                  อีเมล
                </label>
                <input
                  type="email"
                  required
                  value={authEmail}
                  onChange={(e) => setAuthEmail(e.target.value)}
                  placeholder="your@email.com"
                  className={`mt-1 w-full rounded-md border px-3 py-2 text-sm outline-none ${
                    isDarkMode
                      ? "border-zinc-700 bg-zinc-800 text-white"
                      : "border-zinc-300 bg-white text-black"
                  }`}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-400">
                  รหัสผ่าน
                </label>
                <input
                  type="password"
                  required
                  value={authPassword}
                  onChange={(e) => setAuthPassword(e.target.value)}
                  placeholder="••••••••"
                  className={`mt-1 w-full rounded-md border px-3 py-2 text-sm outline-none ${
                    isDarkMode
                      ? "border-zinc-700 bg-zinc-800 text-white"
                      : "border-zinc-300 bg-white text-black"
                  }`}
                />
              </div>

              <button
                type="submit"
                className={`w-full py-3 text-sm font-bold transition ${
                  isDarkMode
                    ? "bg-white text-black hover:bg-zinc-200"
                    : "bg-black text-white hover:bg-zinc-800"
                }`}
              >
                {authMode === "register" ? "ยืนยันการสมัคร" : "เข้าสู่ระบบ"}
              </button>
            </form>

            <div className="mt-4 text-center text-xs text-zinc-400">
              {authMode === "register" ? (
                <p>
                  มีบัญชีอยู่แล้ว?{" "}
                  <button
                    onClick={() => setAuthMode("login")}
                    className="font-bold underline text-black dark:text-white"
                  >
                    เข้าสู่ระบบ
                  </button>
                </p>
              ) : (
                <p>
                  ยังไม่มีบัญชี?{" "}
                  <button
                    onClick={() => setAuthMode("register")}
                    className="font-bold underline text-black dark:text-white"
                  >
                    สมัครสมาชิก
                  </button>
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* CART DRAWER */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
            onClick={() => setIsCartOpen(false)}
          />

          <div
            className={`relative flex w-full max-w-md flex-col shadow-2xl transition-colors ${
              isDarkMode ? "bg-zinc-900 text-white" : "bg-white text-black"
            }`}
          >
            <div
              className={`flex items-center justify-between border-b px-6 py-5 ${
                isDarkMode ? "border-zinc-800" : "border-zinc-100"
              }`}
            >
              <h2 className="text-xl font-bold tracking-tight">
                ตะกร้าสินค้า ({cartItemsCount})
              </h2>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-2 text-zinc-400 transition hover:text-black dark:hover:text-white"
              >
                <CloseIcon />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-4">
              {cart.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center text-zinc-400">
                  <ShoppingBagIcon />
                  <p className="mt-4 text-sm">ยังไม่มีสินค้าในตะกร้า</p>
                </div>
              ) : (
                <div className="flex flex-col gap-6">
                  {cart.map((cartItem) => {
                    const product = products.find((p) => p.id === cartItem.id);
                    if (!product) return null;

                    return (
                      <div key={cartItem.id} className="flex gap-4">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="h-24 w-20 rounded-md bg-zinc-100 object-cover"
                        />
                        <div className="flex flex-1 flex-col">
                          <div className="flex justify-between">
                            <div>
                              <h3 className="line-clamp-1 text-sm font-medium">
                                {product.name}
                              </h3>
                              <p className="mt-1 text-xs text-zinc-400">
                                {product.category}
                              </p>
                            </div>
                            <button
                              onClick={() => removeFromCart(cartItem.id)}
                              className="text-xs text-zinc-400 underline hover:text-black dark:hover:text-white"
                            >
                              ลบ
                            </button>
                          </div>

                          <div className="mt-auto flex items-end justify-between">
                            <div
                              className={`flex items-center gap-3 rounded-md border px-3 py-1 ${
                                isDarkMode
                                  ? "border-zinc-700"
                                  : "border-zinc-200"
                              }`}
                            >
                              <button
                                onClick={() => updateQuantity(cartItem.id, -1)}
                                className="text-zinc-400 hover:text-black dark:hover:text-white"
                              >
                                -
                              </button>
                              <span className="w-4 text-center text-sm font-medium">
                                {cartItem.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(cartItem.id, 1)}
                                className="text-zinc-400 hover:text-black dark:hover:text-white"
                              >
                                +
                              </button>
                            </div>
                            <span className="font-bold">
                              ฿
                              {(
                                product.price * cartItem.quantity
                              ).toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div
                className={`border-t p-6 ${
                  isDarkMode
                    ? "border-zinc-800 bg-zinc-950"
                    : "border-zinc-100 bg-zinc-50"
                }`}
              >
                <div className="mb-4 flex items-center justify-between text-lg font-bold">
                  <span>ยอดรวมทั้งหมด</span>
                  <span>฿{cartTotal.toLocaleString()}</span>
                </div>
                <button
                  onClick={handleCheckout}
                  className={`w-full py-4 text-sm font-bold transition ${
                    isDarkMode
                      ? "bg-white text-black hover:bg-zinc-200"
                      : "bg-black text-white hover:bg-zinc-800"
                  }`}
                >
                  สั่งซื้อสินค้า (Checkout)
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* HERO */}
      <section className="mx-auto max-w-7xl px-5 pt-6 lg:px-8">
        <div className="relative min-h-[500px] overflow-hidden bg-zinc-100">
          <img
            src="https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=1800&q=85"
            alt="Fashion collection"
            className="absolute inset-0 h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-black/35" />

          <div className="relative flex min-h-[500px] items-center px-7 py-16 sm:px-14 lg:px-20">
            <div className="max-w-xl text-white">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.35em]">
                New Collection 2026
              </p>

              <h1 className="text-5xl font-black leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
                FIND YOUR
                <br />
                OWN STYLE.
              </h1>

              <p className="mt-6 max-w-md text-sm leading-7 text-white/85 sm:text-base">
                เสื้อผ้าที่ออกแบบมาเพื่อให้คุณเป็นตัวเอง
                คัดสรรแฟชั่นคุณภาพสำหรับทุกวันของคุณ
              </p>

              <a
                href="#shop"
                className="mt-8 inline-flex items-center bg-white px-7 py-3.5 text-sm font-semibold text-black transition hover:bg-zinc-200"
              >
                SHOP NOW
                <span className="ml-4">→</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORY */}
      <section id="categories" className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-zinc-400">
              Shop by category
            </p>
            <h2 className="text-3xl font-bold tracking-tight">
              เลือกสไตล์ที่ใช่สำหรับคุณ
            </h2>
          </div>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`whitespace-nowrap rounded-full px-5 py-2.5 text-sm transition ${
                selectedCategory === category
                  ? isDarkMode
                    ? "bg-white text-black"
                    : "bg-black text-white"
                  : isDarkMode
                  ? "bg-zinc-900 text-zinc-300 hover:bg-zinc-800"
                  : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      {/* PRODUCT SECTION */}
      <section id="shop" className="mx-auto max-w-7xl px-5 pb-20 lg:px-8">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-zinc-400">
              Our products
            </p>
            <h2 className="text-3xl font-bold tracking-tight">สินค้าแนะนำ</h2>
          </div>

          <p className="hidden text-sm text-zinc-400 sm:block">
            {filteredProducts.length} products
          </p>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="py-20 text-center">
            <p className="text-lg font-medium">ไม่พบสินค้าที่ค้นหา</p>
            <p className="mt-2 text-sm text-zinc-400">
              ลองค้นหาด้วยคำอื่นหรือเลือกหมวดหมู่ใหม่
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 lg:grid-cols-4 lg:gap-x-6">
            {filteredProducts.map((product) => (
              <article key={product.id} className="group">
                <div
                  className={`relative aspect-[3/4] overflow-hidden ${
                    isDarkMode ? "bg-zinc-900" : "bg-zinc-100"
                  }`}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />

                  {product.badge && (
                    <span className="absolute left-3 top-3 bg-white text-black px-3 py-1 text-[10px] font-bold uppercase tracking-wide">
                      {product.badge}
                    </span>
                  )}

                  <button
                    onClick={() => toggleLike(product.id)}
                    className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white text-black transition hover:scale-105"
                    aria-label="เพิ่มรายการโปรด"
                  >
                    <span
                      className={
                        liked.includes(product.id)
                          ? "text-red-500"
                          : "text-zinc-400"
                      }
                    >
                      {liked.includes(product.id) ? "♥" : "♡"}
                    </span>
                  </button>

                  <button
                    onClick={() => addToCart(product.id)}
                    className={`absolute bottom-0 left-0 right-0 translate-y-full py-3 text-xs font-semibold transition duration-300 group-hover:translate-y-0 ${
                      isDarkMode
                        ? "bg-white text-black hover:bg-zinc-200"
                        : "bg-black text-white hover:bg-zinc-800"
                    }`}
                  >
                    เพิ่มลงตะกร้า
                  </button>
                </div>

                <div className="pt-4">
                  <p className="mb-1 text-xs text-zinc-400">
                    {product.category}
                  </p>

                  <h3 className="line-clamp-1 text-sm font-medium">
                    {product.name}
                  </h3>

                  <div className="mt-2 flex items-center gap-2">
                    <span className="text-sm font-bold">
                      ฿{product.price.toLocaleString()}
                    </span>

                    {product.oldPrice && (
                      <span className="text-xs text-zinc-400 line-through">
                        ฿{product.oldPrice.toLocaleString()}
                      </span>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* FOOTER */}
      <footer
        className={`px-5 py-12 text-white lg:px-8 transition-colors ${
          isDarkMode
            ? "bg-zinc-900 border-t border-zinc-800"
            : "bg-black"
        }`}
      >
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <h2 className="text-2xl font-black tracking-[0.2em]">MODA</h2>
              <p className="mt-4 max-w-xs text-sm leading-6 text-zinc-400">
                Modern fashion store สำหรับคนที่ต้องการสร้างสไตล์ในแบบของตัวเอง
              </p>
            </div>

            <div>
              <h3 className="mb-4 text-sm font-semibold">SHOP</h3>
              <div className="space-y-3 text-sm text-zinc-400">
                <p>เสื้อยืด</p>
                <p>เสื้อเชิ้ต</p>
                <p>กางเกง</p>
                <p>แจ็กเก็ต</p>
              </div>
            </div>

            <div>
              <h3 className="mb-4 text-sm font-semibold">HELP</h3>
              <div className="space-y-3 text-sm text-zinc-400">
                <p>การจัดส่ง</p>
                <p>การคืนสินค้า</p>
                <p>คำถามที่พบบ่อย</p>
                <p>ติดต่อเรา</p>
              </div>
            </div>

            <div>
              <h3 className="mb-4 text-sm font-semibold">FOLLOW US</h3>
              <div className="space-y-3 text-sm text-zinc-400">
                <p>Instagram</p>
                <p>Facebook</p>
                <p>TikTok</p>
              </div>
            </div>
          </div>

          <div className="mt-12 border-t border-zinc-800 pt-6 text-xs text-zinc-500">
            © 2026 MODA. All rights reserved.
          </div>
        </div>
      </footer>
    </main>
  );
}
